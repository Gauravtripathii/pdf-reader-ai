import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.API_KEY });

async function getGroqChatCompletion(currentContext: string, currentQuery: string) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Context: ${currentContext}.\nNow based on this context, answer the following question to the best of your ability: ${currentQuery}`,
            },
        ],
        model: "llama3-8b-8192",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: true,
        stop: null,
    });

    const answer = [];
    for await (const chunk of chatCompletion) {
        answer.push(chunk.choices[0]?.delta?.content || "");
    }
    return answer.join("");
}

export async function POST(request: NextRequest) {
    try {
        const { currentContext, currentQuery } = await request.json();
        const answer = await getGroqChatCompletion(currentContext, currentQuery);

        return NextResponse.json({ answer, success: true });
    } catch (error) {
        return NextResponse.json({ error, success: false }, { status: 500 });
    }
}
