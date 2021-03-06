import React, { useState, useCallback, useEffect, useRef } from 'react';

import './Instructions.css';

const NEVER_SHOW_KEY = 'NEVER_SHOW_MODAL';

const Instructions = () => {
  const [hide, setHide] = useState(false);
  const neverShowCheckboxEl = useRef(null);
  useEffect(() => {
    setHide(
      !!localStorage.getItem(NEVER_SHOW_KEY) ||
        !!sessionStorage.getItem(NEVER_SHOW_KEY),
    );
  }, []);

  const closeModal = useCallback(() => {
    setHide(true);
    const neverShow = neverShowCheckboxEl.current.checked;
    if (neverShow) {
      localStorage.setItem(NEVER_SHOW_KEY, true);
    } else {
      sessionStorage.setItem(NEVER_SHOW_KEY, true);
    }
  }, []);

  if (hide) return null;

  return (
    <div className="instructions">
      <div className="instructions__modal">
        <h1 className="instructions__modal-heading">Patchwork</h1>
        <h2>Rules</h2>
        <p>
          This is a version of the Uwe Rosenberg two-player board game
          Patchwork. If you need to know how to play the game, you can find find{' '}
          <a
            href="https://www.youtube.com/watch?v=wo7QGN2u3a0&t=2m12s"
            rel="noopener noreferrer"
            target="_blank"
          >
            a full explanation of the rules
          </a>{' '}
          at this link
        </p>
        <h2>Controls</h2>
        <ul>
          <li>Click on a piece to get it on your board</li>
          <li>Use the arrow keys to move it around the board</li>
          <li>Use the space bar to rotate it</li>
          <li>Hold shift and use the space bar to flip it</li>
          <li>Use enter key to permanently place it on the board</li>
        </ul>
        <p>
          If you're using a tablet, you can bring up touch screen controls to
          use instead of a keyboard by tapping the button in the bottom right
          corner
        </p>
        <div className="instructions__modal-controls">
          <label>
            <input type="checkbox" ref={neverShowCheckboxEl} />
            Don't show me this again
          </label>
          <button className="instructions__modal-button" onClick={closeModal}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
