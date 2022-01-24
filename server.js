const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const PORT = 8999;

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({server});

webSocketServer.on('connection', ws => {
    let buf = 0

    ws.on('message', m => {
        webSocketServer.clients.forEach(client => client.send(m));
        buf = Buffer.from(m, 'utf8').toString()

        console.log(buf, 'face here')
    });

    ws.on("error", e => ws.send(e));

    setInterval(() => {
        ws.send(buf)
    }, 1000)

});

server.listen(PORT, () => console.log(`Server started on ${PORT} port`))
