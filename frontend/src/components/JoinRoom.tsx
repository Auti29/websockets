import { ChatIcon } from "../icons/ChatIcon";

export function JoinRoom({onclick, roomId}: {onclick: () => void , roomId: string}){
    return (
        <div className="w-[40vw] border border-gray-700 p-5 rounded-xl font-mono">
            <div className="flex flex-col ">
            <div className="flex">
            <ChatIcon size="lg"/>
            <h2 className="ml-2 text-2xl font-extrabold">Real Time Chat</h2>
            </div>
            <p className="text-gray-500 font-bold">temporary room that expires after all users exit</p>
            <button 
            onClick={() => onclick()}
            className="text-lg w-full border border-white mt-4 mb-4 p-2 rounded-md bg-white text-stone-950 font-bold cursor-pointer hover:bg-stone-200">Create new Room</button>
            <input className="p-2 border border-slate-700 rounded-md" type="text" placeholder="Enter your name"/>
            <div className="mt-3 flex justify-between">
                <input className="p-2 border border-slate-700 rounded-md flex-2/4 mr-2" type="text" placeholder="Enter room code"/>
                <button className="text-lg flex-1/4 border border-white  p-2 rounded-md bg-white text-stone-950 font-bold cursor-pointer hover:bg-stone-200">Join Room</button>
            </div>

                {roomId.length > 0 ? 
                (
                    <div className="rounded-lg mt-3 text-center p-7 bg-stone-800">
                        <span className="text-stone-400">share this code with your friends</span>
                        <div className="mt-2 flex justify-center">
                        <span className="text-2xl font-bold">{roomId}</span>
                        <button 
                        onClick={() => {
                            navigator.clipboard.writeText(roomId);
                        }}
                        className="ml-3 text-stone-400 cursor-pointer hover:text-white">
                       
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                        </button>
                        </div>
                    </div>
                )
                : null    
            }
            </div>
        </div>
    )
}