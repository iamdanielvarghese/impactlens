import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { stats } = await req.json();
        
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        
        const schema: Schema = {
          type: SchemaType.OBJECT,
          properties: {
            Transport: { type: SchemaType.STRING, description: "A tangible 1-sentence real-life impact based on their Transport stats." },
            Waste: { type: SchemaType.STRING, description: "A tangible 1-sentence real-life impact based on their Waste stats." },
            Energy: { type: SchemaType.STRING, description: "A tangible 1-sentence real-life impact based on their Energy stats." },
            Water: { type: SchemaType.STRING, description: "A tangible 1-sentence real-life impact based on their Water stats." },
            Food: { type: SchemaType.STRING, description: "A tangible 1-sentence real-life impact based on their Food stats." },
          },
          required: ["Transport", "Waste", "Energy", "Water", "Food"],
        };

        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.5-flash",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
          }
        });

        const prompt = `
          The user has performed sustainable actions over their lifetime. Here are their total stats per category (count of actions, and total impact points earned):
          ${JSON.stringify(stats, null, 2)}
          
          For EACH category, generate a unique, creative, and highly encouraging 1-sentence real-world equivalence describing the impact of their TOTAL actions. 
          For example, if they have 500 points in Water, say "You have saved enough water to fill an entire public swimming pool!". 
          If a category has 0 points, return a message encouraging them to start logging in that category (e.g. "Start logging transport activities to see your real-world impact grow!").
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const aiData = JSON.parse(responseText);

        return NextResponse.json(aiData);

    } catch (error: any) {
        console.error("Error generating impact summary:", error);
        return NextResponse.json({ error: error.message || "Failed to generate summary" }, { status: 500 });
    }
}
