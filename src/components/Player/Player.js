import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';

import Board from 'components/Board';
import Piece from 'components/Piece';
import TouchControls from 'components/TouchControls';

import { rotateShape, flipShape, makeNewBoard } from 'constants/utils';
import { BOARD_SIZE, TILE_SIZE } from 'constants/board';

import './Player.css';

const Player = ({
  piece,
  board,
  current,
  finalScore,
  buttons,
  hasSevenBySeven,
  piecePlaced,
}) => {
  const [pieceTop, setPieceTop] = useState(0);
  const [pieceLeft, setPieceLeft] = useState(0);
  const [pieceWidth, setPieceWidth] = useState(0);
  const [pieceHeight, setPieceHeight] = useState(0);
  const [transformedPiece, setTransformedPiece] = useState(piece);

  const keepPieceInBoard = useCallback(() => {
    if (pieceLeft + pieceWidth >= BOARD_SIZE) {
      setPieceLeft(BOARD_SIZE - pieceWidth);
    }
    if (pieceTop + pieceHeight >= BOARD_SIZE) {
      setPieceTop(BOARD_SIZE - pieceHeight);
    }
  }, [pieceHeight, pieceLeft, pieceTop, pieceWidth]);

  useEffect(() => {
    setTransformedPiece(piece);
    setPieceTop(0);
    setPieceLeft(0);
    setPieceWidth(piece?.shape?.[0]?.length || 0);
    setPieceHeight(piece?.shape?.length || 0);
  }, [piece]);

  useEffect(() => {
    setPieceWidth(transformedPiece?.shape?.[0]?.length || 0);
    setPieceHeight(transformedPiece?.shape?.length || 0);
    if (transformedPiece?.shape) {
      keepPieceInBoard(transformedPiece);
    }
  }, [keepPieceInBoard, transformedPiece]);

  const transformShape = useCallback(
    transformFunc => {
      setTransformedPiece({
        ...transformedPiece,
        shape: transformFunc(transformedPiece.shape),
      });
    },
    [transformedPiece],
  );

  const movePieceUp = useCallback(() => {
    if (pieceTop <= 0) return;
    setPieceTop(pT => pT - 1);
  }, [pieceTop]);

  const movePieceDown = useCallback(() => {
    if (pieceTop + pieceHeight === BOARD_SIZE) return;
    setPieceTop(pT => pT + 1);
  }, [pieceHeight, pieceTop]);

  const movePieceLeft = useCallback(() => {
    if (pieceLeft <= 0) return;
    setPieceLeft(pL => pL - 1);
  }, [pieceLeft]);

  const movePieceRight = useCallback(() => {
    if (pieceLeft + pieceWidth === BOARD_SIZE) return;
    setPieceLeft(pL => pL + 1);
  }, [pieceLeft, pieceWidth]);

  const rotate = useCallback(() => {
    transformShape(rotateShape);
  }, [transformShape]);

  const flip = useCallback(() => {
    transformShape(flipShape);
  }, [transformShape]);

  const placePiece = useCallback(() => {
    const { shape, colour } = transformedPiece;
    const newBoard = makeNewBoard(board, shape, colour, pieceTop, pieceLeft);
    if (newBoard) {
      piecePlaced(newBoard);
    }
  }, [board, pieceLeft, piecePlaced, pieceTop, transformedPiece]);

  const keyListener = useCallback(
    event => {
      if (!transformedPiece) {
        return;
      }
      if (event.keyCode === 13) {
        // ENTER
        event.preventDefault();
        placePiece();
      } else if (event.keyCode === 32) {
        // SPACE
        event.preventDefault();
        if (event.shiftKey) {
          flip();
        } else {
          rotate();
        }
      } else if (event.keyCode === 37) {
        // LEFT
        event.preventDefault();
        movePieceLeft();
      } else if (event.keyCode === 38) {
        // UP
        event.preventDefault();
        movePieceUp();
      } else if (event.keyCode === 39) {
        // RIGHT
        event.preventDefault();
        movePieceRight();
      } else if (event.keyCode === 40) {
        // DOWN
        event.preventDefault();
        movePieceDown();
      }
    },
    [
      flip,
      movePieceDown,
      movePieceLeft,
      movePieceRight,
      movePieceUp,
      placePiece,
      rotate,
      transformedPiece,
    ],
  );

  useEffect(() => {
    window.addEventListener('keydown', keyListener);
    return () => {
      window.removeEventListener('keydown', keyListener);
    };
  }, [keyListener]);

  return (
    <div
      className={classnames({
        player: true,
        'player--current': current || finalScore,
      })}
    >
      <Board board={board} />
      {transformedPiece && (
        <Piece
          piece={transformedPiece}
          style={{
            position: 'absolute',
            opacity: 0.6,
            left: `${pieceLeft * TILE_SIZE}px`,
            top: `${pieceTop * TILE_SIZE}px`,
          }}
        />
      )}

      <div className="player__buttons">{buttons}</div>
      {hasSevenBySeven && <div className="player__seven-by-seven">7x7</div>}
      {finalScore && <div className="player__final-score">{finalScore}</div>}

      {current && (
        <TouchControls
          up={movePieceUp}
          down={movePieceDown}
          left={movePieceLeft}
          right={movePieceRight}
          flip={flip}
          rotate={rotate}
          place={placePiece}
        />
      )}
    </div>
  );
};

export default Player;
