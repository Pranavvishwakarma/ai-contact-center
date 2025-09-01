type MessageProps = {
  sender: "user" | "ai";
  text: string;
  className?: string; // optional for hover/3D effects
};

export default function MessageBubble({ sender, text, className }: MessageProps) {
  return (
    <div
      className={`p-2 rounded-xl ${sender === "user" ? "bg-blue-100" : "bg-gray-100"} ${className || ""}`}
    >
      <b>{sender.toUpperCase()}:</b> {text}
    </div>
  );
}