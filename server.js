const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', ws => {
    ws.on('message', m => {
        webSocketServer.clients.forEach(client => client.send(m));
    });

    ws.on("error", e => ws.send(e));

    ws.send('Hi there, I am a WebSocket server');
    const dispatchEvent = (message, ws) => {
        const json = JSON.parse(message);
        switch (json.event) {
            case "chat-message": webSocketServer.clients.forEach(client => client.send(message));
            default: ws.send((new Error("Wrong query")).message);
        }
    }
});



server.listen(8999, () => console.log(`Server started on ${8999} port`))
