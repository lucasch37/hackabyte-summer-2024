import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { generateText, StreamingTextResponse, streamText } from "ai";

export const POST = async (req: Request) => {
    const { prompt } = await req.json();

    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
    });
    const textStream = await streamText({
        model: google("models/gemini-pro"),
        prompt: `You are an AI assistant informing elderly people and seniors about nutrition ${prompt}`,
    });
    return new StreamingTextResponse(textStream.toAIStream());
};