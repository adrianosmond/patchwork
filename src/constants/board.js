const BOARD_SIZE = 9;
const TILE_SIZE = 32;

const board = [];
for (let i = 0; i < BOARD_SIZE; i += 1) {
  const row = [];
  for (let j = 0; j < BOARD_SIZE; j += 1) {
    row.push(false);
  }
  board.push(row);
}

export { BOARD_SIZE, TILE_SIZE, board };
