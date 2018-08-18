import React from 'react';
import './Piece.css';

const Piece = (props) => {
  if (!props.piece) return null;
  return (
    <div className="piece">
      {props.piece.shape.map((row, ridx) =>
        <div className="piece__row" key={ridx}>
          {row.map((square, sidx) =>
            <div className={`piece__square ${square ? 'piece__square--solid' : 'piece__square--empty'} ${square === 2 ? 'piece__square--has-button' : ''}`}
              style={square ? {
                backgroundColor: props.piece.colour,
              } : null}
              key={sidx}>&nbsp;</div>)}
        </div>)}
    </div>
  );
};

export default Piece;
