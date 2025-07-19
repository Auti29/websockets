import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

type socketArrType = WebSocket[];

const allSockets = new Map<string, socketArrType>();
// {
//     "room1":[socket1, socket2, socket3], 
//     "room2":[socket4, socket5], 
// }

wss.on("connection", (socket) => {

   socket.on("message", (message) => {

});

   socket.on("disconnect", () => {

   })
});