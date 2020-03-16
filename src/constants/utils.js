import {
  BUTTONS_AFTER,
  PATCHES_AFTER,
  SCOREBOARD_LENGTH,
} from 'constants/scoreboard';

const gatherCol = (shape, col) => {
  const newRow = [];
  for (let i = 0; i < shape.length; i += 1) {
    newRow.push(shape[i][col]);
  }
  return newRow;
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

export const rotateShape = shape => {
  const newShape = [];
  const newRows = shape[0].length;

  for (let i = newRows - 1; i >= 0; i -= 1) {
    newShape.push(gatherCol(shape, i));
  }
  return newShape;
};

export const flipShape = shape => {
  const newShape = shape.map(row => row.slice());
  return newShape.reverse();
};

export const interpolate = (from, to, callback, duration = 500) => {
  const difference = to - from;
  const start = new Date().getTime();
  const easing = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const frame = () => {
    const now = new Date().getTime();
    const percentage = Math.min(1, (now - start) / duration);
    const easedValue = from + easing(percentage) * difference;
    callback(easedValue);
    if (percentage < 1) {
      requestAnimationFrame(frame);
    }
  };

  requestAnimationFrame(frame);
};

export const buttonsEarned = (prevPosition, currentPosition, board) => {
  const nextButton = BUTTONS_AFTER.find(el => el >= prevPosition);
  if (nextButton < currentPosition) {
    return board.reduce(
      (total, currentRow) =>
        total +
        currentRow.reduce((t, c) => t + (c !== false ? c.value - 1 : 0), 0),
      0,
    );
  }
  return 0;
};

export const hasSevenBySeven = board => {
  for (let i = 0; i <= 2; i += 1) {
    for (let j = 0; j <= 2; j += 1) {
      if (checkBoard(board, i, j)) {
        return true;
      }
    }
  }
  return false;
};

export const calculateNewScore = player => {
  const negatives = player.board.reduce(
    (total, currentRow) =>
      total + currentRow.reduce((t, c) => t + (c === false ? -2 : 0), 0),
    0,
  );
  return negatives + player.buttons + (player.hasSevenBySeven ? 7 : 0);
};

export const calculateNewButtons = (
  player,
  { position: newPosition, board },
  selectedPiece = null,
) => {
  let newButtons = player.buttons;
  if (selectedPiece) {
    newButtons -= selectedPiece.costButtons;
  } else {
    newButtons += newPosition - player.position;
  }
  newButtons += buttonsEarned(player.position, newPosition, board);
  return newButtons;
};

export const calculateNewPosition = (
  player,
  opponent,
  selectedPiece = null,
) => {
  let newPosition = 0;
  if (selectedPiece) {
    newPosition = player.position + selectedPiece.costTime;
  } else {
    newPosition = opponent.position + 1;
  }
  if (newPosition > SCOREBOARD_LENGTH) newPosition = SCOREBOARD_LENGTH;
  return newPosition;
};

export const playerPassedPatch = (
  prevPosition,
  currentPosition,
  opponentPosition,
) => {
  const nextPatch = PATCHES_AFTER.find(el => el >= prevPosition);
  if (nextPatch < opponentPosition) return false;
  if (nextPatch < currentPosition) return true;
  return false;
};

export const makeNewBoard = (board, shape, colour, pieceTop, pieceLeft) => {
  const newBoard = board.map(row => row.slice());

  for (let i = 0; i < shape.length; i += 1) {
    for (let j = 0; j < shape[0].length; j += 1) {
      if (shape[i][j] !== 0) {
        if (board[pieceTop + i][pieceLeft + j] !== false) {
          return false;
        }
        newBoard[pieceTop + i][pieceLeft + j] = {
          value: shape[i][j],
          colour,
        };
      }
    }
  }

  return newBoard;
};
