import React, { useState, useEffect } from 'react';
import { DeckType } from '../types';
import { Settings, Search } from 'lucide-react';

// SVG icon content (Keeping original paths but will style them via CSS/props)
const DatingIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M480-520q-68-62-111-104.5T302-698q-24-31-33-54.5t-9-47.5q0-50 35-85t86-35q28 0 54 12.5t45 33.5q19-21 45-33.5t54-12.5q51 0 86 35t35 85q0 24-9 47.5T658-698q-24 31-67 73.5T480-520Zm0-108q72-66 106-107.5t34-64.5q0-17-12-28.5T579-840q-12 0-23.5 7T532-812l-51 59-51-57q-14-16-25.5-23t-23.5-7q-17 0-29 11.5T340-800q0 23 34 64.5T480-628ZM120-80v-122q-18-5-30-19t-14-34L40-640h25q23 0 40.5 16t19.5 39l24 265h171q33 0 56.5 23.5T400-240v40h-40v120h-60v-120H180v120h-60Zm320 0v-320H200q0-33 23.5-56.5T280-480h400q33 0 56.5 23.5T760-400H520v320h-80Zm160 0v-120h-40v-40q0-33 23.5-56.5T640-320h172l24-265q2-23 19-39t40-16h25l-35 385q-2 20-14.5 34T840-202v122h-60v-120H660v120h-60ZM480-628Z" /></svg>;

const StrangersIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Zm-99-560Z" /></svg>;

const FriendsIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" /></svg>;

const IntimacyIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M40-120v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-160q-43 0-84-13.5T320-212v92H40Zm120-280q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-520q0 50-34.5 85T160-400Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-520q0 50-34.5 85T800-400Zm-320-80q-68-62-111-104.5T302-658q-24-31-33-54.5t-9-47.5q0-50 35-85t86-35q28 0 54 12.5t45 33.5q19-21 45-33.5t54-12.5q51 0 86 35t35 85q0 24-9 47.5T658-658q-24 31-67 73.5T480-480Zm0-108q72-66 106-107.5t34-64.5q0-17-12-28.5T579-800q-12 0-23.5 7T532-772l-51 59-51-57q-14-16-25.5-23t-23.5-7q-17 0-29 11.5T340-760q0 23 34 64.5T480-588Zm0 0Z" /></svg>;

const CoworkersIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" /></svg>;

const LongTermIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>;

const SelfReflectionIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M491-339q70 0 119-45t49-109q0-57-36.5-96.5T534-629q-47 0-79.5 30T422-525q0 19 7.5 37t21.5 33l57-57q-3-2-4.5-5t-1.5-7q0-11 9-17.5t23-6.5q20 0 33 16.5t13 39.5q0 31-25.5 52.5T492-418q-47 0-79.5-38T380-549q0-29 11-55.5t31-46.5l-57-57q-32 31-49 72t-17 86q0 88 56 149.5T491-339ZM240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Z" /></svg>;

const AmusingIcon = (color: string) => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={color}><path d="M480-280q66 0 113-47t47-113H320q0 66 47 113t113 47ZM280-600h160q0-33-23.5-56.5T360-680q-33 0-56.5 23.5T280-600Zm240 0h160q0-33-23.5-56.5T600-680q-33 0-56.5 23.5T520-600ZM480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440v-440h720v440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-80q116 0 198-82t82-198v-360H200v360q0 116 82 198t198 82Zm0-320Z" /></svg>;

interface DeckSelectionProps {
  onStart: (deck: DeckType, count: number) => void;
}

const DeckSelection: React.FC<DeckSelectionProps> = ({ onStart }) => {
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(12);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartClick = () => {
    if (selectedDeck) {
      onStart(selectedDeck, Math.max(1, questionCount));
    }
  };

  // Deck icon mapping
  const getDeckIcon = (deck: DeckType, color: string) => {
    const iconMap: Record<DeckType, (c: string) => React.ReactNode> = {
      [DeckType.Dating]: DatingIcon,
      [DeckType.Strangers]: StrangersIcon,
      [DeckType.Friends]: FriendsIcon,
      [DeckType.Intimacy]: IntimacyIcon,
      [DeckType.Coworkers]: CoworkersIcon,
      [DeckType.LongTerm]: LongTermIcon,
      [DeckType.SelfReflection]: SelfReflectionIcon,
      [DeckType.Amusing]: AmusingIcon,
    };
    return iconMap[deck](color);
  };

  // Deck description mapping
  const getDeckDescription = (deck: DeckType): string => {
    const descriptionMap: Record<DeckType, string> = {
      [DeckType.Dating]: 'For sparks, chemistry, and clarity.',
      [DeckType.Strangers]: 'Get talking without small talk.',
      [DeckType.Friends]: 'Laugh, reflect, and get a little real.',
      [DeckType.Intimacy]: 'Strip away assumptions.',
      [DeckType.Coworkers]: 'Discover the people behind the job titles.',
      [DeckType.LongTerm]: 'Because growing together takes curiosity.',
      [DeckType.SelfReflection]: 'Turn inward and discover what you find.',
      [DeckType.Amusing]: 'Lighten the mood and share a laugh.',
    };
    return descriptionMap[deck];
  };

  // Deck color mapping (matches QuestionDisplay)
  const getDeckColor = (deck: DeckType): string => {
    const colorMap: Record<string, string> = {
      'Dating': '#d8b4fe', // Light purple
      'Friends': '#86efac', // Light green
      'Long-Term Relationship': '#fca5a5', // Light red
      'Coworkers': '#fde047', // Light yellow
      'Strangers': '#93c5fd', // Light blue
      'Intimacy': '#f87171', // Red
      'Self-Reflection': '#67e8f9', // Cyan
      'Amusing': '#fdba74', // Orange
    };
    return colorMap[deck] || '#ffffff';
  };

  const deckOptions = Object.values(DeckType);

  const filteredDecks = deckOptions.filter(deck =>
    deck.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getDeckDescription(deck).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e1b4b] text-white p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white/90 text-lg font-medium tracking-wide" style={{ fontFamily: "'TikTok Sans', sans-serif" }}>
          Connect Cards
        </h1>
        <button className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10">
          <Settings size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-white mb-6">Choose Your Deck</h2>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search decks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Deck Grid */}
      <div className="flex-1 max-w-2xl mx-auto w-full mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDecks.map((deck) => {
            const deckColor = getDeckColor(deck);
            const isSelected = selectedDeck === deck;
            const deckIcon = getDeckIcon(deck, deckColor);
            const deckDescription = getDeckDescription(deck);

            return (
              <button
                key={deck}
                onClick={() => setSelectedDeck(deck)}
                className={`relative p-5 rounded-2xl text-left transition-all duration-300 group
                  ${isSelected
                    ? 'bg-slate-800/80 ring-2 ring-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800/40 hover:bg-slate-800/60 border border-white/5 hover:border-white/10'
                  }`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 p-2 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                    {deckIcon}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1" style={{ color: isSelected ? deckColor : 'white' }}>
                    {deck}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow">
                    {deckDescription}
                  </p>

                  <div className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    30 Questions
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="max-w-2xl mx-auto w-full space-y-6 pb-6">
        {/* Question Count Selector (Simplified) */}
        <div className="flex justify-center items-center gap-3">
          <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">Questions:</span>
          <div className="flex bg-slate-800/50 rounded-lg p-1">
            {[4, 8, 12, 16].map((count) => (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${questionCount === count
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartClick}
          disabled={!selectedDeck}
          className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300
            ${selectedDeck
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5'
              : 'bg-slate-800 text-gray-500 cursor-not-allowed'
            }`}
        >
          Start Conversation
        </button>
      </div>
    </div>
  );
};

export default DeckSelection;