import React, { Component } from 'react';
import classnames from 'classnames';

import Piece from 'components/Piece';
import TouchControls from 'components/TouchControls';

import { rotateShape, flipShape } from 'constants/utils';
import { BOARD_SIZE, TILE_SIZE } from 'constants/board';

import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piece: props.piece,
      pieceTop: 0,
      pieceLeft: 0,
    };
    this.boundKeyListener = null;
  }

  componentDidUpdate(prevProps) {
    const { piece } = this.props;
    if (piece !== prevProps.piece && piece !== this.state.piece) {
      this.setState({
        piece,
      });
      if (piece) this.keepPieceInBoard(piece);
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyListener);
  }

  keyListener = event => {
    if (event.keyCode === 13) {
      // ENTER
      event.preventDefault();
      this.placePiece();
    } else if (event.keyCode === 32) {
      // SPACE
      event.preventDefault();
      if (event.shiftKey) {
        this.flip();
      } else {
        this.rotate();
      }
    } else if (event.keyCode === 37) {
      // LEFT
      event.preventDefault();
      this.movePieceLeft();
    } else if (event.keyCode === 38) {
      // UP
      event.preventDefault();
      this.movePieceUp();
    } else if (event.keyCode === 39) {
      // RIGHT
      event.preventDefault();
      this.movePieceRight();
    } else if (event.keyCode === 40) {
      // DOWN
      event.preventDefault();
      this.movePieceDown();
    }
  };

  transformShape(transformFunc) {
    this.setState({
      piece: {
        ...this.state.piece,
        shape: transformFunc(this.state.piece.shape),
      },
    });
  }

  movePieceUp = () => {
    if (!this.state.piece) return;
    const { pieceTop } = this.state;
    if (pieceTop <= 0) return;
    this.setState({
      pieceTop: pieceTop - 1,
    });
  };

  movePieceDown = () => {
    if (!this.state.piece) return;
    const { pieceTop } = this.state;
    const pieceHeight = this.state.piece.shape.length;
    if (pieceTop + pieceHeight === BOARD_SIZE) return;
    this.setState({
      pieceTop: pieceTop + 1,
    });
  };

  movePieceLeft = () => {
    if (!this.state.piece) return;
    const { pieceLeft } = this.state;
    if (pieceLeft <= 0) return;
    this.setState({
      pieceLeft: pieceLeft - 1,
    });
  };

  movePieceRight = () => {
    if (!this.state.piece) return;
    const { pieceLeft } = this.state;
    const pieceWidth = this.state.piece.shape[0].length;
    if (pieceLeft + pieceWidth === BOARD_SIZE) return;
    this.setState({
      pieceLeft: pieceLeft + 1,
    });
  };

  rotate = () => {
    if (!this.state.piece) return;
    this.transformShape(rotateShape);
    this.keepPieceInBoard(this.state.piece);
  };

  flip = () => {
    if (!this.state.piece) return;
    this.transformShape(flipShape);
  };

  placePiece = () => {
    if (!this.state.piece) return;
    const { pieceTop, pieceLeft } = this.state;
    const { board } = this.props;
    const { shape, colour } = this.state.piece;
    const pieceWidth = shape[0].length;
    const pieceHeight = shape.length;
    const newBoard = board.map(row => row.slice());

    for (let i = 0; i < pieceHeight; i += 1) {
      for (let j = 0; j < pieceWidth; j += 1) {
        if (shape[i][j] !== 0) {
          if (board[pieceTop + i][pieceLeft + j] !== false) {
            return;
          }
          newBoard[pieceTop + i][pieceLeft + j] = {
            value: shape[i][j],
            colour,
          };
        }
      }
    }

    this.setState({
      piece: null,
      pieceTop: 0,
      pieceLeft: 0,
    });

    this.props.piecePlaced(newBoard);
  };

  keepPieceInBoard(piece) {
    const { pieceTop, pieceLeft } = this.state;
    const pieceWidth = piece.shape[0].length;
    const pieceHeight = piece.shape.length;
    if (pieceLeft + pieceWidth >= BOARD_SIZE) {
      this.setState({
        pieceLeft: BOARD_SIZE - pieceWidth,
      });
    }
    if (pieceTop + pieceHeight >= BOARD_SIZE) {
      this.setState({
        pieceTop: BOARD_SIZE - pieceHeight,
      });
    }
  }

  render() {
    const { board, current, finalScore, buttons, hasSevenBySeven } = this.props;
    const { piece, pieceTop, pieceLeft } = this.state;
    return (
      <div
        className={classnames({
          board: true,
          'board--current': current || finalScore,
        })}
      >
        {board.map((row, rowIdx) => (
          <div className="board__row" key={rowIdx}>
            {row.map((col, colIdx) => (
              <div
                className={classnames({
                  board__cell: true,
                  'board__cell--empty': !col,
                  'board__cell--full': col,
                  'board__cell--has-button': col && col.value > 1,
                })}
                style={col ? { backgroundColor: col.colour } : null}
                key={colIdx}
              >
                &nbsp;
              </div>
            ))}
          </div>
        ))}

        {piece && (
          <div
            className="board__piece"
            style={{
              left: `${pieceLeft * TILE_SIZE}px`,
              top: `${pieceTop * TILE_SIZE}px`,
            }}
          >
            <Piece piece={piece} />
          </div>
        )}

        <div className="board__buttons">{buttons}</div>

        {hasSevenBySeven && <div className="board__seven-by-seven">7x7</div>}

        {finalScore && <div className="board__final-score">{finalScore}</div>}

        {current && (
          <TouchControls
            up={this.movePieceUp}
            down={this.movePieceDown}
            left={this.movePieceLeft}
            right={this.movePieceRight}
            flip={this.flip}
            rotate={this.rotate}
            place={this.placePiece}
          />
        )}
      </div>
    );
  }
}

export default Board;
