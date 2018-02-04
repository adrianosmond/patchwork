import React, { Component } from 'react'

import Piece from '../Piece'

import { BOARD_SIZE, TILE_SIZE, board } from '../../constants/board'

import './index.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board,
      pieceTop: 0,
      pieceLeft: 0
    }
    this.boundKeyListener = null;
  }

  componentDidMount() {
    this.boundKeyListener = window.addEventListener("keydown", this.keyListener.bind(this));
  }

  componentWillUnmount () {
    window.removeEventListener("keydown", this.boundKeyListener);
  }

  keyListener(event) {
    if (!this.props.piece) return;

    const {pieceTop, pieceLeft} = this.state
    let pieceWidth = this.props.piece.shape[0].length
    let pieceHeight = this.props.piece.shape.length

    // ENTER
    if (event.keyCode === 13) {
      event.preventDefault()
      this.placePiece()
    }
    // SPACE
    else if (event.keyCode === 32) {
      event.preventDefault()
      if (event.shiftKey) {
        this.props.flip()
      } else {
        this.props.rotate()
        pieceWidth = this.props.piece.shape[0].length
        pieceHeight = this.props.piece.shape.length
        if (pieceLeft + pieceWidth >= BOARD_SIZE) {
          this.setState({
            pieceLeft: BOARD_SIZE - pieceWidth
          })
        }
        if (pieceTop + pieceHeight >= BOARD_SIZE) {
          this.setState({
            pieceTop: BOARD_SIZE - pieceHeight
          })
        }
      }
    }
    // LEFT
    else if (event.keyCode === 37) {
      event.preventDefault()
      if (pieceLeft <= 0) return
      this.setState({
        pieceLeft: pieceLeft - 1
      })
    }
    // UP
    else if (event.keyCode === 38) {
      event.preventDefault()
      if (pieceTop <= 0) return
      this.setState({
        pieceTop: pieceTop - 1
      })
    }
    // RIGHT
    else if (event.keyCode === 39) {
      event.preventDefault()
      if (pieceLeft + pieceWidth === BOARD_SIZE) return
      this.setState({
        pieceLeft: pieceLeft + 1
      })
    }
    // DOWN
    else if (event.keyCode === 40) {
      event.preventDefault()
      if (pieceTop + pieceHeight === BOARD_SIZE) return
      this.setState({
        pieceTop: pieceTop + 1
      })
    }
  }

  placePiece() {
    const {board, pieceTop, pieceLeft} = this.state
    const {shape, colour} = this.props.piece
    const pieceWidth = shape[0].length
    const pieceHeight = shape.length
    let newBoard = board.map(row => row.slice())

    for (let i=0; i<pieceHeight; i++) {
      for (let j=0; j<pieceWidth; j++) {
        if (shape[i][j] === 0) continue
        if (board[pieceTop + i][pieceLeft+j] > 0) {
          return;
        } else {
          newBoard[pieceTop + i][pieceLeft+j] = {
            value: shape[i][j],
            colour
          }
        }
      }
    }

    this.setState({
      board: newBoard,
      pieceTop: 0,
      pieceLeft: 0
    })

    this.props.piecePlaced()
  }

  render() {
    const {board} = this.state
    const {piece} = this.props
    return (
      <div className="board">
        {board.map((row, ridx) =>
          <div className="board__row" key={ridx}>
            {row.map((col, cidx) =>
              <div className={`board__cell ${col ? 'board__cell--full' : 'board__cell--empty'} ${col && col.value > 1 ? 'board__cell--has-button' : ''}`}
                style={
                  col ? {backgroundColor: col.colour} : null
                }
                key={cidx}>&nbsp;</div>
            )}
          </div>
        )}
        {piece ?
          <div className="board__piece" style={{
            left: `${this.state.pieceLeft * TILE_SIZE}px`,
            top: `${this.state.pieceTop * TILE_SIZE}px`
          }}>
            <Piece piece={piece} />
          </div>
        : null}
      </div>
    )
  }
}

export default Board;
