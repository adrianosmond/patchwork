import React from 'react';

import TrackPiece from 'components/TrackPiece';

import './Track.css';

const Track = ({ pieces, makeButtons, placingPatch, maxCost, selectPiece }) => {
  if (!pieces) return null;
  return (
    <div className="track">
      <div>
        <button
          className="track__make-buttons"
          onClick={makeButtons}
          disabled={placingPatch}
        >
          Make Buttons
        </button>
      </div>
      {pieces.map((piece, idx) => {
        const selectable =
          idx < 3 && piece.costButtons <= maxCost && !placingPatch;
        return (
          <TrackPiece
            key={idx}
            selectPiece={selectable ? () => selectPiece(idx) : null}
            piece={piece}
          />
        );
      })}
    </div>
  );
};

export default Track;
