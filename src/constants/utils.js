const gatherCol = (shape, col) => {
  let newRow=[]
  for (let i=0; i<shape.length; i++) {
    newRow.push(shape[i][col])
  }
  return newRow
}

const rotateShape = (shape) => {
  let newShape = []
  const newRows = shape[0].length

  for (let i=newRows-1; i>=0; i--) {
    newShape.push(gatherCol(shape, i))
  }
  return newShape
}

const flipShape = (shape) => {
  let newShape = shape.map(row => row.slice())
  return newShape.reverse()
}

export { rotateShape, flipShape }
