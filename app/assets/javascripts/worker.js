

onmessage = function (e) {
  importScripts('libgif.js')
  console.log('Worker')
  console.log(e)
  const algorithm = e.data[0]
  const width = e.data[1]
  const height = e.data[2]
  const imageData = e.data[3]
  postMessage(GIFStream.encodeToArray(
    imageData,
    width,
    height,
    { method: algorithm }
  ))
}