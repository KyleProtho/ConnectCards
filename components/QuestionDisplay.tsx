import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { DeckType } from '../types';

// SVG icon content (same as DeckSelection)
const DatingIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M480-520q-68-62-111-104.5T302-698q-24-31-33-54.5t-9-47.5q0-50 35-85t86-35q28 0 54 12.5t45 33.5q19-21 45-33.5t54-12.5q51 0 86 35t35 85q0 24-9 47.5T658-698q-24 31-67 73.5T480-520Zm0-108q72-66 106-107.5t34-64.5q0-17-12-28.5T579-840q-12 0-23.5 7T532-812l-51 59-51-57q-14-16-25.5-23t-23.5-7q-17 0-29 11.5T340-800q0 23 34 64.5T480-628ZM120-80v-122q-18-5-30-19t-14-34L40-640h25q23 0 40.5 16t19.5 39l24 265h171q33 0 56.5 23.5T400-240v40h-40v120h-60v-120H180v120h-60Zm320 0v-320H200q0-33 23.5-56.5T280-480h400q33 0 56.5 23.5T760-400H520v320h-80Zm160 0v-120h-40v-40q0-33 23.5-56.5T640-320h172l24-265q2-23 19-39t40-16h25l-35 385q-2 20-14.5 34T840-202v122h-60v-120H660v120h-60ZM480-628Z" /></svg>;

const StrangersIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Zm-99-560Z" /></svg>;

const FriendsIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" /></svg>;

const IntimacyIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M40-120v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-160q-43 0-84-13.5T320-212v92H40Zm120-280q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-520q0 50-34.5 85T160-400Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-520q0 50-34.5 85T800-400Zm-320-80q-68-62-111-104.5T302-658q-24-31-33-54.5t-9-47.5q0-50 35-85t86-35q28 0 54 12.5t45 33.5q19-21 45-33.5t54-12.5q51 0 86 35t35 85q0 24-9 47.5T658-658q-24 31-67 73.5T480-480Zm0-108q72-66 106-107.5t34-64.5q0-17-12-28.5T579-800q-12 0-23.5 7T532-772l-51 59-51-57q-14-16-25.5-23t-23.5-7q-17 0-29 11.5T340-760q0 23 34 64.5T480-588Zm0 0Z" /></svg>;

const CoworkersIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" /></svg>;

const LongTermIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>;

const SelfReflectionIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M491-339q70 0 119-45t49-109q0-57-36.5-96.5T534-629q-47 0-79.5 30T422-525q0 19 7.5 37t21.5 33l57-57q-3-2-4.5-5t-1.5-7q0-11 9-17.5t23-6.5q20 0 33 16.5t13 39.5q0 31-25.5 52.5T492-418q-47 0-79.5-38T380-549q0-29 11-55.5t31-46.5l-57-57q-32 31-49 72t-17 86q0 88 56 149.5T491-339ZM240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Z" /></svg>;

const AmusingIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M480-280q66 0 113-47t47-113H320q0 66 47 113t113 47ZM280-600h160q0-33-23.5-56.5T360-680q-33 0-56.5 23.5T280-600Zm240 0h160q0-33-23.5-56.5T600-680q-33 0-56.5 23.5T520-600ZM480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440v-440h720v440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-80q116 0 198-82t82-198v-360H200v360q0 116 82 198t198 82Zm0-320Z" /></svg>;

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

  // Deck icon mapping
  const getDeckIcon = (deck: string, color: string) => {
    const iconMap: Record<string, (c: string) => React.ReactNode> = {
      'Dating': DatingIcon,
      'Strangers': StrangersIcon,
      'Friends': FriendsIcon,
      'Intimacy': IntimacyIcon,
      'Coworkers': CoworkersIcon,
      'Long-Term Relationship': LongTermIcon,
      'Self-Reflection': SelfReflectionIcon,
      'Amusing': AmusingIcon,
    };
    return iconMap[deck]?.(color) || null;
  };

  // Deck color mapping
  const getDeckColor = (deck: string): string => {
    const colorMap: Record<string, string> = {
      'Dating': '#d8b4fe',
      'Friends': '#86efac',
      'Long-Term Relationship': '#fca5a5',
      'Coworkers': '#fde047',
      'Strangers': '#93c5fd',
      'Intimacy': '#f87171',
      'Self-Reflection': '#67e8f9',
      'Amusing': '#fdba74',
    };
    return colorMap[deck] || '#ffffff';
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

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full flex-shrink-0" style={{ backgroundColor: `${getDeckColor(deckTitle)}80` }}>
            {getDeckIcon(deckTitle, '#000000')}
          </div>
          <h1 className="text-black text-lg font-medium tracking-wide">
            {formattedDeckTitle}
          </h1>
        </div>

        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Progress Indicator */}
      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            {questions.map((_, index) => {
              const isCurrentQuestion = index === currentIndex;
              const isPastQuestion = index < currentIndex;

              return (
                <div key={index} className="flex-1 relative">
                  <div
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isCurrentQuestion
                        ? getDeckColor(deckTitle)
                        : isPastQuestion
                          ? '#000000'
                          : '#E5E7EB',
                    }}
                  />
                  {isCurrentQuestion && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-600 whitespace-nowrap">
                      {currentIndex + 1}/{questions.length}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div
        className="flex-1 flex justify-center px-6 pt-16 pb-32"
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
          <div className="flex items-center gap-8 mt-12">
            <button
              onClick={() => handleFeedback('up')}
              className="flex flex-col items-center gap-2 group"
              aria-label="More like this"
            >
              <div className={`p-3 rounded-full transition-all duration-200 ${feedback[currentIndex] === 'up'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                }`}>
                <ThumbsUp size={24} strokeWidth={1.5} />
              </div>
              <span className={`text-sm font-medium transition-colors duration-200 ${feedback[currentIndex] === 'up'
                ? 'text-black'
                : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                More like this
              </span>
            </button>
            <button
              onClick={() => handleFeedback('down')}
              className="flex flex-col items-center gap-2 group"
              aria-label="Less like this"
            >
              <div className={`p-3 rounded-full transition-all duration-200 ${feedback[currentIndex] === 'down'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                }`}>
                <ThumbsDown size={24} strokeWidth={1.5} />
              </div>
              <span className={`text-sm font-medium transition-colors duration-200 ${feedback[currentIndex] === 'down'
                ? 'text-black'
                : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                Less like this
              </span>
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