import { Bot, Clock, Lightbulb } from "lucide-react"

const ChatFearures =  () => {
    return (
        <div className="flex flex-col gap-4 bg-white p-3 rounded-xl shadow-md w-[300px] justify-center">
            <h3>Chat Features</h3>
            <div className="bg-gray-200 p-1 flex items-center justify-center rounded-lg text-xs">
               <Clock className="text-black font-bold inline mr-1" size={17}/> 24/7 Available
            </div>
            <div className="bg-gray-200 p-1 flex items-center justify-center rounded-lg  text-xs">
               <Lightbulb className="text-black font-bold inline mr-1" size={17}/> Instant Responses
            </div>
            <div className="bg-gray-200 p-1 flex items-center justify-center rounded-lg  text-xs">
               <Bot className="text-black font-bold inline mr-1" size={17}/> AI-Powered
            </div>
        </div>
        )
}
export default ChatFearures