interface FormattedTextProps {
  text: string;
  className?: string;
}

export const FormattedText = ({ text, className = "" }: FormattedTextProps) => {
  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Check if line starts with bullet point
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return (
          <div key={index} className="flex items-start gap-2 mb-1">
            <span className="text-primary mt-1">•</span>
            <span>{line.replace(/^[•\-*]\s*/, '')}</span>
          </div>
        );
      } else if (line.trim()) {
        return (
          <p key={index} className="mb-2">
            {line}
          </p>
        );
      } else {
        return <br key={index} />;
      }
    });
  };

  return (
    <div className={`text-white/90 ${className}`}>
      {formatText(text)}
    </div>
  );
};