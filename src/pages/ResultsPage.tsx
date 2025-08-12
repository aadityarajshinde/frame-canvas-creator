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
  MessageSquare
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

  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index} className="mb-1">
        {line}
      </div>
    ));
  };

  const getToolIcon = (toolName: string) => {
    const name = toolName.toLowerCase();
    if (name.includes('zapier') || name.includes('automation')) return <Zap className="w-4 h-4" />;
    if (name.includes('power') || name.includes('bi')) return <BarChart3 className="w-4 h-4" />;
    if (name.includes('python') || name.includes('code')) return <Code className="w-4 h-4" />;
    if (name.includes('chat') || name.includes('gpt')) return <MessageSquare className="w-4 h-4" />;
    if (name.includes('vertex') || name.includes('google')) return <Brain className="w-4 h-4" />;
    return <Cog className="w-4 h-4" />;
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
    if (tool.comparisonPoints) {
      return tool.comparisonPoints.split('•').filter(point => point.trim()).slice(0, 3);
    }
    return ["Feature 1", "Feature 2", "Feature 3"];
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
                    {formatText(formData.businessFundamentals)}
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
                    {formatText(formData.currentSolutionLandscape)}
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
                    {formatText(formData.aiFundamentals)}
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
                    {formatText(formData.aiSolutionAndTools)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - AI Tools Appendix */}
            <div className="col-span-4">
              <Card 
                className="h-full"
                style={{ 
                  backgroundColor: '#f5f5f5',
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
                      className="text-lg font-bold text-black"
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
                              className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center"
                              style={{ display: tool.logoUrl ? 'none' : 'flex' }}
                            >
                              {getToolIcon(tool.name)}
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