import React from 'react';
import classnames from 'classnames';

import './Board.css';

const Board = ({ board }) => (
  <>
    {board.map((row, rowIdx) => (
      <div className="board__row" key={rowIdx}>
        {row.map((col, colIdx) => (
          <div
            className={classnames({
              board__cell: true,
              'board__cell--empty': !col,
              'board__cell--full': col,
              'board__cell--has-button': col?.value > 1,
            })}
            style={{ backgroundColor: col ? col.colour : null }}
            key={colIdx}
          />
        ))}
      </div>
    ))}
  </>
);

export default Board;
