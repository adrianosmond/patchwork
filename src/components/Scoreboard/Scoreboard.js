import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import {
  BUTTONS_AFTER,
  PATCHES_AFTER,
  SCOREBOARD_LENGTH,
} from 'constants/scoreboard';
import { TILE_SIZE } from 'constants/board';
import { interpolate } from 'constants/utils';

import './Scoreboard.css';

const track = Array(...Array(SCOREBOARD_LENGTH + 1));

const Scoreboard = ({ players, currentPlayerIdx }) => {
  const [lastPlace, setLastPlace] = useState(0);
  const trackEl = useRef(null);
  const farthest = Math.max(...players.map(p => p.position));
  const scoresEqual = players[0].position === players[1].position;

  useEffect(() => {
    const newLastPlace = Math.min(...players.map(p => p.position));
    if (newLastPlace !== lastPlace) {
      interpolate(
        trackEl.current.scrollLeft,
        Math.max(0, TILE_SIZE * (lastPlace - 1)),
        val => {
          trackEl.current.scrollLeft = val;
        },
      );
      setLastPlace(newLastPlace);
    }
  }, [lastPlace, players]);

  return (
    <div className="scoreboard">
      <div className="scoreboard__track" ref={trackEl}>
        {track.map((cell, idx) => (
          <div
            key={idx}
            className={classnames({
              scoreboard__cell: true,
              'scoreboard__cell--button-after': BUTTONS_AFTER.includes(idx),
              'scoreboard__cell--patch-after': PATCHES_AFTER.includes(idx),
              'scoreboard__cell--patch-taken':
                PATCHES_AFTER.includes(idx) && idx < farthest,
            })}
          />
        ))}
        {players.map((player, playerIdx) => (
          <div
            key={playerIdx}
            className={classnames({
              scoreboard__player: true,
              [`scoreboard__player--${playerIdx + 1}`]: true,
              'scoreboard__player--current': playerIdx === currentPlayerIdx,
              'scoreboard__player--scores-equal': scoresEqual,
            })}
            style={{ left: TILE_SIZE * player.position }}
          />
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
