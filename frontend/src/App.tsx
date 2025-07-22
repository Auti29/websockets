import { useState } from "react"
import { ChatComponent } from "./components/ChatComponent";
import { JoinRoom } from "./components/JoinRoom";
function App() {
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");

  function generateRandomRoomId(length: number): string {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
      let res = '';
      for(let i = 0;i<length;i++){
          const randomIdx = Math.floor(Math.random() * chars.length);
          res+= chars.charAt(randomIdx);
      }
      console.log(res);
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
        <JoinRoom onclick={() => generateRandomRoomId(7)} roomId = {roomId} />
      }
    </div>
  )
}

export default App
