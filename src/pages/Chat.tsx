
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Coins, TrendingUp, Shield, Zap } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  tokenSymbol?: string;
  aiConfidence?: number;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm MI, your personal crypto AI analyst powered by MemeX ecosystem. Ask me about any token, crypto trends, or get help with trading decisions. I can analyze OMEMEX, AMEMEX, and other tokens, predict prices, and help you stay safe in crypto!",
      timestamp: new Date(),
      aiConfidence: 100
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "What is OMEMEX token?",
    "Tell me about AMEMEX",
    "Is Bitcoin safe to buy now?",
    "Explain DeFi in simple terms",
    "How to spot crypto scams?",
    "Best AI crypto tokens 2024"
  ];

  const generateAIResponse = (query: string): Message => {
    const responses: { [key: string]: string } = {
      omemex: "🚀 OMEMEX is a wrapped token on the OMAX Chain, part of the MemeX ecosystem! It's currently trading and provides users with access to DeFi features on the OMAX network. The token offers cross-chain functionality and is designed for fast, low-cost transactions. Contract address: 0xc84e...095b. You can track it on GeckoTerminal. As with all crypto investments, please DYOR and invest responsibly! 💎",
      amemex: "🌊 AMEMEX is the bridged version of MemeX token on the Areon Network! This allows MemeX ecosystem users to interact with Areon's DeFi protocols while maintaining their token exposure. It features cross-chain capabilities and low transaction fees. Contract: 0x6608...ffc8. Currently listed on GeckoTerminal for live tracking. Remember: crypto investments are risky! 🔗",
      bitcoin: "₿ Bitcoin is currently showing mixed signals. Technical analysis suggests support around $42K with resistance at $45K. The recent ETF approvals are bullish long-term, but short-term volatility remains high. Risk level: MEDIUM. Consider DCA strategy and only invest what you can afford to lose. 📊",
      defi: "🔗 DeFi (Decentralized Finance) lets you do banking without banks! You can lend, borrow, trade, and earn yield using smart contracts. Think of it as traditional finance but on blockchain - more accessible but also more risky. Popular DeFi protocols include Uniswap, Aave, and Compound. Always check smart contract audits! 🏦",
      scam: "🚨 Common crypto scam red flags: 1) Promises of guaranteed returns 2) Pressure to invest quickly 3) No clear team/roadmap 4) Fake celebrity endorsements 5) Asking for private keys. Always verify contracts on Etherscan, check liquidity locks, and use tools like our Scam Radar! Trust but verify. 🛡️",
      ai: "🤖 Top AI crypto tokens to watch: 1) $FET (Fetch.ai) - AI agents 2) $OCEAN (Ocean Protocol) - Data marketplace 3) $AGIX (SingularityNET) - AI services 4) OMEMEX & AMEMEX (our ecosystem!) - Crypto intelligence. AI + crypto is exploding with real utility. Research fundamentals, not just hype! 🧠"
    };

    const queryLower = query.toLowerCase();
    let response = "🤔 I'm analyzing your question... Based on current market data and my AI analysis, I'd recommend doing thorough research (DYOR) and considering your risk tolerance. Would you like me to break down any specific aspect of your question?";
    let detectedToken = "";
    let confidence = 75;

    if (queryLower.includes("omemex")) {
      response = responses.omemex;
      detectedToken = "OMEMEX";
      confidence = 95;
    } else if (queryLower.includes("amemex")) {
      response = responses.amemex;
      detectedToken = "AMEMEX";
      confidence = 95;
    } else if (queryLower.includes("bitcoin") || queryLower.includes("btc")) {
      response = responses.bitcoin;
      detectedToken = "BTC";
      confidence = 90;
    } else if (queryLower.includes("defi")) {
      response = responses.defi;
      confidence = 88;
    } else if (queryLower.includes("scam")) {
      response = responses.scam;
      confidence = 92;
    } else if (queryLower.includes("ai") && queryLower.includes("token")) {
      response = responses.ai;
      confidence = 87;
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      tokenSymbol: detectedToken,
      aiConfidence: confidence
    };
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen flex flex-col">
      {/* Header */}
      <div className="text-center space-y-4 mb-6">
        <div className="flex justify-center items-center space-x-3">
          <img 
            src="/lovable-uploads/22453a88-3fd8-494b-b1e4-949e4221cfec.png" 
            alt="MemeX Token" 
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            MI - Your Crypto AI Analyst
          </h1>
        </div>
        <p className="text-muted-foreground">
          Powered by $MEMEX • Ask about any token, get instant analysis
        </p>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickPrompt(prompt)}
                className="text-left h-auto p-3 whitespace-normal"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex space-x-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex space-x-3 max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user"
                    ? "bg-blue-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <Card
                className={`${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-background border"
                }`}
              >
                <CardContent className="p-4">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  {message.tokenSymbol && (
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-muted">
                      <Badge variant="secondary" className="text-xs">
                        <Coins className="w-3 h-3 mr-1" />
                        {message.tokenSymbol}
                      </Badge>
                      {message.aiConfidence && (
                        <Badge variant="outline" className="text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          {message.aiConfidence}% confidence
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <Card className="bg-background border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                  <span className="text-sm text-muted-foreground">MI is thinking...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about any crypto token or trading strategy..."
          className="flex-1 text-base h-12"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          size="lg"
          className="px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        ⚠️ AI responses are for educational purposes only. Not financial advice. DYOR.
      </p>
    </div>
  );
};

export default Chat;
