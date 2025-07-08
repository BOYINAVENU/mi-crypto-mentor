
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

// Local Gemma 3n model approach (updated)
let localProcessor: any = null;
let localModel: any = null;
let isModelLoading = false;

export const initializeLocalModel = async (): Promise<void> => {
  if ((localProcessor && localModel) || isModelLoading) return;
  
  isModelLoading = true;
  
  try {
    console.log('Loading Gemma 3n E4B model for image-text-to-text...');
    
    // Dynamic import to avoid build issues
    const { AutoProcessor, AutoModelForImageTextToText } = await import('@huggingface/transformers');
    
    // Initialize Gemma 3n E4B model with processor
    console.log('Loading processor...');
    localProcessor = await AutoProcessor.from_pretrained("google/gemma-3n-e4b-it", {
      device: 'webgpu',
      dtype: 'fp16'
    });
    
    console.log('Loading model...');
    localModel = await AutoModelForImageTextToText.from_pretrained("google/gemma-3n-e4b-it", {
      device: 'webgpu',
      dtype: 'fp16'
    });
    
    console.log('Gemma 3n E4B model loaded successfully on WebGPU');
  } catch (error) {
    console.warn('Failed to load model on WebGPU, trying CPU:', error);
    
    try {
      const { AutoProcessor, AutoModelForImageTextToText } = await import('@huggingface/transformers');
      
      localProcessor = await AutoProcessor.from_pretrained("google/gemma-3n-e4b-it", {
        device: 'cpu'
      });
      
      localModel = await AutoModelForImageTextToText.from_pretrained("google/gemma-3n-e4b-it", {
        device: 'cpu'
      });
      
      console.log('Gemma 3n E4B model loaded successfully on CPU');
    } catch (cpuError) {
      console.error('Failed to load Gemma 3n model:', cpuError);
      throw new Error('Failed to initialize Gemma 3n E4B model');
    }
  } finally {
    isModelLoading = false;
  }
};

export const callLocalModel = async (prompt: string, imageUrl?: string): Promise<AIResponse> => {
  if (!localProcessor || !localModel) {
    await initializeLocalModel();
  }
  
  if (!localProcessor || !localModel) {
    throw new Error('Gemma 3n model not available');
  }
  
  try {
    let messages;
    
    if (imageUrl) {
      // Image-text-to-text format
      messages = [
        {
          "role": "user",
          "content": [
            {"type": "image", "image": imageUrl},
            {"type": "text", "text": prompt}
          ]
        }
      ];
    } else {
      // Text-only format
      messages = [
        {
          "role": "user",
          "content": [
            {"type": "text", "text": prompt}
          ]
        }
      ];
    }
    
    console.log('Processing with Gemma 3n E4B...');
    
    // Apply chat template and process
    const inputs = localProcessor.apply_chat_template(
      messages,
      {
        add_generation_prompt: true,
        tokenize: true,
        return_dict: true,
        return_tensors: "pt"
      }
    );
    
    // Generate response
    const generation = await localModel.generate({
      ...inputs,
      max_new_tokens: 150,
      do_sample: false,
      temperature: 0.7
    });
    
    // Decode the response
    const inputLen = inputs.input_ids.shape[-1];
    const outputTokens = generation[0].slice(inputLen);
    const decoded = localProcessor.decode(outputTokens, { skip_special_tokens: true });
    
    return {
      content: decoded.trim() || "I processed your request successfully.",
      aiConfidence: 90,
    };
  } catch (error) {
    console.error('Gemma 3n model error:', error);
    throw new Error(`Failed to generate response from Gemma 3n model: ${error.message}`);
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
