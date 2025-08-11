import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  description?: string;
  comparisonPoints?: string;
  logoUrl?: string;
}

export const ToolCard = ({ title, icon, className = "", description, comparisonPoints, logoUrl }: ToolCardProps) => {
  return (
    <Card className={`p-4 bg-white/8 border-white/15 backdrop-blur-xl shadow-lg transition-all duration-300 hover:bg-white/12 hover:border-white/25 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        {(logoUrl || icon) && (
          <div className="p-1.5 bg-primary/20 rounded border border-primary/30 backdrop-blur-sm">
            {logoUrl ? (
              <img src={logoUrl} alt={`${title} logo`} className="h-4 w-4 object-contain" />
            ) : (
              icon
            )}
          </div>
        )}
        <h3 className="font-semibold text-sm text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        {description ? (
          <p className="text-xs text-white/80 leading-relaxed">{description}</p>
        ) : (
          <div className="h-4 bg-white/20 rounded backdrop-blur-sm"></div>
        )}
        {comparisonPoints ? (
          <div className="text-xs text-white/70">
            {comparisonPoints.split('\n').map((point, index) => (
              <div key={index} className="flex items-start gap-1 mb-1">
                {point.trim().startsWith('•') || point.trim().startsWith('-') || point.trim().startsWith('*') ? (
                  <>
                    <span className="text-primary text-xs mt-0.5">•</span>
                    <span className="text-xs">{point.replace(/^[•\-*]\s*/, '')}</span>
                  </>
                ) : point.trim() ? (
                  <span className="text-xs">{point}</span>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="h-3 bg-white/15 rounded w-3/4 backdrop-blur-sm"></div>
            <div className="h-3 bg-white/15 rounded w-1/2 backdrop-blur-sm"></div>
          </>
        )}
      </div>
    </Card>
  );
};