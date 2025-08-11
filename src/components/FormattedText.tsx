interface FormattedTextProps {
  text: string;
  className?: string;
}

export const FormattedText = ({ text, className = "" }: FormattedTextProps) => {
  const formatText = (text: string) => {
    // Clean and normalize the text
    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const formattedLines: JSX.Element[] = [];
    let currentSection: string[] = [];
    let sectionIndex = 0;

    const processBulletPoint = (content: string) => {
      // Remove any existing bullet points, numbers, or markers
      const cleanContent = content
        .replace(/^[\d]+[\.\)\:]?\s*/, '') // Remove numbers like "1.", "1)", "1:"
        .replace(/^[•\-\*\+]\s*/, '') // Remove bullet markers
        .replace(/^[a-zA-Z][\.\)]\s*/, '') // Remove letter markers like "a.", "b)"
        .trim();
      
      return cleanContent;
    };

    const addSection = () => {
      if (currentSection.length > 0) {
        // If only one item, treat as paragraph
        if (currentSection.length === 1) {
          formattedLines.push(
            <p key={`section-${sectionIndex}`} className="mb-3 leading-relaxed">
              {currentSection[0]}
            </p>
          );
        } else {
          // Multiple items, create bullet list
          formattedLines.push(
            <div key={`section-${sectionIndex}`} className="mb-4">
              {currentSection.map((item, idx) => (
                <div key={`bullet-${sectionIndex}-${idx}`} className="flex items-start gap-3 mb-2">
                  <span className="text-primary mt-1.5 text-sm">•</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          );
        }
        currentSection = [];
        sectionIndex++;
      }
    };

    lines.forEach((line) => {
      // Check if line looks like a bullet point or numbered item
      const isBulletPoint = /^[\d]+[\.\)\:]?\s*/.test(line) || 
                           /^[•\-\*\+]\s*/.test(line) || 
                           /^[a-zA-Z][\.\)]\s*/.test(line);

      if (isBulletPoint) {
        const cleanContent = processBulletPoint(line);
        if (cleanContent) {
          currentSection.push(cleanContent);
        }
      } else {
        // Not a bullet point, add current section and start new paragraph
        addSection();
        if (line.trim()) {
          currentSection.push(line);
        }
      }
    });

    // Add remaining section
    addSection();

    return formattedLines;
  };

  return (
    <div className={`text-white/90 ${className}`}>
      {formatText(text)}
    </div>
  );
};