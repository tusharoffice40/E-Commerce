
import { GoogleGenAI } from "@google/genai";

export const getServiceRecommendation = async (userPrompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an AI assistant for E-Services, a digital service e-commerce platform. Based on the user's need: "${userPrompt}", suggest which of our service categories (Development, Design, Marketing, Writing, Business) would be best and why. Keep it concise (under 3 sentences).`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I couldn't process your request at the moment. Please feel free to browse our categories!";
  }
};

export const generateServicePitch = async (serviceTitle: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, high-converting 2-sentence sales pitch for a digital service called "${serviceTitle}".`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Pitch Error:", error);
    return "This high-quality service is designed to help your business grow effectively and efficiently.";
  }
};
