import React from 'react';
import classnames from 'classnames';

import Piece from 'components/Piece';

import './TrackPiece.css';

const TrackPiece = ({ selectable, idx, selectPiece, piece }) => (
  <div
    className={classnames({
      'track-piece': true,
      'track-piece--not-selectable': !selectable,
    })}
    onClick={() => selectable && selectPiece(idx)}
  >
    <div className="track-piece__costs">
      <span className="track-piece__costs-row track-piece__costs-row--buttons">
        {piece.costButtons}
      </span>
      <span className="track-piece__costs-row track-piece__costs-row--time">
        {piece.costTime}
      </span>
    </div>
    <Piece piece={piece} />
  </div>
);

export default TrackPiece;
