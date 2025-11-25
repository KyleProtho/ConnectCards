import React, { useState } from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';
import { DeckType } from '../types';

interface DeckDetailsScreenProps {
  deck: DeckType;
  deckColor: string;
  deckDescription: string;
  onBack: () => void;
  onStart: (questionCount: number, includeWildcards: boolean) => void;
}

const DeckDetailsScreen: React.FC<DeckDetailsScreenProps> = ({
  deck,
  deckColor,
  deckDescription,
  onBack,
  onStart,
}) => {
  const [questionCount, setQuestionCount] = useState<number>(12);
  const [includeWildcards, setIncludeWildcards] = useState<boolean>(false);

  const handleStartClick = () => {
    onStart(questionCount, includeWildcards);
  };

  const questionOptions = [4, 8, 12, 16];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center px-6 pt-12 pb-6 border-b border-gray-100">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>

        <h1 className="text-black text-lg font-medium tracking-wide">
          {deck}
        </h1>

        <button className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-100">
          <Share2 size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Deck Description */}
      <div className="px-6 pt-12 mb-16">
        <p className="text-gray-600 leading-relaxed text-lg text-center max-w-2xl mx-auto">
          {deckDescription}
        </p>
      </div>

      {/* Number of Questions Section */}
      <div className="px-6 mb-16">
        <label className="text-sm text-gray-500 uppercase tracking-wider font-medium mb-6 block">
          Number of Questions
        </label>

        {/* Slider */}
        <div className="mb-3">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-medium text-black min-w-[3rem]">
              {questionCount}
            </span>
            <input
              type="range"
              min="4"
              max="16"
              step="1"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="flex-1 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #000000 0%, #000000 ${((questionCount - 4) / 12) * 100}%, #E5E7EB ${((questionCount - 4) / 12) * 100}%, #E5E7EB 100%)`,
              }}
            />
          </div>
        </div>

        {/* Tick Labels */}
        <div className="flex justify-between px-12 ml-14 mt-3">
          {questionOptions.map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={`text-xs transition-colors ${questionCount === count
                ? 'text-black font-semibold'
                : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Wildcard Toggle Section */}
      <div className="px-6 mb-16">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex-1">
            <h3 className="text-black font-medium mb-1">Include wildcards</h3>
            <p className="text-sm text-gray-600">
              Add a few surprising questions to the mix.
            </p>
          </div>

          <button
            onClick={() => setIncludeWildcards(!includeWildcards)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${includeWildcards ? 'bg-black' : 'bg-gray-300'
              }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${includeWildcards ? 'translate-x-7' : 'translate-x-1'
                }`}
            />
          </button>
        </div>
      </div>

      {/* Spacer to push button to bottom */}
      <div className="flex-1" />

      {/* Start Conversation Button */}
      <div className="px-6 pb-8">
        <button
          onClick={handleStartClick}
          className="w-full py-4 rounded-full font-medium text-base transition-all duration-200 bg-black text-white hover:bg-gray-800 active:scale-[0.98]"
        >
          Start Conversation
        </button>
      </div>

      {/* Custom slider styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default DeckDetailsScreen;
