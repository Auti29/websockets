function App() {
  return (
    <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
      <div className="border border-slate-400 rounded-lg w-[37vw] h-[85vh] flex flex-col justify-between">
            <div className="mt-4 ml-5 mr-5 rounded-md h-[85%] border border-slate-400">

            </div>
            <div className="flex justify-between ml-5 mr-5 mb-4">
              <input 
              className="rounded-md border border-slate-400 flex-3/4 p-2.5" 
              type="text" placeholder="send a message to room..." />
              <button className="bg-white text-black flex-1/4 text-center rounded-md ml-2">send</button>  
            </div> 
      </div>
    </div>
  )
}

export default App
