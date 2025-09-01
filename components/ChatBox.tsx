"use client";

import { useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import { useRouter } from "next/navigation";

type Message = {
  sender: "user" | "ai";
  text: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const router = useRouter();

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev: Message[]) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { message: input });
      const aiMsg: Message = { sender: "ai", text: res.data.reply };
      setMessages((prev: Message[]) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: Message = { sender: "ai", text: "Error connecting to AI" };
      setMessages((prev: Message[]) => [...prev, errorMsg]);
    }
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-gradient-to-b from-gray-100 to-gray-200">
      
      {/* Admin Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-gray-800 text-white px-5 py-2 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          onClick={() => router.push("/admin")}
        >
          Admin Dashboard
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-3xl shadow-2xl">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            sender={msg.sender}
            text={msg.text}
            className="hover:scale-105 transition-transform duration-150"
          />
        ))}
      </div>

      {/* Input area */}
      <div className="flex mt-4">
        <input
          className="flex-1 border rounded-2xl px-4 py-3 shadow-inner focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}
