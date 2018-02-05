import React, { Component } from 'react'

import './index.css'

const NEVER_SHOW_KEY = 'NEVER_SHOW_MODAL'

class Instructions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hide: false
    }
  }

  componentWillMount() {
    const hide = !!localStorage.getItem(NEVER_SHOW_KEY) || !!sessionStorage.getItem(NEVER_SHOW_KEY)
    this.setState({
      hide
    })
  }

  closeModal() {
    this.setState({
      hide: true
    })

    const neverShow = this.neverShowCheckbox.checked;
    if (neverShow) {
      localStorage.setItem(NEVER_SHOW_KEY, true)
    } else {
      sessionStorage.setItem(NEVER_SHOW_KEY, true)
    }
  }

  render() {
    if (this.state.hide) return null;

    return (
      <div className="instructions">
        <div className="instructions__modal">
          <h1 className="instructions__modal-heading">Patchwork</h1>
          <h2>Rules</h2>
          <p>This is a version of the Uwe Rosenberg two-player boardgame Patchwork.
            If you need to know how to play the game, at this link you can
            find <a href="" target="_blank">a full explanation of the rules</a></p>
          <h2>Controls</h2>
          <ul>
            <li>Click on a piece to get it on your board</li>
            <li>Use the arrow keys to move it around the board</li>
            <li>Use the space bar to rotate it</li>
            <li>Use shift and the space bar to flip it</li>
            <li>Use enter key to permanently place it on the board</li>
          </ul>
          <div className="instructions__modal-controls">
            <label><input type="checkbox" ref={(el)=>{this.neverShowCheckbox = el}} />Don't show me this again</label>
            <button className="instructions__modal-button" onClick={this.closeModal.bind(this)}>Got it!</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Instructions
