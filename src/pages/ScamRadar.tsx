
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  AlertTriangle, 
  XCircle, 
  CheckCircle, 
  Search, 
  ExternalLink,
  Users,
  Lock,
  TrendingDown 
} from "lucide-react";

interface SecurityReport {
  address: string;
  tokenName: string;
  symbol: string;
  riskLevel: "safe" | "warning" | "danger";
  overallScore: number;
  checks: {
    name: string;
    status: "pass" | "warning" | "fail";
    description: string;
  }[];
  warnings: string[];
}

const ScamRadar = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [report, setReport] = useState<SecurityReport | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Mock security analysis
  const mockReports: { [key: string]: SecurityReport } = {
    "0x1234567890abcdef": {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      tokenName: "SafeMoon",
      symbol: "SAFEMOON",
      riskLevel: "warning",
      overallScore: 65,
      checks: [
        { name: "Liquidity Lock", status: "pass", description: "Liquidity is locked for 12 months" },
        { name: "Owner Privileges", status: "warning", description: "Owner can modify fees up to 25%" },
        { name: "Holder Distribution", status: "warning", description: "Top 10 holders own 45% of supply" },
        { name: "Contract Verified", status: "pass", description: "Source code is verified on blockchain" },
        { name: "Honeypot Check", status: "pass", description: "No honeypot detected" },
      ],
      warnings: [
        "High concentration of tokens in few wallets",
        "Owner has ability to change transaction fees"
      ]
    },
    "0xabcdef1234567890": {
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      tokenName: "RugPullCoin",
      symbol: "RUG",
      riskLevel: "danger",
      overallScore: 15,
      checks: [
        { name: "Liquidity Lock", status: "fail", description: "No liquidity lock detected" },
        { name: "Owner Privileges", status: "fail", description: "Owner can mint unlimited tokens" },
        { name: "Holder Distribution", status: "fail", description: "85% owned by contract creator" },
        { name: "Contract Verified", status: "fail", description: "Source code not verified" },
        { name: "Honeypot Check", status: "fail", description: "Potential honeypot detected" },
      ],
      warnings: [
        "⚠️ HIGH RISK: Potential rug pull",
        "Contract allows unlimited minting",
        "Most tokens held by creator",
        "No liquidity protection"
      ]
    },
    "0x1111111111111111": {
      address: "0x1111111111111111111111111111111111111111",
      tokenName: "Bitcoin",
      symbol: "BTC",
      riskLevel: "safe",
      overallScore: 95,
      checks: [
        { name: "Decentralization", status: "pass", description: "Highly decentralized network" },
        { name: "Security", status: "pass", description: "Battle-tested for 15+ years" },
        { name: "Liquidity", status: "pass", description: "Deep liquidity across exchanges" },
        { name: "Transparency", status: "pass", description: "Open-source and audited" },
        { name: "Adoption", status: "pass", description: "Widely adopted globally" },
      ],
      warnings: []
    }
  };

  const handleScan = () => {
    if (!contractAddress.trim()) return;
    
    setIsScanning(true);
    
    // Simulate API call
    setTimeout(() => {
      // Find a matching mock report or create a default one
      const mockAddress = Object.keys(mockReports)[0];
      const result = mockReports[mockAddress] || {
        address: contractAddress,
        tokenName: "Unknown Token",
        symbol: "UNK",
        riskLevel: "warning" as const,
        overallScore: 50,
        checks: [
          { name: "Basic Security", status: "warning" as const, description: "Limited information available" }
        ],
        warnings: ["Token not found in our database - proceed with extreme caution"]
      };
      
      setReport(result);
      setIsScanning(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "fail": return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          <Shield className="w-3 h-3 mr-1" />
          Safe
        </Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Warning
        </Badge>;
      case "danger":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
          <XCircle className="w-3 h-3 mr-1" />
          Danger
        </Badge>;
      default:
        return null;
    }
  };

  const exampleAddresses = [
    { name: "Safe Example", address: "0x1111111111111111" },
    { name: "Warning Example", address: "0x1234567890abcdef" },
    { name: "Danger Example", address: "0xabcdef1234567890" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold flex items-center justify-center space-x-3">
          <Shield className="w-8 h-8 text-red-500" />
          <span>Scam Radar</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced smart contract analysis to detect rug pulls, honeypots, and suspicious tokens
        </p>
      </div>

      {/* Scanner */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Smart Contract Security Scanner</CardTitle>
          <CardDescription>
            Enter a contract address to analyze its security and detect potential risks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Enter contract address (0x...)"
              className="flex-1"
            />
            <Button 
              onClick={handleScan} 
              disabled={!contractAddress.trim() || isScanning}
              className="px-8"
            >
              <Search className="w-4 h-4 mr-2" />
              {isScanning ? "Scanning..." : "Scan"}
            </Button>
          </div>
          
          {/* Example addresses */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleAddresses.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setContractAddress(example.address)}
                >
                  {example.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isScanning && (
        <Card className="mb-8">
          <CardContent className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Analyzing Contract...</h3>
            <p className="text-muted-foreground">
              Checking for rug pulls, honeypots, and other security risks
            </p>
          </CardContent>
        </Card>
      )}

      {/* Security Report */}
      {report && !isScanning && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{report.tokenName} ({report.symbol})</span>
                    {getRiskBadge(report.riskLevel)}
                  </CardTitle>
                  <CardDescription className="font-mono text-xs">
                    {report.address}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{report.overallScore}/100</div>
                  <div className="text-sm text-muted-foreground">Security Score</div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Warnings */}
          {report.warnings.length > 0 && (
            <Alert className={report.riskLevel === "danger" ? "border-red-500 bg-red-50 dark:bg-red-950" : ""}>
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <div className="space-y-1">
                  {report.warnings.map((warning, index) => (
                    <div key={index} className="text-sm">• {warning}</div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Security Checks */}
          <Card>
            <CardHeader>
              <CardTitle>Security Analysis</CardTitle>
              <CardDescription>Detailed breakdown of security checks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.checks.map((check, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <div className="font-medium">{check.name}</div>
                      <div className="text-sm text-muted-foreground">{check.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </Button>
                <Button variant="outline" className="flex-1">
                  Get Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Common Scams Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Common Crypto Scams to Watch For</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <TrendingDown className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <div className="font-medium">Rug Pulls</div>
                  <div className="text-sm text-muted-foreground">
                    Developers drain liquidity and abandon project
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Lock className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <div className="font-medium">Honeypots</div>
                  <div className="text-sm text-muted-foreground">
                    You can buy but cannot sell the tokens
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <div className="font-medium">Fake Teams</div>
                  <div className="text-sm text-muted-foreground">
                    Anonymous or fake team members
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <div className="font-medium">Pump & Dumps</div>
                  <div className="text-sm text-muted-foreground">
                    Artificial price inflation followed by sell-off
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Disclaimer:</strong> Security analysis is provided for educational purposes only. 
          No tool can guarantee 100% safety. Always conduct thorough research and invest responsibly.
        </p>
      </div>
    </div>
  );
};

export default ScamRadar;
