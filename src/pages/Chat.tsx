
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Brain, User, Sparkles, TrendingUp, Shield, HelpCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm MI, your personal crypto intelligence assistant. Ask me anything about tokens, trading, or crypto security. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const exampleQuestions = [
    { text: "What is Bitcoin?", icon: TrendingUp },
    { text: "Is $PEPE safe to buy?", icon: Shield },
    { text: "How do I avoid rug pulls?", icon: HelpCircle },
    { text: "Explain DeFi to a beginner", icon: Brain },
  ];

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("bitcoin") || input.includes("btc")) {
      return "Bitcoin (BTC) is the first and largest cryptocurrency by market cap. Created in 2009 by Satoshi Nakamoto, it's often called 'digital gold' and serves as a store of value. Current fundamentals look strong with institutional adoption growing. Always DYOR before investing!";
    }
    
    if (input.includes("pepe") || input.includes("meme")) {
      return "PEPE is a meme token with high volatility. ⚠️ Risk Assessment: Meme coins are extremely risky - prices can drop 90%+ quickly. Check liquidity, holder distribution, and be prepared to lose your investment. Only invest what you can afford to lose!";
    }
    
    if (input.includes("rug pull") || input.includes("scam")) {
      return "🚨 How to avoid rug pulls:\n\n1. Check if liquidity is locked\n2. Verify team is doxxed\n3. Look for audit reports\n4. Check holder distribution (avoid if 1 wallet holds >20%)\n5. Test small amounts first\n6. Use tools like GoPlus for quick security checks\n\nRed flags: Anonymous teams, no locked liquidity, excessive marketing promises.";
    }
    
    if (input.includes("defi")) {
      return "DeFi (Decentralized Finance) lets you do banking without banks! Key concepts:\n\n💰 Lending/Borrowing: Earn interest or get loans\n🔄 DEXs: Trade without centralized exchanges\n🏦 Yield Farming: Earn rewards by providing liquidity\n🎯 Staking: Lock tokens to secure networks\n\nStart with established protocols like Uniswap, Aave, or Compound. Always understand impermanent loss and smart contract risks!";
    }
    
    if (input.includes("safe") || input.includes("security")) {
      return "🔐 Crypto Safety Checklist:\n\n1. Use hardware wallets for large amounts\n2. Never share private keys/seed phrases\n3. Verify URLs (avoid phishing)\n4. Use 2FA everywhere\n5. Test with small amounts first\n6. Keep software updated\n7. Don't click suspicious links\n\nRemember: In crypto, YOU are the bank. Security is your responsibility!";
    }
    
    return `I'm analyzing "${userInput}" for you... Based on current market data and AI analysis, I'd recommend doing thorough research before making any decisions. Would you like me to check specific metrics like liquidity, holder distribution, or recent price action? Remember: This is not financial advice - always DYOR!`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-8rem)]">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="text-center py-6 border-b">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Ask MI Anything</h1>
          </div>
          <p className="text-muted-foreground">Your AI crypto intelligence assistant</p>
        </div>

        {/* Example Questions */}
        {messages.length <= 1 && (
          <div className="py-6">
            <p className="text-sm text-muted-foreground mb-4 text-center">Try asking:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {exampleQuestions.map((question, index) => {
                const Icon = question.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 text-left justify-start"
                    onClick={() => handleExampleClick(question.text)}
                  >
                    <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{question.text}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} chat-bubble`}
            >
              <div className={`flex space-x-3 max-w-3xl ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Brain className="w-4 h-4" />
                  )}
                </div>
                <Card className={`p-4 ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </Card>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-3 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center">
                  <Brain className="w-4 h-4" />
                </div>
                <Card className="p-4 bg-muted">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">MI is thinking...</span>
                  </div>
                </Card>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t pt-4">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any crypto token..."
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isTyping}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Not financial advice. Always DYOR. Crypto investments are risky.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
