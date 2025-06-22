
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shuffle, Trophy, Clock, BookOpen } from 'lucide-react';
import { Question } from '@/data/types';
import { geographyChapters } from '@/data/subjects/geography';
import { historyChapters } from '@/data/subjects/history';

const Reximix = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Shuffle and select random questions from all subjects
  const generateMixedQuiz = (count: number = 20) => {
    const allQuestions: Question[] = [];
    
    // Collect all questions from geography
    geographyChapters.forEach(chapter => {
      allQuestions.push(...chapter.questions);
    });
    
    // Collect all questions from history
    historyChapters.forEach(chapter => {
      allQuestions.push(...chapter.questions);
    });

    // Shuffle and select random questions
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (quizStarted && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setQuizCompleted(true);
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted]);

  const startQuiz = () => {
    const mixedQuestions = generateMixedQuiz(20);
    setQuestions(mixedQuestions);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
    setTimeLeft(1800);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

    if (selectedAnswer === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shuffle className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-800">Reximix Challenge</h1>
            </div>
            <p className="text-xl text-gray-600">
              Test your knowledge across all subjects with randomly mixed questions
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-purple-700">Ready for the Ultimate Challenge?</CardTitle>
              <CardDescription className="text-lg">
                20 randomly selected questions from Geography, History, and more subjects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Mixed Subjects</h3>
                  <p className="text-sm text-gray-600">Geography, History & More</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">30 Minutes</h3>
                  <p className="text-sm text-gray-600">Timed Challenge</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold">All Levels</h3>
                  <p className="text-sm text-gray-600">Easy, Medium & Hard</p>
                </div>
              </div>
              
              <Button 
                onClick={startQuiz}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 text-lg"
              >
                <Shuffle className="w-5 h-5 mr-2" />
                Start Reximix Challenge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <Trophy className={`w-16 h-16 mx-auto mb-4 ${getScoreColor()}`} />
              <CardTitle className="text-3xl">Reximix Complete!</CardTitle>
              <CardDescription className="text-lg">
                Here's how you performed across all subjects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
                  {score}/{questions.length}
                </div>
                <div className={`text-2xl font-semibold ${getScoreColor()}`}>
                  {percentage}%
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Question Breakdown:</h3>
                {questions.map((question, index) => (
                  <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">Q{index + 1}</span>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-600">{question.topic}</span>
                    </div>
                    <div className={`font-semibold ${userAnswers[index] === question.correct ? 'text-green-600' : 'text-red-600'}`}>
                      {userAnswers[index] === question.correct ? '✓' : '✗'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={resetQuiz} variant="outline" className="flex-1">
                  Try Again
                </Button>
                <Button onClick={() => navigate('/')} className="flex-1">
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() =
            resetQuiz()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Quiz
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="w-5 h-5 text-purple-600" />
              {formatTime(timeLeft)}
            </div>
            <Badge variant="outline" className="text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                {currentQuestion.difficulty.toUpperCase()}
              </Badge>
              <Badge variant="outline">
                {currentQuestion.topic}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => handleAnswerSelect(option)}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}

            <div className="pt-4">
              <Button 
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reximix;
