import React, { useState, useEffect } from 'react';

interface QuestionDisplayProps {
  questions: string[];
  deckTitle: string;
  onBack: () => void;
}

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questions, deckTitle, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleNavigation = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < questions.length) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setIsFading(false);
      }, 200);
    }
  };

  const handlePrev = () => {
    handleNavigation(currentIndex - 1);
  };

  const handleNext = () => {
    handleNavigation(currentIndex + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions.length]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg flex flex-col items-center border border-gray-200 relative">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition-colors"
        aria-label="Back to deck selection"
      >
        &larr; Back to Decks
      </button>

      <div className="text-center w-full">
        <p className="text-indigo-600 font-semibold mb-2">{deckTitle}</p>
        <p className="text-gray-500 mb-8 font-medium">Question {currentIndex + 1} of {questions.length}</p>
        
        <div className="relative min-h-[200px] md:min-h-[250px] flex items-center justify-center px-4">
          <p 
            key={currentIndex} 
            className={`text-2xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 transition-all duration-200 ease-in-out ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            {questions[currentIndex]}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-8">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-gray-200 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          aria-label="Previous question"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          className="p-3 rounded-full bg-gray-200 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          aria-label="Next question"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default QuestionDisplay;
