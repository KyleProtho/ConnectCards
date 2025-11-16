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
      'Dating': '#EFD0CA',
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
    const lightColors = ['#EFD0CA']; // Dating
    return lightColors.includes(bgColor) ? '#000000' : '#FFFFFF';
  };
  
  const deckOptions = Object.values(DeckType);

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center border border-gray-200">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'TikTok Sans', sans-serif", fontWeight: 700 }}>Connect Cards</h1>
      <p className="text-gray-600 mb-8">Select a deck and see where the conversation goes.</p>
      
      {/* Step 1: Choose your deck */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Step 1</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "'TikTok Sans', sans-serif" }}>Choose your deck</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {deckOptions.map((deck) => {
            const deckColor = getDeckColor(deck);
            const isSelected = selectedDeck === deck;
            const textColor = isSelected ? getTextColor(deckColor) : undefined;
            return (
              <button
                key={deck}
                onClick={() => setSelectedDeck(deck)}
                className={`p-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none shadow-md hover:shadow-lg flex items-center justify-center min-h-[80px] h-full
                  ${isSelected 
                    ? 'shadow-lg scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                style={{
                  borderTopWidth: '6px',
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
                    borderBottom: 'none'
                  } : {})
                }}
              >
                {deck}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex-1 border-t border-gray-200"></div>
        <div className="mx-4 w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Step 2: Choose number of questions */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Step 2</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "'TikTok Sans', sans-serif" }}>Choose number of questions</h2>
        <div className="flex justify-center gap-3">
          {[4, 8, 12, 16].map((count) => {
            const isSelected = questionCount === count;
            return (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500 shadow-md hover:shadow-lg
                  ${isSelected 
                    ? 'bg-black text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                style={{ fontFamily: "'TikTok Sans', sans-serif", fontWeight: 700 }}
              >
                {count}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex-1 border-t border-gray-200"></div>
        <div className="mx-4 w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Step 3: Start */}
      <div>
        <div className="flex items-center justify-center mb-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Step 3</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "'TikTok Sans', sans-serif" }}>Start</h2>
        <button
          onClick={handleStartClick}
          disabled={!selectedDeck}
          className="w-full md:w-auto px-12 py-3 bg-black text-white font-bold rounded-lg shadow-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{ fontFamily: "'TikTok Sans', sans-serif", fontWeight: 700 }}
        >
          Start Conversation
        </button>
      </div>
    </div>
  );
};

export default DeckSelection;