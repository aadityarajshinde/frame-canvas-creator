import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Globe, 
  Brain, 
  Cog, 
  Table,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  Zap,
  Users,
  BarChart3,
  Code,
  MessageSquare,
  Target,
  TrendingUp,
  Star,
  Lightbulb,
  Settings,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ToolData {
  name: string;
  description?: string;
  logoUrl?: string;
  comparisonPoints?: string;
  pricing?: string;
  features?: string[];
  effectiveness?: string;
  category?: string;
  isLoading?: boolean;
}

interface EnhancedToolInfo {
  name: string;
  pricing: string;
  features: string[];
  description: string;
  effectiveness: string;
  category: string;
}

interface FormData {
  topic: string;
  businessFundamentals: string;
  currentSolutionLandscape: string;
  aiFundamentals: string;
  aiSolutionAndTools: string;
  aiToolsAppendix: ToolData[];
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [enhancedTools, setEnhancedTools] = useState<Map<string, EnhancedToolInfo>>(new Map());
  const [loadingTools, setLoadingTools] = useState<Set<string>>(new Set());

  const fetchToolInfo = async (toolName: string, context: string) => {
    if (enhancedTools.has(toolName) || loadingTools.has(toolName)) {
      return; // Already fetched or currently fetching
    }

    setLoadingTools(prev => new Set(prev).add(toolName));

    try {
      console.log(`Fetching real-time info for ${toolName}...`);
      
      const response = await fetch('/functions/v1/fetch-tool-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolName,
          context: context || 'AI/ML workflow automation'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const toolInfo: EnhancedToolInfo = await response.json();
      
      setEnhancedTools(prev => new Map(prev).set(toolName, toolInfo));
      
      console.log(`Successfully fetched info for ${toolName}:`, toolInfo);
      
    } catch (error) {
      console.error(`Error fetching info for ${toolName}:`, error);
      toast({
        title: "Info Fetch Failed",
        description: `Could not fetch current info for ${toolName}. Using fallback data.`,
        variant: "destructive",
      });
    } finally {
      setLoadingTools(prev => {
        const newSet = new Set(prev);
        newSet.delete(toolName);
        return newSet;
      });
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setFormData(data);
      
      // Fetch real-time info for all tools
      if (data.aiToolsAppendix && data.aiToolsAppendix.length > 0) {
        toast({
          title: "Fetching Real-Time Tool Data",
          description: `Getting current pricing and features for ${data.aiToolsAppendix.length} tools...`,
        });
        
        data.aiToolsAppendix.forEach((tool: ToolData, index: number) => {
          if (tool.name) {
            // Stagger the requests to avoid overwhelming the API
            setTimeout(() => {
              fetchToolInfo(tool.name, data.topic);
            }, index * 1500); // 1.5 second delay between each request
          }
        });
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!formData) {
    return null;
  }

  const formatTextWithIcons = (text: string, sectionType: string) => {
    const icons = {
      business: [Target, TrendingUp, Star, Lightbulb, Settings, ArrowRight],
      landscape: [Globe, BarChart3, Users, Code, Zap, MessageSquare],
      ai: [Brain, Cog, Star, Lightbulb, Target, TrendingUp],
      solution: [Settings, Code, Zap, MessageSquare, Brain, Cog]
    };
    
    const sectionIcons = icons[sectionType as keyof typeof icons] || icons.business;
    
    return text.split('\n').map((line, index) => {
      if (line.trim()) {
        const IconComponent = sectionIcons[index % sectionIcons.length];
        return (
          <div key={index} className="flex items-start gap-2 mb-2">
            <IconComponent className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#00ff41' }} />
            <span>{line}</span>
          </div>
        );
      }
      return <div key={index} className="mb-1" />;
    });
  };

  const getToolInitial = (toolName: string) => {
    return toolName.charAt(0).toUpperCase();
  };

  const getToolFeatures = (tool: ToolData): string[] => {
    const enhancedInfo = enhancedTools.get(tool.name);
    
    // Use real-time fetched features if available
    if (enhancedInfo && enhancedInfo.features && enhancedInfo.features.length > 0) {
      return enhancedInfo.features.slice(0, 4);
    }
    
    // Check if currently loading
    if (loadingTools.has(tool.name)) {
      return ["Fetching real-time data...", "Please wait...", "", ""];
    }
    
    // Fallback to existing logic for immediate display
    if (tool.comparisonPoints && tool.comparisonPoints.trim()) {
      const features = tool.comparisonPoints
        .split('\n')
        .map(point => point.replace(/^•\s*/, '').trim())
        .filter(point => point && point.length > 5)
        .slice(0, 4);
      
      if (features.length > 0) {
        return features;
      }
    }
    
    // Tool-specific fallbacks while waiting for real data
    const toolName = tool.name.toLowerCase();
    
    if (toolName.includes('scikit') || toolName.includes('sklearn')) {
      return [
        "Classification algorithms",
        "Regression modeling", 
        "Clustering analysis",
        "Feature selection tools"
      ];
    } else if (toolName.includes('datarobot')) {
      return [
        "Automated machine learning",
        "Model deployment platform",
        "Bias & fairness monitoring",
        "Production ML lifecycle"
      ];
    } else if (toolName.includes('h2o')) {
      return [
        "AutoML capabilities",
        "Distributed computing",
        "Model interpretability",
        "Real-time scoring"
      ];
    } else if (toolName.includes('tensorflow')) {
      return [
        "Deep learning framework",
        "Neural network training",
        "Mobile deployment",
        "Production serving"
      ];
    } else if (toolName.includes('pytorch')) {
      return [
        "Dynamic neural networks",
        "Research-focused tools",
        "Automatic differentiation",
        "Distributed training"
      ];
    } else if (toolName.includes('tableau')) {
      return [
        "Business intelligence",
        "Interactive dashboards",
        "Data visualization",
        "Self-service analytics"
      ];
    } else if (toolName.includes('power bi')) {
      return [
        "Microsoft integration",
        "Real-time analytics",
        "Custom visualizations",
        "Mobile reporting"
      ];
    } else if (toolName.includes('jupyter')) {
      return [
        "Interactive notebooks",
        "Data visualization",
        "Code documentation",
        "Collaborative analysis"
      ];
    }
    
    return [
      "AI-powered capabilities",
      "Enhanced productivity",
      "Seamless integration",
      "Scalable solution"
    ];
  };

  const getToolPricing = (tool: ToolData): string => {
    const enhancedInfo = enhancedTools.get(tool.name);
    
    // Use real-time pricing if available
    if (enhancedInfo && enhancedInfo.pricing) {
      return enhancedInfo.pricing;
    }
    
    // Check if currently loading
    if (loadingTools.has(tool.name)) {
      return "Fetching current pricing...";
    }
    
    // Fallback pricing while waiting for real data
    const toolName = tool.name.toLowerCase();
    
    if (toolName.includes('scikit') || toolName.includes('sklearn')) {
      return "Free (Open Source)";
    } else if (toolName.includes('tensorflow') || toolName.includes('pytorch')) {
      return "Free (Open Source)";
    } else if (toolName.includes('jupyter')) {
      return "Free (Open Source)";
    } else if (toolName.includes('datarobot')) {
      return "Enterprise pricing";
    } else if (toolName.includes('tableau')) {
      return "$70/user/month";
    } else if (toolName.includes('power bi')) {
      return "$10/user/month";
    } else if (toolName.includes('h2o')) {
      return "Free tier available";
    }
    
    return "Contact vendor";
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </Button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: '#00ff41' }}
            >
              {formData.topic}
            </h1>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Left Column - 2x2 Grid */}
            <div className="col-span-8 grid grid-cols-2 gap-6">
              {/* Business Fundamentals */}
              <Card 
                className="h-full"
                style={{ 
                  backgroundColor: '#2a2a2a',
                  border: '2px solid #00ff41',
                  borderRadius: '12px'
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: '#00ff41' }}
                    >
                      <Building2 className="w-5 h-5 text-black" />
                    </div>
                    <h3 
                      className="text-lg font-bold"
                      style={{ color: '#00ff41' }}
                    >
                      Business Fundamentals
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 h-full overflow-auto">
                  <div className="text-white text-sm leading-relaxed">
                    {formatTextWithIcons(formData.businessFundamentals, 'business')}
                  </div>
                </CardContent>
              </Card>

              {/* Current Solution Landscape */}
              <Card 
                className="h-full"
                style={{ 
                  backgroundColor: '#2a2a2a',
                  border: '2px solid #00ff41',
                  borderRadius: '12px'
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: '#00ff41' }}
                    >
                      <Globe className="w-5 h-5 text-black" />
                    </div>
                    <h3 
                      className="text-lg font-bold"
                      style={{ color: '#00ff41' }}
                    >
                      Current Solution Landscape
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 h-full overflow-auto">
                  <div className="text-white text-sm leading-relaxed">
                    {formatTextWithIcons(formData.currentSolutionLandscape, 'landscape')}
                  </div>
                </CardContent>
              </Card>

              {/* AI Fundamentals */}
              <Card 
                className="h-full"
                style={{ 
                  backgroundColor: '#2a2a2a',
                  border: '2px solid #00ff41',
                  borderRadius: '12px'
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: '#00ff41' }}
                    >
                      <Brain className="w-5 h-5 text-black" />
                    </div>
                    <h3 
                      className="text-lg font-bold"
                      style={{ color: '#00ff41' }}
                    >
                      AI Fundamentals
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 h-full overflow-auto">
                  <div className="text-white text-sm leading-relaxed">
                    {formatTextWithIcons(formData.aiFundamentals, 'ai')}
                  </div>
                </CardContent>
              </Card>

              {/* AI Solution and Tools */}
              <Card 
                className="h-full"
                style={{ 
                  backgroundColor: '#2a2a2a',
                  border: '2px solid #00ff41',
                  borderRadius: '12px'
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: '#00ff41' }}
                    >
                      <Cog className="w-5 h-5 text-black" />
                    </div>
                    <h3 
                      className="text-lg font-bold"
                      style={{ color: '#00ff41' }}
                    >
                      AI Solution and Tools
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 h-full overflow-auto">
                  <div className="text-white text-sm leading-relaxed">
                    {formatTextWithIcons(formData.aiSolutionAndTools, 'solution')}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - AI Tools Appendix */}
            <div className="col-span-4">
              <Card 
                className="h-full"
                style={{ 
                  backgroundColor: '#2a2a2a',
                  border: '2px solid #00ff41',
                  borderRadius: '12px'
                }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: '#00ff41' }}
                    >
                      <Table className="w-5 h-5 text-black" />
                    </div>
                    <h3 
                      className="text-lg font-bold"
                      style={{ color: '#00ff41' }}
                    >
                      AI Tools Appendix (Comparison Table)
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 h-full overflow-auto">
                  <div className="space-y-4">
                    {formData.aiToolsAppendix.map((tool, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-lg border-2"
                        style={{ 
                          backgroundColor: 'white',
                          borderColor: '#e5e5e5'
                        }}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-shrink-0">
                            {tool.logoUrl ? (
                              <img 
                                src={tool.logoUrl} 
                                alt={tool.name}
                                className="w-8 h-8 rounded"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (nextElement) nextElement.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm"
                              style={{ display: tool.logoUrl ? 'none' : 'flex' }}
                            >
                              {getToolInitial(tool.name)}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-black text-lg">
                                {tool.name}
                              </h4>
                              {loadingTools.has(tool.name) && (
                                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                              <DollarSign className="w-3 h-3" />
                              {getToolPricing(tool)}
                            </div>
                            {enhancedTools.get(tool.name)?.category && (
                              <div className="text-xs text-blue-600 font-medium">
                                {enhancedTools.get(tool.name)?.category}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {getToolFeatures(tool).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                              {loadingTools.has(tool.name) ? (
                                <Loader2 className="w-3 h-3 animate-spin text-blue-500 flex-shrink-0" />
                              ) : (
                                <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                              )}
                              <span>{feature.trim()}</span>
                            </div>
                          ))}
                        </div>

                        {enhancedTools.get(tool.name)?.effectiveness && (
                          <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800">
                            <strong>Effectiveness:</strong> {enhancedTools.get(tool.name)?.effectiveness}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;