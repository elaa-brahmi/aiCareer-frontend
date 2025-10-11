"use client";
import { useState } from "react";
import { User, Send } from "lucide-react";

const ChatUI=() =>{
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello John Doe! 👋 I'm your AI Career Assistant. I'm here to help you with job search advice, interview preparation, resume tips, and any other career-related questions you might have.\n\nWhat would you like to know about today?",
      time: "21:35",
    },
    {
      type: "user",
      text: "hi",
      time: "21:35",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { type: "user", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
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