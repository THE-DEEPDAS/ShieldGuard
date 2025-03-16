export const getChatResponse = async (messages) => {
  try {
    const lastMessage = messages[messages.length - 1].content;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "o3-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a mental health support assistant. Provide empathetic and supportive responses while encouraging professional help when needed.",
          },
          {
            role: "user",
            content: lastMessage,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      if (response.status === 429) {
        // Handle quota exceeded error
        return "I'm currently experiencing high demand. Please try again later.";
      }
      throw new Error(data.error?.message || "Failed to get response");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "I apologize, but I'm having trouble processing your request right now. If you're in crisis, please contact emergency services or a mental health helpline.";
  }
};
