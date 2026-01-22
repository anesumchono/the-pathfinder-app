import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Award, Calendar, CheckCircle, Circle } from 'lucide-react';

interface ProgressTrackerProps {
  user: any;
  results: any;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'career' | 'skill' | 'personal';
  deadline: string;
  completed: boolean;
  progress: number;
  createdAt: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ user, results }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'academic' as Goal['category'],
    deadline: ''
  });
  const [showAddGoal, setShowAddGoal] = useState(false);

  useEffect(() => {
    loadUserProgress();
  }, [user]);

  const loadUserProgress = async () => {
    try {
      const saved = localStorage.getItem(`progress_${user?.email}`);
      if (saved) {
        setGoals(JSON.parse(saved));
      } else {
        // Initialize with default goals from analysis
        if (results?.goals) {
          const defaultGoals: Goal[] = [
            ...results.goals.shortTerm.map((goal: string, idx: number) => ({
              id: `short_${idx}`,
              title: goal,
              description: 'Short-term goal from your career analysis',
              category: 'academic' as Goal['category'],
              deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 months
              completed: false,
              progress: 0,
              createdAt: new Date().toISOString()
            })),
            ...results.goals.longTerm.map((goal: string, idx: number) => ({
              id: `long_${idx}`,
              title: goal,
              description: 'Long-term goal from your career analysis',
              category: 'career' as Goal['category'],
              deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year
              completed: false,
              progress: 0,
              createdAt: new Date().toISOString()
            }))
          ];
          setGoals(defaultGoals);
          saveProgress(defaultGoals);
        }
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  const saveProgress = (updatedGoals: Goal[]) => {
    localStorage.setItem(`progress_${user?.email}`, JSON.stringify(updatedGoals));
    
    // Also sync to backend if available
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user?.email,
        goals: updatedGoals
      })
    }).catch(console.error);
  };

  const addGoal = () => {
    if (!newGoal.title.trim()) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      deadline: newGoal.deadline,
      completed: false,
      progress: 0,
      createdAt: new Date().toISOString()
    };
    
    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    saveProgress(updatedGoals);
    
    setNewGoal({ title: '', description: '', category: 'academic', deadline: '' });
    setShowAddGoal(false);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress, completed: progress >= 100 }
        : goal
    );
    setGoals(updatedGoals);
    saveProgress(updatedGoals);
  };

  const toggleGoalCompletion = (goalId: string) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed, progress: goal.completed ? 0 : 100 }
        : goal
    );
    setGoals(updatedGoals);
    saveProgress(updatedGoals);
  };

  const getCategoryColor = (category: Goal['category']) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      career: 'bg-green-100 text-green-800',
      skill: 'bg-purple-100 text-purple-800',
      personal: 'bg-orange-100 text-orange-800'
    };
    return colors[category];
  };

  const getOverallProgress = () => {
    if (goals.length === 0) return 0;
    const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / goals.length);
  };

  const completedGoals = goals.filter(goal => goal.completed).length;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
          Progress Tracker
        </h3>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Add Goal
        </button>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-slate-700">Overall Progress</span>
          <span className="text-2xl font-bold text-green-600">{getOverallProgress()}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getOverallProgress()}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>{completedGoals} of {goals.length} goals completed</span>
          <span>{goals.length - completedGoals} remaining</span>
        </div>
      </div>

      {/* Add Goal Form */}
      {showAddGoal && (
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-slate-800 mb-3">Add New Goal</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Description (optional)"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none h-20"
            />
            <div className="flex gap-3">
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as Goal['category'] })}
                className="flex-1 p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="academic">Academic</option>
                <option value="career">Career</option>
                <option value="skill">Skill</option>
                <option value="personal">Personal</option>
              </select>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="flex-1 p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addGoal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add Goal
              </button>
              <button
                onClick={() => setShowAddGoal(false)}
                className="bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={() => toggleGoalCompletion(goal.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    {goal.completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </button>
                  <h4 className={`font-semibold ${goal.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {goal.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </span>
                </div>
                {goal.description && (
                  <p className="text-sm text-slate-600 mb-2">{goal.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                  <span>{goal.progress}% complete</span>
                </div>
              </div>
            </div>
            
            {!goal.completed && (
              <div className="space-y-2">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}
        
        {goals.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No goals set yet. Add your first goal to start tracking progress!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;