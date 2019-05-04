$(document).on('turbolinks:load', () => {

  const canvas = $('#canvas-draw')[0]

  if (!canvas)
    return

  canvas.width = $('#canvas-wrapper').width()

  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext('2d')

  const $chatList = $('#div-chat-list')

  let pathes = []

  App.room = App.cable.subscriptions.create({
    channel: "PaintChannel",
    room: "room1"
  }, {
      connected: () => {
        App.room.load()
      },

      chat: (message) =>
        App.room.perform('chat', { message }),

      draw: (path) =>
        App.room.perform('draw', { path }),

      track: (point) =>
        App.room.perform('track', { point }),

      load: () => App.room.perform('load'),

      received: (data) => {
        console.log(data)
        switch (data.action) {
          case 'join': {

          }; break
          case 'leave': {

          }; break
          case 'draw': {
            const path = data.path
            pathes.push(path)
            ctx.beginPath()
            ctx.moveTo(path.x0, path.y0)
            ctx.lineTo(path.x1, path.y1)
            ctx.closePath()
            ctx.stroke()
          }; break
          case 'chat': {
            const msg = data.message
            $chatList.append(`
              <div>
                <img class="circle responsive-img" width="18" height="18" src="https://materializecss.com/images/yuna.jpg"/>
                <span>user1: ${msg}</span> 
              </div>`
            )
            $chatList.scrollTop($chatList[0].scrollHeight)
          }; break
          case 'track': {
            const point = data.point
          }; break;
          case 'load': {
            pathes = data.pathes
              .map(path => JSON.parse(path))
            console.log(pathes)

            pathes.forEach(path => {
              ctx.beginPath()
              ctx.lineWidth = 3
              ctx.moveTo(path.x0, path.y0)
              ctx.lineTo(path.x1, path.y1)
              ctx.closePath()
              ctx.stroke()
            })

            data.chat.forEach(chat => {
              $chatList.append(`
                <div>
                  <img class="circle responsive-img" width="18" height="18" src="https://materializecss.com/images/yuna.jpg"/>
                  <span>user1: ${chat}</span> 
                </div>`
              )
            })

          }
        }
      }
    })

  let mouseLeftDown = false
  let prevX = -1
  let prevY = -1

  window.addEventListener('resize', function () {
    canvas.width = $('#canvas-wrapper').width()
    pathes.forEach(path => {
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.moveTo(path.x0, path.y0)
      ctx.lineTo(path.x1, path.y1)
      ctx.closePath()
      ctx.stroke()
    })
  })

  canvas.addEventListener('mousemove', function (e) {
    App.room.track({
      x: e.offsetX,
      y: e.offsetY
    })

    if (mouseLeftDown === true && (prevX !== e.offsetX || prevY !== e.offsetY)) {
      console.log(e.offsetX, e.offsetY)
      App.room.draw({
        x0: prevX,
        y0: prevY,
        x1: e.offsetX,
        y1: e.offsetY
      })
      ctx.beginPath()
      ctx.moveTo(prevX, prevY)
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.closePath()
      ctx.stroke()

      prevX = e.offsetX
      prevY = e.offsetY
    }
  })
  ctx.shadowBlur = 1
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = 3
  ctx.strokeStyle = 'black'
  ctx.shadowColor = "rgba(0,0,0,.3)";
  canvas.addEventListener('mousedown', function (e) {
    console.log(e)
    mouseLeftDown = true
    prevX = e.offsetX
    prevY = e.offsetY

    ctx.moveTo(prevX - 1, prevY)
    ctx.lineTo(e.offsetX + 1, e.offsetY)
    ctx.stroke()
  })

  canvas.addEventListener('mouseup', function (e) {
    console.log(e)
    mouseLeftDown = false
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