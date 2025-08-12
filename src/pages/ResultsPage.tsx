import { DashboardCard } from "@/components/DashboardCard";
import { ToolCard } from "@/components/ToolCard";
import { EnhancedText } from "@/components/EnhancedText";
import { analyzeTextForIcons } from "@/utils/iconAnalyzer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colorThemes, type ColorTheme } from "@/components/ColorThemeSelector";
import { 
  Building2, 
  Clock, 
  Brain, 
  Zap,
  DollarSign,
  Workflow,
  BarChart3,
  Code,
  Globe
} from "lucide-react";

interface FormData {
  topic: string;
  businessFundamentals: string;
  currentSolutionLandscape: string;
  aiFundamentals: string;
  aiSolutionAndTools: string;
  aiToolsAppendix: Array<{
    name: string;
    description: string;
    logoUrl?: string;
    comparisonPoints: string;
  }>;
  colorTheme: string;
}

const ResultsPage = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setFormData(data);
      // Find and set the selected theme
      const theme = colorThemes.find(t => t.name === data.colorTheme) || colorThemes[0];
      setSelectedTheme(theme);
    } else {
      // Redirect to form if no data found
      navigate("/");
    }
  }, [navigate]);

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const dynamicStyles = selectedTheme ? {
    background: selectedTheme.background,
    '--primary': selectedTheme.primary,
    '--secondary': selectedTheme.secondary,
    '--accent': selectedTheme.accent,
  } as React.CSSProperties : {};

  return (
    <div 
      className="min-h-screen p-6" 
      style={dynamicStyles}
    >
      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2" style={{ color: selectedTheme?.primary }}>
          {formData.topic}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Dashboard Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Fundamentals */}
          <DashboardCard
            title="Business Fundamentals"
            icon={(() => {
              const icons = analyzeTextForIcons(formData.businessFundamentals);
              const IconComponent = icons[0]?.icon || Building2;
              return <IconComponent className="h-6 w-6" />;
            })()}
            variant="primary"
            content={<EnhancedText text={formData.businessFundamentals} maxIcons={6} />}
          />

          {/* Current Solution Landscape */}
          <DashboardCard
            title="Current Solution Landscape"
            icon={(() => {
              const icons = analyzeTextForIcons(formData.currentSolutionLandscape);
              const IconComponent = icons[0]?.icon || Clock;
              return <IconComponent className="h-6 w-6" />;
            })()}
            variant="secondary"
            content={<EnhancedText text={formData.currentSolutionLandscape} maxIcons={6} />}
          />

          {/* AI Fundamentals */}
          <DashboardCard
            title="AI Fundamentals"
            icon={(() => {
              const icons = analyzeTextForIcons(formData.aiFundamentals);
              const IconComponent = icons[0]?.icon || Brain;
              return <IconComponent className="h-6 w-6" />;
            })()}
            variant="accent"
            content={<EnhancedText text={formData.aiFundamentals} maxIcons={6} />}
          />

          {/* AI Solution and Tools */}
          <DashboardCard
            title="AI Solution and Tools"
            icon={(() => {
              const icons = analyzeTextForIcons(formData.aiSolutionAndTools);
              const IconComponent = icons[0]?.icon || Zap;
              return <IconComponent className="h-6 w-6" />;
            })()}
            variant="primary"
            content={<EnhancedText text={formData.aiSolutionAndTools} maxIcons={8} />}
          />
        </div>

        {/* Tools Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/8 rounded-xl p-4 border border-white/15 backdrop-blur-xl shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Code className="h-5 w-5" />
              AI Tools Appendix
            </h2>
            <div className="space-y-3">
              {formData.aiToolsAppendix.map((tool, index) => {
                const toolIcons = analyzeTextForIcons(`${tool.name} ${tool.description} ${tool.comparisonPoints}`);
                const IconComponent = toolIcons[0]?.icon || Code;
                return (
                  <ToolCard 
                    key={index}
                    title={tool.name} 
                    description={tool.description}
                    comparisonPoints={tool.comparisonPoints}
                    logoUrl={tool.logoUrl}
                    icon={<IconComponent className="h-4 w-4" />}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;