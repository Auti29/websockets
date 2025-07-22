import { useEffect, useRef, useState } from "react"
import { ChatComponent } from "./components/ChatComponent";
import { JoinRoom } from "./components/JoinRoom";
const WS_URL = "ws://localhost:8080";
function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data]);
    }
    wsRef.current = ws;
    ws.onopen = () => {
      //hardcoded logic to join rooms
      ws.send(JSON.stringify(
        {
          "type": "join", 
          "payload": {
            "roomId": "123"
          }
        }
      ));
    }

    //cleanup
    return () => {
      ws.close();
    }

  }, []);

  const handleSendMsg = (message: string) => {
    wsRef.current?.send(JSON.stringify({
      "type": "chat", 
      "payload": {
        message: message
      }
    }))
  }


  return (
    <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
      {
        joinedRoom ? 
        <ChatComponent 
        messages={messages} 
        handleSendMsg={handleSendMsg}
        inputRef={inputRef}
        />
        :
        <JoinRoom />
      }
    </div>
  )
}

export default App
