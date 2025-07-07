import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Coins, Zap, Key, AlertCircle } from "lucide-react";
import { callOpenAI, generateAIResponse, type AIResponse } from "@/utils/aiService";

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
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const quickPrompts = [
    "What is OMEMEX token?",
    "Tell me about AMEMEX",
    "Is Bitcoin safe to buy now?",
    "Explain DeFi in simple terms",
    "How to spot crypto scams?",
    "Best AI crypto tokens 2024"
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      let aiResponse: AIResponse;
      
      if (apiKey) {
        // Use real OpenAI API
        aiResponse = await callOpenAI(currentInput, apiKey);
      } else {
        // Fallback to scripted responses
        aiResponse = generateAIResponse(currentInput);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        tokenSymbol: aiResponse.tokenSymbol,
        aiConfidence: aiResponse.aiConfidence
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "🚨 Sorry, I encountered an error processing your request. Please check your API key and try again, or I can provide basic responses without the API.",
        timestamp: new Date(),
        aiConfidence: 0
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
        
        {/* API Key Section */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="text-xs"
          >
            <Key className="w-3 h-3 mr-1" />
            {apiKey ? "✅ AI Connected" : "Connect OpenAI"}
          </Button>
        </div>
        
        {showApiKeyInput && (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span>Enter your OpenAI API key for enhanced AI responses</span>
                </div>
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Your API key is stored locally and used only for your requests.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
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
                  <span className="text-sm text-muted-foreground">
                    {apiKey ? "AI is thinking..." : "MI is thinking..."}
                  </span>
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
