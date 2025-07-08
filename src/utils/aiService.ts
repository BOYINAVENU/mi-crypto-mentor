
export interface AIResponse {
  content: string;
  tokenSymbol?: string;
  aiConfidence: number;
}

// API-based approach (existing)
const HF_INFERENCE_ENDPOINT = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";

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

// Local model approach (new)
let localPipeline: any = null;
let isModelLoading = false;

export const initializeLocalModel = async (): Promise<void> => {
  if (localPipeline || isModelLoading) return;
  
  isModelLoading = true;
  
  try {
    // Dynamic import to avoid build issues
    const { pipeline } = await import('@huggingface/transformers');
    
    // Initialize a smaller, faster model for chat
    localPipeline = await pipeline(
      'text-generation',
      'Xenova/gpt2',
      {
        device: 'webgpu',
        dtype: 'fp16'
      }
    );
    
    console.log('Local AI model loaded successfully');
  } catch (error) {
    console.warn('Failed to load local model, falling back to CPU:', error);
    
    try {
      const { pipeline } = await import('@huggingface/transformers');
      localPipeline = await pipeline(
        'text-generation',
        'Xenova/gpt2',
        {
          device: 'cpu'
        }
      );
      console.log('Local AI model loaded on CPU');
    } catch (cpuError) {
      console.error('Failed to load local model:', cpuError);
      throw new Error('Failed to initialize local AI model');
    }
  } finally {
    isModelLoading = false;
  }
};

export const callLocalModel = async (prompt: string): Promise<AIResponse> => {
  if (!localPipeline) {
    await initializeLocalModel();
  }
  
  if (!localPipeline) {
    throw new Error('Local model not available');
  }
  
  try {
    const response = await localPipeline(prompt, {
      max_new_tokens: 100,
      temperature: 0.7,
      do_sample: true,
      top_p: 0.9,
      pad_token_id: 50256
    });
    
    const generatedText = response[0].generated_text;
    // Remove the original prompt from the response
    const content = generatedText.replace(prompt, '').trim();
    
    return {
      content: content || "I'm processing your request...",
      aiConfidence: 75,
    };
  } catch (error) {
    console.error('Local model error:', error);
    throw new Error('Failed to generate response from local model');
  }
};

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
