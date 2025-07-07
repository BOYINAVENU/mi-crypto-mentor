
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, DollarSign, Users, Shield, AlertTriangle, ExternalLink } from "lucide-react";

interface TokenData {
  symbol: string;
  name: string;
  price: string;
  change24h: number;
  marketCap: string;
  volume: string;
  holders: string;
  riskScore: "low" | "medium" | "high";
  description: string;
  chain: string;
  contractAddress?: string;
  poolAddress?: string;
  geckoTerminalUrl?: string;
}

const TokenSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Updated mock token data with real OMEMEX and AMEMEX information
  const mockTokens: TokenData[] = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "$43,250.00",
      change24h: 2.45,
      marketCap: "$845.2B",
      volume: "$28.1B",
      holders: "46.8M",
      riskScore: "low",
      description: "The original cryptocurrency and digital gold. Established store of value with institutional adoption.",
      chain: "Bitcoin Network"
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "$2,580.00",
      change24h: -1.23,
      marketCap: "$310.5B",
      volume: "$15.2B",
      holders: "108.4M",
      riskScore: "low",
      description: "World's second-largest cryptocurrency and leading smart contract platform.",
      chain: "Ethereum"
    },
    {
      symbol: "PEPE",
      name: "Pepe",
      price: "$0.00000142",
      change24h: 15.67,
      marketCap: "$598.5M",
      volume: "$89.2M",
      holders: "235K",
      riskScore: "high",
      description: "Popular meme token with high volatility. Extremely risky investment - trade carefully.",
      chain: "Ethereum"
    },
    {
      symbol: "OMEMEX",
      name: "OMEMEX Token",
      price: "$0.000127",
      change24h: 12.34,
      marketCap: "$3.2M",
      volume: "$145K",
      holders: "8.5K",
      riskScore: "medium",
      description: "OMEMEX token on OMAX Chain. Part of the MemeX ecosystem with wrapped token functionality.",
      chain: "OMAX Chain",
      contractAddress: "0xc84edbf1e3fef5e4583aaa0f818cdfebfcae095b",
      poolAddress: "0xc84edbf1e3fef5e4583aaa0f818cdfebfcae095b",
      geckoTerminalUrl: "https://geckoterminal.com/omax-chain/pools/0xc84edbf1e3fef5e4583aaa0f818cdfebfcae095b"
    },
    {
      symbol: "AMEMEX",
      name: "AMEMEX Token",
      price: "$0.000089",
      change24h: -3.67,
      marketCap: "$1.8M",
      volume: "$67K",
      holders: "4.2K",
      riskScore: "medium",
      description: "AMEMEX token on Areon Network. Bridged version of MemeX token with cross-chain capabilities.",
      chain: "Areon Network",
      contractAddress: "0x6608de6043653256e8286f1da53d377ad41effc8",
      poolAddress: "0x6608de6043653256e8286f1da53d377ad41effc8",
      geckoTerminalUrl: "https://geckoterminal.com/areon-network/pools/0x6608de6043653256e8286f1da53d377ad41effc8"
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockTokens.filter(token => 
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return <Shield className="w-4 h-4" />;
      case "medium": return <AlertTriangle className="w-4 h-4" />;
      case "high": return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold">Token Search & Analysis</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Search for any cryptocurrency and get instant analysis, risk assessment, and key metrics
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex space-x-2 mb-8">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by token symbol or name (e.g., BTC, OMEMEX, AMEMEX)"
          className="flex-1 text-lg h-12"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button 
          onClick={handleSearch} 
          disabled={!searchQuery.trim() || isLoading}
          size="lg"
          className="px-8"
        >
          <Search className="w-5 h-5 mr-2" />
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Popular Tokens */}
      {searchResults.length === 0 && !isLoading && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Popular Tokens</h2>
          <div className="flex flex-wrap gap-2">
            {["BTC", "ETH", "OMEMEX", "AMEMEX"].map((token) => (
              <Button
                key={token}
                variant="outline"
                onClick={() => {
                  setSearchQuery(token);
                  setTimeout(handleSearch, 100);
                }}
              >
                {token}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Analyzing token data...</p>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Search Results ({searchResults.length})</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {searchResults.map((token, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center space-x-2">
                        <span>{token.symbol}</span>
                        <Badge className={getRiskColor(token.riskScore)}>
                          {getRiskIcon(token.riskScore)}
                          <span className="ml-1 capitalize">{token.riskScore} Risk</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-lg">{token.name}</CardDescription>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        {token.chain}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{token.price}</div>
                      <div className={`flex items-center space-x-1 ${
                        token.change24h >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {token.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{token.change24h >= 0 ? "+" : ""}{token.change24h}%</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{token.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Market Cap</p>
                          <p className="font-semibold">{token.marketCap}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">24h Volume</p>
                          <p className="font-semibold">{token.volume}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Holders</p>
                          <p className="font-semibold">{token.holders}</p>
                        </div>
                      </div>
                      {token.contractAddress && (
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Contract</p>
                            <p className="font-mono text-xs">{token.contractAddress.slice(0, 10)}...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    {token.geckoTerminalUrl && (
                      <a
                        href={token.geckoTerminalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button className="w-full" variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on GeckoTerminal
                        </Button>
                      </a>
                    )}
                    <Button className="w-full" variant="outline">
                      View Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && searchQuery && !isLoading && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No tokens found</h3>
          <p className="text-muted-foreground">
            Try searching for a different token symbol or name
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute financial advice. 
          Cryptocurrency investments are highly risky. Always conduct your own research before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default TokenSearch;
