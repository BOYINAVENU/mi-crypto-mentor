
export interface AIResponse {
  content: string;
  tokenSymbol?: string;
  aiConfidence: number;
}

export const callOpenAI = async (message: string, apiKey: string): Promise<AIResponse> => {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are MI, a crypto AI analyst powered by MemeX ecosystem. You specialize in cryptocurrency analysis, token information, trading advice, and helping users navigate the crypto space safely. 

Key information about MemeX ecosystem:
- OMEMEX: Wrapped token on OMAX Chain (Contract: 0xc84e...095b) - provides DeFi features with cross-chain functionality
- AMEMEX: Bridged MemeX token on Areon Network (Contract: 0x6608...ffc8) - enables interaction with Areon DeFi protocols

Always provide helpful, accurate crypto advice while warning about risks. End responses with appropriate emojis and remind users to DYOR (Do Your Own Research).`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    // Detect token mentions for enhanced display
    const tokenSymbol = detectTokenSymbol(message);
    
    return {
      content,
      tokenSymbol,
      aiConfidence: 95, // High confidence for real AI responses
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};

const detectTokenSymbol = (message: string): string | undefined => {
  const messageLower = message.toLowerCase();
  if (messageLower.includes('omemex')) return 'OMEMEX';
  if (messageLower.includes('amemex')) return 'AMEMEX';
  if (messageLower.includes('bitcoin') || messageLower.includes('btc')) return 'BTC';
  if (messageLower.includes('ethereum') || messageLower.includes('eth')) return 'ETH';
  return undefined;
};
