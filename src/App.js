import React, { Component } from 'react'

import Scoreboard from './components/Scoreboard'
import Board from './components/Board'
import Track from './components/Track'

import { rotateShape, flipShape } from './constants/utils'
import { pieces, PATCH_INDEX } from './constants/pieces'
import { SCOREBOARD_LENGTH, BUTTONS_AFTER, PATCHES_AFTER } from './constants/scoreboard'
import { INITIAL_PLAYER_STATE } from './constants/players'

import './App.css'

const WON_PATCH = {
  selectedPieceIndex: PATCH_INDEX,
  selectedPiece: {
    shape: [[1]],
    costButtons: 0,
    costTime: 0,
    colour: 'var(--patch-colour)'
  }
}
const MOVE_TYPE_PIECE = 0;
const MOVE_TYPE_BUTTON = 1;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [
        {...INITIAL_PLAYER_STATE},
        {...INITIAL_PLAYER_STATE}
      ],
      currentPlayerIdx: 0,
      sevenBySevenWon: false,
      pieces,
      selectedPiece: null,
      selectedPieceIndex: null,
      gameFinished: false
    }
  }

  componentDidUpdate() {
    if (!this.state.gameFinished &&
        this.state.players[0].position === SCOREBOARD_LENGTH &&
        this.state.players[1].position === SCOREBOARD_LENGTH) {
      let newPlayers = this.makePlayerArrayClone()

      newPlayers.forEach((player) => {
        const negatives = player.board.reduce((total, currentRow) =>
          total + currentRow.reduce((t, c) =>
            t + (c === false ? -2 : 0)
          , 0)
        , 0)
        player.finalScore = negatives + player.buttons + (player.hasSevenBySeven ? 7 : 0);
      })

      this.setState({
        gameFinished: true,
        players: newPlayers
      })
    }
  }

  piecePlaced(newBoard) {
    this.updatePlayerState(MOVE_TYPE_PIECE, newBoard);
  }

  makeButtons() {
    this.updatePlayerState(MOVE_TYPE_BUTTON);
  }

  rotate() {
    this.transformShape(rotateShape)
  }

  flip() {
    this.transformShape(flipShape)
  }

  transformShape(transformFunc) {
    if (!this.state.selectedPiece) return

    this.setState({
      selectedPiece: {
        ...this.state.selectedPiece,
        shape: transformFunc(this.state.selectedPiece.shape)
      }
    })
  }

  selectPiece(selectedPieceIndex) {
    const selectedPiece = {...this.state.pieces[selectedPieceIndex]}
    this.setState({
      selectedPieceIndex,
      selectedPiece
    })
  }

  makePlayerArrayClone() {
    return [{...this.state.players[0]}, {...this.state.players[1]}]
  }

  getCurrentPlayer() {
    return this.state.players[this.state.currentPlayerIdx]
  }

  getOpponent() {
    return this.state.players[(this.state.currentPlayerIdx + 1) % 2]
  }

  updatePlayerState(moveType, newBoard = null) {
    let newPlayers = this.makePlayerArrayClone()
    let player = newPlayers[this.state.currentPlayerIdx]
    let prevPosition = player.position

    player.position = this.calculateNewPosition(moveType)

    if (moveType === MOVE_TYPE_PIECE) {
      player.board = newBoard
      player.buttons = this.calculateNewButtons(MOVE_TYPE_PIECE, player.position, newBoard, this.state.selectedPiece)
      player.hasSevenBySeven = this.checkSevenBySeven(player)
      this.updatePiecesTrack()
    } else if (moveType === MOVE_TYPE_BUTTON) {
      player.buttons = this.calculateNewButtons(MOVE_TYPE_BUTTON, player.position, player.board)
    }

    this.setState({
      players: newPlayers
    })

    this.checkIfPlayerPassedPatch(prevPosition, player, this.getOpponent())
  }

  calculateNewPosition(moveType) {
    let player = this.getCurrentPlayer()
    let opponent = this.getOpponent()
    let newPosition = 0;
    if (moveType === MOVE_TYPE_PIECE) {
      const {selectedPiece} = this.state
      newPosition = player.position + selectedPiece.costTime
    } else {
      newPosition = opponent.position + 1
    }
    if (newPosition > SCOREBOARD_LENGTH) newPosition = SCOREBOARD_LENGTH
    return newPosition
  }

  calculateNewButtons(moveType, newPosition, playerBoard, selectedPiece = null) {
    let player = this.getCurrentPlayer()
    let newButtons = player.buttons;
    if (moveType === MOVE_TYPE_PIECE) {
      newButtons -= selectedPiece.costButtons
    } else {
      newButtons += newPosition - player.position
    }
    newButtons += this.buttonsEarned(player.position, newPosition, playerBoard)
    return newButtons;
  }

  updatePiecesTrack() {
    const {pieces, selectedPieceIndex} = this.state
    let newPieces = pieces
    if (selectedPieceIndex !== PATCH_INDEX) {
      newPieces = [
        ...pieces.slice(selectedPieceIndex + 1),
        ...pieces.slice(0, selectedPieceIndex)
      ]
    }
    this.setState({
      pieces: newPieces
    })
  }

  checkIfPlayerPassedPatch(prevPosition, player, opponent) {
    if (!this.didPlayerPassPatch(prevPosition, player.position, opponent.position)) {
      let currentPlayerIdx = this.assessCurrentPlayer(player, opponent)
      this.setState({
        currentPlayerIdx,
        selectedPieceIndex: null,
        selectedPiece: null
      })
    } else {
      this.setState(WON_PATCH)
    }
  }

  didPlayerPassPatch(prevPosition, currentPosition, opponentPosition) {
    const nextPatch = PATCHES_AFTER.find((el) => el >= prevPosition)
    if (nextPatch < opponentPosition) return false
    else if (nextPatch < currentPosition) return true
    else return false
  }

  assessCurrentPlayer (player, opponent) {
    let currentPlayerIdx = this.state.currentPlayerIdx
    if (player.position > opponent.position) {
      currentPlayerIdx = (currentPlayerIdx + 1) % 2
    }
    return currentPlayerIdx
  }

  buttonsEarned(prevPosition, currentPosition, board) {
    const nextButton = BUTTONS_AFTER.find((el) => el >= prevPosition)
    if (nextButton < currentPosition)
      return board.reduce((total, currentRow) =>
        total + currentRow.reduce((t, c) =>
          t + (c !== false ? c.value - 1 : 0)
        , 0)
      , 0)
    else
      return 0
  }

  checkSevenBySeven(player) {
    if (this.state.sevenBySevenWon) return player.hasSevenBySeven;

    if (this.hasSevenBySeven(player.board)) {
      this.setState({
        sevenBySevenWon: true
      })
      return true
    }
    return false
  }

  hasSevenBySeven(board) {
    for (let i=0; i<=2; i++) {
      for (let j=0; j<=2; j++) {
        if (this.checkBoard(board, i, j)) {
          return true
        }
      }
    }
  }

  checkBoard(board, row, col) {
    for (let i=0; i<7; i++) {
      for (let j=0; j<7; j++) {
        if (board[row+i][col+j] === false) {
          return false;
        }
      }
    }
    return true;
  }

  render() {
    const currentPlayer = this.getCurrentPlayer();
    return (
      <div className="App">
        <Scoreboard players={this.state.players}
          currentPlayerIdx={this.state.currentPlayerIdx} />
        <div style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}>
          {this.state.players.map((player, idx)=> {
            const isCurrentPlayerBoard = idx === this.state.currentPlayerIdx
            return (
              <Board key={idx}
                board={player.board}
                buttons={player.buttons}
                hasSevenBySeven={player.hasSevenBySeven}
                finalScore={player.finalScore}
                current={isCurrentPlayerBoard}
                piece={isCurrentPlayerBoard ? this.state.selectedPiece : null}
                rotate={this.rotate.bind(this)}
                flip={this.flip.bind(this)}
                piecePlaced={this.piecePlaced.bind(this)} />
            )
          }
          )}
        </div>
        {this.state.gameFinished ? null :
          <Track pieces={this.state.pieces}
            placingPatch={this.state.selectedPieceIndex === PATCH_INDEX}
            selectPiece={this.selectPiece.bind(this)}
            makeButtons={this.makeButtons.bind(this)}
            maxCost={currentPlayer.buttons} />
        }
      </div>
    )
  }
}

export default App
