
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Wallet, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ExternalLink,
  BookOpen,
  Users,
  DollarSign
} from "lucide-react";

const BeginnerZone = () => {
  const guides = [
    {
      category: "Getting Started",
      icon: GraduationCap,
      color: "bg-blue-500",
      lessons: [
        {
          title: "What is Cryptocurrency?",
          description: "Learn the basics of digital currencies and blockchain technology",
          difficulty: "Beginner",
          duration: "5 min read",
          content: "Cryptocurrency is digital money that uses cryptography for security. Unlike traditional currencies controlled by governments, crypto runs on decentralized networks called blockchains..."
        },
        {
          title: "How to Set Up Your First Wallet",
          description: "Step-by-step guide to creating and securing a crypto wallet",
          difficulty: "Beginner",
          duration: "10 min read",
          content: "A crypto wallet stores your digital assets. There are several types: hot wallets (online), cold wallets (offline), and hardware wallets (physical devices)..."
        },
        {
          title: "Making Your First Purchase",
          description: "Safe ways to buy your first cryptocurrency",
          difficulty: "Beginner",
          duration: "8 min read",
          content: "Start with reputable exchanges like Coinbase, Binance, or Kraken. Always verify the website URL, enable 2FA, and start with small amounts..."
        }
      ]
    },
    {
      category: "Security & Safety",
      icon: Shield,
      color: "bg-red-500",
      lessons: [
        {
          title: "Recognizing Crypto Scams",
          description: "Common scams and how to avoid them",
          difficulty: "Important",
          duration: "7 min read",
          content: "Common red flags: promises of guaranteed returns, pressure to invest quickly, requests for private keys, fake celebrity endorsements..."
        },
        {
          title: "Wallet Security Best Practices",
          description: "Keep your crypto safe with these essential tips",
          difficulty: "Essential",
          duration: "12 min read",
          content: "Never share your private keys or seed phrase. Use hardware wallets for large amounts. Enable 2FA everywhere. Use strong, unique passwords..."
        },
        {
          title: "What is a Rug Pull?",
          description: "Understanding and avoiding rug pull scams",
          difficulty: "Intermediate",
          duration: "6 min read",
          content: "A rug pull occurs when developers drain liquidity from a project and disappear. Warning signs include: anonymous teams, no locked liquidity, excessive marketing hype..."
        }
      ]
    },
    {
      category: "Trading Basics",
      icon: TrendingUp,
      color: "bg-green-500",
      lessons: [
        {
          title: "Understanding Market Orders",
          description: "Different types of orders and when to use them",
          difficulty: "Beginner",
          duration: "8 min read",
          content: "Market orders execute immediately at current price. Limit orders execute only at your specified price. Stop-loss orders help limit losses..."
        },
        {
          title: "Reading Price Charts",
          description: "Basic technical analysis for beginners",
          difficulty: "Intermediate",
          duration: "15 min read",
          content: "Candlestick charts show open, high, low, and close prices. Support and resistance levels indicate potential price barriers..."
        },
        {
          title: "Risk Management",
          description: "How to protect your investment",
          difficulty: "Essential",
          duration: "10 min read",
          content: "Never invest more than you can afford to lose. Diversify your portfolio. Use stop-losses. Don't FOMO into trades..."
        }
      ]
    }
  ];

  const quickTips = [
    {
      icon: CheckCircle,
      title: "Start Small",
      description: "Begin with small amounts you can afford to lose"
    },
    {
      icon: Shield,
      title: "Research First",
      description: "Always DYOR (Do Your Own Research) before investing"
    },
    {
      icon: Wallet,
      title: "Secure Storage",
      description: "Use hardware wallets for long-term storage"
    },
    {
      icon: AlertTriangle,
      title: "Avoid FOMO",
      description: "Don't make decisions based on fear of missing out"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "important": case "essential": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold flex items-center justify-center space-x-3">
          <GraduationCap className="w-8 h-8 text-blue-500" />
          <span>Crypto Learning Zone</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master cryptocurrency basics, security, and trading with our beginner-friendly guides
        </p>
      </div>

      {/* Quick Tips */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Essential Tips for Crypto Beginners</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <Icon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{tip.title}</div>
                    <div className="text-xs text-muted-foreground">{tip.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Learning Guides */}
      <div className="space-y-8">
        {guides.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;
          return (
            <div key={categoryIndex}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                  <CategoryIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">{category.category}</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {category.lessons.map((lesson, lessonIndex) => (
                  <Card key={lessonIndex} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{lesson.title}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge className={getDifficultyColor(lesson.difficulty)}>
                              {lesson.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </div>
                        </div>
                        <BookOpen className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {lesson.content}
                      </p>
                      <Button className="w-full" variant="outline">
                        Read Guide
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Resources */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Additional Resources</span>
          </CardTitle>
          <CardDescription>Expand your crypto knowledge with these trusted sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Educational Platforms</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                  <span>Coinbase Learn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                  <span>Binance Academy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                  <span>CoinGecko Learn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Community & Support</h4>
              <div className="space-y-2 text-sm">
                <a 
                  href="https://t.me/MemeXGloball" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
                >
                  <span>MemeX Community</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                  <span>Reddit Crypto Communities</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                  <span>Discord Channels</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      <Card className="mt-8 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Important Reminder</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Cryptocurrency investments are highly risky and volatile. Never invest more than you can afford to lose. 
                This educational content is not financial advice. Always consult with qualified professionals before making investment decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BeginnerZone;
