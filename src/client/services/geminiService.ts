import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

export const polishTaskDescription = async (
  title: string,
  rawDescription: string
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
Improve the following help request to make it sound more professional and appealing to neighbors. 
Keep it concise and return JSON in this format:

{
  "polishedTitle": string,
  "polishedDescription": string,
  "suggestedCategory": string
}

Title: ${title}
Description: ${rawDescription}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) return null;

    // Extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text.trim();

    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("JSON Parse Error:", e, "Raw text:", text);
      return null;
    }
  } catch (error) {
    console.error("Error polishing task:", error);
    return null;
  }
};