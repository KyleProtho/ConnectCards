import React, { useState, useEffect } from 'react';

interface QuestionDisplayProps {
  questions: string[];
  deckTitle: string;
  onBack: () => void;
}

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questions, deckTitle, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsFading(false);
      }, 200);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions.length]);

  // Deck color mapping
  const getDeckColor = (deck: string): string => {
    const colorMap: Record<string, string> = {
      'Dating': '#EFD0CA',
      'Friends': '#5C7457',
      'Long-Term Relationship': '#A23E48',
      'Coworkers': '#3D3B30',
      'Strangers': '#6C8EAD',
    };
    return colorMap[deck] || '#DC2626'; // Default to red if deck not found
  };

  const bannerColor = getDeckColor(deckTitle);
  
  // Determine text color based on banner color (light or dark)
  const getTextColor = (bgColor: string): string => {
    // For light backgrounds, use dark text; for dark backgrounds, use light text
    const lightColors = ['#EFD0CA']; // Dating
    return lightColors.includes(bgColor) ? '#000000' : '#FFFFFF';
  };

  const textColor = getTextColor(bannerColor);

  // Format deck title to uppercase
  const formattedDeckTitle = deckTitle.toUpperCase().replace(/_/g, ' ');

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden relative" style={{ minHeight: '500px', borderColor: bannerColor, borderWidth: '2px', borderStyle: 'solid' }}>
        {/* Banner at Top */}
        <div className="px-6 py-3 font-bold text-lg md:text-xl text-center" style={{ backgroundColor: bannerColor, color: textColor }}>
          {formattedDeckTitle}
        </div>

        {/* Back to Decks Button - Top Right */}
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 font-semibold text-sm md:text-base transition-colors z-10 bg-white px-3 py-1 rounded shadow-sm"
          style={{ color: bannerColor }}
          onMouseEnter={(e) => {
            const hex = bannerColor.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const darker = `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`;
            e.currentTarget.style.color = darker;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = bannerColor;
          }}
          aria-label="Back to deck selection"
        >
          Back to Decks
        </button>

        {/* Question Content */}
        <div className="relative flex items-center justify-center px-6 md:px-10 py-12 md:py-16" style={{ minHeight: '400px' }}>
          <p 
            key={currentIndex} 
            className={`text-xl md:text-3xl lg:text-4xl font-bold text-center transition-all duration-200 ease-in-out leading-tight ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            style={{ color: bannerColor }}
          >
            {questions[currentIndex]}
          </p>
        </div>

        {/* Next Button - Bottom Right */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
            style={{ backgroundColor: bannerColor }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                const hex = bannerColor.replace('#', '');
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                const darker = `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`;
                e.currentTarget.style.backgroundColor = darker;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = bannerColor;
            }}
            aria-label="Next question"
          >
            Next
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;