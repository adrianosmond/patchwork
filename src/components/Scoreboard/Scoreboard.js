import React, { Component } from 'react';
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

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPlace: 0,
    };
  }

  componentDidUpdate() {
    const lastPlace = Math.min(...this.props.players.map(p => p.position));
    if (lastPlace !== this.state.lastPlace) {
      interpolate(
        this.trackEl.scrollLeft,
        Math.max(0, TILE_SIZE * (lastPlace - 1)),
        val => {
          this.trackEl.scrollLeft = val;
        },
      );
      this.setState({
        lastPlace,
      });
    }
  }

  render() {
    const { players, currentPlayerIdx } = this.props;
    const farthest = Math.max(...players.map(p => p.position));
    return (
      <div className="scoreboard">
        <div
          className="scoreboard__track"
          ref={el => {
            this.trackEl = el;
          }}
        >
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
            >
              {players.map((player, playerIdx) => {
                if (player.position !== idx) {
                  return null;
                }
                const isCurrentPlayer = playerIdx === currentPlayerIdx;
                return (
                  <div
                    key={playerIdx}
                    className={classnames({
                      scoreboard__player: true,
                      'scoreboard__player--current': isCurrentPlayer,
                      [`scoreboard__player--${playerIdx + 1}`]: true,
                    })}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Scoreboard;
