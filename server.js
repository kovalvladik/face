const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const PORT = 8999;

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({server});

webSocketServer.on('connection', ws => {
    ws.on('message', m => {
        webSocketServer.clients.forEach(client => client.send(m));
        console.log(m, 'here message')
        console.log(Buffer.from(m, 'utf8'), 'here message')
    });

    ws.on("error", e => ws.send(e));

    ws.send('Hi there, I am a WebSocket server');
    // const dispatchEvent = (message, ws) => {
    //     const json = JSON.parse(message);
    //     switch (json.event) {
    //         case "chat-message": webSocketServer.clients.forEach(client => client.send(message));
    //         default: ws.send((new Error("Wrong query")).message);
    //     }
    // }

});


server.listen(PORT, () => console.log(`Server started on ${PORT} port`))
