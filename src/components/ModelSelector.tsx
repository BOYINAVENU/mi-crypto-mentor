
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Cloud, Zap, Globe } from "lucide-react";

export type ModelType = 'local' | 'api' | 'mock';

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  isLocalModelLoading: boolean;
}

export const ModelSelector = ({ 
  selectedModel, 
  onModelChange, 
  isLocalModelLoading 
}: ModelSelectorProps) => {
  const [showSelector, setShowSelector] = useState(false);

  const models = [
    {
      type: 'local' as ModelType,
      name: 'Gemma 3n E4B',
      description: 'Google\'s multimodal AI running in your browser',
      icon: Cpu,
      badge: 'Image + Text',
      pros: ['No API costs', 'Privacy focused', 'Supports images', 'Works offline'],
      cons: ['Slower initial loading', 'Requires WebGPU/CPU resources']
    },
    {
      type: 'api' as ModelType,
      name: 'Hugging Face API',
      description: 'Cloud-based AI with API key',
      icon: Cloud,
      badge: 'Most Powerful',
      pros: ['Fast responses', 'High quality', 'Latest models'],
      cons: ['Requires API key', 'Usage limits']
    },
    {
      type: 'mock' as ModelType,
      name: 'Demo Mode',
      description: 'Try without setup',
      icon: Globe,
      badge: 'Quick Start',
      pros: ['No setup needed', 'Instant access'],
      cons: ['Limited responses', 'Not real AI']
    }
  ];

  if (!showSelector) {
    return (
      <div className="flex items-center justify-center mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSelector(true)}
          className="text-xs"
        >
          <Zap className="w-3 h-3 mr-1" />
          AI Model: {models.find(m => m.type === selectedModel)?.name}
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Choose AI Model</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSelector(false)}
          >
            ×
          </Button>
        </div>
        
        <div className="grid gap-3">
          {models.map((model) => {
            const Icon = model.icon;
            const isSelected = selectedModel === model.type;
            const isLoading = model.type === 'local' && isLocalModelLoading;
            
            return (
              <div
                key={model.type}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => !isLoading && onModelChange(model.type)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{model.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {model.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{model.description}</p>
                    </div>
                  </div>
                  {isLoading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
