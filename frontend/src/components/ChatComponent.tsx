import { useEffect, useRef, useState } from "react";
import { ChatIcon } from "../icons/ChatIcon";
const WS_URL = "ws://localhost:8080";

interface Msg {
  message: string, 
  username: string 
}

export function ChatComponent ({roomId, username}: {username: string, roomId: string}) {
    const [messages, setMessages] = useState<Msg[]>([]);
    const inputRef = useRef<HTMLInputElement>(null)
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onmessage = (event) => {
      setMessages(m => [...m, JSON.parse(event.data)]);
    }
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify(
        {
          "type": "join", 
          "payload": {
            "username": username,
            "roomId": roomId
          }
        }
      ));
    }

    //cleanup
    return () => {
      ws.close();
    }

  }, );

 const handleSendMsg = (message: string) => {
    wsRef.current?.send(JSON.stringify({
      "type": "chat", 
      "payload": {
        username: username, 
        message: message
      }
    }))
  }

    return (
        <div className="border border-slate-400 rounded-lg w-[37vw] h-[85vh] flex flex-col justify-between font-mono">
          <div className=" border-slate-400 flex flex-col rounded-lg"> 
          <div className="flex p-1">
            <ChatIcon size="lg"/>
            <h2 className="ml-2 text-2xl font-extrabold">Real Time Chat</h2>
          </div>
          <div>
            <p className="text-gray-500 font-bold">temporary room that expires after all users exit</p>
          </div>
          <div className="flex">
          <div
          className="ml-5 font-bold"
          >username: {username}</div>
          <div
          className="ml-5 font-bold"
          >RoomId: {roomId}</div>
          </div>
          </div>
            <div className="mt-2 ml-5 mr-5 mb-2 rounded-md h-[85%] border border-slate-400 overflow-hidden flex flex-col">
                  {messages.map((m, i) => {
                    return (m.message && <div key={i} className="m-1.5 font-mono">
                      <p className="text-xs">{m.username}</p>
                      <div className="bg-white text-black p-1.5  inline-block max-w-[80%] rounded-md">{m.message}</div>
                    </div>)
                  })}
            </div>
            <div className="flex justify-between ml-5 mr-5 mb-4">
              <input 
              ref = {inputRef}
              className="rounded-md border border-slate-400 flex-3/4 p-2.5" 
              type="text" placeholder="send a message to room..." />
              <button onClick={() => {
                if(inputRef.current){
                  if(inputRef.current.value.length > 0){
                     handleSendMsg(inputRef.current?.value);
                     inputRef.current.value = "";
                  }
                }
              }} className="bg-white text-black flex-1/4 text-center rounded-md ml-2 hover:cursor-pointer">send</button>  
            </div> 
      </div>
    )
}