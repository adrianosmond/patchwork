import React, { Component } from 'react'

import Scoreboard from './components/Scoreboard'
import Board from './components/Board'
import Track from './components/Track'

import { rotateShape, flipShape } from './constants/utils'
import pieces from './constants/pieces'
import {BUTTONS_AFTER, PATCHES_AFTER} from './constants/scoreboard'
import {INITIAL_PLAYER_STATE} from './constants/players'

import './App.css'

const PATCH_INDEX = 1000;
const WON_PATCH = {
  selectedPieceIndex: PATCH_INDEX,
  selectedPiece: {
    shape: [[1]],
    costButtons: 0,
    costTime: 0,
    colour: 'var(--patch-colour)'
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [
        {...INITIAL_PLAYER_STATE},
        {...INITIAL_PLAYER_STATE}
      ],
      currentPlayer: 0,
      pieces,
      selectedPiece: null,
      selectedPieceIndex: null
    }
  }

  rotate() {
    if (!this.state.selectedPiece) return

    this.setState({
      selectedPiece: {
        ...this.state.selectedPiece,
        shape: rotateShape(this.state.selectedPiece.shape)
      }
    })
  }

  flip() {
    if (!this.state.selectedPiece) return

    this.setState({
      selectedPiece: {
        ...this.state.selectedPiece,
        shape: flipShape(this.state.selectedPiece.shape)
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

  piecePlaced(newBoard) {
    const {pieces, selectedPieceIndex, selectedPiece} = this.state
    let newPieces = pieces;
    if (selectedPieceIndex !== PATCH_INDEX) {
      newPieces = [
        ...pieces.slice(selectedPieceIndex + 1),
        ...pieces.slice(0, selectedPieceIndex)
      ]
    }
    let newPlayers = [...this.state.players]
    let currentPlayer = this.state.currentPlayer
    let player = newPlayers[currentPlayer]
    let opponent = newPlayers[(currentPlayer + 1) % 2]
    let prevPosition = player.position
    player.board = newBoard
    player.position += selectedPiece.costTime
    player.buttons -= selectedPiece.costButtons - this.buttonsEarned(prevPosition, player.position, newBoard)

    this.setState({
      players: newPlayers,
      pieces: newPieces
    })

    if (!this.didPlayerPassPatch(prevPosition, player.position, opponent.position)) {
      currentPlayer = this.assessCurrentPlayer(player, opponent)
      this.setState({
        currentPlayer,
        selectedPieceIndex: null,
        selectedPiece: null
      })
    } else {
      this.setState(WON_PATCH)
    }

  }

  makeButtons() {
    let newPlayers = [...this.state.players]
    let currentPlayer = this.state.currentPlayer
    let player = newPlayers[currentPlayer]
    let prevPosition = player.position
    let opponent = newPlayers[(currentPlayer + 1) % 2]
    player.position = opponent.position + 1
    player.buttons += opponent.position - prevPosition + 1 + this.buttonsEarned(prevPosition, player.position, player.board)

    this.setState({
      players: newPlayers
    });

    if (!this.didPlayerPassPatch(prevPosition, player.position, opponent.position)) {
      currentPlayer = this.assessCurrentPlayer(player, opponent)
      this.setState({
        currentPlayer
      })
    } else {
      this.setState(WON_PATCH)
    }
  }

  assessCurrentPlayer (player, opponent) {
    let currentPlayer = this.state.currentPlayer
    if (player.position > opponent.position) {
      currentPlayer = (currentPlayer + 1) % 2
    }
    return currentPlayer
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
      return 0;
  }

  didPlayerPassPatch(prevPosition, currentPosition, opponentPosition) {
    const nextPatch = PATCHES_AFTER.find((el) => el >= prevPosition)
    if (nextPatch < opponentPosition) return false
    else if (nextPatch < currentPosition) return true
    else return false;
  }

  render() {
    const currentPlayer = this.state.players[this.state.currentPlayer]
    return (
      <div className="App">
        <Scoreboard players={this.state.players} currentPlayer={this.state.currentPlayer}/>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}>
          {this.state.players.map((player, idx)=>
            <Board key={idx}
              board={player.board}
              buttons={player.buttons}
              current={idx === this.state.currentPlayer}
              piece={idx === this.state.currentPlayer ? this.state.selectedPiece : null}
              rotate={this.rotate.bind(this)}
              flip={this.flip.bind(this)}
              piecePlaced={this.piecePlaced.bind(this)} />
          )}
        </div>
        <Track pieces={this.state.pieces}
          selectPiece={this.selectPiece.bind(this)}
          makeButtons={this.makeButtons.bind(this)}
          maxCost={currentPlayer.buttons} />
      </div>
    )
  }
}

export default App
