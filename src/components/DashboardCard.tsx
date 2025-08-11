import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "warning";
  className?: string;
  content?: ReactNode;
}

export const DashboardCard = ({ 
  title, 
  icon, 
  variant = "primary",
  className = "",
  content
}: DashboardCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl";
      case "secondary":
        return "bg-white/8 border-white/15 backdrop-blur-xl shadow-xl";
      case "accent":
        return "bg-primary/10 border-primary/20 backdrop-blur-xl shadow-2xl";
      case "warning":
        return "bg-white/6 border-white/10 backdrop-blur-xl shadow-lg";
      default:
        return "bg-white/8 border-white/15 backdrop-blur-xl shadow-lg";
    }
  };

  return (
    <Card className={`p-6 border transition-all duration-300 hover:bg-white/15 hover:border-white/30 ${getVariantStyles()} ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
            {icon}
          </div>
        )}
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="min-h-[200px] bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm p-4">
        {content || <div className="text-white/50 text-sm">No content provided</div>}
      </div>
    </Card>
  );
};