import { BUTTONS_AFTER, PATCHES_AFTER } from 'constants/scoreboard';

const gatherCol = (shape, col) => {
  const newRow = [];
  for (let i = 0; i < shape.length; i += 1) {
    newRow.push(shape[i][col]);
  }
  return newRow;
};

const rotateShape = (shape) => {
  const newShape = [];
  const newRows = shape[0].length;

  for (let i = newRows - 1; i >= 0; i -= 1) {
    newShape.push(gatherCol(shape, i));
  }
  return newShape;
};

const flipShape = (shape) => {
  const newShape = shape.map(row => row.slice());
  return newShape.reverse();
};

const interpolate = (from, to, callback, duration = 500) => {
  const difference = to - from;
  const start = new Date().getTime();
  const easing = t =>
    (t < 0.5
      ? 2 * t * t
      : -1 + ((4 - (2 * t)) * t));

  const frame = () => {
    const now = new Date().getTime();
    const percentage = Math.min(1, (now - start) / duration);
    const easedValue = from + (easing(percentage) * difference);
    callback(easedValue);
    if (percentage < 1) {
      requestAnimationFrame(frame);
    }
  };

  requestAnimationFrame(frame);
};

const checkBoard = (board, row, col) => {
  for (let i = 0; i < 7; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      if (board[row + i][col + j] === false) {
        return false;
      }
    }
  }
  return true;
};

const calculateNewScore = (player) => {
  const negatives = player.board.reduce(
    (total, currentRow) =>
      total + currentRow.reduce(
        (t, c) =>
          t + (c === false ? -2 : 0)
        , 0,
      )
    , 0,
  );
  return negatives + player.buttons + (player.hasSevenBySeven ? 7 : 0);
};


const buttonsEarned = (prevPosition, currentPosition, board) => {
  const nextButton = BUTTONS_AFTER.find(el => el >= prevPosition);
  if (nextButton < currentPosition) {
    return board.reduce(
      (total, currentRow) =>
        total + currentRow.reduce(
          (t, c) =>
            t + (c !== false ? c.value - 1 : 0)
          , 0,
        )
      , 0,
    );
  }
  return 0;
};

const didPlayerPassPatch = (prevPosition, currentPosition, opponentPosition) => {
  const nextPatch = PATCHES_AFTER.find(el => el >= prevPosition);
  if (nextPatch < opponentPosition) return false;
  else if (nextPatch < currentPosition) return true;
  return false;
};

export {
  rotateShape,
  flipShape,
  interpolate,
  checkBoard,
  calculateNewScore,
  buttonsEarned,
  didPlayerPassPatch,
};
