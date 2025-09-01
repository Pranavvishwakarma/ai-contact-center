import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function askAI(message: string) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // or gpt-4-turbo
    messages: [{ role: "system", content: "You are a customer support agent for a travel company. Always respond politely and helpfully." },
               { role: "user", content: message }],
  });

  return response.choices[0].message?.content || "Sorry, I couldn't process that.";
}
