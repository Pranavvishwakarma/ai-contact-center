import ChatBox from "@/components/ChatBox";

export default function ChatPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl">
        <ChatBox />
      </div>
    </div>
  );
}
