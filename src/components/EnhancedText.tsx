import { analyzeTextForIcons, getRandomIcons } from "@/utils/iconAnalyzer";
import { FormattedText } from "./FormattedText";

interface EnhancedTextProps {
  text: string;
  showIcons?: boolean;
  maxIcons?: number;
}

export const EnhancedText = ({ text, showIcons = true, maxIcons = 8 }: EnhancedTextProps) => {
  const iconSuggestions = showIcons ? analyzeTextForIcons(text) : [];
  const iconsToShow = iconSuggestions.slice(0, maxIcons);
  
  // If we don't have enough relevant icons, add some random ones for visual appeal
  const additionalIcons = iconsToShow.length < 3 ? getRandomIcons(3 - iconsToShow.length) : [];
  
  return (
    <div className="space-y-4">
      {/* Icon Display */}
      {showIcons && (iconsToShow.length > 0 || additionalIcons.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
          {iconsToShow.map((suggestion, index) => {
            const IconComponent = suggestion.icon;
            return (
              <div 
                key={index}
                className="p-2 bg-white/10 rounded-md border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
                title={`${suggestion.category} (relevance: ${suggestion.relevance})`}
              >
                <IconComponent className="h-4 w-4 text-primary" />
              </div>
            );
          })}
          {additionalIcons.map((IconComponent, index) => (
            <div 
              key={`additional-${index}`}
              className="p-2 bg-white/8 rounded-md border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-200"
            >
              <IconComponent className="h-4 w-4 text-white/70" />
            </div>
          ))}
        </div>
      )}
      
      {/* Formatted Text Content */}
      <FormattedText text={text} />
    </div>
  );
};