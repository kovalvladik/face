const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const PORT = 8999;

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({server});

webSocketServer.on('connection', ws => {

    ws.on('message', m => {
        let buf = Buffer.from(m, 'utf8').toString()
        webSocketServer.clients.forEach(client => client.send(buf))

    });

    ws.on("error", e => ws.send(e));

});

server.listen(PORT, () => console.log(`Server started on ${PORT} port`))
