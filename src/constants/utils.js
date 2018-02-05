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

const interpolate = (from, to, cb, duration = 500) => {
  const difference = to - from;
  const start = new Date().getTime()
  const easing = (t) =>
    t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t;

  const frame = () => {
    const now = new Date().getTime()
    const percentage = Math.min(1, (now - start) / duration);
    const easedValue = easing( percentage ) * difference;
    cb(easedValue);
    if (percentage < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

export { rotateShape, flipShape, interpolate }
