
import { DeckType } from '../types';

const datingQuestions: string[] = [
  "What's a relationship deal-breaker for you?",
  "What are you most passionate about right now?",
  "If you could travel anywhere in the world with me, where would we go?",
  "What's something you're proud of but don't get to talk about often?",
  "How do you show affection to a partner?",
  "What does a perfect, relaxing day look like to you?",
  "What's a skill you've always wanted to learn?",
  "What kind of person do you admire the most?",
  "What's the most spontaneous thing you've ever done?",
  "How do you handle stress or difficult situations?",
  "What is your love language?",
  "What's a small thing that can instantly make your day better?",
  "What are your thoughts on personal growth and self-improvement?",
  "Describe your ideal weekend.",
  "What's a boundary that's important for you in a relationship?"
];

const strangersQuestions: string[] = [
    "What's the most interesting thing you've learned recently?",
    "If you could have any superpower, what would it be and why?",
    "What's a small thing that makes you happy?",
    "What's a movie or book that has stuck with you?",
    "If you could have dinner with any three people, living or dead, who would they be?",
    "What's a piece of advice that has guided you in life?",
    "What's a hobby you've always wanted to pick up?",
    "What's the best concert or live event you've ever been to?",
    "Are you a morning person or a night owl?",
    "What's your favorite way to spend a rainy day?",
    "If you had an extra hour in your day, how would you spend it?",
    "What's a place you've visited that you'll never forget?",
    "What's an accomplishment you're really proud of?",
    "What's your go-to comfort food?",
    "What's a song that always puts you in a good mood?"
];

const longTermRelationshipQuestions: string[] = [
    "In what ways have we grown together as a couple?",
    "What's a dream you have for our future that we haven't talked about?",
    "How can I better support you on a daily basis?",
    "What's a favorite memory we've shared that you think about often?",
    "Is there something you've been wanting to tell me but haven't found the right moment?",
    "What's one thing I do that makes you feel most loved?",
    "What's a new activity or hobby we could try together?",
    "How has your definition of love changed since we've been together?",
    "What's a challenge we've overcome that made us stronger?",
    "What are your personal goals for the next year, and how can I help you achieve them?",
    "Do you feel we have a good balance of 'we' time and 'me' time?",
    "What does 'home' mean to you?",
    "What is one of your favorite non-physical qualities about me?",
    "Is there any area of our life together you wish we'd invest more time or energy into?",
    "What are you most grateful for in our relationship?"
];

const coworkersQuestions: string[] = [
    "What's the best piece of career advice you've ever received?",
    "Outside of work, what's something you're passionate about?",
    "What's a skill you'd like to learn, work-related or otherwise?",
    "What was your very first job?",
    "What's a project you've worked on that you are particularly proud of?",
    "How do you like to unwind after a busy week?",
    "What's the most useful thing you've learned in your career so far?",
    "If you weren't in this profession, what do you think you'd be doing?",
    "What's your favorite productivity hack or tool?",
    "What's a book, podcast, or show you'd recommend right now?",
    "What's one of the biggest challenges you've faced in your career and how did you overcome it?",
    "Do you have a favorite type of music to listen to while you work?",
    "What's something you're looking forward to in the coming year?",
    "What's a team success that you particularly enjoyed being a part of?",
    "What's a hidden talent you have?"
];

export const questionDecks: Record<DeckType, string[]> = {
  [DeckType.Dating]: datingQuestions,
  [DeckType.Strangers]: strangersQuestions,
  [DeckType.LongTerm]: longTermRelationshipQuestions,
  [DeckType.Coworkers]: coworkersQuestions,
};
