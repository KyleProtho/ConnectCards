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
  
  const deckOptions = Object.values(DeckType);

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center border border-gray-200">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Connect Cards</h1>
      <p className="text-gray-600 mb-8">Choose a category to start the conversation.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {deckOptions.map((deck) => (
          <button
            key={deck}
            onClick={() => setSelectedDeck(deck)}
            className={`p-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500
              ${selectedDeck === deck 
                ? 'bg-indigo-600 text-white shadow-lg scale-105 border border-indigo-600' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
          >
            {deck}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Questions
        </label>
        <input
          type="number"
          id="questionCount"
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value, 10) || 1)}
          min="1"
          max="50"
          className="w-32 bg-white border border-gray-300 text-gray-900 text-center rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        onClick={handleStartClick}
        disabled={!selectedDeck}
        className="w-full md:w-auto px-12 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Start Conversation
      </button>
    </div>
  );
};

export default DeckSelection;