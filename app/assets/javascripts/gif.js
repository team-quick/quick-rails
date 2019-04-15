$(document).on('turbolinks:load', () => {

$('#button-select-image').on('click', function () {
    console.log($(this).text())
})

$('#input-image').on('change', function() {
    const file = $(this).prop('files')[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = function () {
        console.log(fileReader.result)
        $('#preview').prop('src', fileReader.result)
        $('#preview').prop('alt', file.name)
    }
    console.log(file)
})

})