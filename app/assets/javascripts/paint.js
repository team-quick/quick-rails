$(document).on('turbolinks:load', () => {

  const canvas = $('#canvas-draw')[0]

  if (!canvas)
    return

  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext('2d')

  App.room = App.cable.subscriptions.create({
    channel: "PaintChannel",
    room: "room1"
  }, {
      hello: (message) =>
        App.room.perform('hello', { message: message }),

      draw: (path) =>
        App.room.perform('draw', { path }),

      received: (data) => {
        console.log(data)
        switch (data.action) {
          case 'draw': {
            const path = data.path
            ctx.moveTo(path.x0, path.y0)
            ctx.lineTo(path.x1, path.y1)
            ctx.lineWidth = 5
            ctx.strokeStyle = 'black'
            ctx.stroke()
          }; break
        }
      }
    })



  let mouseLeftDown = false
  let prevX = -1
  let prevY = -1

  // (prevX !== e.offsetX || prevY !== e.offsetY)
  // (e.movementX !== 0 || e.movementY !== 0)
  canvas.addEventListener('mousemove', function (e) {
    if (mouseLeftDown === true && (prevX !== e.offsetX || prevY !== e.offsetY)) {
      console.log(e.offsetX, e.offsetY)
      App.room.draw({
        x0: prevX,
        y0: prevY,
        x1: e.offsetX,
        y1: e.offsetY
      })
      ctx.moveTo(prevX, prevY)
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.lineWidth = 5
      ctx.strokeStyle = 'black'
      ctx.stroke()

      prevX = e.offsetX
      prevY = e.offsetY
    }
  })

  canvas.addEventListener('mousedown', function (e) {
    console.log(e)
    mouseLeftDown = true
    prevX = e.offsetX
    prevY = e.offsetY
    // ctx.beginPath()
    ctx.moveTo(prevX - 1, prevY - 1)
    ctx.lineTo(e.offsetX + 1, e.offsetY + 1)
    ctx.lineWidth = 5
    ctx.strokeStyle = 'black'
    ctx.stroke()
  })

  canvas.addEventListener('mouseup', function (e) {
    console.log(e)
    mouseLeftDown = false

    // ctx.closePath()
  })

  canvas.addEventListener('mouseout', function (e) {
    console.log(e)
    mouseLeftDown = false
  })
})