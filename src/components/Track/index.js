import React from 'react'

import Piece from '../Piece'

import './index.css'

const Track = (props) => {
  if (!props.pieces) return null
  return (
    <div className="track">
      <div>
        <button className="track__make-buttons" onClick={props.makeButtons} disabled={props.placingPatch}>
          Make Buttons
        </button>
      </div>
      {props.pieces.map((piece, idx) => {
        const selectable = idx < 3 && piece.costButtons <= props.maxCost && !props.placingPatch;
        return (
          <div className={`track__piece ${selectable ? '' : 'track__piece--not-selectable'}`} key={idx}
            onClick={() => {
              if (!selectable) return;
              props.selectPiece(idx);
            }}>
            <div className="track__costs">
              <span className="track__costs-row track__costs-row--buttons">{piece.costButtons}</span>
              <span className="track__costs-row track__costs-row--time">{piece.costTime}</span>
            </div>
            <Piece piece={piece} />
          </div>
        )
      })}
    </div>
  )
}

export default Track;
