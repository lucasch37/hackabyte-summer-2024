import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { generateText, StreamingTextResponse, streamText } from "ai";

export const createCompletion = async (prompt: string) => {
    const google = createGoogleGenerativeAI({
        apiKey: "AIzaSyB44ZmbSmoAUfDKxPLzglRm2lrtY3ExJjo",
    });
    const { text } = await generateText({
        model: google("models/gemini-pro"),
        prompt: `You are an AI assistant informing elderly people and seniors about nutritio. The question asked is ${prompt} answer concisely (1 or 2 sentences) without any markup. Don't include any text other than normal text.`,
    });
    return text;
};