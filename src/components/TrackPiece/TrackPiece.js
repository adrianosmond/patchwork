import React from 'react';
import classnames from 'classnames';

import Piece from 'components/Piece';

import './TrackPiece.css';

const TrackPiece = ({ selectPiece, piece }) => (
  <div
    className={classnames({
      'track-piece': true,
      'track-piece--not-selectable': !selectPiece,
    })}
    onClick={selectPiece}
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
