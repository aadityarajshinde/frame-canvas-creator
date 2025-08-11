import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
}

export const ToolCard = ({ title, icon, className = "" }: ToolCardProps) => {
  return (
    <Card className={`p-4 bg-white/8 border-white/15 backdrop-blur-xl shadow-lg transition-all duration-300 hover:bg-white/12 hover:border-white/25 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <div className="p-1.5 bg-primary/20 rounded border border-primary/30 backdrop-blur-sm">
            {icon}
          </div>
        )}
        <h3 className="font-semibold text-sm text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-white/20 rounded backdrop-blur-sm"></div>
        <div className="h-3 bg-white/15 rounded w-3/4 backdrop-blur-sm"></div>
        <div className="h-3 bg-white/15 rounded w-1/2 backdrop-blur-sm"></div>
      </div>
    </Card>
  );
};