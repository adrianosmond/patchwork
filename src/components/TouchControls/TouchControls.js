import React, { Component } from 'react';

import './TouchControls.css';
import touchImg from './touch.png';
import upImg from './up.png';
import downImg from './down.png';
import leftImg from './left.png';
import rightImg from './right.png';
import flipImg from './flip.png';
import rotateImg from './rotate.png';
import placeImg from './place.png';

const SHOW_KEYBOARD_KEY = 'SHOW_TOUCH_KEYBOARD';

class TouchControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showKeyboard: false,
    };
  }

  componentDidMount() {
    this.setState({
      showKeyboard: sessionStorage.getItem(SHOW_KEYBOARD_KEY),
    });
  }

  toggleKeyboard = () => {
    const showKeyboard = !this.state.showKeyboard;
    this.setState({
      showKeyboard,
    });
    sessionStorage.setItem(SHOW_KEYBOARD_KEY, showKeyboard);
  };

  render() {
    return (
      <div
        className={`touch-controls ${
          this.state.showKeyboard ? 'touch-controls--visible' : ''
        }`}
      >
        <button
          className="touch-controls__button touch-controls__button--toggle-keyboard"
          style={{
            backgroundImage: `url(${touchImg})`,
          }}
          onClick={this.toggleKeyboard}
        >
          Toggle keyboard
        </button>
        <div className="touch-controls__keyboard">
          <button
            className="touch-controls__button touch-controls__button--up"
            style={{
              backgroundImage: `url(${upImg})`,
            }}
            onClick={this.props.up}
          >
            Up
          </button>
          <button
            className="touch-controls__button touch-controls__button--down"
            style={{
              backgroundImage: `url(${downImg})`,
            }}
            onClick={this.props.down}
          >
            Down
          </button>
          <button
            className="touch-controls__button touch-controls__button--left"
            style={{
              backgroundImage: `url(${leftImg})`,
            }}
            onClick={this.props.left}
          >
            Left
          </button>
          <button
            className="touch-controls__button touch-controls__button--right"
            style={{
              backgroundImage: `url(${rightImg})`,
            }}
            onClick={this.props.right}
          >
            Right
          </button>
          <button
            className="touch-controls__button touch-controls__button--flip"
            style={{
              backgroundImage: `url(${rotateImg})`,
            }}
            onClick={this.props.rotate}
          >
            Rotate
          </button>
          <button
            className="touch-controls__button touch-controls__button--rotate"
            style={{
              backgroundImage: `url(${flipImg})`,
            }}
            onClick={this.props.flip}
          >
            Flip
          </button>
          <button
            className="touch-controls__button touch-controls__button--place"
            style={{
              backgroundImage: `url(${placeImg})`,
            }}
            onClick={this.props.place}
          >
            Place
          </button>
        </div>
      </div>
    );
  }
}

export default TouchControls;
