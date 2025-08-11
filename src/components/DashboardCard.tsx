import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "warning";
  className?: string;
}

export const DashboardCard = ({ 
  title, 
  icon, 
  variant = "primary",
  className = "" 
}: DashboardCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-primary border-primary/20 shadow-glow";
      case "secondary":
        return "bg-gradient-secondary border-secondary/20 shadow-accent";
      case "accent":
        return "bg-gradient-accent border-success/20";
      case "warning":
        return "bg-warning border-warning/20 text-warning-foreground";
      default:
        return "bg-card border-border";
    }
  };

  return (
    <Card className={`p-6 border-2 transition-all duration-300 ${getVariantStyles()} ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="p-2 bg-background/10 rounded-lg backdrop-blur-sm">
            {icon}
          </div>
        )}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="min-h-[200px] bg-background/5 rounded-lg border border-background/10 backdrop-blur-sm">
        {/* Empty content area */}
      </div>
    </Card>
  );
};