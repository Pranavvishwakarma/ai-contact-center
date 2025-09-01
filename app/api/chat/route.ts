import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { askAI } from "@/lib/openai";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { message, userId = "demo-user" } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1️⃣ Find existing conversation or create new
    let conversation = await prisma.conversation.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { userId },
      });
    }

    // 2️⃣ Save user message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        sender: "user",
        text: message,
      },
    });

    // 3️⃣ Generate AI reply
    const reply = await askAI(message);

    // 4️⃣ Save AI message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        sender: "ai",
        text: reply,
      },
    });

    return NextResponse.json({ reply, conversationId: conversation.id });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
