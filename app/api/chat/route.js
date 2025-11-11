// gocart-main/app/api/chat/route.js
import { GoogleGenAI } from '@google/genai';
import { productDummyData } from '@/assets/assets'; 

// Initialize Gemini AI client (securely uses the environment variable)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        // 1. CONTEXT ENGINEERING: Provide the AI with the list of available products
        const productContext = JSON.stringify(productDummyData.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: p.price,
            // Truncate description for prompt efficiency
            description: p.description.substring(0, 100) + '...' 
        })));

        // 2. SYSTEM INSTRUCTION: Define the AI's persona and rules
        const systemInstruction = `You are a helpful and friendly e-commerce product recommender AI for GoCart.
        Your recommendations MUST be based only on the following list of available products.
        When recommending, list the Product Name, Category, Price, and mention the Product ID.
        Available Products (JSON): ${productContext}`;

        // 3. GENERATION CALL
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.2,
            },
        });

        // 4. Return the AI's response
        return Response.json({ response: response.text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return Response.json({ error: "Failed to generate AI response." }, { status: 500 });
    }
}