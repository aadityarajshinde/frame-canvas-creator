import { DashboardCard } from "@/components/DashboardCard";
import { ToolCard } from "@/components/ToolCard";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background p-6">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          The Topic
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
          />

          {/* Current Solution Landscape */}
          <DashboardCard
            title="Current Solution Landscape"
            icon={<Clock className="h-6 w-6" />}
            variant="secondary"
          />

          {/* AI Fundamentals */}
          <DashboardCard
            title="AI Fundamentals"
            icon={<Brain className="h-6 w-6" />}
            variant="accent"
          />

          {/* AI Solution and Tools */}
          <DashboardCard
            title="AI Solution and Tools"
            icon={<Zap className="h-6 w-6" />}
            variant="primary"
          />
        </div>

        {/* Tools Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/8 rounded-xl p-4 border border-white/15 backdrop-blur-xl shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4">
              AI Tools Appendix (Comparison Table)
            </h2>
            <div className="space-y-3">
              <ToolCard 
                title="n8n" 
                icon={<Workflow className="h-4 w-4" />}
              />
              <ToolCard 
                title="Zapier AI Agents" 
                icon={<Zap className="h-4 w-4" />}
              />
              <ToolCard 
                title="Power BI" 
                icon={<BarChart3 className="h-4 w-4" />}
              />
              <ToolCard 
                title="Python (pandas, NumPy)" 
                icon={<Code className="h-4 w-4" />}
              />
              <ToolCard 
                title="Google Vertex AI" 
                icon={<Globe className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;