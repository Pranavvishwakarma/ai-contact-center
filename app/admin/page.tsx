import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminPage() {
  const conversations = await prisma.conversation.findMany({
    include: { messages: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="p-8">
      <div className="flex justify-end mb-6">
        <a
          href="/chat"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Go to Chat
        </a>
      </div>

      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {conversations.map((conv) => (
        <div key={conv.id} className="border p-4 rounded-xl mb-6 bg-white shadow">
          <p className="font-semibold">Conversation #{conv.id} — User: {conv.userId}</p>
          <div className="mt-2 space-y-2">
            {conv.messages.map((msg) => (
              <div key={msg.id} className={`p-2 rounded-xl ${msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
                <b>{msg.sender.toUpperCase()}:</b> {msg.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
