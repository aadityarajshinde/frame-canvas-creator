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
  ArrowRight
} from "lucide-react";

interface ToolData {
  name: string;
  description?: string;
  logoUrl?: string;
  comparisonPoints?: string;
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
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
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

  const getToolPricing = (toolName: string) => {
    const name = toolName.toLowerCase();
    if (name.includes('n8n')) return "Free / $20/mo";
    if (name.includes('zapier')) return "$19.99/mo";
    if (name.includes('power')) return "$10/user/mo";
    if (name.includes('python')) return "Free";
    if (name.includes('vertex')) return "Contact vendor";
    return "Contact vendor";
  };

  const getToolFeatures = (tool: ToolData) => {
    // First priority: Use comparisonPoints which contains the actual tool-specific features
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
    
    // Second priority: Extract features from description
    if (tool.description && tool.description.trim()) {
      // Look for sentences that describe capabilities
      const sentences = tool.description
        .split(/[.!?]/)
        .map(s => s.trim())
        .filter(s => s.length > 10 && s.length < 80)
        .slice(0, 4);
      
      if (sentences.length > 0) {
        return sentences;
      }
    }
    
    // Fallback: Tool-specific features based on tool name
    const toolName = tool.name.toLowerCase();
    
    // Machine Learning & Data Science Tools
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
        "Model deployment",
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
        "GPU acceleration",
        "Production deployment"
      ];
    } else if (toolName.includes('pytorch')) {
      return [
        "Dynamic neural networks",
        "Research-focused tools",
        "Automatic differentiation",
        "Distributed training"
      ];
    } else if (toolName.includes('pandas')) {
      return [
        "Data manipulation",
        "Time series analysis",
        "Data cleaning tools",
        "Statistical operations"
      ];
    } else if (toolName.includes('jupyter')) {
      return [
        "Interactive notebooks",
        "Data visualization",
        "Code documentation",
        "Collaborative analysis"
      ];
    } else if (toolName.includes('tableau')) {
      return [
        "Business intelligence",
        "Interactive dashboards",
        "Data visualization",
        "Self-service analytics"
      ];
    } else if (toolName.includes('power bi') || toolName.includes('powerbi')) {
      return [
        "Microsoft ecosystem integration",
        "Real-time analytics",
        "Custom visualizations",
        "Mobile reporting"
      ];
    } else if (toolName.includes('azure') && toolName.includes('ml')) {
      return [
        "Cloud ML platform",
        "MLOps capabilities",
        "Model management",
        "Automated pipelines"
      ];
    } else if (toolName.includes('aws') && (toolName.includes('sagemaker') || toolName.includes('ml'))) {
      return [
        "Cloud-native ML",
        "Managed infrastructure",
        "Built-in algorithms",
        "Model hosting"
      ];
    } else if (toolName.includes('vertex') || (toolName.includes('google') && toolName.includes('ai'))) {
      return [
        "Unified ML platform",
        "Pre-trained models",
        "AutoML features",
        "MLOps workflows"
      ];
    } else if (toolName.includes('databricks')) {
      return [
        "Unified analytics platform",
        "Collaborative notebooks",
        "Delta Lake integration",
        "MLflow model tracking"
      ];
    } else if (toolName.includes('snowflake')) {
      return [
        "Data cloud platform",
        "Scalable compute",
        "Built-in ML functions",
        "Data sharing"
      ];
    } else if (toolName.includes('alteryx')) {
      return [
        "Self-service data prep",
        "Drag-and-drop interface",
        "Advanced analytics",
        "Process automation"
      ];
    } else if (toolName.includes('knime')) {
      return [
        "Visual workflow design",
        "Open-source platform",
        "Extensible architecture",
        "Data integration"
      ];
    } else if (toolName.includes('rapidminer')) {
      return [
        "End-to-end data science",
        "Visual workflow",
        "Auto-model selection",
        "Deployment automation"
      ];
    } else if (toolName.includes('spss')) {
      return [
        "Statistical analysis",
        "Predictive modeling",
        "Survey research tools",
        "Advanced statistics"
      ];
    } else if (toolName.includes('sas')) {
      return [
        "Enterprise analytics",
        "Statistical modeling",
        "Data management",
        "Regulatory compliance"
      ];
    } else if (toolName.includes('r studio') || toolName.includes('rstudio')) {
      return [
        "R programming IDE",
        "Statistical computing",
        "Package management",
        "Reproducible research"
      ];
    } else if (toolName.includes('anaconda')) {
      return [
        "Python/R distribution",
        "Package management",
        "Environment isolation",
        "Data science toolkit"
      ];
    } 
    // AI/ML Specialized Tools
    else if (toolName.includes('hugging') || toolName.includes('face')) {
      return [
        "Pre-trained NLP models",
        "Model fine-tuning",
        "Transformer architecture",
        "Open-source community"
      ];
    } else if (toolName.includes('wandb')) {
      return [
        "Experiment tracking",
        "Model versioning",
        "Hyperparameter tuning",
        "Collaborative ML"
      ];
    } else if (toolName.includes('mlflow')) {
      return [
        "ML lifecycle management",
        "Experiment tracking",
        "Model registry",
        "Deployment tools"
      ];
    }
    // General AI Tools
    else if (toolName.includes('gpt') || toolName.includes('openai')) {
      return [
        "Natural language processing",
        "Conversational AI interface", 
        "Code generation & debugging",
        "Multi-language support"
      ];
    } else if (toolName.includes('claude') || toolName.includes('anthropic')) {
      return [
        "Advanced reasoning capabilities",
        "Long-form content analysis",
        "Ethical AI framework",
        "Constitutional AI approach"
      ];
    } else if (toolName.includes('zapier')) {
      return [
        "Workflow automation",
        "1000+ app integrations",
        "No-code solution",
        "Real-time sync"
      ];
    } else if (toolName.includes('midjourney') || toolName.includes('dall')) {
      return [
        "Text-to-image generation",
        "High-quality artwork",
        "Style customization",
        "Commercial licensing"
      ];
    } else if (toolName.includes('notion')) {
      return [
        "AI writing assistance",
        "Smart templates",
        "Knowledge management",
        "Team collaboration"
      ];
    } else if (toolName.includes('figma')) {
      return [
        "AI design suggestions",
        "Automated layouts", 
        "Smart color palettes",
        "Template creation"
      ];
    } else if (toolName.includes('hubspot') || toolName.includes('salesforce')) {
      return [
        "AI lead scoring",
        "Predictive analytics",
        "Sales forecasting",
        "Customer insights"
      ];
    } else if (toolName.includes('slack') || toolName.includes('teams')) {
      return [
        "AI-powered search",
        "Smart notifications",
        "Meeting insights",
        "Workflow integration"
      ];
    }
    
    // Generic fallback
    return [
      "AI-powered automation",
      "Enhanced productivity",
      "Seamless integration",
      "Scalable solution"
    ];
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
                            <h4 className="font-bold text-black text-lg">
                              {tool.name}
                            </h4>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <DollarSign className="w-3 h-3" />
                              {getToolPricing(tool.name)}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {getToolFeatures(tool).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                              <span>{feature.trim()}</span>
                            </div>
                          ))}
                        </div>
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