
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Brain,
  MessageCircle,
  Search,
  Shield,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  Coins,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Analysis",
      description: "Ask about any token and get instant, investor-grade answers powered by AI",
      color: "bg-blue-500",
    },
    {
      icon: Shield,
      title: "Scam Detection",
      description: "Advanced smart contract analysis to flag rug pulls and fake tokens",
      color: "bg-red-500",
    },
    {
      icon: TrendingUp,
      title: "Price Predictions",
      description: "AI-powered price forecasts using LSTM models and sentiment analysis",
      color: "bg-green-500",
    },
    {
      icon: Coins,
      title: "MemeX Integration",
      description: "Earn $MEMEX rewards for contributing data and using MI intelligence",
      color: "bg-purple-500",
    },
  ];

  const useCases = [
    {
      title: "For Newcomers",
      examples: [
        "How do I buy $MEMEX tokens?",
        "What's a rug pull?",
        "How do I keep my wallet safe?",
      ],
    },
    {
      title: "For Investors",
      examples: [
        "Is this token safe?",
        "Will $MEMEX reach $0.0005?",
        "What are the best AI tokens?",
      ],
    },
    {
      title: "For MemeX Users",
      examples: [
        "Earn $MEMEX rewards for data",
        "Fast, cheap transactions",
        "Decentralized intelligence",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950 dark:via-background dark:to-pink-950">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center space-y-8">
            <div className="flex justify-center items-center space-x-4">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0 px-4 py-2"
              >
                <Brain className="w-4 h-4 mr-2" />
                Powered by MemeX Intelligence
              </Badge>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border">
                <img 
                  src="/lovable-uploads/22453a88-3fd8-494b-b1e4-949e4221cfec.png" 
                  alt="MemeX Token" 
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-semibold text-purple-700">$MEMEX</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-7xl font-bold tracking-tight">
              <span className="block">The</span>
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                ChatGPT of Crypto
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your personal AI crypto analyst powered by <strong>$MEMEX</strong>. Get instant answers about any token,
              detect scams, predict prices, and navigate crypto safely.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chatting
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Search className="w-5 h-5 mr-2" />
                  Search Tokens
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Real-time data</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>AI-powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>$MEMEX rewards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MemeX Token Highlight Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/22453a88-3fd8-494b-b1e4-949e4221cfec.png" 
                alt="MemeX Token" 
                className="w-12 h-12 rounded-full"
              />
              <h2 className="text-3xl font-bold">$MEMEX Token</h2>
            </div>
            <p className="text-xl mb-6 opacity-90">
              The native token powering the MemeX ecosystem and MI intelligence platform
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Earn Rewards</h3>
                <p className="text-sm opacity-80">Get $MEMEX for contributing data and using MI</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Fast Transactions</h3>
                <p className="text-sm opacity-80">Low fees on the MemeX blockchain</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Governance</h3>
                <p className="text-sm opacity-80">Vote on platform improvements and features</p>
              </div>
            </div>
            <a
              href="https://memextoken.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Learn More About $MEMEX
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Everything you need for crypto intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From beginner guidance to advanced analysis, MI has you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Built for everyone in crypto
            </h2>
            <p className="text-xl text-muted-foreground">
              Whether you're just starting or you're a seasoned investor
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-center">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {useCase.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{example}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <img 
              src="/lovable-uploads/22453a88-3fd8-494b-b1e4-949e4221cfec.png" 
              alt="MemeX Token" 
              className="w-8 h-8 rounded-full"
            />
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to get crypto smart?
            </h2>
          </div>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust MI for their crypto decisions and earn $MEMEX rewards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Zap className="w-5 h-5 mr-2" />
                Try MI Now
              </Button>
            </Link>
            <a
              href="https://memextoken.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-purple-600">
                Learn about $MEMEX
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
