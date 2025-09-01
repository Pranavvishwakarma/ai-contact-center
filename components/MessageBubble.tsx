interface MessageProps {
  sender: "user" | "ai";
  text: string;
}

export default function MessageBubble({ sender, text }: MessageProps) {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} my-2`}>
      <div className={`px-4 py-2 rounded-2xl max-w-sm 
        ${sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
        {text}
      </div>
    </div>
  );
}
