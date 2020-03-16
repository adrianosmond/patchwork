const makeColour = () =>
  `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
    Math.random() * 255,
  )}, ${Math.round(Math.random() * 255)})`;

const makePiece = piece => ({
  ...piece,
  colour: makeColour(),
});

/* eslint-disable no-param-reassign */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
/* eslint-enable no-param-reassign */

const INITIAL_PIECES = [];

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 2, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    costButtons: 5,
    costTime: 5,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 0, 0, 0],
      [2, 1, 1, 1],
      [1, 0, 0, 0],
    ],
    costButtons: 7,
    costTime: 2,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 0, 0, 1],
      [1, 1, 1, 1],
      [1, 0, 0, 0],
    ],
    costButtons: 1,
    costTime: 2,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 1, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 1, 0],
    ],
    costButtons: 2,
    costTime: 1,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 2, 0],
      [1, 2, 1],
      [0, 1, 0],
    ],
    costButtons: 5,
    costTime: 4,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 1, 0, 0],
      [1, 2, 1, 1],
      [0, 1, 0, 0],
    ],
    costButtons: 0,
    costTime: 3,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 0, 1, 0, 0],
      [1, 1, 2, 1, 1],
      [0, 0, 1, 0, 0],
    ],
    costButtons: 1,
    costTime: 4,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 2, 0],
      [2, 1, 1],
      [0, 0, 1],
    ],
    costButtons: 8,
    costTime: 6,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
    ],
    costButtons: 2,
    costTime: 3,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 2, 0],
      [0, 2, 1],
      [0, 0, 1],
    ],
    costButtons: 10,
    costTime: 4,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 2, 0],
      [2, 1, 1],
      [1, 0, 1],
    ],
    costButtons: 3,
    costTime: 6,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 2],
      [1, 1],
    ],
    costButtons: 6,
    costTime: 5,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [[2, 1, 1, 1, 1]],
    costButtons: 7,
    costTime: 1,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [[2, 1, 1, 1]],
    costButtons: 3,
    costTime: 3,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [[1, 1, 1]],
    costButtons: 2,
    costTime: 2,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 1, 1, 1],
      [1, 0, 0, 1],
    ],
    costButtons: 1,
    costTime: 5,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 0, 2, 0],
      [1, 1, 1, 1],
    ],
    costButtons: 3,
    costTime: 4,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 2, 2, 0],
      [1, 1, 1, 1],
    ],
    costButtons: 7,
    costTime: 4,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    costButtons: 2,
    costTime: 2,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [1, 1, 0],
      [1, 1, 1],
    ],
    costButtons: 2,
    costTime: 2,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 0, 0, 0],
      [2, 1, 1, 1],
    ],
    costButtons: 10,
    costTime: 3,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 2, 0, 0],
      [2, 1, 1, 1],
    ],
    costButtons: 10,
    costTime: 5,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 1, 0],
      [0, 1, 1],
    ],
    costButtons: 3,
    costTime: 2,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 2, 0],
      [0, 2, 1],
    ],
    costButtons: 7,
    costTime: 6,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [1, 1, 1, 0],
      [0, 1, 1, 1],
    ],
    costButtons: 4,
    costTime: 2,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 1, 1, 0],
      [0, 0, 1, 1],
    ],
    costButtons: 2,
    costTime: 3,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [1, 1, 1],
      [1, 0, 1],
    ],
    costButtons: 1,
    costTime: 2,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 0, 0],
      [2, 1, 1],
    ],
    costButtons: 4,
    costTime: 6,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [2, 0, 0],
      [1, 1, 1],
    ],
    costButtons: 4,
    costTime: 2,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [1, 0],
      [1, 1],
    ],
    costButtons: 1,
    costTime: 3,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [1, 0],
      [1, 1],
    ],
    costButtons: 3,
    costTime: 1,
  }),
);

INITIAL_PIECES.push(
  makePiece({
    shape: [
      [0, 2, 1, 0],
      [1, 1, 1, 1],
      [0, 1, 1, 0],
    ],
    costButtons: 5,
    costTime: 3,
  }),
);

shuffle(INITIAL_PIECES);
shuffle(INITIAL_PIECES);
shuffle(INITIAL_PIECES);

INITIAL_PIECES.push(
  makePiece({
    shape: [[1, 1]],
    costButtons: 2,
    costTime: 1,
  }),
);

const PATCH = {
  shape: [[1]],
  costButtons: 0,
  costTime: 0,
  colour: 'var(--patch-colour)',
};

export { INITIAL_PIECES, PATCH };
