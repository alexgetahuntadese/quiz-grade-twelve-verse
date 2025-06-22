
import { Chapter } from '../../types';

export const grade11HistoryChapters: Chapter[] = [
  {
    id: 'hist-11-1',
    name: 'Medieval World',
    description: 'Explore the medieval period and its impact on world history',
    questions: [
      {
        id: 'hist-11-1-1',
        question: 'What characterized the feudal system in medieval Europe?',
        options: ['Democratic governance', 'Land-based hierarchy', 'Industrial production', 'Maritime trade'],
        correct: 'Land-based hierarchy',
        explanation: 'Feudalism was based on a hierarchy of land ownership and personal relationships.',
        difficulty: 'easy'
      },
      {
        id: 'hist-11-1-2',
        question: 'Which event marked the beginning of the Crusades?',
        options: ['Fall of Constantinople', 'Pope Urban II\'s call', 'Battle of Hastings', 'Signing of Magna Carta'],
        correct: 'Pope Urban II\'s call',
        explanation: 'Pope Urban II\'s call for the First Crusade in 1095 marked the beginning of the Crusades.',
        difficulty: 'medium'
      },
      {
        id: 'hist-11-1-3',
        question: 'What was the primary cause of the decline of the Byzantine Empire?',
        options: ['Economic collapse', 'Religious conflicts', 'Ottoman expansion', 'Natural disasters'],
        correct: 'Ottoman expansion',
        explanation: 'The expansion of the Ottoman Empire gradually weakened and eventually conquered the Byzantine Empire.',
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'hist-11-2',
    name: 'Renaissance and Reformation',
    description: 'Study the cultural and religious transformations of the Renaissance and Reformation',
    questions: [
      {
        id: 'hist-11-2-1',
        question: 'What does "Renaissance" mean?',
        options: ['Rebirth', 'Revolution', 'Reform', 'Renewal'],
        correct: 'Rebirth',
        explanation: 'Renaissance means "rebirth" and refers to the revival of classical learning and culture.',
        difficulty: 'easy'
      },
      {
        id: 'hist-11-2-2',
        question: 'Who started the Protestant Reformation?',
        options: ['John Calvin', 'Martin Luther', 'Henry VIII', 'Huldrych Zwingli'],
        correct: 'Martin Luther',
        explanation: 'Martin Luther started the Protestant Reformation with his 95 Theses in 1517.',
        difficulty: 'medium'
      },
      {
        id: 'hist-11-2-3',
        question: 'What was the primary impact of the printing press on the Reformation?',
        options: ['Increased literacy', 'Faster spread of ideas', 'Cheaper books', 'All of the above'],
        correct: 'All of the above',
        explanation: 'The printing press increased literacy, allowed faster spread of ideas, and made books cheaper.',
        difficulty: 'hard'
      }
    ]
  }
];
