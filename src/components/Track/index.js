import React from 'react'

import Piece from '../Piece'

import './index.css'

const Track = (props) => {
  if (!props.pieces) return null
  return (
    <div className="track">
      {props.pieces.map((piece, idx) => {
        const selectable = idx < 3;
        return (
          <div className={`track__piece ${selectable ? '' : 'track__piece--not-selectable'}`} key={idx}
            onClick={() => {
              if (!selectable) return;
              props.selectPiece(idx);
            }}>
            <div className="track__costs">
              <div className="track__costs-row track__costs-row--time">{piece.costTime}</div>
              <div className="track__costs-row track__costs-row--buttons">{piece.costButtons}</div>
            </div>
            <Piece piece={piece} />
          </div>
        )
      })}
    </div>
  )
}

export default Track;
