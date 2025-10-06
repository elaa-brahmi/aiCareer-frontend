import ChatFearures from "@/components/chat/helpers/chatFeatures"
import PopularTopics from "@/components/chat/helpers/popularTopics"

const Chat = ()=>{
    return(
        <div className="md:bg-gray-100 w-full p-5 pt-12">
        <PopularTopics />
        <ChatFearures /></div>
    )
}
export default Chat