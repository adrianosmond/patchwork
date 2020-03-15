import React from 'react';
import classnames from 'classnames';

import './Piece.css';

const Piece = ({ piece, ...props }) => {
  if (!piece?.shape) return null;
  return (
    <div className="piece" {...props}>
      {piece.shape.map((row, rowIdx) => (
        <div className="piece__row" key={rowIdx}>
          {row.map((square, squareIdx) => (
            <div
              key={squareIdx}
              className={classnames({
                piece__square: true,
                'piece__square--empty': square === 0,
                'piece__square--solid': square === 1,
                'piece__square--has-button': square === 2,
              })}
              style={{
                backgroundColor: square ? piece.colour : null,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Piece;
