"use client";
import { useState, useEffect, useRef } from "react";
import { User, Send } from "lucide-react";
import { generatechatBotResponse, getUserChatHistory } from "@/services/chatService";
type Props = {
  initialInput?: string
}

type ChatMessage = {
  type: "user" | "bot";
  text: string;
  time?: string;
}

const ChatUI = ({ initialInput = "" }: Props) =>{

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null)

useEffect(() => {
  if (initialInput && initialInput !== input) {
    setInput(initialInput);
    inputRef.current?.focus();
    const el = inputRef.current;
    if (el) {
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }

  const retrieveChatHistory = async () => {
    try {
      const history = await getUserChatHistory();
      const formattedMessages: ChatMessage[] = history
        .reverse() // optional: oldest → newest
        .map((msg: { role: string; content: string; createdAt: string }): ChatMessage => ({
          type: msg.role === 'user' ? 'user' : 'bot',
          text: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Failed to retrieve chat history:', error);
    }
  };

  retrieveChatHistory();
}, [initialInput]);

  const getNow = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  useEffect(() => {
    setMessages((prev) => prev.map((m) => (m.time ? m : { ...m, time: getNow() })));
  }, []);


  const handleSend = async() => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = { type: "user", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    const response = await generatechatBotResponse(input);
    console.log("AI Response:", response);
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col bg-white  rounded-xl shadow-md p-4 space-y-4">
      <div className="flex items-center space-x-3  pb-3">
        <div className="bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center">
          <User className="text-white w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">AI Career Assistant</p>
          <p className="text-xs text-green-600">● Online</p>
        </div>
      </div>

      <div className="flex flex-col space-y-3 max-h-[400px] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.type === "user"
                  ? "bg-[var(--dark-amber)] text-white rounded-l-xl rounded-tr-xl"
                  : "bg-gray-100 text-gray-800 rounded-r-xl rounded-tl-xl"
              } p-3 whitespace-pre-line max-w-xs text-sm leading-relaxed`}
            >
              {msg.text}
              <span className="block text-[11px] text-gray-400 mt-1 text-right">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className=" pt-3 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your career question..."
          value={input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-gray-100 text-gray-800 placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleSend}
          className="bg-[var(--dark-amber)] hover:bg-orange-400 text-white p-2 rounded-lg transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
export default ChatUI