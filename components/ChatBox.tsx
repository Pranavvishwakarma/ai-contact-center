"use client";

import { useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import { useRouter } from "next/navigation"; // Next.js 13+ client navigation

export default function ChatBox() {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const router = useRouter(); // router for navigation

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { message: input });
      const aiMsg = { sender: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Error connecting to AI" }]);
    }
  }

  return (
    <div className="flex flex-col h-screen p-4">
      {/* Admin Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700"
          onClick={() => router.push("/admin")}
        >
          Admin Dashboard
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow p-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <div className="flex mt-4">
        <input
          className="flex-1 border rounded-xl px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}
