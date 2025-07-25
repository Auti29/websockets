import { useState, useRef } from "react"
import { ChatComponent } from "./components/ChatComponent";
import { JoinRoom } from "./components/JoinRoom";
function App() {
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const roomCodeRef = useRef<HTMLInputElement>(null);
  const [roomId, setRoomId] = useState<string>("");

  function generateRandomRoomId(length: number) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
      let res = '';
      for(let i = 0;i<length;i++){
          const randomIdx = Math.floor(Math.random() * chars.length);
          res+= chars.charAt(randomIdx);
      }
      setRoomId(res);
  }
  

 

  return (
    <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
      {
        joinedRoom ? 
        <ChatComponent 
        roomId = {roomId}
        />
        :
        <JoinRoom 
        onclick={() => generateRandomRoomId(7)} 
        roomId = {roomId} 
        usernameRef = {usernameRef}
        roomcodeRef = {roomCodeRef}
        />
      }
    </div>
  )
}

export default App
