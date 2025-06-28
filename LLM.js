// This LLM model is using Google Studio api key and gives the real-time response to the user on the terminal window itself. 
import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
const ai = new GoogleGenAI({ apiKey: "AIzaSyAoevTMQGwK6Yg2gmHa7xtlk6cYPiOxJmU" });

const history = [];

async function chatting() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  console.log(response.text);
}
async function main() {
    console.log("Welcome to the chat! Type 'exit' to quit.");

    while (true) {
        const userInput = readlineSync.question("You: ");
        if (userInput.toLowerCase() === "exit") {
            break;
        }
        history.push({ role: "user", text: userInput });
        process.stdout.write("Thinking...\r");
        await chatting();
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    }
}
main();
