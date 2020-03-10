import React, { Component } from 'react';

import Scoreboard from 'components/Scoreboard';
import Boards from 'components/Boards';
import Track from 'components/Track';
import Instructions from 'components/Instructions';

import { INITIAL_PLAYER_STATE, MOVE_TYPES } from 'constants/game';
import { pieces, WON_PATCH, PATCH_INDEX } from 'constants/pieces';
import {
  didPlayerPassPatch,
  calculateNewScore,
  calculateNewButtons,
  calculateNewPosition,
  hasSevenBySeven,
} from 'constants/utils';
import { SCOREBOARD_LENGTH } from 'constants/scoreboard';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [{ ...INITIAL_PLAYER_STATE }, { ...INITIAL_PLAYER_STATE }],
      currentPlayerIdx: 0,
      sevenBySevenWon: false,
      pieces,
      selectedPiece: null,
      selectedPieceIndex: null,
      gameFinished: false,
    };
  }

  piecePlaced = newBoard => {
    this.updatePlayerState(MOVE_TYPES.PIECE, newBoard);
  };

  makeButtons = () => {
    this.updatePlayerState(MOVE_TYPES.BUTTON);
  };

  selectPiece = selectedPieceIndex => {
    this.setState({
      selectedPieceIndex,
      selectedPiece: { ...this.state.pieces[selectedPieceIndex] },
    });
  };

  makePlayerArrayClone() {
    return [{ ...this.state.players[0] }, { ...this.state.players[1] }];
  }

  getCurrentPlayer() {
    return this.state.players[this.state.currentPlayerIdx];
  }

  getOpponent() {
    return this.state.players[(this.state.currentPlayerIdx + 1) % 2];
  }

  updatePlayerState(moveType, newBoard = null) {
    const newPlayers = this.makePlayerArrayClone();
    const player = newPlayers[this.state.currentPlayerIdx];
    const prevPosition = player.position;

    player.position = calculateNewPosition(
      moveType,
      player,
      this.getOpponent(),
      this.state.selectedPiece,
    );

    if (moveType === MOVE_TYPES.PIECE) {
      player.board = newBoard;
      player.buttons = calculateNewButtons(
        player,
        MOVE_TYPES.PIECE,
        player.position,
        newBoard,
        this.state.selectedPiece,
      );
      player.hasSevenBySeven = this.checkSevenBySeven(player);
      this.updatePiecesTrack();
    } else if (moveType === MOVE_TYPES.BUTTON) {
      player.buttons = calculateNewButtons(
        this.getCurrentPlayer(),
        MOVE_TYPES.BUTTON,
        player.position,
        player.board,
      );
    }

    player.score = calculateNewScore(player);

    this.setState({
      players: newPlayers,
    });

    this.checkIfPlayerPassedPatch(prevPosition, player, this.getOpponent());
    this.checkForGameEnd(newPlayers);
  }

  updatePiecesTrack() {
    const { selectedPieceIndex } = this.state;
    let currentPieces = this.state.pieces;
    if (selectedPieceIndex !== PATCH_INDEX) {
      currentPieces = [
        ...currentPieces.slice(selectedPieceIndex + 1),
        ...currentPieces.slice(0, selectedPieceIndex),
      ];
    }
    this.setState({
      pieces: currentPieces,
    });
  }

  checkIfPlayerPassedPatch(prevPosition, player, opponent) {
    if (!didPlayerPassPatch(prevPosition, player.position, opponent.position)) {
      const currentPlayerIdx = this.assessCurrentPlayer(player, opponent);
      this.setState({
        currentPlayerIdx,
        selectedPieceIndex: null,
        selectedPiece: null,
      });
    } else {
      this.setState(WON_PATCH);
    }
  }

  assessCurrentPlayer(player, opponent) {
    let { currentPlayerIdx } = this.state;
    if (player.position > opponent.position) {
      currentPlayerIdx = (currentPlayerIdx + 1) % 2;
    }
    return currentPlayerIdx;
  }

  checkSevenBySeven(player) {
    if (this.state.sevenBySevenWon) return player.hasSevenBySeven;

    if (hasSevenBySeven(player.board)) {
      this.setState({
        sevenBySevenWon: true,
      });
      return true;
    }
    return false;
  }

  checkForGameEnd(players) {
    if (
      !this.state.gameFinished &&
      players[0].position === SCOREBOARD_LENGTH &&
      players[1].position === SCOREBOARD_LENGTH
    ) {
      this.setState({
        gameFinished: true,
      });
    }
  }

  render() {
    const {
      players,
      gameFinished,
      currentPlayerIdx,
      selectedPieceIndex,
      selectedPiece,
      pieces: currentPieces,
    } = this.state;
    return (
      <div>
        <Instructions />
        <Scoreboard players={players} currentPlayerIdx={currentPlayerIdx} />
        <Boards
          players={players}
          currentPlayerIdx={currentPlayerIdx}
          selectedPiece={selectedPiece}
          gameFinished={gameFinished}
          piecePlaced={this.piecePlaced}
        />
        {!gameFinished && (
          <Track
            pieces={currentPieces}
            placingPatch={selectedPieceIndex === PATCH_INDEX}
            selectPiece={this.selectPiece}
            makeButtons={this.makeButtons}
            maxCost={this.getCurrentPlayer().buttons}
          />
        )}
      </div>
    );
  }
}

export default App;
