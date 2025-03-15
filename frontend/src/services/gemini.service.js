import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  mentalHealthContext,
  formatMentalHealthQuery,
} from "./mentalHealth.context.js";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getChatResponse = async (messages) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Format the last message only
    const lastMessage = messages[messages.length - 1].content;
    const formattedQuery = formatMentalHealthQuery(lastMessage);

    // Send message directly without chat history
    const result = await model.generateContent(formattedQuery);
    const response = await result.response;
    const text = response.text();

    // Check if response is mental health related
    if (!isMentalHealthRelated(text)) {
      return "I apologize, but I can only assist with mental health related questions. Could you please ask something about mental health, emotional well-being, or psychological support?";
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble processing your request right now. If you're in crisis, please contact emergency services or a mental health helpline.";
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
