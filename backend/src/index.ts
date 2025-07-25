import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

type User = [ 
    socket: WebSocket, 
    username: string
]

type socketArrType = User[];

const allSockets = new Map<string, socketArrType>();
// {
//     "room1":[[socket1, username], [socket2, username]], 
//     "room2":[[socket4, username], [socket5,username]], 
// }

wss.on("connection", (socket) => {

   socket.on("message", (message) => {
        const parsedMsg = JSON.parse(message as unknown as string);
        if(parsedMsg.type === "join"){
            //user can join only one room might change later

            let currentUserRoom = null;
            for(const [key, arr] of allSockets.entries()){
                for(let i = 0;i<arr.length;i++){
                    if(arr[i].includes(socket)){
                        currentUserRoom = key;
                    }
                }
            }
            if(currentUserRoom){
                let crrRoomArr = allSockets.get(currentUserRoom);
                    let newArr = crrRoomArr?.filter(x => x[0] !== socket);
                crrRoomArr = newArr;
                if(crrRoomArr){
                    if(crrRoomArr.length > 0){
                        allSockets.set(currentUserRoom, crrRoomArr);
                    }
                }
            }

            if(!allSockets.has(parsedMsg.payload.roomId))
                {
                    allSockets.set(parsedMsg.payload.roomId, [[socket, parsedMsg.payload.username]]);
                }
            else{
                allSockets.get(parsedMsg.payload.roomId)?.push([socket, parsedMsg.payload.username]);
            }

        }

        if(parsedMsg.type === "chat"){
            let currentUserRoom = null;
            for(const [key, arr] of allSockets.entries()){
                for(let i = 0;i<arr.length;i++){
                    if(arr[i].includes(socket)){
                        currentUserRoom = key;
                    }
                }
            }

            if(currentUserRoom){
                const userRoomArr = allSockets.get(currentUserRoom);
                userRoomArr?.forEach((userSocket) => {
                    userSocket[0].send(JSON.stringify({
                        message: parsedMsg.payload.message, 
                        username: parsedMsg.payload.username}));
                })
            }
        }
});
});


//join room schema 
    // {
    // 	"type": "join",
    // 	"payload": {
    //      "username": "abc"
    // 		"roomID": "123"
    // 	}
    // }


//send msg schema 
    // {
    // 	"type": "chat",
    // 	"payload": {
    //      "username": "abc"
    // 		"message: "hi there"
    // 	}
    // }