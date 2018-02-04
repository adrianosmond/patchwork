const makeColour = () => `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`

let pieces = []

pieces.push({
  shape: [[2,2,1],
          [0,1,0],
          [0,1,0]],
  costTime: 5,
  costButtons: 5,
  colour: makeColour()
})

pieces.push({
  shape: [[2,2],
          [1,1]],
  costTime: 5,
  costButtons: 6,
  colour: makeColour()
})

pieces.push({
  shape: [[2,1,1,1,1]],
  costTime: 1,
  costButtons: 7,
  colour: makeColour()
})

pieces.push({
  shape: [[2,1,1,1],
          [1,0,0,1]],
  costTime: 5,
  costButtons: 1,
  colour: makeColour()
})

pieces.push({
  shape: [[2,0,0],
          [2,1,1]],
  costTime: 6,
  costButtons: 4,
  colour: makeColour()
})

pieces.push({
  shape: [[0,2,1,0],
          [1,1,1,1],
          [0,1,1,0]],
  costTime: 5,
  costButtons: 3,
  colour: makeColour()
})

export default pieces
