"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const allSockets = new Map();
// {
//     "room1":[socket1, socket2, socket3], 
//     "room2":[socket4, socket5], 
// }
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        const parsedMsg = JSON.parse(message);
        if (parsedMsg.type === "join") {
            if (!allSockets.has(parsedMsg.payload.roomID)) {
                allSockets.set(parsedMsg.payload.roomID, [socket]);
            }
            else {
                (_a = allSockets.get(parsedMsg.payload.roomID)) === null || _a === void 0 ? void 0 : _a.push(socket);
            }
        }
        if (parsedMsg.type === "chat") {
            let currentUserRoom = null;
            for (const [key, arr] of allSockets.entries()) {
                if (arr.includes(socket)) {
                    currentUserRoom = key;
                }
            }
            if (currentUserRoom) {
                const userRoomArr = allSockets.get(currentUserRoom);
                userRoomArr === null || userRoomArr === void 0 ? void 0 : userRoomArr.forEach((userSocket) => {
                    userSocket.send(parsedMsg.payload.message);
                });
            }
        }
    });
});
//join room schema 
// {
// 	"type": "join",
// 	"payload": {
// 		"roomID": "123"
// 	}
// }
//send msg schema 
// {
// 	"type": "chat",
// 	"payload": {
// 		"message: "hi there"
// 	}
// }
