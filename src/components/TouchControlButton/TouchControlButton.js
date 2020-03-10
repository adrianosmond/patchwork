import React from 'react';
import classnames from 'classnames';

import './TouchControlButton.css';

const TouchControlButton = ({ name, img, onClick, title }) => (
  <button
    className={classnames(
      'touch-control-button',
      `touch-control-button--${name}`,
    )}
    style={{
      backgroundImage: `url(${img})`,
    }}
    onClick={onClick}
  >
    {title}
  </button>
);

export default TouchControlButton;
