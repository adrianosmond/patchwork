import React, { Component } from 'react';

import Scoreboard from 'components/Scoreboard';
import Board from 'components/Board';
import Track from 'components/Track';
import Instructions from 'components/Instructions';

import { pieces, WON_PATCH, PATCH_INDEX } from 'constants/pieces';
import {
  buttonsEarned,
  checkBoard,
  calculateNewScore,
  didPlayerPassPatch,
} from 'constants/utils';
import { SCOREBOARD_LENGTH } from 'constants/scoreboard';
import INITIAL_PLAYER_STATE from 'constants/players';

import './App.css';

const MOVE_TYPE_PIECE = 0;
const MOVE_TYPE_BUTTON = 1;

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
    this.updatePlayerState(MOVE_TYPE_PIECE, newBoard);
  };

  makeButtons = () => {
    this.updatePlayerState(MOVE_TYPE_BUTTON);
  };

  selectPiece = selectedPieceIndex => {
    const selectedPiece = { ...this.state.pieces[selectedPieceIndex] };
    this.setState({
      selectedPieceIndex,
      selectedPiece,
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

    player.position = this.calculateNewPosition(moveType);

    if (moveType === MOVE_TYPE_PIECE) {
      player.board = newBoard;
      player.buttons = this.calculateNewButtons(
        MOVE_TYPE_PIECE,
        player.position,
        newBoard,
        this.state.selectedPiece,
      );
      player.hasSevenBySeven = this.checkSevenBySeven(player);
      this.updatePiecesTrack();
    } else if (moveType === MOVE_TYPE_BUTTON) {
      player.buttons = this.calculateNewButtons(
        MOVE_TYPE_BUTTON,
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

  calculateNewPosition(moveType) {
    const player = this.getCurrentPlayer();
    const opponent = this.getOpponent();
    let newPosition = 0;
    if (moveType === MOVE_TYPE_PIECE) {
      const { selectedPiece } = this.state;
      newPosition = player.position + selectedPiece.costTime;
    } else {
      newPosition = opponent.position + 1;
    }
    if (newPosition > SCOREBOARD_LENGTH) newPosition = SCOREBOARD_LENGTH;
    return newPosition;
  }

  calculateNewButtons(
    moveType,
    newPosition,
    playerBoard,
    selectedPiece = null,
  ) {
    const player = this.getCurrentPlayer();
    let newButtons = player.buttons;
    if (moveType === MOVE_TYPE_PIECE) {
      newButtons -= selectedPiece.costButtons;
    } else {
      newButtons += newPosition - player.position;
    }
    newButtons += buttonsEarned(player.position, newPosition, playerBoard);
    return newButtons;
  }

  updatePiecesTrack() {
    const { selectedPieceIndex } = this.state;
    let { pieces } = this.state;
    if (selectedPieceIndex !== PATCH_INDEX) {
      pieces = [
        ...pieces.slice(selectedPieceIndex + 1),
        ...pieces.slice(0, selectedPieceIndex),
      ];
    }
    this.setState({
      pieces,
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

    if (this.hasSevenBySeven(player.board)) {
      this.setState({
        sevenBySevenWon: true,
      });
      return true;
    }
    return false;
  }

  hasSevenBySeven(board) {
    for (let i = 0; i <= 2; i += 1) {
      for (let j = 0; j <= 2; j += 1) {
        if (checkBoard(board, i, j)) {
          return true;
        }
      }
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
    return (
      <div className="App">
        <Instructions />
        <Scoreboard
          players={this.state.players}
          currentPlayerIdx={this.state.currentPlayerIdx}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {this.state.players.map((player, idx) => {
            const isCurrentPlayerBoard = idx === this.state.currentPlayerIdx;
            return (
              <Board
                key={idx}
                board={player.board}
                current={isCurrentPlayerBoard}
                piece={isCurrentPlayerBoard ? this.state.selectedPiece : null}
                piecePlaced={this.piecePlaced}
                buttons={player.buttons}
                hasSevenBySeven={player.hasSevenBySeven}
                finalScore={this.state.gameFinished ? player.score : null}
              />
            );
          })}
        </div>
        {this.state.gameFinished ? null : (
          <Track
            pieces={this.state.pieces}
            placingPatch={this.state.selectedPieceIndex === PATCH_INDEX}
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
