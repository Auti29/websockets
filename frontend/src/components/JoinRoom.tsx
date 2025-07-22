import { ChatIcon } from "../icons/ChatIcon";

export function JoinRoom({onclick, roomId}: {onclick: () => void , roomId: string}){

    return (
        <div className="w-[37vw] border border-gray-500 p-5 rounded-xl font-mono">
            <div className="flex flex-col ">
            <div className="flex">
            <ChatIcon size="lg"/>
            <h2 className="ml-2 text-2xl font-extrabold">Real Time Chat</h2>
            </div>
            <p className="text-gray-500 font-bold">temporary room that expires after all users exit</p>
            <button 
            onClick={() => onclick()}
            className="text-lg w-full border border-white mt-4 mb-4 p-2 rounded-md bg-white text-stone-950 font-bold cursor-pointer hover:bg-stone-200">Create new Room</button>
            <input className="p-2 border border-slate-500 rounded-md" type="text" placeholder="Enter your name"/>
            <div className="mt-3 flex justify-between">
                <input className="p-2 border border-slate-500 rounded-md flex-2/4 mr-2" type="text" placeholder="Enter room code"/>
                <button className="text-lg flex-1/4 border border-white  p-2 rounded-md bg-white text-stone-950 font-bold cursor-pointer hover:bg-stone-200">Join Room</button>
            </div>
            </div>
        </div>
    )
}