import React, { Component } from 'react';
import classnames from 'classnames';

import TouchControlButton from 'components/TouchControlButton';

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
    let showKeyboard;
    try {
      showKeyboard = JSON.parse(sessionStorage.getItem(SHOW_KEYBOARD_KEY));
    } catch (e) {
      showKeyboard = false;
    }

    this.setState({
      showKeyboard,
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
    const { up, down, left, right, flip, rotate, place } = this.props;
    const { showKeyboard } = this.state;
    return (
      <div
        className={classnames({
          'touch-controls': true,
          'touch-controls--visible': showKeyboard,
        })}
      >
        <TouchControlButton
          name="toggle-keyboard"
          img={touchImg}
          onClick={this.toggleKeyboard}
          title="Toggle keyboard"
        />
        <div className="touch-controls__keyboard">
          <TouchControlButton name="up" img={upImg} onClick={up} title="Up" />
          <TouchControlButton
            name="down"
            img={downImg}
            onClick={down}
            title="Down"
          />
          <TouchControlButton
            name="left"
            img={leftImg}
            onClick={left}
            title="Left"
          />
          <TouchControlButton
            name="right"
            img={rightImg}
            onClick={right}
            title="Right"
          />
          <TouchControlButton
            name="flip"
            img={rotateImg}
            onClick={rotate}
            title="Rotate"
          />
          <TouchControlButton
            name="rotate"
            img={flipImg}
            onClick={flip}
            title="Flip"
          />
          <TouchControlButton
            name="place"
            img={placeImg}
            onClick={place}
            title="Place"
          />
        </div>
      </div>
    );
  }
}

export default TouchControls;
