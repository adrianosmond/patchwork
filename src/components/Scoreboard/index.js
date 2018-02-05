import React, { Component } from 'react'

import {BUTTONS_AFTER, PATCHES_AFTER} from '../../constants/scoreboard'
import {TILE_SIZE} from '../../constants/board'
import {interpolate} from '../../constants/utils'

import './index.css'

const track = Array.apply(null, Array(54));

class Scoreboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: props.players,
      lastPlace: 0
    }
  }

  componentDidUpdate() {
    const lastPlace = Math.min(...this.state.players.map(p => p.position))
    if (lastPlace !== this.state.lastPlace) {
      interpolate(this.trackEl.scrollLeft, Math.max(0, TILE_SIZE * (lastPlace - 1)), val => {this.trackEl.scrollLeft = val});
      this.setState({
        lastPlace
      })
    }
  }

  render() {
    const farthest = Math.max(...this.state.players.map(p => p.position))
    return (
      <div className="scoreboard">
        <div className="scoreboard__track" ref={(el)=>{this.trackEl = el}}>
          {track.map((cell, idx) =>
            <div key={idx}
              className={`scoreboard__cell ${BUTTONS_AFTER.indexOf(idx) >= 0? 'scoreboard__cell--button-after' : ''} ${PATCHES_AFTER.indexOf(idx) >= 0? 'scoreboard__cell--patch-after' : ''} ${PATCHES_AFTER.indexOf(idx) >= 0 && idx< farthest? 'scoreboard__cell--patch-taken' : ''}`}>
                { this.props.players.map((player, pidx) => {
                  if (player.position === idx) {
                    return <div key={pidx} className={`scoreboard__player scoreboard__player--${pidx + 1} ${pidx===this.props.currentPlayer ? 'scoreboard__player--current': ''}`} />
                  } else {
                    return null;
                  }
                })}
              </div>
          )}
        </div>
      </div>
    )
  }
}

export default Scoreboard
