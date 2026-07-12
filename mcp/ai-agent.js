import OpenAI from "openai";
import dotenv from "dotenv";
import { runPlaywrightTests } from "./mcp-server.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function start() {
  console.log("🚀 Running Playwright tests...");

  const result = await runPlaywrightTests();

  console.log("\n📄 Test Result:\n", result);

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Analyze this Playwright test failure and suggest fix:\n${result}`,
      },
    ],
  });

  console.log("\n🤖 AI Suggestion:\n");
  console.log(response.choices[0].message.content);
}

start();
console.log("API KEY:", process.env.OPENAI_API_KEY);