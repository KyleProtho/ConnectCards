import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ThumbsUp, ThumbsDown } from 'lucide-react';

interface QuestionDisplayProps {
  questions: string[];
  deckTitle: string;
  onBack: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questions, deckTitle, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [animatingOut, setAnimatingOut] = useState(false);
  const [shouldSlideIn, setShouldSlideIn] = useState(false);
  // Track feedback for each question: 'up', 'down', or null
  const [feedback, setFeedback] = useState<Record<number, 'up' | 'down' | null>>({});

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

  // Swipe detection
  const minSwipeDistance = 50;
  const touchStartRef = React.useRef<number | null>(null);
  const touchEndRef = React.useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    // Reset
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // Handle feedback clicks
  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(prev => ({
      ...prev,
      [currentIndex]: prev[currentIndex] === type ? null : type
    }));
  };

  // Format deck title (replace underscores with spaces)
  const formattedDeckTitle = deckTitle.replace(/_/g, ' ');

  return (
    <div className="relative w-full h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-100"
          aria-label="Back to deck selection"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>

        <h1 className="text-black text-lg font-medium tracking-wide">
          {formattedDeckTitle}
        </h1>

        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Progress Indicator */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-2 max-w-2xl mx-auto">
          {questions.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index <= currentIndex ? '#000000' : '#E5E7EB',
              }}
            />
          ))}
        </div>
      </div>

      {/* Question Content */}
      <div
        className="flex-1 flex items-center justify-center px-6 pb-24"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="max-w-2xl w-full flex flex-col items-center">
          <p
            key={currentIndex}
            className={`text-3xl md:text-4xl lg:text-5xl font-normal text-center leading-relaxed text-black ${animatingOut
              ? direction === 'next'
                ? 'animate-slide-out-left'
                : 'animate-slide-out-right'
              : shouldSlideIn
                ? direction === 'next'
                  ? 'animate-slide-in-right'
                  : 'animate-slide-in-left'
                : ''
              }`}
          >
            {questions[currentIndex]}
          </p>

          {/* Feedback Icons */}
          <div className="flex items-center gap-6 mt-12">
            <button
              onClick={() => handleFeedback('up')}
              className={`p-3 rounded-full transition-all duration-200 ${feedback[currentIndex] === 'up'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                }`}
              aria-label="Thumbs up"
            >
              <ThumbsUp size={24} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => handleFeedback('down')}
              className={`p-3 rounded-full transition-all duration-200 ${feedback[currentIndex] === 'down'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                }`}
              aria-label="Thumbs down"
            >
              <ThumbsDown size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-full hover:bg-gray-100 disabled:hover:bg-transparent"
            aria-label="Previous question"
          >
            <ArrowLeft size={18} strokeWidth={2} />
            Previous
          </button>

          <div className="text-sm text-gray-500 font-medium">
            {currentIndex + 1} / {questions.length}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-full hover:bg-gray-100 disabled:hover:bg-transparent"
            aria-label="Next question"
          >
            Next
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>
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
  );
};

export default QuestionDisplay;