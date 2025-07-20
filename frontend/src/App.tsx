import { useEffect, useRef, useState } from "react"
const WS_URL = import.meta.env.VITE_WS_URL;
function App() {
  const [messages, setMessages] = useState<string[]>(["hi there","hello", "message"]);
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
      <div className="border border-slate-400 rounded-lg w-[37vw] h-[85vh] flex flex-col justify-between">
            <div className="mt-4 ml-5 mr-5 rounded-md h-[85%] border border-slate-400 overflow-hidden flex flex-col">
                  {messages.map((m) => {
                    return (<div className="m-1">
                      <p className="bg-white text-black p-1.5  inline-block max-w-[80%] rounded-md">{m}</p>
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
                     handleSendMsg(inputRef.current.value);
                  }
                }
              }} className="bg-white text-black flex-1/4 text-center rounded-md ml-2">send</button>  
            </div> 
      </div>
    </div>
  )
}

export default App
