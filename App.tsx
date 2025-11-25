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
      [DeckType.Dating]: 'Navigate the early stages of romance with questions designed to reveal compatibility, values, and chemistry. Perfect for first dates or getting to know someone you are interested in.',
      [DeckType.Strangers]: 'Break the ice and skip the small talk with thoughtful questions that help you connect with new people in meaningful ways. Great for networking events, travel, or any new encounter.',
      [DeckType.Friends]: 'Deepen your friendships by exploring shared experiences, dreams, and perspectives. These questions help you laugh together while discovering new layers of your connection.',
      [DeckType.Intimacy]: 'Explore physical and sexual intimacy with questions about desires, boundaries, and affection. Designed to help partners communicate openly about sex, touch, and what makes them feel safe and connected.',
      [DeckType.Coworkers]: 'Transform workplace relationships by discovering the real people behind professional roles. Perfect for team building, remote teams, or simply getting to know your colleagues better.',
      [DeckType.LongTerm]: 'Keep your long-term relationship fresh and growing with questions that spark curiosity, alignment, and continued discovery. Because knowing someone deeply is a lifelong journey.',
      [DeckType.SelfReflection]: 'Explore your own thoughts, values, and aspirations through introspective questions. Use these alone for journaling or with a trusted companion for mutual growth.',
      [DeckType.Amusing]: 'Bring lightness and laughter to any gathering with playful, creative questions. Perfect for parties, road trips, or whenever you need to lift the mood.',
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