
"use client"
import { useState } from "react"
import ChatFearures from "@/components/chat/helpers/chatFeatures"
import ChatUI from "@/components/chat/helpers/chatUI"
import PopularTopics from "@/components/chat/helpers/popularTopics"
import QuickQuestions from "@/components/chat/helpers/quickQuestions"

const Chat = ()=>{
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)

    return(
        <div className="md:bg-gray-100 w-full p-5 pt-12 flex md:flex-row flex-col  md:ps-12 ">
            
            <div className="md:flex-2">
                <div className="mb-4 md:ps-8">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        Career Chat Assistant
                    </h2>
                    <p className="text-md text-gray-500">
                        Get instant answers to your career questions
                    </p>
                </div>
                <ChatUI initialInput={selectedQuestion ?? ""} onSent={() => setSelectedQuestion(null)} />
            </div>
            <div className="md:flex-1 flex flex-col items-center gap-6 mt-18">
                <QuickQuestions onSelect={(q:string) => setSelectedQuestion(q)} />
                <PopularTopics />
                <ChatFearures />
            </div>
        </div>
    )
}
export default Chat