import React, { useState } from 'react';
import { DeckType } from '../types';

interface DeckSelectionProps {
  onStart: (deck: DeckType, count: number) => void;
}

const DeckSelection: React.FC<DeckSelectionProps> = ({ onStart }) => {
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(12);

  const handleStartClick = () => {
    if (selectedDeck) {
      onStart(selectedDeck, Math.max(1, questionCount));
    }
  };

  // Deck color mapping (matches QuestionDisplay)
  const getDeckColor = (deck: DeckType): string => {
    const colorMap: Record<string, string> = {
      'Dating': '#622463',
      'Friends': '#5C7457',
      'Long-Term Relationship': '#A23E48',
      'Coworkers': '#3D3B30',
      'Strangers': '#6C8EAD',
      'Intimacy': '#DC2626', // Default red for Intimacy
    };
    return colorMap[deck] || '#DC2626';
  };

  // Determine text color based on background color (light or dark)
  const getTextColor = (bgColor: string): string => {
    // For light backgrounds, use dark text; for dark backgrounds, use light text
    const lightColors: string[] = [];
    return lightColors.includes(bgColor) ? '#000000' : '#FFFFFF';
  };
  
  const deckOptions = Object.values(DeckType);

  const selectedDeckColor = selectedDeck ? getDeckColor(selectedDeck) : undefined;

  return (
    <div 
      className="bg-white p-8 md:p-12 rounded-xl text-center"
      style={{
        borderWidth: selectedDeckColor ? '2px' : '2px',
        borderStyle: 'solid',
        borderColor: selectedDeckColor || '#E5E7EB',
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
      <h1 
        className="text-4xl md:text-5xl font-normal text-gray-900 mb-4" 
        style={{ 
          fontFamily: "'Newsreader', serif", 
          fontWeight: 400,
          letterSpacing: '-0.02em'
        }}
      >
        Connect Cards
      </h1>
      <p 
        className="text-base md:text-lg text-gray-600 mb-12" 
        style={{ fontFamily: "'TikTok Sans', sans-serif" }}
      >
        Select a deck and see where the conversation goes.
      </p>
      
      {/* Step 1: Choose your deck */}
      <div className="mb-12">
        <h2 
          className="text-sm font-bold text-gray-800 mb-6" 
          style={{ 
            fontFamily: "'TikTok Sans', sans-serif",
            fontVariant: 'small-caps',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}
        >
          Choose your deck
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {deckOptions.map((deck) => {
            const deckColor = getDeckColor(deck);
            const isSelected = selectedDeck === deck;
            const textColor = isSelected ? getTextColor(deckColor) : undefined;
            return (
              <button
                key={deck}
                onClick={() => setSelectedDeck(deck)}
                className={`p-5 rounded-lg font-semibold transition-all duration-200 focus:outline-none flex items-center justify-center min-h-[90px] h-full
                  ${isSelected 
                    ? 'shadow-lg scale-[1.02]' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md'
                  }`}
                style={{
                  borderTopWidth: '4px',
                  borderTopColor: deckColor,
                  borderTopStyle: 'solid',
                  fontVariant: 'small-caps',
                  fontFamily: "'TikTok Sans', sans-serif",
                  fontWeight: 700,
                  ...(isSelected ? {
                    backgroundColor: deckColor,
                    color: textColor,
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    borderTopWidth: '4px',
                    borderTopColor: deckColor
                  } : {})
                }}
              >
                {deck}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Choose number of questions */}
      <div className="mb-12">
        <h2 
          className="text-sm font-bold text-gray-800 mb-6" 
          style={{ 
            fontFamily: "'TikTok Sans', sans-serif",
            fontVariant: 'small-caps',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}
        >
          Choose number of questions
        </h2>
        <div className="flex justify-center items-center w-full px-4 overflow-x-auto">
          <div className="flex justify-center gap-2 max-w-full">
            {[4, 8, 12, 16].map((count) => {
              const isSelected = questionCount === count;
              return (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none flex-shrink-0
                    ${isSelected 
                      ? 'bg-black text-white shadow-md scale-[1.02]' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md'
                    }`}
                  style={{ 
                    fontFamily: "'TikTok Sans', sans-serif", 
                    fontWeight: 700,
                    fontVariant: 'normal'
                  }}
                >
                  {count}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 3: Start */}
      <div>
        <button
          onClick={handleStartClick}
          disabled={!selectedDeck}
          className="w-full md:w-auto px-12 py-4 bg-black text-white font-bold rounded-lg shadow-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{ 
            fontFamily: "'TikTok Sans', sans-serif", 
            fontWeight: 700,
            fontVariant: 'small-caps',
            letterSpacing: '0.05em'
          }}
        >
          Start Conversation
        </button>
      </div>
    </div>
  );
};

export default DeckSelection;