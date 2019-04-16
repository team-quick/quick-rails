$(document).on('turbolinks:load', () => {
    
$('#button-select-image').on('click', function () {
    console.log($(this).text())
})

$('#input-image').on('change', function() {
    const file = $(this).prop('files')[0]
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(file)
    fileReader.onload = function () {
        console.log(fileReader.result)
        const blob = new Blob([fileReader.result], {type: "octet/stream"})
        console.log(window.URL.createObjectURL(blob))
        const url = window.URL.createObjectURL(blob)
        $('#preview').prop('src', url)
        $('#preview').prop('alt', file.name)
        $('#preview')[0].onload = function() {
            const c = document.createElement('canvas')
            const ctx = c.getContext('2d')
            c.width = $('#preview')[0].naturalWidth
            c.height = $('#preview')[0].naturalHeight
            ctx.drawImage($('#preview').get(0), 0, 0)
            const encoded = GIFStream.encodeToArray(ctx.getImageData(0,0,c.width,c.height).data, c.width, c.height, { method: "uniform" })
            const encodedblob = new Blob([encoded])
            const encodedurl = window.URL.createObjectURL(encodedblob)
            $('#a-download').prop('href', encodedurl)
            $('#a-download').prop('download', 'image.gif')
            console.log(encodedurl)
        }
    }
    console.log(file)
})

})