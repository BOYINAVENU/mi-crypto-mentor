
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain, MessageCircle, Search, Shield, GraduationCap } from "lucide-react";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Brain },
    { path: "/chat", label: "Ask MI", icon: MessageCircle },
    { path: "/search", label: "Token Search", icon: Search },
    { path: "/scam-radar", label: "Scam Radar", icon: Shield },
    { path: "/beginner", label: "Learn", icon: GraduationCap },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MI
            </span>
            <div className="hidden sm:flex items-center space-x-2 bg-purple-50 dark:bg-purple-950 rounded-full px-3 py-1 border">
              <img 
                src="/lovable-uploads/22453a88-3fd8-494b-b1e4-949e4221cfec.png" 
                alt="MemeX Token" 
                className="w-4 h-4 rounded-full"
              />
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300">$MEMEX</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://memextoken.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="flex items-center space-x-2">
                <img 
                  src="/lovable-uploads/22453a88-3fd8-494b-b1e4-949e4221cfec.png" 
                  alt="MemeX Token" 
                  className="w-4 h-4 rounded-full"
                />
                <span>Get $MEMEX</span>
              </Button>
            </a>
            <a
              href="https://t.me/MemeXGloball"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Join Telegram
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <a
                href="https://memextoken.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
              >
                <Button variant="outline" className="w-full">
                  <img 
                    src="/lovable-uploads/22453a88-3fd8-494b-b1e4-949e4221cfec.png" 
                    alt="MemeX Token" 
                    className="w-4 h-4 rounded-full mr-2"
                  />
                  Get $MEMEX
                </Button>
              </a>
              <a
                href="https://t.me/MemeXGloball"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
              >
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  Join Telegram
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
