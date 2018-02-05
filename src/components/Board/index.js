import React, { Component } from 'react'

import Piece from '../Piece'
import TouchControls from '../TouchControls'

import { rotateShape, flipShape } from '../../constants/utils'
import { BOARD_SIZE, TILE_SIZE } from '../../constants/board'

import './index.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piece: props.piece,
      pieceTop: 0,
      pieceLeft: 0
    }
    this.boundKeyListener = null;
  }

  componentWillReceiveProps(newProps) {
    const { piece } = newProps;
    if (piece !== this.state.piece) {
      this.setState({
        piece
      })
      if (piece) this.keepPieceInBoard(newProps.piece)
    }
  }

  componentDidMount() {
    this.boundKeyListener = window.addEventListener("keydown", this.keyListener.bind(this));
  }

  componentWillUnmount () {
    window.removeEventListener("keydown", this.boundKeyListener);
  }

  keyListener(event) {
    // ENTER
    if (event.keyCode === 13) {
      event.preventDefault()
      this.placePiece()
    }
    // SPACE
    else if (event.keyCode === 32) {
      event.preventDefault()
      if (event.shiftKey) {
        this.flip()
      } else {
        this.rotate()
      }
    }
    // LEFT
    else if (event.keyCode === 37) {
      event.preventDefault()
      this.movePieceLeft()
    }
    // UP
    else if (event.keyCode === 38) {
      event.preventDefault()
      this.movePieceUp()
    }
    // RIGHT
    else if (event.keyCode === 39) {
      event.preventDefault()
      this.movePieceRight()
    }
    // DOWN
    else if (event.keyCode === 40) {
      event.preventDefault()
      this.movePieceDown()
    }
  }

  movePieceUp() {
    if (!this.state.piece) return;
    const { pieceTop } = this.state
    if (pieceTop <= 0) return
    this.setState({
      pieceTop: pieceTop - 1
    })
  }

  movePieceDown() {
    if (!this.state.piece) return;
    const { pieceTop } = this.state
    const pieceHeight = this.state.piece.shape.length
    if (pieceTop + pieceHeight === BOARD_SIZE) return
    this.setState({
      pieceTop: pieceTop + 1
    })
  }

  movePieceLeft() {
    if (!this.state.piece) return;
    const { pieceLeft } = this.state
    if (pieceLeft <= 0) return
    this.setState({
      pieceLeft: pieceLeft - 1
    })
  }

  movePieceRight() {
    if (!this.state.piece) return;
    const { pieceLeft } = this.state
    const pieceWidth = this.state.piece.shape[0].length
    if (pieceLeft + pieceWidth === BOARD_SIZE) return
    this.setState({
      pieceLeft: pieceLeft + 1
    })
  }

  rotate() {
    if (!this.state.piece) return;
    this.transformShape(rotateShape)
    this.keepPieceInBoard(this.state.piece)
  }

  flip() {
    if (!this.state.piece) return;
    this.transformShape(flipShape)
  }

  transformShape(transformFunc) {
    this.setState({
      piece: {
        ...this.state.piece,
        shape: transformFunc(this.state.piece.shape)
      }
    })
  }

  placePiece() {
    if (!this.state.piece) return;
    const {pieceTop, pieceLeft} = this.state
    const {board} = this.props
    const {shape, colour} = this.state.piece
    const pieceWidth = shape[0].length
    const pieceHeight = shape.length
    let newBoard = board.map(row => row.slice())

    for (let i=0; i<pieceHeight; i++) {
      for (let j=0; j<pieceWidth; j++) {
        if (shape[i][j] === 0) continue
        if (board[pieceTop + i][pieceLeft+j] !== false) {
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
      piece: null,
      pieceTop: 0,
      pieceLeft: 0
    })

    this.props.piecePlaced(newBoard)
  }

  keepPieceInBoard(piece) {
    const {pieceTop, pieceLeft} = this.state
    const pieceWidth = piece.shape[0].length
    const pieceHeight = piece.shape.length
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

  render() {
    const {board} = this.props
    const {piece, pieceTop, pieceLeft} = this.state
    return (
      <div className={`board ${this.props.current || this.props.finalScore? 'board--current' : ''}`}>
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
            left: `${pieceLeft * TILE_SIZE}px`,
            top: `${pieceTop * TILE_SIZE}px`
          }}>
            <Piece piece={piece} />
          </div>
        : null}
        <div className="board__buttons">{this.props.buttons}</div>
        {this.props.hasSevenBySeven ?
          <div className="board__seven-by-seven">7x7</div>
          : null}
        {this.props.finalScore ?
          <div className="board__final-score">{this.props.finalScore}</div>
          : null}
        {this.props.current ?
          <TouchControls
            up={this.movePieceUp.bind(this)}
            down={this.movePieceDown.bind(this)}
            left={this.movePieceLeft.bind(this)}
            right={this.movePieceRight.bind(this)}
            flip={this.flip.bind(this)}
            rotate={this.rotate.bind(this)}
            place={this.placePiece.bind(this)} />
          : null
        }
      </div>
    )
  }
}

export default Board;
