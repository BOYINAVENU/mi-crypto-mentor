
import { Brain, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The ChatGPT of Crypto — Powered by MemeX
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2 text-sm">
              <a href="/chat" className="block text-muted-foreground hover:text-foreground">
                Ask MI
              </a>
              <a href="/search" className="block text-muted-foreground hover:text-foreground">
                Token Search
              </a>
              <a href="/scam-radar" className="block text-muted-foreground hover:text-foreground">
                Scam Radar
              </a>
              <a href="/beginner" className="block text-muted-foreground hover:text-foreground">
                Learn Crypto
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <div className="space-y-2 text-sm">
              <a
                href="https://t.me/MemeXGloball"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
              >
                <span>Telegram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://memextoken.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
              >
                <span>MemeX Token</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Disclaimer
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 MI (MemeX Intelligence). All rights reserved.</p>
          <p className="mt-1">
            Not financial advice. DYOR. Crypto is risky.
          </p>
        </div>
      </div>
    </footer>
  );
}
