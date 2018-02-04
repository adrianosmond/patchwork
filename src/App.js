import React, { Component } from 'react'

import Scoreboard from './components/Scoreboard'
import Board from './components/Board'
import Track from './components/Track'

import { rotateShape, flipShape } from './constants/utils'
import pieces from './constants/pieces'
import {SCOREBOARD_LENGTH, BUTTONS_AFTER, PATCHES_AFTER} from './constants/scoreboard'
import {INITIAL_PLAYER_STATE} from './constants/players'

import './App.css'

const PATCH_INDEX = 1000
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
      sevenBysevenWon: false,
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
      let newPlayers = [...this.state.players]

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
    let newPieces = pieces
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
    if (player.position > SCOREBOARD_LENGTH) player.position = SCOREBOARD_LENGTH

    console.log("==Placing piece");
    console.log("==== had ", player.buttons);
    console.log("==== cost ", selectedPiece.costButtons, " earned ", this.buttonsEarned(prevPosition, player.position, newBoard));
    player.buttons -= selectedPiece.costButtons - this.buttonsEarned(prevPosition, player.position, newBoard)
    console.log("==== have ", player.buttons);
    if (!this.state.sevenBysevenWon) {
      if (this.hasSevenBySeven(newBoard)) {
        player.hasSevenBySeven = true
        this.setState({
          sevenBysevenWon: true
        })
      }
    }

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
    if (player.position > SCOREBOARD_LENGTH) player.position = SCOREBOARD_LENGTH
    console.log("==Making buttons");
    console.log("==== had ", player.buttons);
    console.log("==== moved ", player.position - prevPosition, " earned ", this.buttonsEarned(prevPosition, player.position, player.board));
    player.buttons += player.position - prevPosition + this.buttonsEarned(prevPosition, player.position, player.board)
    console.log("==== have ", player.buttons);

    this.setState({
      players: newPlayers,
      selectedPieceIndex: null,
      selectedPiece: null
    })

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
      return 0
  }

  didPlayerPassPatch(prevPosition, currentPosition, opponentPosition) {
    const nextPatch = PATCHES_AFTER.find((el) => el >= prevPosition)
    if (nextPatch < opponentPosition) return false
    else if (nextPatch < currentPosition) return true
    else return false
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
              hasSevenBySeven={player.hasSevenBySeven}
              finalScore={player.finalScore}
              current={idx === this.state.currentPlayer}
              piece={idx === this.state.currentPlayer ? this.state.selectedPiece : null}
              rotate={this.rotate.bind(this)}
              flip={this.flip.bind(this)}
              piecePlaced={this.piecePlaced.bind(this)} />
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
