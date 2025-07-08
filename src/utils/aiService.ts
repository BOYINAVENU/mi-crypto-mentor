
export interface AIResponse {
  content: string;
  tokenSymbol?: string;
  aiConfidence: number;
}

/** Hugging Face Inference API endpoint */
const HF_INFERENCE_ENDPOINT = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";

/** 🔥 Primary function to call Hugging Face */
export const callHuggingFace = async (
    prompt: string,
    apiKey: string
): Promise<AIResponse> => {
  if (!apiKey) throw new Error("Hugging Face API key is required");

  try {
    const res = await fetch(HF_INFERENCE_ENDPOINT, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 200,
          temperature: 0.8,
          do_sample: true,
          top_p: 0.9
        }
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      
      if (res.status === 429) {
        throw new Error("⏱️ API quota exceeded. Please wait a minute and try again, or check your usage at Hugging Face.");
      } else if (res.status === 401) {
        throw new Error("🔑 Invalid API key. Please check your Hugging Face API key.");
      } else if (res.status === 400) {
        throw new Error("📝 Invalid request format. Please try rephrasing your question.");
      } else {
        throw new Error(`🚨 API Error (${res.status}): ${errorData.error || res.statusText}`);
      }
    }

    const json = await res.json();
    
    if (json.error) {
      throw new Error(`Hugging Face error: ${json.error}`);
    }

    const content = json.generated_text || json[0]?.generated_text || "";
    
    if (!content) {
      throw new Error("No content received from Hugging Face");
    }

    return {
      content: content.trim(),
      aiConfidence: 85,
    };
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    throw error;
  }
};

/** 🧪 Fallback if no key is provided or Hugging Face fails */
export const generateMockResponse = (prompt: string): AIResponse => {
  const responses = [
    `I'd be happy to help with "${prompt}", but I need a Hugging Face API key to provide detailed responses. You can get one free at Hugging Face!`,
    `That's an interesting question about "${prompt}". Please add your Hugging Face API key to get personalized AI responses.`,
    `I can see you're asking about "${prompt}". Connect your Hugging Face API key to unlock my full capabilities!`,
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    content: randomResponse,
    aiConfidence: 50,
  };
};
