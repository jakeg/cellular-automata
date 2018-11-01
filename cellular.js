window.JAKE = ((JAKE) => {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  const zoom = 1
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const width = Math.ceil(canvas.width / zoom)
  const height = Math.ceil(canvas.height / zoom)
  const pctActive = 5 // approx

  // seed our top row
  const seed = []
  for (let x = 0; x < width; x++) {
    const val = Math.round(Math.random() * 1 / pctActive * 100) ? 1 : 0
    // val = Math.round(width/2) == x ? 1 : 0; // sierpinski's triangle
    seed.push(val)
  }

  draw()

  function draw () {
    let start = Date.now()

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.scale(zoom, zoom)

    // our seed row
    for (let x = 0; x < width; x++) {
      ctx.fillStyle = seed[x] ? 'red' : 'blue'
      ctx.fillRect(x, 0, 1, 10)
    }

    ctx.fillStyle = 'rgba(0, 100, 0, 255)'
    ctx.fillRect(0, 10, width, 2)

    let last = seed
    let current = []

    // for each row, use xor of blocks above and to the right/left of it
    let left
    let right
    for (let y = 12; y < height; y++) {
      current = []
      for (let x = 0; x < width; x++) {
        left = (x === 0 ? 0 : last[x - 1]) // off-screen counted as 0
        right = (x === width - 1 ? 0 : last[x + 1]) // as above
        current.push(left ^ right)
        ctx.fillStyle = current[x] ? 'white' : 'black'
        ctx.fillRect(x, y, 1, 1)
      }
      last = current.slice(0)
    }

    ctx.restore()

    console.log(`Taken: ${Date.now() - start}ms`)
  }

  return JAKE
})(window.JAKE)
