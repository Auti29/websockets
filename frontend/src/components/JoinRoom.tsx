import { useState } from "react";
import { ChatIcon } from "../icons/ChatIcon";

export function JoinRoom({onclick, roomId}: {onclick: () => void , roomId: string}){
    const [isCopied,  setIsCopied] = useState<boolean>(false);
    return (
        <div className="w-[40vw] border border-gray-700 p-5 rounded-xl font-mono">
            <div className="flex flex-col ">
            <div className="flex">
            <ChatIcon size="lg"/>
            <h2 className="ml-2 text-2xl font-extrabold">Real Time Chat</h2>
            </div>
            <p className="text-gray-500 font-bold">temporary room that expires after all users exit</p>
            <button 
            onClick={() => {
                setIsCopied(false);
                onclick()}}
            className="text-lg w-full border border-white mt-4 mb-4 p-2 rounded-md bg-white text-stone-950 font-bold cursor-pointer hover:bg-stone-200">Create new Room</button>
            <input className="p-2 border border-slate-700 rounded-md" type="text" placeholder="Enter your name"/>
            <div className="mt-3 flex justify-between">
                <input className="p-2 border border-slate-700 rounded-md flex-2/4 mr-2" type="text" placeholder="Enter room code"/>
                <button className="text-lg flex-1/4 border border-white  p-2 rounded-md bg-white text-stone-950 font-bold cursor-pointer hover:bg-stone-200">Join Room</button>
            </div>

                {roomId.length > 0 ? 
                (
                    <div className="rounded-lg mt-3 text-center p-8 bg-stone-800">
                        <span className="text-stone-500">share this code with your friends</span>
                        <div className="mt-2 flex justify-center">
                        <span className="text-2xl font-bold mr-3 underline">{roomId}</span>
                        <button 
                        disabled = {isCopied}
                        onClick={() => {
                            navigator.clipboard.writeText(roomId);
                            setIsCopied(true);
                        }}
                        className={`${isCopied ? "text-green-500" : "text-stone-500 hover:text-white cursor-pointer"} `}>
                       
                        {isCopied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                            </svg>

                        ):(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>)}
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