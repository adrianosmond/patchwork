import React from 'react';
import Player from 'components/Player';

import './Players.css';

const Players = ({
  players,
  currentPlayerIdx,
  selectedPiece,
  gameFinished,
  piecePlaced,
}) => (
  <div className="players">
    {players.map((player, idx) => {
      const isCurrentPlayerBoard = idx === currentPlayerIdx;
      return (
        <Player
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

export default Players;
