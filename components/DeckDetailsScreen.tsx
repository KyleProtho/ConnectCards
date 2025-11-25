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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e1b4b] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center px-6 pt-8 pb-6">
        <button
          onClick={onBack}
          className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>

        <h1 className="text-white/90 text-lg font-medium tracking-wide" style={{ fontFamily: "'TikTok Sans', sans-serif" }}>
          {deck}
        </h1>

        <button className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10">
          <Share2 size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Deck Banner Image */}
      <div className="px-6 mb-6">
        <div
          className="w-full h-64 rounded-3xl shadow-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${deckColor}40, ${deckColor}20, #1e1b4b)`,
          }}
        >
          {/* Neon wave effect */}
          <div className="absolute inset-0 opacity-60">
            <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`gradient-${deck}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: deckColor, stopOpacity: 0.8 }} />
                  <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.6 }} />
                  <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                </linearGradient>
              </defs>
              <path
                d="M0,150 Q100,100 200,150 T400,150 L400,300 L0,300 Z"
                fill={`url(#gradient-${deck})`}
                className="animate-pulse"
              />
              <path
                d="M0,180 Q100,130 200,180 T400,180 L400,300 L0,300 Z"
                fill={`url(#gradient-${deck})`}
                opacity="0.5"
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
            </svg>
          </div>

          {/* Glow effect */}
          <div
            className="absolute inset-0 blur-3xl opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${deckColor}, transparent 70%)`,
            }}
          />
        </div>
      </div>

      {/* Deck Title & Description */}
      <div className="px-6 mb-8">
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
          {deck}
        </h2>
        <p className="text-gray-400 leading-relaxed text-base">
          {deckDescription}
        </p>
      </div>

      {/* Number of Questions Section */}
      <div className="px-6 mb-8">
        <label className="text-sm text-gray-400 uppercase tracking-wider font-medium mb-4 block">
          Number of Questions
        </label>

        {/* Slider */}
        <div className="mb-2">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-white min-w-[3rem]">
              {questionCount}
            </span>
            <input
              type="range"
              min="4"
              max="16"
              step="4"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, ${deckColor} 0%, ${deckColor} ${((questionCount - 4) / 12) * 100}%, rgba(255,255,255,0.2) ${((questionCount - 4) / 12) * 100}%, rgba(255,255,255,0.2) 100%)`,
              }}
            />
          </div>
        </div>

        {/* Tick Labels */}
        <div className="flex justify-between px-12 mt-2">
          {questionOptions.map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={`text-xs transition-colors ${questionCount === count
                  ? 'text-white font-semibold'
                  : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Wildcard Toggle Section */}
      <div className="px-6 mb-12">
        <div className="flex items-center justify-between bg-white/5 rounded-2xl p-5 border border-white/10">
          <div className="flex-1">
            <h3 className="text-white font-medium mb-1">Include wildcards</h3>
            <p className="text-sm text-gray-400">
              Add a few surprising questions to the mix.
            </p>
          </div>

          <button
            onClick={() => setIncludeWildcards(!includeWildcards)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${includeWildcards ? 'bg-blue-600' : 'bg-gray-600'
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
          className="w-full py-4 rounded-full font-bold text-lg tracking-wide transition-all duration-300 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5"
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
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default DeckDetailsScreen;
