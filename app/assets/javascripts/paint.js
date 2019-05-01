$(document).on('turbolinks:load', () => {

  const canvas = $('#canvas-draw')[0]

  if (!canvas)
    return

  canvas.width = $('#canvas-wrapper').width()

  $(window).resize(function () {
    canvas.width = $('#canvas-wrapper').width()
  })

  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext('2d')

  const $chatList = $('#div-chat-list')

  App.room = App.cable.subscriptions.create({
    channel: "PaintChannel",
    room: "room1"
  }, {
      chat: (message) =>
        App.room.perform('chat', { message }),

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
          case 'chat': {
            const msg = data.message
            $chatList.append(`
              <div>
                asd: ${msg}  
              </div>`
            )
            $chatList.scrollTop($chatList[0].scrollHeight)
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
      // console.log(e.offsetX, e.offsetY)
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

  $('#input-chat').on('keydown', function (e) {
    if (e.keyCode === 13) {
      const message = $(this).val().trim()
      if (message.length) {
        App.room.chat(message)
        $(this).val('')
      }
    }
  })
})