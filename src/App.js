import React, { useState, useCallback } from 'react';

import Scoreboard from 'components/Scoreboard';
import Players from 'components/Players';
import Track from 'components/Track';
import Instructions from 'components/Instructions';

import { INITIAL_PLAYER_STATE } from 'constants/game';
import { INITIAL_PIECES, PATCH } from 'constants/pieces';
import {
  playerPassedPatch,
  calculateNewScore,
  calculateNewButtons,
  calculateNewPosition,
  hasSevenBySeven,
} from 'constants/utils';

import { SCOREBOARD_LENGTH } from 'constants/scoreboard';

import './App.css';

const App = () => {
  const [players, setPlayers] = useState([
    { ...INITIAL_PLAYER_STATE },
    { ...INITIAL_PLAYER_STATE },
  ]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [pieces, setPieces] = useState(INITIAL_PIECES);

  const currentPlayer = players[currentPlayerIdx];
  const opponent = players[(currentPlayerIdx + 1) % 2];
  const gameFinished = players
    .map(({ position }) => position === SCOREBOARD_LENGTH)
    .every(p => p);

  const selectPiece = useCallback(idx => setSelectedPiece(pieces[idx]), [
    pieces,
  ]);

  const checkWhoseTurn = useCallback(
    newPosition => {
      const { position } = currentPlayer;
      if (playerPassedPatch(position, newPosition, opponent.position)) {
        setSelectedPiece(PATCH);
      } else {
        if (newPosition > opponent.position) {
          setCurrentPlayerIdx((currentPlayerIdx + 1) % 2);
        }
        setSelectedPiece(null);
      }
    },
    [currentPlayer, currentPlayerIdx, opponent.position],
  );

  const updatePlayer = useCallback(
    updatedBoard => {
      const newPlayersArr = [{ ...players[0] }, { ...players[1] }];
      const playerToUpdate = newPlayersArr[currentPlayerIdx];

      if (updatedBoard) {
        playerToUpdate.board = updatedBoard;
        if (!players.map(p => p.hasSevenBySeven).some(p => p)) {
          if (hasSevenBySeven(updatedBoard)) {
            playerToUpdate.hasSevenBySeven = true;
          }
        }
      }

      playerToUpdate.position = calculateNewPosition(
        currentPlayer,
        opponent,
        updatedBoard ? selectedPiece : null,
      );

      playerToUpdate.buttons = calculateNewButtons(
        currentPlayer,
        playerToUpdate,
        updatedBoard ? selectedPiece : null,
      );

      playerToUpdate.score = calculateNewScore(playerToUpdate);

      setPlayers(newPlayersArr);

      return playerToUpdate;
    },
    [currentPlayer, currentPlayerIdx, opponent, players, selectedPiece],
  );

  const updatePiecesTrack = useCallback(() => {
    if (selectedPiece !== PATCH) {
      const selectedPieceIdx = pieces.indexOf(selectedPiece);
      setPieces([
        ...pieces.slice(selectedPieceIdx + 1),
        ...pieces.slice(0, selectedPieceIdx),
      ]);
    }
  }, [pieces, selectedPiece]);

  const piecePlaced = useCallback(
    updatedBoard => {
      const { position } = updatePlayer(updatedBoard);
      updatePiecesTrack();
      checkWhoseTurn(position);
    },
    [checkWhoseTurn, updatePiecesTrack, updatePlayer],
  );

  const makeButtons = useCallback(() => {
    const { position } = updatePlayer();
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
          placingPatch={selectedPiece === PATCH}
          selectPiece={selectPiece}
          makeButtons={makeButtons}
          maxCost={currentPlayer.buttons}
        />
      )}
    </div>
  );
};

export default App;
