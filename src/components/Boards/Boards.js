import React from 'react';
import Board from 'components/Board';

import './Boards.css';

const Boards = ({
  players,
  currentPlayerIdx,
  selectedPiece,
  gameFinished,
  piecePlaced,
}) => (
  <div className="boards">
    {players.map((player, idx) => {
      const isCurrentPlayerBoard = idx === currentPlayerIdx;
      return (
        <Board
          key={idx}
          board={player.board}
          current={isCurrentPlayerBoard}
          piece={isCurrentPlayerBoard && selectedPiece}
          piecePlaced={piecePlaced}
          buttons={player.buttons}
          hasSevenBySeven={player.hasSevenBySeven}
          finalScore={gameFinished && player.score}
        />
      );
    })}
  </div>
);

export default Boards;
