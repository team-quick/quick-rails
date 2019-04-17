function toFitFileSize(byteSize) {
    if (byteSize >= 1000000) {
        return `${(byteSize / 1000000).toFixed(2)} MB`
    }
    else if (byteSize >= 1000) {
        return `${(byteSize / 1000).toFixed(2)} KB`
    }

    return `${byteSize} Byte`
}

$(document).on('turbolinks:load', () => {

    $('#button-select-image').on('click', function () {
        console.log($(this).text())
    })

    $('#input-image').on('change', function () {
        const file = $(this).prop('files')[0]
        const fileReader = new FileReader()

        fileReader.readAsArrayBuffer(file)
        fileReader.onload = function () {
            console.log(fileReader.result)
            const blob = new Blob([fileReader.result], { type: "octet/stream" })
            console.log(window.URL.createObjectURL(blob))
            const url = window.URL.createObjectURL(blob)
            $('#preview').prop('src', url)
            $('#preview').prop('alt', file.name)
            $('#preview')[0].onload = function () {
                const c = document.createElement('canvas')
                const ctx = c.getContext('2d')
                c.width = $('#preview')[0].naturalWidth
                c.height = $('#preview')[0].naturalHeight
                ctx.drawImage($('#preview').get(0), 0, 0)
                const encoded = GIFStream.encodeToArray(ctx.getImageData(0, 0, c.width, c.height).data, c.width, c.height, { method: "uniform" })
                console.log(encoded)
                const encodedblob = new Blob([encoded.data])
                const elaspsedTime = encoded.elapsedTime
                const colorTable = encoded.colorTable
                const encodedurl = window.URL.createObjectURL(encodedblob)

                const sourceFileSize = file.size
                const encodedFileSize = encoded.data.length
                const percentage = (encodedFileSize / sourceFileSize * 100).toFixed(1)

                $('#table-td-sourcesize').html(toFitFileSize(sourceFileSize))
                $('#table-td-encodedsize').html(toFitFileSize(encodedFileSize))
                $('#table-td-percentage').html(`${percentage} %`)
                $('#table-td-time').html(`${elaspsedTime / 1000} s`)
                $('#a-download').prop('href', encodedurl)
                $('#a-download').prop('download', 'image.gif')
                $('#table-tbody-colortable').html('')
                colorTable.forEach(color => {
                    const hex = `#${(0xF000000 + (color.red << 16) + (color.green << 8) + (color.blue)).toString(16).slice(1, 8)}`
                    $('#table-tbody-colortable').append(
                        `
                        <tr>
                            <td>${color.index + 1}</td>
                            <td style="background-color:${hex}"></td>
                            <td>${color.red}, ${color.green}, ${color.blue}</td>
                            <td>${hex}</td>
                            <td>${color.count || 0}</td>
                        </tr>
                        `
                    )
                })
            }
        }
        console.log(file)
    })

})