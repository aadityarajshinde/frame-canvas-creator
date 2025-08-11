import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
}

export const ToolCard = ({ title, icon, className = "" }: ToolCardProps) => {
  return (
    <Card className={`p-4 bg-card border-accent/30 text-accent-foreground ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <div className="p-1.5 bg-accent/10 rounded">
            {icon}
          </div>
        )}
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-accent/20 rounded"></div>
        <div className="h-3 bg-accent/15 rounded w-3/4"></div>
        <div className="h-3 bg-accent/15 rounded w-1/2"></div>
      </div>
    </Card>
  );
};