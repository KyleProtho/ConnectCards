import React, { useState, useCallback } from 'react';
import DeckSelection from './components/DeckSelection';
import QuestionDisplay from './components/QuestionDisplay';
import { DeckType } from './types';
import { questionDecks } from './data/questions';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [currentDeckTitle, setCurrentDeckTitle] = useState<string>('');

  const handleStart = useCallback((deck: DeckType, count: number) => {
    const questions = questionDecks[deck];
    const shuffled = shuffleArray(questions);
    setGeneratedQuestions(shuffled.slice(0, count));
    setCurrentDeckTitle(deck);
  }, []);

  const handleGoBack = useCallback(() => {
    setGeneratedQuestions([]);
    setCurrentDeckTitle('');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {generatedQuestions.length > 0 ? (
          <QuestionDisplay 
            questions={generatedQuestions} 
            deckTitle={currentDeckTitle}
            onBack={handleGoBack} 
          />
        ) : (
          <DeckSelection onStart={handleStart} />
        )}
      </div>
    </div>
  );
};

export default App;