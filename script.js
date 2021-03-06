const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

let face2 = 0

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

        function faceDetected() {
            face2 = (detections.length)
            // console.log(detections.length)
            localStorage.setItem('face', face2)
        }

        faceDetected()

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
    console.log(face2)
})
const wsConnection = new WebSocket("ws://localhost:8999");

console.log(wsConnection.readyState)
wsConnection.onopen = function () {
    console.log("Соединение установлено.");
    wsConnection.send(localStorage.getItem('face'))
};

wsConnection.onmessage = function (event) {
    if (typeof event.data !== 'object') {
        console.log(event.data, ' from ws')
    }

}

wsConnection.onclose = function (event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

wsConnection.onerror = function (error) {
    alert("Ошибка " + error.message);
};

setInterval(() => {
    const data = localStorage.getItem('face')
    wsConnection.send(data)
    // console.log(wsConnection.readyState)
}, 500)



