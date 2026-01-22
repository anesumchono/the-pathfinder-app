import React, { useState, useEffect } from 'react';
import { Brain, Clock, CheckCircle, XCircle, RotateCcw, TrendingUp } from 'lucide-react';

interface Question {
  id: string;
  type: 'logical' | 'numerical' | 'verbal' | 'spatial' | 'personality';
  question: string;
  options: string[];
  correctAnswer?: number;
  category: string;
}

interface TestResult {
  type: string;
  score: number;
  maxScore: number;
  percentage: number;
  interpretation: string;
}

interface AptitudeTestProps {
  user: any;
  onComplete?: (results: TestResult[]) => void;
}

const AptitudeTest: React.FC<AptitudeTestProps> = ({ user, onComplete }) => {
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  // Sample questions for different aptitude areas
  const testQuestions: Record<string, Question[]> = {
    logical: [
      {
        id: 'l1',
        type: 'logical',
        question: 'If all roses are flowers and some flowers are red, which statement is definitely true?',
        options: [
          'All roses are red',
          'Some roses might be red',
          'No roses are red',
          'All red things are roses'
        ],
        correctAnswer: 1,
        category: 'Logical Reasoning'
      },
      {
        id: 'l2',
        type: 'logical',
        question: 'Complete the pattern: 2, 6, 12, 20, 30, ?',
        options: ['40', '42', '44', '46'],
        correctAnswer: 1,
        category: 'Pattern Recognition'
      },
      {
        id: 'l3',
        type: 'logical',
        question: 'If A = 1, B = 2, C = 3... what does FACE equal?',
        options: ['21', '22', '23', '24'],
        correctAnswer: 0,
        category: 'Logical Reasoning'
      }
    ],
    numerical: [
      {
        id: 'n1',
        type: 'numerical',
        question: 'What is 15% of 240?',
        options: ['32', '36', '40', '44'],
        correctAnswer: 1,
        category: 'Percentage'
      },
      {
        id: 'n2',
        type: 'numerical',
        question: 'If x + 5 = 12, what is x?',
        options: ['5', '6', '7', '8'],
        correctAnswer: 2,
        category: 'Basic Algebra'
      },
      {
        id: 'n3',
        type: 'numerical',
        question: 'What is the next number in the sequence: 1, 4, 9, 16, ?',
        options: ['20', '23', '25', '27'],
        correctAnswer: 2,
        category: 'Number Sequences'
      }
    ],
    verbal: [
      {
        id: 'v1',
        type: 'verbal',
        question: 'Choose the word that best completes the analogy: Book is to Reading as Fork is to ?',
        options: ['Eating', 'Kitchen', 'Spoon', 'Food'],
        correctAnswer: 0,
        category: 'Analogies'
      },
      {
        id: 'v2',
        type: 'verbal',
        question: 'Which word is the antonym of "Abundant"?',
        options: ['Plentiful', 'Scarce', 'Numerous', 'Ample'],
        correctAnswer: 1,
        category: 'Vocabulary'
      },
      {
        id: 'v3',
        type: 'verbal',
        question: 'Identify the correctly spelled word:',
        options: ['Recieve', 'Receive', 'Receve', 'Receeve'],
        correctAnswer: 1,
        category: 'Spelling'
      }
    ],
    personality: [
      {
        id: 'p1',
        type: 'personality',
        question: 'When working on a group project, you prefer to:',
        options: [
          'Take the lead and organize everyone',
          'Contribute ideas and support the leader',
          'Focus on your specific tasks',
          'Help resolve conflicts between members'
        ],
        category: 'Leadership Style'
      },
      {
        id: 'p2',
        type: 'personality',
        question: 'You feel most energized when:',
        options: [
          'Working with a team on challenging problems',
          'Working alone on detailed tasks',
          'Helping others achieve their goals',
          'Creating something new and innovative'
        ],
        category: 'Work Preference'
      },
      {
        id: 'p3',
        type: 'personality',
        question: 'When making important decisions, you typically:',
        options: [
          'Analyze all available data thoroughly',
          'Trust your gut instinct',
          'Seek advice from others',
          'Consider the impact on everyone involved'
        ],
        category: 'Decision Making'
      }
    ]
  };

  const testTypes = [
    {
      id: 'logical',
      name: 'Logical Reasoning',
      description: 'Tests your ability to think logically and solve problems',
      duration: 10, // minutes
      icon: Brain,
      color: 'blue'
    },
    {
      id: 'numerical',
      name: 'Numerical Ability',
      description: 'Evaluates your mathematical and numerical reasoning skills',
      duration: 8,
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 'verbal',
      name: 'Verbal Reasoning',
      description: 'Assesses your language comprehension and communication skills',
      duration: 12,
      icon: Brain,
      color: 'purple'
    },
    {
      id: 'personality',
      name: 'Personality Assessment',
      description: 'Identifies your work style and career preferences',
      duration: 15,
      icon: Brain,
      color: 'orange'
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (testStarted && timeLeft === 0) {
      completeTest();
    }
    return () => clearTimeout(timer);
  }, [testStarted, timeLeft]);

  const startTest = (testType: string) => {
    setCurrentTest(testType);
    setCurrentQuestion(0);
    setAnswers([]);
    setTestStarted(true);
    setTestCompleted(false);
    const duration = testTypes.find(t => t.id === testType)?.duration || 10;
    setTimeLeft(duration * 60); // Convert to seconds
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentTest && currentQuestion < testQuestions[currentTest].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest();
    }
  };

  const completeTest = () => {
    if (!currentTest) return;

    const questions = testQuestions[currentTest];
    let score = 0;

    // Calculate score for objective tests
    if (currentTest !== 'personality') {
      questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          score++;
        }
      });
    } else {
      // For personality test, all answers are valid
      score = answers.length;
    }

    const percentage = (score / questions.length) * 100;
    const interpretation = getInterpretation(currentTest, percentage);

    const result: TestResult = {
      type: currentTest,
      score,
      maxScore: questions.length,
      percentage,
      interpretation
    };

    const newResults = [...results, result];
    setResults(newResults);
    setTestCompleted(true);
    setTestStarted(false);

    // Save results
    localStorage.setItem(`aptitude_results_${user?.email}`, JSON.stringify(newResults));

    if (onComplete) {
      onComplete(newResults);
    }
  };

  const getInterpretation = (testType: string, percentage: number): string => {
    const interpretations = {
      logical: {
        high: 'Excellent logical reasoning skills. You excel at problem-solving and analytical thinking.',
        medium: 'Good logical reasoning abilities. With practice, you can further improve your analytical skills.',
        low: 'Developing logical reasoning skills. Focus on practicing pattern recognition and logical puzzles.'
      },
      numerical: {
        high: 'Strong numerical abilities. You have excellent mathematical reasoning skills.',
        medium: 'Solid numerical skills. Continue practicing to strengthen your mathematical abilities.',
        low: 'Basic numerical skills. Regular practice with math problems will help improve your abilities.'
      },
      verbal: {
        high: 'Excellent verbal reasoning skills. You have strong language comprehension and communication abilities.',
        medium: 'Good verbal skills. Reading more and expanding vocabulary will enhance your abilities.',
        low: 'Developing verbal skills. Focus on reading comprehension and vocabulary building.'
      },
      personality: {
        high: 'Your responses indicate strong self-awareness and clear preferences for work style.',
        medium: 'Your responses show good understanding of your work preferences and personality traits.',
        low: 'Your responses suggest you may benefit from further self-reflection on your career preferences.'
      }
    };

    const level = percentage >= 80 ? 'high' : percentage >= 60 ? 'medium' : 'low';
    return interpretations[testType as keyof typeof interpretations][level];
  };

  const resetTest = () => {
    setCurrentTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setTestStarted(false);
    setTestCompleted(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Load saved results
  useEffect(() => {
    const saved = localStorage.getItem(`aptitude_results_${user?.email}`);
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, [user]);

  if (testStarted && currentTest) {
    const questions = testQuestions[currentTest];
    const question = questions[currentQuestion];

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">
            {testTypes.find(t => t.id === currentTest)?.name}
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center text-red-600 font-semibold">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">{question.question}</h4>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={resetTest}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            Exit Test
          </button>
          <button
            onClick={nextQuestion}
            disabled={answers[currentQuestion] === undefined}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Test' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  if (testCompleted && results.length > 0) {
    const latestResult = results[results.length - 1];
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="text-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Test Completed!</h3>
          <p className="text-slate-600">Here are your results for {testTypes.find(t => t.id === latestResult.type)?.name}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {latestResult.percentage.toFixed(0)}%
            </div>
            <div className="text-slate-600">
              {latestResult.score} out of {latestResult.maxScore} correct
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${latestResult.percentage}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-slate-800 mb-2">Interpretation:</h4>
          <p className="text-slate-700">{latestResult.interpretation}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetTest}
            className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-300 transition-colors"
          >
            Take Another Test
          </button>
          <button
            onClick={() => startTest(latestResult.type)}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center">
          <Brain className="w-6 h-6 mr-2 text-purple-600" />
          Career Aptitude Tests
        </h3>
      </div>

      <p className="text-slate-600 mb-6">
        Discover your strengths and find careers that match your abilities. Take our comprehensive aptitude tests to get personalized insights.
      </p>

      {/* Previous Results */}
      {results.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-slate-800 mb-3">Your Previous Results:</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {results.map((result, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-slate-800">
                    {testTypes.find(t => t.id === result.type)?.name}
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {result.percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${result.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Tests */}
      <div className="grid gap-4 sm:grid-cols-2">
        {testTypes.map((test) => {
          const Icon = test.icon;
          const hasResult = results.some(r => r.type === test.id);
          
          return (
            <div key={test.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-${test.color}-100 mr-3`}>
                    <Icon className={`w-6 h-6 text-${test.color}-600`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{test.name}</h4>
                    {hasResult && (
                      <span className="text-sm text-green-600 font-medium">✓ Completed</span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-slate-500">{test.duration} min</span>
              </div>
              
              <p className="text-sm text-slate-600 mb-4">{test.description}</p>
              
              <button
                onClick={() => startTest(test.id)}
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  hasResult
                    ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    : `bg-${test.color}-600 text-white hover:bg-${test.color}-700`
                }`}
              >
                {hasResult ? 'Retake Test' : 'Start Test'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AptitudeTest;