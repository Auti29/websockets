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
        const parsedMsg = JSON.parse(message as unknown as string);
        if(parsedMsg.type === "join"){
            //user can join only one room might change later

            let currentUserRoom = null;
            for(const [key, arr] of allSockets.entries()){
                if(arr.includes(socket)){
                    currentUserRoom = key;
                }
            }
            if(currentUserRoom){
                let crrRoomArr = allSockets.get(currentUserRoom);
                let newArr = crrRoomArr?.filter(x => x !== socket);
                crrRoomArr = newArr;
                if(crrRoomArr){
                    if(crrRoomArr.length > 0){
                        allSockets.set(currentUserRoom, crrRoomArr);
                    }
                }
            }

            if(!allSockets.has(parsedMsg.payload.roomId))
                {
                    allSockets.set(parsedMsg.payload.roomId, [socket]);
                }
            else{
                allSockets.get(parsedMsg.payload.roomId)?.push(socket);
            }
        }

        if(parsedMsg.type === "chat"){
            let currentUserRoom = null;
            for(const [key, arr] of allSockets.entries()){
                if(arr.includes(socket)){
                    currentUserRoom = key;
                }
            }

            if(currentUserRoom){
                const userRoomArr = allSockets.get(currentUserRoom);
                userRoomArr?.forEach((userSocket) => {
                    userSocket.send(parsedMsg.payload.message);
                })
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