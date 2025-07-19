"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let countUser = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    countUser++;
    console.log("user connected => user no. #" + countUser);
    socket.on("message", (message) => {
        console.log("msg received on the server => " + message.toString());
        for (let i = 0; i < allSockets.length; i++) {
            allSockets[i].send("msg from the server => " + message.toString());
        }
    });
});
