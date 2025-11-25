import React, { useState, useCallback } from 'react';
import DeckSelection from './components/DeckSelection';
import DeckDetailsScreen from './components/DeckDetailsScreen';
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
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [currentDeckTitle, setCurrentDeckTitle] = useState<string>('');

  const handleDeckSelect = useCallback((deck: DeckType) => {
    setSelectedDeck(deck);
  }, []);

  const handleStart = useCallback((deck: DeckType, count: number) => {
    const questions = questionDecks[deck];
    const shuffled = shuffleArray(questions);
    setGeneratedQuestions(shuffled.slice(0, count));
    setCurrentDeckTitle(deck);
    setSelectedDeck(null);
  }, []);

  const handleGoBack = useCallback(() => {
    setGeneratedQuestions([]);
    setCurrentDeckTitle('');
  }, []);

  const handleBackToDeckList = useCallback(() => {
    setSelectedDeck(null);
  }, []);

  const handleOnboardingStart = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  // Deck metadata helpers
  const getDeckColor = (deck: DeckType): string => {
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

  if (showOnboarding) {
    return <OnboardingScreen onStart={handleOnboardingStart} />;
  }

  // Show deck details screen if a deck is selected
  if (selectedDeck) {
    return (
      <DeckDetailsScreen
        deck={selectedDeck}
        deckColor={getDeckColor(selectedDeck)}
        deckDescription={getDeckDescription(selectedDeck)}
        onBack={handleBackToDeckList}
        onStart={(count, includeWildcards) => handleStart(selectedDeck, count)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className={`w-full ${generatedQuestions.length > 0 ? 'flex items-center justify-center p-4' : ''}`}>
        {generatedQuestions.length > 0 ? (
          <QuestionDisplay
            questions={generatedQuestions}
            deckTitle={currentDeckTitle}
            onBack={handleGoBack}
          />
        ) : (
          <DeckSelection onStart={handleDeckSelect} />
        )}
      </div>
    </div>
  );
};

export default App;