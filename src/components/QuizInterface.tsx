
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle, XCircle, BookOpen, Zap, Target, Trophy, Star, Flame } from 'lucide-react';
import { getQuestionsForQuiz, getChaptersBySubject } from '@/data/questions';
import { useTranslation } from '@/contexts/TranslationContext';
import { translateExplanation } from '@/utils/translationUtils';
import LanguageSelector from '@/components/LanguageSelector';

interface QuizInterfaceProps {
  subject: string;
  chapterId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (score: number, total: number, chapterName: string, difficulty: string) => void;
  onBack: () => void;
}

const QuizInterface = ({ subject, chapterId, difficulty, onComplete, onBack }: QuizInterfaceProps) => {
  const { t, language } = useTranslation();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [chapterName, setChapterName] = useState('');
  
  // Game-like features
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  useEffect(() => {
    // Get questions using the existing function
    const quizQuestions = getQuestionsForQuiz(subject, chapterId, difficulty, 10);
    
    const chapters = getChaptersBySubject(subject);
    const chapter = chapters.find(ch => ch.id === chapterId);
    
    setQuestions(quizQuestions);
    setChapterName(chapter?.name || '');
    setTimeLeft(quizQuestions.length * 90);
    
    console.log(`Generated ${quizQuestions.length} questions for ${subject}/${chapterId}/${difficulty}`);
  }, [subject, chapterId, difficulty]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, showFeedback]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const calculatePoints = (isCorrect: boolean, timeBonus: number = 0) => {
    let basePoints = 0;
    if (isCorrect) {
      // Base points based on difficulty
      switch (difficulty) {
        case 'easy': basePoints = 10; break;
        case 'medium': basePoints = 20; break;
        case 'hard': basePoints = 30; break;
      }
      
      // Streak bonus
      const streakBonus = Math.min(streak * 2, 20);
      
      // Time bonus (faster answers get more points)
      const speedBonus = Math.floor(timeBonus * 0.1);
      
      return basePoints + streakBonus + speedBonus;
    }
    return 0;
  };

  const checkAchievements = (currentStreak: number, totalPoints: number) => {
    const newAchievements = [];
    
    if (currentStreak >= 3 && !achievements.includes('streak_3')) {
      newAchievements.push('streak_3');
    }
    if (currentStreak >= 5 && !achievements.includes('streak_5')) {
      newAchievements.push('streak_5');
    }
    if (totalPoints >= 100 && !achievements.includes('points_100')) {
      newAchievements.push('points_100');
    }
    if (totalPoints >= 200 && !achievements.includes('points_200')) {
      newAchievements.push('points_200');
    }
    
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
      setShowAchievement(newAchievements[0]);
      setTimeout(() => setShowAchievement(null), 3000);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [currentQuestionIndex]: selectedAnswer });
      setShowFeedback(true);
      
      const isCorrect = selectedAnswer === currentQuestion.correct;
      const timeBonus = timeLeft % 90; // Time bonus for this question
      
      if (isCorrect) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setBestStreak(Math.max(bestStreak, newStreak));
        setCombo(combo + 1);
        
        const earnedPoints = calculatePoints(true, timeBonus);
        setPoints(points + earnedPoints);
        setPointsEarned(earnedPoints);
        setShowPointsAnimation(true);
        
        checkAchievements(newStreak, points + earnedPoints);
        
        setTimeout(() => setShowPointsAnimation(false), 2000);
      } else {
        setStreak(0);
        setCombo(0);
      }
    }
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedAnswer('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        score++;
      }
    });
    onComplete(score, questions.length, chapterName, difficulty);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAchievementText = (achievement: string) => {
    switch (achievement) {
      case 'streak_3': return '🔥 Triple Streak!';
      case 'streak_5': return '⚡ Amazing Streak!';
      case 'points_100': return '💯 Century Scorer!';
      case 'points_200': return '🌟 Quiz Master!';
      default: return 'Achievement Unlocked!';
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>{t('loadingQuestions')}</p>
        </div>
      </div>
    );
  }

  // Translate the explanation based on selected language
  const translatedExplanation = currentQuestion.explanation 
    ? translateExplanation(currentQuestion.explanation, language)
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 relative">
      {/* Achievement Animation */}
      {showAchievement && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-2xl">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2" />
              <p className="font-bold">{getAchievementText(showAchievement)}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Points Animation */}
      {showPointsAnimation && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-40 animate-scale-in">
          <div className="text-4xl font-bold text-green-600">
            +{pointsEarned} points!
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('back')}</span>
          </Button>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Badge variant="secondary" className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{chapterName}</span>
            </Badge>
            <Badge className={`${getDifficultyColor(difficulty)} text-white`}>
              {t(difficulty).toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="text-center p-3">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Points</span>
            </div>
            <div className="text-xl font-bold text-blue-600">{points}</div>
          </Card>
          
          <Card className="text-center p-3">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <div className="text-xl font-bold text-orange-600">{streak}</div>
          </Card>
          
          <Card className="text-center p-3">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Best</span>
            </div>
            <div className="text-xl font-bold text-green-600">{bestStreak}</div>
          </Card>
          
          <Card className="text-center p-3">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Clock className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <div className="text-xl font-bold text-red-600">{formatTime(timeLeft)}</div>
          </Card>
          
          <Card className="text-center p-3">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <div className="text-xl font-bold text-purple-600">{currentQuestionIndex + 1}/{questions.length}</div>
          </Card>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            {t('progress')}: {Math.round(progress)}% {t('complete')}
          </p>
        </div>

        {/* Question Card */}
        <Card className="mb-6 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center justify-between">
              <span>{t('question')} {currentQuestionIndex + 1}</span>
              {streak > 0 && (
                <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                  <Flame className="w-3 h-3 mr-1" />
                  {streak} streak!
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6 leading-relaxed">{currentQuestion.question}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option: string, index: number) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correct;
                const isWrong = showFeedback && isSelected && !isCorrect;
                const shouldShowCorrect = showFeedback && isCorrect;
                
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full text-left justify-start p-4 h-auto transition-all duration-200 hover-scale ${
                      shouldShowCorrect ? 'bg-green-500 hover:bg-green-600 text-white animate-pulse' :
                      isWrong ? 'bg-red-500 hover:bg-red-600 text-white' : ''
                    }`}
                    onClick={() => !showFeedback && handleAnswerSelect(option)}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <span className="font-medium">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="flex-1">{option}</span>
                      {showFeedback && isCorrect && <CheckCircle className="w-5 h-5" />}
                      {showFeedback && isWrong && <XCircle className="w-5 h-5" />}
                    </div>
                  </Button>
                );
              })}
            </div>
            
            {showFeedback && translatedExplanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 animate-fade-in">
                <p className="text-sm text-blue-800">
                  <strong>{t('explanation')}:</strong> {translatedExplanation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <div></div>
          {!showFeedback ? (
            <Button 
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {t('submitAnswer')}
            </Button>
          ) : (
            <Button 
              onClick={handleContinue}
              className="px-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              {currentQuestionIndex === questions.length - 1 ? t('finishQuiz') : t('continue')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;
