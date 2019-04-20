$(document).on('turbolinks:load', () => {
  const dial = $('#dialog-opinion')[0]
  dialogPolyfill.registerDialog(dial)

  $('#menu-opinion').on('click', function () {
    dial.showModal()
  })

  $('#dialog-opinion .close')[0].addEventListener('click', function () {
    dial.close();
  });
})