import React, { useState, useCallback } from 'react';
import DeckSelection from './components/DeckSelection';
import QuestionDisplay from './components/QuestionDisplay';
import OnboardingScreen from './components/OnboardingScreen';
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
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [currentDeckTitle, setCurrentDeckTitle] = useState<string>('');

  const handleDeckSelect = useCallback((deck: DeckType, count: number, includeWildcards: boolean) => {
    const questions = questionDecks[deck];
    const shuffled = shuffleArray(questions);
    setGeneratedQuestions(shuffled.slice(0, count));
    setCurrentDeckTitle(deck);
  }, []);

  const handleOnboardingStart = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  if (showOnboarding) {
    return <OnboardingScreen onStart={handleOnboardingStart} />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {generatedQuestions.length > 0 ? (
        <QuestionDisplay
          questions={generatedQuestions}
          deckTitle={currentDeckTitle}
          onBack={() => {
            setGeneratedQuestions([]);
            setCurrentDeckTitle('');
          }}
        />
      ) : (
        <DeckSelection onStart={handleDeckSelect} />
      )}
    </div>
  );
};

export default App;