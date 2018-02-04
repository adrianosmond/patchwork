const BOARD_SIZE = 9;
const TILE_SIZE = 50;

let board = []
for (let i=0; i<BOARD_SIZE; i++) {
  let row = []
  for (let j=0; j<BOARD_SIZE; j++) {
    row.push(false)
  }
  board.push(row)
}

export { BOARD_SIZE, TILE_SIZE, board }
