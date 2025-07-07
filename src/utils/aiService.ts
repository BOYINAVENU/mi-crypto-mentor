
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
        model: 'gpt-4o',
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

export const generateAIResponse = (message: string): AIResponse => {
  const messageLower = message.toLowerCase();
  
  // OMEMEX responses
  if (messageLower.includes('omemex')) {
    return {
      content: "🚀 OMEMEX is the wrapped version of MemeX token on OMAX Chain! \n\n📊 Contract: 0xc84edbf1e3fef5e4583aaa0f818cdfebfcae095b\n🔗 Chain: OMAX Chain\n💰 Features: Cross-chain DeFi functionality\n\nOMEMEX enables seamless interaction with OMAX Chain's DeFi protocols while maintaining the core MemeX utility. Perfect for yield farming and liquidity provision! 📈\n\n⚠️ Always DYOR before investing! 🔍",
      tokenSymbol: 'OMEMEX',
      aiConfidence: 85
    };
  }
  
  // AMEMEX responses
  if (messageLower.includes('amemex')) {
    return {
      content: "⚡ AMEMEX is the bridged MemeX token on Areon Network! \n\n📊 Contract: 0x6608de6043653256e8286f1da53d377ad41effc8\n🔗 Chain: Areon Network\n🌉 Features: Cross-chain bridge functionality\n\nAMEMEX brings MemeX utility to the Areon ecosystem, enabling users to participate in Areon's DeFi protocols and earn rewards. Great for diversifying your MemeX holdings across chains! 🌟\n\n⚠️ Remember to DYOR and check bridge security! 🛡️",
      tokenSymbol: 'AMEMEX',
      aiConfidence: 85
    };
  }
  
  // Bitcoin responses
  if (messageLower.includes('bitcoin') || messageLower.includes('btc')) {
    return {
      content: "₿ Bitcoin is the king of crypto! Currently the most established and widely adopted cryptocurrency. \n\n📈 Market Status: Strong long-term fundamentals\n🏦 Institutional adoption continues growing\n⚡ Lightning Network improving scalability\n\nBitcoin remains a solid store of value, but always consider your risk tolerance and portfolio allocation. DCA (Dollar Cost Averaging) is often recommended for BTC! 💪\n\n⚠️ Not financial advice - DYOR! 📚",
      tokenSymbol: 'BTC',
      aiConfidence: 80
    };
  }
  
  // Ethereum responses
  if (messageLower.includes('ethereum') || messageLower.includes('eth')) {
    return {
      content: "🔷 Ethereum is the world's computer! The leading smart contract platform powering most DeFi and NFT ecosystems.\n\n🚀 Recent upgrades improving scalability\n💰 Strong DeFi ecosystem\n🎨 NFT marketplace leader\n⚡ Layer 2 solutions reducing fees\n\nETH has solid fundamentals with constant development and innovation. Great for both holding and using in DeFi protocols! 🌟\n\n⚠️ Always DYOR before investing! 🔍",
      tokenSymbol: 'ETH',
      aiConfidence: 80
    };
  }
  
  // DeFi responses
  if (messageLower.includes('defi') || messageLower.includes('decentralized finance')) {
    return {
      content: "🏦 DeFi (Decentralized Finance) is revolutionizing traditional finance! \n\n💡 Key benefits:\n• No intermediaries needed\n• 24/7 global access\n• Programmable money\n• Higher yields potential\n\n⚠️ Risks to consider:\n• Smart contract bugs\n• Impermanent loss\n• High gas fees\n• Regulatory uncertainty\n\nStart small, learn gradually, and never invest more than you can afford to lose! 🎓📈",
      aiConfidence: 75
    };
  }
  
  // Scam detection responses
  if (messageLower.includes('scam') || messageLower.includes('safe') || messageLower.includes('rug')) {
    return {
      content: "🚨 Great question about crypto safety! Here are key red flags to watch:\n\n❌ Promises of guaranteed returns\n❌ Anonymous teams\n❌ No working product\n❌ Pressure to invest quickly\n❌ Unrealistic APYs (>1000%)\n\n✅ Safety tips:\n• Research the team\n• Check contract audits\n• Start with small amounts\n• Use reputable platforms\n• Trust your instincts\n\nStay safe out there! 🛡️ When in doubt, don't invest! 💪",
      aiConfidence: 90
    };
  }
  
  // AI tokens responses
  if (messageLower.includes('ai') && (messageLower.includes('token') || messageLower.includes('crypto'))) {
    return {
      content: "🤖 AI tokens are trending in 2024! Some notable projects:\n\n🔥 Popular AI tokens:\n• FET (Fetch.ai) - Autonomous agents\n• OCEAN (Ocean Protocol) - Data marketplace\n• SingularityNET (AGIX) - AI marketplace\n• Render (RNDR) - GPU rendering\n\n💡 Remember:\n• AI hype can create bubbles\n• Look for real utility\n• Check partnerships\n• Understand the technology\n\nAI + Crypto = Exciting future, but invest wisely! 🚀⚠️",
      aiConfidence: 75
    };
  }
  
  // General trading advice
  if (messageLower.includes('trade') || messageLower.includes('buy') || messageLower.includes('sell')) {
    return {
      content: "📊 Smart trading tips from MI:\n\n💡 Key principles:\n• Never invest more than you can lose\n• Diversify your portfolio\n• Use stop-losses\n• Keep emotions in check\n• Learn technical analysis\n\n📈 Strategies to consider:\n• DCA (Dollar Cost Averaging)\n• HODLing quality projects\n• Taking profits gradually\n• Keeping some stablecoins ready\n\nRemember: The market is unpredictable! 🎲 Always DYOR! 📚",
      aiConfidence: 70
    };
  }
  
  // Default response
  return {
    content: "👋 Hello! I'm MI, your crypto AI analyst powered by MemeX ecosystem. I can help you with:\n\n🔍 Token analysis (OMEMEX, AMEMEX, BTC, ETH)\n📈 Trading strategies and tips\n🛡️ Scam detection and safety\n💡 DeFi education\n🤖 AI token insights\n\nWhat would you like to know about crypto today? Just ask me anything! 🚀\n\n⚠️ Remember: I provide educational info, not financial advice. Always DYOR! 📚",
    aiConfidence: 60
  };
};

const detectTokenSymbol = (message: string): string | undefined => {
  const messageLower = message.toLowerCase();
  if (messageLower.includes('omemex')) return 'OMEMEX';
  if (messageLower.includes('amemex')) return 'AMEMEX';
  if (messageLower.includes('bitcoin') || messageLower.includes('btc')) return 'BTC';
  if (messageLower.includes('ethereum') || messageLower.includes('eth')) return 'ETH';
  return undefined;
};
