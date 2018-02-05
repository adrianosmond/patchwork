const makeColour = () => `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`

const makePiece = (piece) => ({
  ...piece,
  colour: makeColour()
})

function shuffle (array) {
  for (let i=array.length - 1; i > 0; i--) {
    let j=Math.floor(Math.random() * (i+1))
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

let pieces = []

pieces.push(makePiece({
  shape: [[2,2,1],
          [0,1,0],
          [0,1,0]],
  costButtons: 5,
  costTime: 5,
}))

pieces.push(makePiece({
  shape: [[2,0,0,0],
          [2,1,1,1],
          [1,0,0,0]],
  costButtons: 7,
  costTime: 2,
}))

pieces.push(makePiece({
  shape: [[0,0,0,1],
          [1,1,1,1],
          [1,0,0,0]],
  costButtons: 1,
  costTime: 2,
}))

pieces.push(makePiece({
  shape: [[0,1,0,0],
          [1,1,1,1],
          [0,0,1,0]],
  costButtons: 2,
  costTime: 1,
}))

pieces.push(makePiece({
  shape: [[0,2,0],
          [1,2,1],
          [0,1,0]],
  costButtons: 5,
  costTime: 4,
}))

pieces.push(makePiece({
  shape: [[0,1,0,0],
          [1,2,1,1],
          [0,1,0,0]],
  costButtons: 0,
  costTime: 3,
}))

pieces.push(makePiece({
  shape: [[0,0,1,0,0],
          [1,1,2,1,1],
          [0,0,1,0,0]],
  costButtons: 1,
  costTime: 4,
}))

pieces.push(makePiece({
  shape: [[2,2,0],
          [2,1,1],
          [0,0,1]],
  costButtons: 8,
  costTime: 6,
}))

pieces.push(makePiece({
  shape: [[1,0,1],
          [1,1,1],
          [1,0,1]],
  costButtons: 2,
  costTime: 3,
}))

pieces.push(makePiece({
  shape: [[2,2,0],
          [0,2,1],
          [0,0,1]],
  costButtons: 10,
  costTime: 4,
}))

pieces.push(makePiece({
  shape: [[0,2,0],
          [2,1,1],
          [1,0,1]],
  costButtons: 3,
  costTime: 6,
}))

pieces.push(makePiece({
  shape: [[2,2],
          [1,1]],
  costButtons: 6,
  costTime: 5,
}))

pieces.push(makePiece({
  shape: [[2,1,1,1,1]],
  costButtons: 7,
  costTime: 1,
}))

pieces.push(makePiece({
  shape: [[2,1,1,1]],
  costButtons: 3,
  costTime: 3,
}))

pieces.push(makePiece({
  shape: [[1,1,1]],
  costButtons: 2,
  costTime: 2,
}))

pieces.push(makePiece({
  shape: [[2,1,1,1],
          [1,0,0,1]],
  costButtons: 1,
  costTime: 5,
}))

pieces.push(makePiece({
  shape: [[0,0,2,0],
          [1,1,1,1]],
  costButtons: 3,
  costTime: 4,
}))

pieces.push(makePiece({
  shape: [[0,2,2,0],
          [1,1,1,1]],
  costButtons: 7,
  costTime: 4,
}))

pieces.push(makePiece({
  shape: [[0,1,0],
          [1,1,1]],
  costButtons: 2,
  costTime: 2,
}))

pieces.push(makePiece({
  shape: [[1,1,0],
          [1,1,1]],
  costButtons: 2,
  costTime: 2,
}))

pieces.push(makePiece({
  shape: [[2,0,0,0],
          [2,1,1,1]],
  costButtons: 10,
  costTime: 3,
}))

pieces.push(makePiece({
  shape: [[2,2,0,0],
          [2,1,1,1]],
  costButtons: 10,
  costTime: 5,
}))

pieces.push(makePiece({
  shape: [[2,1,0],
          [0,1,1]],
  costButtons: 3,
  costTime: 2,
}))

pieces.push(makePiece({
  shape: [[2,2,0],
          [0,2,1]],
  costButtons: 7,
  costTime: 6,
}))

pieces.push(makePiece({
  shape: [[1,1,1,0],
          [0,1,1,1]],
  costButtons: 4,
  costTime: 2,
}))

pieces.push(makePiece({
  shape: [[2,1,1,0],
          [0,0,1,1]],
  costButtons: 2,
  costTime: 3,
}))

pieces.push(makePiece({
  shape: [[1,1,1],
          [1,0,1]],
  costButtons: 1,
  costTime: 2,
}))

pieces.push(makePiece({
  shape: [[2,0,0],
          [2,1,1]],
  costButtons: 4,
  costTime: 6,
}))

pieces.push(makePiece({
  shape: [[2,0,0],
          [1,1,1]],
  costButtons: 4,
  costTime: 2,
}))

pieces.push(makePiece({
  shape: [[1,0],
          [1,1]],
  costButtons: 1,
  costTime: 3,
}))

pieces.push(makePiece({
  shape: [[1,0],
          [1,1]],
  costButtons: 3,
  costTime: 1,
}))

pieces.push(makePiece({
  shape: [[0,2,1,0],
          [1,1,1,1],
          [0,1,1,0]],
  costButtons: 5,
  costTime: 3,
}))

shuffle(pieces);
shuffle(pieces);
shuffle(pieces);

pieces.push(makePiece({
  shape: [[1,1]],
  costButtons: 2,
  costTime: 1,
}))

export default pieces