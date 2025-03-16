import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  mentalHealthContext,
  formatMentalHealthQuery,
} from "./mentalHealth.context.js";

// Verify API key is available
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error(
    "Missing Gemini API key - Please check your environment variables"
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const getChatResponse = async (messages) => {
  try {
    if (!API_KEY) {
      throw new Error("API key not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const lastMessage = messages[messages.length - 1].content;

    const prompt = `As a mental health support assistant, please respond to: ${lastMessage}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (
      error.message?.includes("API_KEY_INVALID") ||
      error.message?.includes("API key not configured")
    ) {
      return "Configuration error: Invalid or missing API key. Please contact support.";
    }
    return "I apologize, but I'm having trouble processing your request right now. If you need immediate help, please contact emergency services or a mental health helpline.";
  }
};

const isMentalHealthRelated = (text) => {
  const mentalHealthKeywords = [
    "anxiety",
    "depression",
    "stress",
    "mental health",
    "therapy",
    "counseling",
    "emotion",
    "feeling",
    "ptsd",
    "trauma",
    "panic",
    "mood",
    "psychological",
    "mental",
    "emotional",
    "well-being",
    "coping",
    "self-care",
    "support",
    "crisis",
  ];

  const lowercaseText = text.toLowerCase();
  return mentalHealthKeywords.some((keyword) =>
    lowercaseText.includes(keyword)
  );
};
