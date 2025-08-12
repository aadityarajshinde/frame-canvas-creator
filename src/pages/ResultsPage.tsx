import { DashboardCard } from "@/components/DashboardCard";
import { ToolCard } from "@/components/ToolCard";
import { FormattedText } from "@/components/FormattedText";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
}

const ResultsPage = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
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

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          {formData.topic}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Dashboard Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Fundamentals */}
          <DashboardCard
            title="Business Fundamentals"
            icon={<Building2 className="h-6 w-6" />}
            variant="primary"
            content={<FormattedText text={formData.businessFundamentals} />}
          />

          {/* Current Solution Landscape */}
          <DashboardCard
            title="Current Solution Landscape"
            icon={<Clock className="h-6 w-6" />}
            variant="secondary"
            content={<FormattedText text={formData.currentSolutionLandscape} />}
          />

          {/* AI Fundamentals */}
          <DashboardCard
            title="AI Fundamentals"
            icon={<Brain className="h-6 w-6" />}
            variant="accent"
            content={<FormattedText text={formData.aiFundamentals} />}
          />

          {/* AI Solution and Tools */}
          <DashboardCard
            title="AI Solution and Tools"
            icon={<Zap className="h-6 w-6" />}
            variant="primary"
            content={<FormattedText text={formData.aiSolutionAndTools} />}
          />
        </div>

        {/* Tools Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/8 rounded-xl p-4 border border-white/15 backdrop-blur-xl shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4">
              AI Tools Appendix (Comparison Table)
            </h2>
            <div className="space-y-3">
              {formData.aiToolsAppendix.map((tool, index) => (
                <ToolCard 
                  key={index}
                  title={tool.name} 
                  description={tool.description}
                  comparisonPoints={tool.comparisonPoints}
                  logoUrl={tool.logoUrl}
                  icon={<Code className="h-4 w-4" />}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;