import React, { useState, useCallback, useEffect } from 'react';

import Scoreboard from 'components/Scoreboard';
import Players from 'components/Players';
import Track from 'components/Track';
import Instructions from 'components/Instructions';

import { INITIAL_PLAYER_STATE, MOVE_TYPES } from 'constants/game';
import { INITIAL_PIECES, PATCH_INDEX, PATCH } from 'constants/pieces';
import {
  didPlayerPassPatch,
  calculateNewScore,
  calculateNewButtons,
  calculateNewPosition,
  hasSevenBySeven,
} from 'constants/utils';

import { SCOREBOARD_LENGTH } from 'constants/scoreboard';

import './App.css';

const reachedEnd = player => player.position === SCOREBOARD_LENGTH;

const App = () => {
  const [players, setPlayers] = useState([
    { ...INITIAL_PLAYER_STATE },
    { ...INITIAL_PLAYER_STATE },
  ]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [sevenBySevenWon, setSevenBySevenWon] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPieceIdx, setSelectedPieceIdx] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [pieces, setPieces] = useState(INITIAL_PIECES);
  const placingPatch = selectedPieceIdx === PATCH_INDEX;
  const maxCost = players[currentPlayerIdx].buttons;

  useEffect(() => {
    const player = players[currentPlayerIdx];
    const opponent = players[(currentPlayerIdx + 1) % 2];
    if (reachedEnd(player) && reachedEnd(opponent)) {
      setGameFinished(true);
    }
  }, [currentPlayerIdx, players]);

  const selectPiece = useCallback(
    idx => {
      setSelectedPieceIdx(idx);
      setSelectedPiece({ ...pieces[idx] });
    },
    [pieces],
  );

  const checkSevenBySeven = useCallback(
    player => {
      if (sevenBySevenWon) return player.hasSevenBySeven;

      if (hasSevenBySeven(player.board)) {
        setSevenBySevenWon(true);
        return true;
      }
      return false;
    },
    [sevenBySevenWon],
  );

  const checkWhoseTurn = useCallback(
    newPosition => {
      const { position } = players[currentPlayerIdx];
      const opponent = players[(currentPlayerIdx + 1) % 2];
      if (didPlayerPassPatch(position, newPosition, opponent.position)) {
        setSelectedPieceIdx(PATCH_INDEX);
        setSelectedPiece(PATCH);
      } else {
        if (newPosition > opponent.position) {
          setCurrentPlayerIdx((currentPlayerIdx + 1) % 2);
        }
        setSelectedPiece(null);
        setSelectedPieceIdx(null);
      }
    },
    [currentPlayerIdx, players],
  );

  const updatePlayer = useCallback(
    (moveType, newBoard) => {
      const currentPlayer = players[currentPlayerIdx];
      const opponent = players[(currentPlayerIdx + 1) % 2];
      const newPlayersArr = [{ ...players[0] }, { ...players[1] }];
      const playerToUpdate = newPlayersArr[currentPlayerIdx];

      if (newBoard) playerToUpdate.board = newBoard;
      if (moveType === MOVE_TYPES.PIECE) {
        playerToUpdate.hasSevenBySeven = checkSevenBySeven(playerToUpdate);
      }
      playerToUpdate.position = calculateNewPosition(
        moveType,
        currentPlayer,
        opponent,
        selectedPiece,
      );
      playerToUpdate.buttons = calculateNewButtons(
        moveType,
        currentPlayer,
        playerToUpdate.position,
        playerToUpdate.board,
        moveType === MOVE_TYPES.PIECE ? selectedPiece : undefined,
      );
      playerToUpdate.score = calculateNewScore(playerToUpdate);
      setPlayers(newPlayersArr);
      return playerToUpdate;
    },
    [checkSevenBySeven, currentPlayerIdx, players, selectedPiece],
  );

  const updatePiecesTrack = useCallback(() => {
    if (!placingPatch) {
      setPieces([
        ...pieces.slice(selectedPieceIdx + 1),
        ...pieces.slice(0, selectedPieceIdx),
      ]);
    }
  }, [pieces, placingPatch, selectedPieceIdx]);

  const piecePlaced = useCallback(
    newBoard => {
      const { position } = updatePlayer(MOVE_TYPES.PIECE, newBoard);
      updatePiecesTrack();
      checkWhoseTurn(position);
    },
    [checkWhoseTurn, updatePiecesTrack, updatePlayer],
  );

  const makeButtons = useCallback(() => {
    const { position } = updatePlayer(MOVE_TYPES.BUTTON);
    checkWhoseTurn(position);
  }, [updatePlayer, checkWhoseTurn]);

  return (
    <div>
      <Instructions />
      <Scoreboard players={players} currentPlayerIdx={currentPlayerIdx} />
      <Players
        players={players}
        currentPlayerIdx={currentPlayerIdx}
        selectedPiece={selectedPiece}
        gameFinished={gameFinished}
        piecePlaced={piecePlaced}
      />
      {!gameFinished && (
        <Track
          pieces={pieces}
          placingPatch={placingPatch}
          selectPiece={selectPiece}
          makeButtons={makeButtons}
          maxCost={maxCost}
        />
      )}
    </div>
  );
};

export default App;
