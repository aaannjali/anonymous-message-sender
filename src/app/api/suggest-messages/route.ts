import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const runtime = "edge";

export async function POST(req: Request) {
  console.log(req);
  
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. 
    Each question should be separated by '||'. These questions are for an anonymous social messaging platform, 
    like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, 
    focusing instead on universal themes that encourage friendly interaction. 
    Example format: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. 
    Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const response = await model.generateContent(prompt);
    const textResponse = response.response.text(); 

    return NextResponse.json({ questions: textResponse }, { status: 200 });
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
