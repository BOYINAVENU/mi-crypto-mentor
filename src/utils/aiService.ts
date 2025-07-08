
export interface AIResponse {
  content: string;
  tokenSymbol?: string;
  aiConfidence: number;
}

/** Gemini REST API endpoint */
const GEMINI_ENDPOINT = (
    model = "gemini-1.5-pro-latest"
) =>
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

/** 🔥 Primary function to call Gemini */
export const callGemini = async (
    prompt: string,
    apiKey: string,
    model = "gemini-1.5-pro-latest"
): Promise<AIResponse> => {
  if (!apiKey) throw new Error("Gemini API key is required");

  try {
    const systemPrompt = `You are a helpful, knowledgeable, and friendly AI assistant. You can help with a wide variety of topics including:
- General questions and explanations
- Technology and programming
- Science and mathematics
- Creative writing and brainstorming
- Problem-solving and analysis
- Educational content
- And much more!

Please provide helpful, accurate, and engaging responses. If you're not certain about something, let the user know. Always be respectful and professional.`;

    const fullPrompt = `${systemPrompt}\n\nUser question: ${prompt}`;

    const res = await fetch(`${GEMINI_ENDPOINT(model)}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      
      if (res.status === 429) {
        throw new Error("⏱️ API quota exceeded. Please wait a minute and try again, or check your usage at Google AI Studio.");
      } else if (res.status === 403) {
        throw new Error("🔑 Invalid API key. Please check your Gemini API key.");
      } else if (res.status === 400) {
        throw new Error("📝 Invalid request format. Please try rephrasing your question.");
      } else {
        throw new Error(`🚨 API Error (${res.status}): ${errorData.error?.message || res.statusText}`);
      }
    }

    const json = await res.json();
    
    if (json.error) {
      throw new Error(`Gemini error: ${json.error.message}`);
    }

    const content = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    
    if (!content) {
      throw new Error("No content received from Gemini");
    }

    return {
      content: content.trim(),
      aiConfidence: 90,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

/** 🧪 Fallback if no key is provided or Gemini fails */
export const generateMockResponse = (prompt: string): AIResponse => {
  const responses = [
    `I'd be happy to help with "${prompt}", but I need a Gemini API key to provide detailed responses. You can get one free at Google AI Studio!`,
    `That's an interesting question about "${prompt}". Please add your Gemini API key to get personalized AI responses.`,
    `I can see you're asking about "${prompt}". Connect your Gemini API key to unlock my full capabilities!`,
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    content: randomResponse,
    aiConfidence: 50,
  };
};
