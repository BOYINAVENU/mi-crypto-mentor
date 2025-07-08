
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Key, AlertCircle } from "lucide-react";
import { callGemini, generateMockResponse, type AIResponse } from "@/utils/aiService";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  aiConfidence?: number;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm your AI assistant powered by Gemini. I'm here to help answer any questions you have. Feel free to ask me anything!",
      timestamp: new Date(),
      aiConfidence: 100
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [geminiKey, setGeminiKey] = useState(
    import.meta.env.VITE_GEMINI_API_KEY ?? ""
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    "What can you help me with?",
    "Tell me about artificial intelligence",
    "How does machine learning work?",
    "Explain quantum computing",
    "What's the weather like today?",
    "Help me with coding"
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
      
      if (geminiKey?.trim()) {
        aiResponse = await callGemini(currentInput, geminiKey.trim());
      } else {
        aiResponse = generateMockResponse(currentInput);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.content || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date(),
        aiConfidence: aiResponse.aiConfidence
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Gemini API error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "🚨 I encountered an error while processing your request. Please check your API key and try again.",
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen flex flex-col">
      {/* Header */}
      <div className="text-center space-y-4 mb-6">
        <div className="flex justify-center items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Assistant
          </h1>
        </div>
        <p className="text-muted-foreground">
          Powered by Google Gemini • Ask me anything!
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
            {geminiKey ? "✅ API Connected" : "Connect API"}
          </Button>
        </div>
        
        {showApiKeyInput && (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span>Enter your Gemini API key for enhanced responses</span>
                </div>
                <Input
                  type="password"
                  placeholder="AIza..."
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Get your free API key at{" "}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600"
                  >
                    Google AI Studio
                  </a>
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
                className="text-left h-auto p-3 whitespace-normal hover:bg-accent"
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
                    : "bg-gradient-to-r from-blue-500 to-purple-600"
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
                  {message.aiConfidence && message.role === "assistant" && (
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-muted">
                      <Badge variant="outline" className="text-xs">
                        {message.aiConfidence}% confidence
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <Card className="bg-background border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm text-muted-foreground">
                    AI is thinking...
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 text-base h-12"
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          size="lg"
          className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        🤖 AI responses are generated by Google Gemini
      </p>
    </div>
  );
};

export default Chat;
