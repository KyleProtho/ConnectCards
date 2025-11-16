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

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questions, deckTitle, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [animatingOut, setAnimatingOut] = useState(false);
  const [shouldSlideIn, setShouldSlideIn] = useState(false);

  const handleNext = () => {
    if (currentIndex < questions.length - 1 && !animatingOut) {
      setDirection('next');
      setAnimatingOut(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setAnimatingOut(false);
        setShouldSlideIn(true);
        setTimeout(() => setShouldSlideIn(false), 300);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && !animatingOut) {
      setDirection('previous');
      setAnimatingOut(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setAnimatingOut(false);
        setShouldSlideIn(true);
        setTimeout(() => setShouldSlideIn(false), 300);
      }, 300);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
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

  // Format deck title (replace underscores with spaces)
  const formattedDeckTitle = deckTitle.replace(/_/g, ' ');

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Card Container */}
      <div 
        className="bg-white rounded-xl overflow-hidden relative" 
        style={{ 
          minHeight: '500px', 
          borderColor: bannerColor, 
          borderWidth: '2px', 
          borderStyle: 'solid',
          boxShadow: `
            0 1px 0 rgba(0, 0, 0, 0.05),
            0 2px 0 rgba(0, 0, 0, 0.04),
            0 3px 0 rgba(0, 0, 0, 0.03),
            0 4px 0 rgba(0, 0, 0, 0.02),
            0 5px 0 rgba(0, 0, 0, 0.01),
            0 6px 8px rgba(0, 0, 0, 0.08),
            0 8px 12px rgba(0, 0, 0, 0.06)
          `
        }}
      >
        {/* Back to Decks Button - Top Left */}
        <button 
          onClick={onBack}
          className="absolute top-2 left-4 font-normal text-xs uppercase text-gray-500 z-10 bg-white px-3 py-1 rounded shadow-sm hover:text-gray-700 transition-colors"
          aria-label="Back to deck selection"
        >
          Back to Decks
        </button>

        {/* Centered Content Area - Banner and Question */}
        <div className="absolute inset-0 flex flex-col justify-center items-start overflow-hidden" style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '60px', paddingBottom: '60px' }}>
          {/* Banner - positioned above question */}
          <div className="flex items-center mb-4">
            <div className="px-2 py-1 md:px-3 md:py-1.5 font-bold text-xs md:text-sm" style={{ backgroundColor: bannerColor, color: textColor, fontVariant: 'small-caps', fontFamily: "'TikTok Sans', sans-serif", fontWeight: 700 }}>
              {formattedDeckTitle}
            </div>
            {/* Three vertical decorative lines */}
            <div className="flex gap-0.5 ml-1.5">
              <div className="w-0.5 h-5 md:h-6" style={{ backgroundColor: bannerColor }}></div>
              <div className="w-0.5 h-5 md:h-6" style={{ backgroundColor: bannerColor }}></div>
              <div className="w-0.5 h-5 md:h-6" style={{ backgroundColor: bannerColor }}></div>
            </div>
          </div>

          {/* Question Content - Left Aligned */}
          <p 
            key={currentIndex}
            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-left leading-relaxed ${
              animatingOut 
                ? direction === 'next' 
                  ? 'animate-slide-out-left' 
                  : 'animate-slide-out-right'
                : shouldSlideIn
                  ? direction === 'next'
                    ? 'animate-slide-in-right'
                    : 'animate-slide-in-left'
                  : ''
            }`}
            style={{ 
              color: '#000000', 
              fontFamily: "'Newsreader', serif", 
              fontWeight: 700
            }}
          >
            {questions[currentIndex]}
          </p>
        </div>
          <style>{`
            @keyframes slideInFromRight {
              from {
                opacity: 0;
                transform: translateX(2rem);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slideInFromLeft {
              from {
                opacity: 0;
                transform: translateX(-2rem);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slideOutToLeft {
              from {
                opacity: 1;
                transform: translateX(0);
              }
              to {
                opacity: 0;
                transform: translateX(-2rem);
              }
            }
            @keyframes slideOutToRight {
              from {
                opacity: 1;
                transform: translateX(0);
              }
              to {
                opacity: 0;
                transform: translateX(2rem);
              }
            }
            .animate-slide-in-right {
              animation: slideInFromRight 300ms ease-out;
            }
            .animate-slide-in-left {
              animation: slideInFromLeft 300ms ease-out;
            }
            .animate-slide-out-left {
              animation: slideOutToLeft 300ms ease-in;
            }
            .animate-slide-out-right {
              animation: slideOutToRight 300ms ease-in;
            }
          `}</style>
        </div>

        {/* Navigation Buttons - Bottom Right */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
            style={{ backgroundColor: bannerColor, fontFamily: "'TikTok Sans', sans-serif", fontWeight: 700 }}
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
            aria-label="Previous question"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
            style={{ backgroundColor: bannerColor, fontFamily: "'TikTok Sans', sans-serif", fontWeight: 700 }}
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