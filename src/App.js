import React, { Component } from 'react'

import Board from './components/Board'
import Track from './components/Track'

import { rotateShape, flipShape } from './constants/utils'
import pieces from './constants/pieces'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  piecePlaced() {
    const {pieces, selectedPieceIndex} = this.state
    const newPieces = [
      ...pieces.slice(selectedPieceIndex + 1),
      ...pieces.slice(0, selectedPieceIndex)
    ]
    this.setState({
      pieces: newPieces,
      selectedPieceIndex: null,
      selectedPiece: null
    })
  }

  render() {
    return (
      <div className="App">
        <Board piece={this.state.selectedPiece} rotate={this.rotate.bind(this)} flip={this.flip.bind(this)} piecePlaced={this.piecePlaced.bind(this)} />
        <Track pieces={this.state.pieces} selectPiece={this.selectPiece.bind(this)} />
      </div>
    )
  }
}

export default App
