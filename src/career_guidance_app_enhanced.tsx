import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { 
  GraduationCap, BookOpen, TrendingUp, Home, Heart, Target, Sparkles, Award, 
  Lightbulb, Users, Building2, Briefcase, DollarSign, Bell, Brain, MessageCircle,
  Settings, Menu, X, ChevronRight
} from 'lucide-react';
import InstallPWA from './components/InstallPWA';
import UserProfile from './components/UserProfile';
import GoogleAuth from './components/GoogleAuth';
import NotificationManager from './components/NotificationManager';
import ProgressTracker from './components/ProgressTracker';
import ScholarshipDatabase from './components/ScholarshipDatabase';
import AptitudeTest from './components/AptitudeTest';
import MentorMatching from './components/MentorMatching';

const PathFinderAppEnhanced = () => {
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('assessment');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mobile navigation handler
  const handleTabNavigation = (tabId: string) => {
    console.log('Navigating to tab:', tabId, 'from:', activeTab);
    setActiveTab(tabId);
    setSidebarOpen(false);
    
    // Force a small delay to ensure state updates
    setTimeout(() => {
      console.log('Tab navigation completed. Current tab:', tabId);
    }, 100);
  };
  
  const [formData, setFormData] = useState({
    // Academic Stream
    stream: '',
    
    // Sciences Stream Subjects
    mathematics: '', physics: '', chemistry: '', biology: '', computerScience: '',
    
    // Arts Stream Subjects  
    english: '', history: '', geography: '', literature: '', religiousStudies: '', 
    french: '', shona: '', ndebele: '',
    
    // Commercial Stream Subjects
    accounting: '', economics: '', businessStudies: '', commerce: '',
    
    // Common Subjects
    generalPaper: '', combinedScience: '',
    
    attendance: '',
    studyHours: '', studyEnvironment: '', parentalSupport: '', tutoring: '',
    householdIncome: '', parentsEducation: '', accessToResources: '',
    physicalHealth: '', mentalHealth: '', motivationLevel: '', careerInterest: '',
    favoriteSubjects: [], skills: [], hobbies: ''
  });

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('pathfinder_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('pathfinder_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pathfinder_user');
    setResults(null);
    setStep(0);
    setActiveTab('assessment');
  };

  // Navigation tabs
  const navigationTabs = [
    { id: 'assessment', label: 'Career Assessment', icon: Target, description: 'Discover your career path' },
    { id: 'progress', label: 'Progress Tracker', icon: TrendingUp, description: 'Track your goals' },
    { id: 'scholarships', label: 'Scholarships', icon: DollarSign, description: 'Find funding opportunities' },
    { id: 'aptitude', label: 'Aptitude Tests', icon: Brain, description: 'Test your abilities' },
    { id: 'mentors', label: 'Find Mentors', icon: Users, description: 'Connect with experts' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Manage alerts' }
  ];

  // Show login page if not authenticated
  if (!user) {
    const handleStartJourney = () => {
      if (userName.trim()) {
        handleLoginSuccess({ 
          name: userName.trim(), 
          email: `${userName.toLowerCase().replace(/\s+/g, '')}@pathfinder.app`, 
          isGuest: false 
        });
      } else {
        alert('Please enter your name to continue');
      }
    };

    // Google OAuth Client ID - Replace with your actual Client ID
    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";

    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="min-h-screen relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%)',
        }}>
          {/* Geometric background elements inspired by the image */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Top curved lines */}
            <div className="absolute top-0 left-0 w-full h-32 opacity-20">
              <svg viewBox="0 0 1200 200" className="w-full h-full">
                <path d="M0,0 Q300,100 600,50 T1200,0 L1200,0 L0,0 Z" fill="rgba(33, 150, 243, 0.3)"/>
                <path d="M0,20 Q400,120 800,60 T1200,20 L1200,0 L0,0 Z" fill="rgba(33, 150, 243, 0.2)"/>
              </svg>
            </div>
            
            {/* Bottom right geometric shape */}
            <div className="absolute bottom-0 right-0 w-96 h-96 opacity-30">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <polygon points="400,400 400,200 200,400" fill="#1976d2"/>
                <polygon points="400,400 400,250 250,400" fill="#2196f3" opacity="0.8"/>
              </svg>
            </div>
            
            {/* Diagonal lines pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10">
              <svg viewBox="0 0 1200 800" className="w-full h-full">
                {Array.from({length: 20}, (_, i) => (
                  <line 
                    key={i}
                    x1={800 + i * 20} 
                    y1="0" 
                    x2={1000 + i * 20} 
                    y2="800" 
                    stroke="#1976d2" 
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>
            
            {/* Floating circles */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-40 animate-float"></div>
            <div className="absolute top-40 right-32 w-6 h-6 bg-blue-500 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-32 left-32 w-3 h-3 bg-blue-600 rounded-full opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full">
              {/* Logo and branding */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-xl relative border-4 border-blue-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-3 text-blue-900">
                  PathFinder
                </h1>
                <p className="text-blue-700 text-lg font-medium">Discover Your Perfect Career Path</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-blue-600 text-sm font-medium">AI-Powered Career Guidance</p>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Login card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center border-b border-blue-100 pb-4">
                    <h2 className="text-xl font-bold text-blue-900 mb-1">Welcome to PathFinder</h2>
                    <p className="text-blue-600 text-sm">Access your career guidance dashboard</p>
                  </div>
                  {/* Google Sign-In */}
                  <div>
                    <p className="text-sm font-semibold text-blue-700 mb-3 text-center">Sign in with</p>
                    <div className="flex justify-center">
                      <GoogleAuth onLoginSuccess={handleLoginSuccess} />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-blue-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-blue-600">Or sign in</span>
                    </div>
                  </div>

                  {/* Username/Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-blue-800 mb-2">
                      Username or email
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleStartJourney()}
                      placeholder="Enter your username or email"
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-blue-900 placeholder-blue-400 font-medium bg-white"
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-semibold text-blue-800 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-blue-900 placeholder-blue-400 font-medium bg-white"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <button className="text-blue-400 hover:text-blue-600">
                          👁️
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remember me and Forgot password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center text-blue-700">
                      <input type="checkbox" className="mr-2 rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
                      Remember me
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Forgot Password?</a>
                  </div>

                  <button
                    onClick={handleStartJourney}
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold text-base shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Sign In
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-blue-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-xs font-medium text-blue-500">Or sign in with</span>
                    </div>
                  </div>

                  {/* Google Sign-in Button */}
                  <button className="w-full py-3 px-4 border-2 border-blue-200 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-blue-100">
                  <p className="text-xs text-blue-600 text-center leading-relaxed">
                    By continuing, you agree to our{' '}
                    <span className="text-blue-700 font-semibold cursor-pointer hover:underline">Terms of Service</span>
                    {' '}and{' '}
                    <span className="text-blue-700 font-semibold cursor-pointer hover:underline">Privacy Policy</span>
                  </p>
                </div>
              </div>

              {/* Enhanced Features Preview */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:scale-105 transition-transform shadow-lg border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs font-semibold text-blue-800">Aptitude Tests</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:scale-105 transition-transform shadow-lg border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs font-semibold text-blue-800">Find Mentors</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:scale-105 transition-transform shadow-lg border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs font-semibold text-blue-800">Scholarships</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:scale-105 transition-transform shadow-lg border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs font-semibold text-blue-800">Track Progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    );
  }

  // Main app sections for assessment
  const sections = [
    {
      title: "Choose Your Stream",
      icon: BookOpen,
      color: "blue",
      fields: [
        { 
          name: 'stream', 
          label: 'Select Your Academic Stream', 
          type: 'select', 
          options: ['Sciences', 'Arts', 'Commercial'] 
        }
      ]
    },
    {
      title: "Academic Performance",
      icon: BookOpen,
      color: "blue",
      fields: [] // Will be dynamically populated based on stream
    },
    {
      title: "Study Habits & Support",
      icon: TrendingUp,
      color: "green",
      fields: [
        { name: 'studyHours', label: 'Daily Study Hours', type: 'number', min: 0, max: 12 },
        { name: 'studyEnvironment', label: 'Study Environment', type: 'select', options: ['Quiet & Organized', 'Somewhat Distracting', 'Very Distracting', 'No Fixed Place'] },
        { name: 'parentalSupport', label: 'Parental Support Level', type: 'select', options: ['Very Supportive', 'Moderately Supportive', 'Limited Support', 'No Support'] },
        { name: 'tutoring', label: 'Access to Tutoring', type: 'select', options: ['Regular Tutoring', 'Occasional Help', 'No Tutoring'] }
      ]
    },
    {
      title: "Socioeconomic Background",
      icon: Home,
      color: "purple",
      fields: [
        { name: 'householdIncome', label: 'Household Income Level', type: 'select', options: ['High Income', 'Middle Income', 'Low Income', 'Below Poverty Line'] },
        { name: 'parentsEducation', label: 'Parents\' Highest Education', type: 'select', options: ['Postgraduate', 'University Degree', 'High School', 'Primary or Less'] },
        { name: 'accessToResources', label: 'Access to Learning Resources', type: 'select', options: ['Full Access (Books, Internet, Computer)', 'Moderate Access', 'Limited Access', 'Very Limited Access'] }
      ]
    },
    {
      title: "Health & Motivation",
      icon: Heart,
      color: "red",
      fields: [
        { name: 'physicalHealth', label: 'Physical Health Status', type: 'select', options: ['Excellent', 'Good', 'Fair', 'Poor'] },
        { name: 'mentalHealth', label: 'Mental Well-being', type: 'select', options: ['Very Positive', 'Generally Positive', 'Sometimes Stressed', 'Often Stressed/Anxious'] },
        { name: 'motivationLevel', label: 'Academic Motivation', type: 'select', options: ['Highly Motivated', 'Moderately Motivated', 'Occasionally Motivated', 'Struggling with Motivation'] },
        { name: 'careerInterest', label: 'Career Interest Level', type: 'select', options: ['Very Clear Goals', 'Some Ideas', 'Exploring Options', 'Uncertain'] }
      ]
    },
    {
      title: "Interests & Strengths",
      icon: Target,
      color: "amber",
      fields: [
        { name: 'favoriteSubjects', label: 'Favorite Subjects (Select all that apply)', type: 'multiselect', options: ['Mathematics', 'Science', 'English/Literature', 'History', 'Arts', 'Physical Education', 'Technology', 'Business'] },
        { name: 'skills', label: 'Your Skills (Select all that apply)', type: 'multiselect', options: ['Problem Solving', 'Creativity', 'Leadership', 'Communication', 'Technical Skills', 'Teamwork', 'Research', 'Critical Thinking'] },
        { name: 'hobbies', label: 'Hobbies & Activities', type: 'textarea' }
      ]
    }
  ];

  // Dynamic subject fields based on stream
  const getSubjectFields = (stream) => {
    const gradeOptions = ['A', 'B', 'C', 'D', 'E', 'U'];
    
    const subjectFields = {
      'Sciences': [
        { name: 'mathematics', label: 'Mathematics', type: 'select', options: gradeOptions },
        { name: 'physics', label: 'Physics', type: 'select', options: gradeOptions },
        { name: 'chemistry', label: 'Chemistry', type: 'select', options: gradeOptions },
        { name: 'biology', label: 'Biology', type: 'select', options: gradeOptions },
        { name: 'english', label: 'English Language', type: 'select', options: gradeOptions },
        { name: 'computerScience', label: 'Computer Science [Optional]', type: 'select', options: ['Not Taken', ...gradeOptions] },
        { name: 'attendance', label: 'Attendance Rate (%)', type: 'number', min: 0, max: 100 }
      ],
      'Arts': [
        { name: 'english', label: 'English Language', type: 'select', options: gradeOptions },
        { name: 'literature', label: 'Literature in English', type: 'select', options: gradeOptions },
        { name: 'history', label: 'History', type: 'select', options: gradeOptions },
        { name: 'geography', label: 'Geography', type: 'select', options: gradeOptions },
        { name: 'religiousStudies', label: 'Religious Studies [Optional]', type: 'select', options: ['Not Taken', ...gradeOptions] },
        { name: 'shona', label: 'Shona [Optional]', type: 'select', options: ['Not Taken', ...gradeOptions] },
        { name: 'ndebele', label: 'Ndebele [Optional]', type: 'select', options: ['Not Taken', ...gradeOptions] },
        { name: 'french', label: 'French [Optional]', type: 'select', options: ['Not Taken', ...gradeOptions] },
        { name: 'attendance', label: 'Attendance Rate (%)', type: 'number', min: 0, max: 100 }
      ],
      'Commercial': [
        { name: 'mathematics', label: 'Mathematics', type: 'select', options: gradeOptions },
        { name: 'english', label: 'English Language', type: 'select', options: gradeOptions },
        { name: 'accounting', label: 'Accounts', type: 'select', options: gradeOptions },
        { name: 'economics', label: 'Economics', type: 'select', options: gradeOptions },
        { name: 'businessStudies', label: 'Business Studies', type: 'select', options: gradeOptions },
        { name: 'commerce', label: 'Commerce [Optional]', type: 'select', options: ['Not Taken', ...gradeOptions] },
        { name: 'combinedScience', label: 'Combined Science [Optional]', type: 'select', options: ['Not Taken', ...gradeOptions] },
        { name: 'attendance', label: 'Attendance Rate (%)', type: 'number', min: 0, max: 100 }
      ]
    };
    
    return subjectFields[stream] || [];
  };

  // Update sections when stream changes
  const getCurrentSections = () => {
    const updatedSections = [...sections];
    if (formData.stream && step >= 1) {
      updatedSections[1].fields = getSubjectFields(formData.stream);
    }
    return updatedSections;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => {
      const current = prev[name] || [];
      const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [name]: updated };
    });
  };

  const analyzeData = async () => {
    setAnalyzing(true);
    
    try {
      // Store request for background sync if offline
      const requestData = {
        id: Date.now().toString(),
        data: formData,
        timestamp: new Date().toISOString()
      };

      // Try to sync immediately
      const hostname = window.location.hostname;
      const apiUrl = hostname === 'localhost' || hostname === '127.0.0.1'
        ? 'http://localhost:5000/api/analyze'
        : `http://${hostname}:5000/api/analyze`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        // Store for background sync
        const pending = JSON.parse(localStorage.getItem('pending_career_analysis') || '[]');
        pending.push(requestData);
        localStorage.setItem('pending_career_analysis', JSON.stringify(pending));
        
        // Register background sync (with TypeScript compatibility)
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
          const registration = await navigator.serviceWorker.ready;
          // Type assertion for experimental Background Sync API
          await (registration as any).sync.register('sync-career-data');
        }
        
        throw new Error('Analysis request queued for when you\'re back online');
      }
      
      const analysis = await response.json();
      setResults(analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage = error.message || 'Network error. Your request has been saved and will be processed when you\'re back online.';
      setResults({ error: errorMessage });
    }
    
    setAnalyzing(false);
  };

  const renderField = (field) => {
    const commonClasses = "w-full p-3 sm:p-4 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all bg-white shadow-sm text-sm sm:text-base";
    
    if (field.type === 'select') {
      return (
        <select value={formData[field.name]} onChange={(e) => handleInputChange(field.name, e.target.value)} className={commonClasses}>
          <option value="">Select an option...</option>
          {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    
    if (field.type === 'multiselect') {
      return (
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {field.options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => handleMultiSelect(field.name, opt)}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full border-2 font-medium transition-all shadow-sm hover:shadow-md text-xs sm:text-sm ${
                (formData[field.name] || []).includes(opt)
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-200'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }
    
    if (field.type === 'textarea') {
      return <textarea value={formData[field.name]} onChange={(e) => handleInputChange(field.name, e.target.value)} className={`${commonClasses} min-h-24 sm:min-h-32`} placeholder="Tell us about your hobbies and activities..." />;
    }
    
    return <input type={field.type} value={formData[field.name]} onChange={(e) => handleInputChange(field.name, e.target.value)} min={field.min} max={field.max} className={commonClasses} placeholder={field.label} />;
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'progress':
        return <ProgressTracker user={user} results={results} />;
      case 'scholarships':
        return <ScholarshipDatabase user={user} userStream={formData.stream} />;
      case 'aptitude':
        return <AptitudeTest user={user} />;
      case 'mentors':
        return <MentorMatching user={user} userStream={formData.stream} careerInterests={formData.favoriteSubjects} />;
      case 'notifications':
        return <NotificationManager user={user} />;
      default:
        return renderAssessmentContent();
    }
  };

  const renderAssessmentContent = () => {
    const currentSection = getCurrentSections()[step];
    const Icon = currentSection?.icon;
    const colorClasses = {
      blue: 'from-cyan-500 to-blue-600',
      green: 'from-emerald-500 to-teal-600',
      purple: 'from-purple-500 to-violet-600',
      red: 'from-rose-500 to-pink-600',
      amber: 'from-amber-500 to-orange-600'
    };

    // Prevent moving to academic performance without selecting stream
    const canProceed = () => {
      if (step === 0 && !formData.stream) {
        return false;
      }
      return true;
    };

    if (results) {
      return (
        <div className="space-y-8">
          {results.error ? (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 text-red-800 shadow-sm">
              <p className="font-semibold flex items-center"><Award className="w-5 h-5 mr-2" />Analysis Error</p>
              <p className="mt-2">{results.error}</p>
            </div>
          ) : (
            <div className="space-y-8">
              <section className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-blue-200 shadow-md">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-4 sm:mb-6 flex items-center">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                  Recommended Career Paths
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {results.careerPaths?.map((career, idx) => (
                    <div key={idx} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-blue-200 shadow-sm hover:shadow-lg transition-shadow">
                      <div className="flex items-start flex-col sm:flex-row">
                        <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg mb-3 sm:mb-0 sm:mr-4">
                          {idx + 1}
                        </div>
                        <div className="flex-1 w-full">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-2">{career.title}</h3>
                          <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">{career.reasoning}</p>
                          
                          <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500 mb-3 sm:mb-4">
                            <p className="font-semibold text-blue-900 mb-2 flex items-center text-sm sm:text-base">
                              <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                              Action Steps:
                            </p>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{career.steps}</p>
                          </div>

                          {/* Education Programs */}
                          {career.education && career.education.programs && (
                            <div className="mb-3 sm:mb-4">
                              <h4 className="font-bold text-slate-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-600" />
                                Recommended Programs & Courses:
                              </h4>
                              <ul className="space-y-2">
                                {career.education.programs.map((program, pidx) => (
                                  <li key={pidx} className="text-xs sm:text-sm text-slate-700 flex items-start bg-indigo-50 rounded-lg p-2 sm:p-3 border border-indigo-200">
                                    <span className="text-indigo-600 mr-2 font-bold">•</span>
                                    <span className="flex-1">{program}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Top Universities */}
                          {career.education && career.education.universities && (
                            <div className="mb-3 sm:mb-4">
                              <h4 className="font-bold text-slate-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                                Top Universities Worldwide:
                              </h4>
                              <div className="bg-purple-50 rounded-lg p-3 sm:p-4 border border-purple-200">
                                <ul className="space-y-2">
                                  {career.education.universities.map((uni, uidx) => (
                                    <li key={uidx} className="text-xs sm:text-sm text-slate-700 flex items-start">
                                      <span className="text-purple-600 mr-2">★</span>
                                      <span className="flex-1">{uni}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Career Opportunities */}
                          {career.jobs && career.jobs.length > 0 && (
                            <div>
                              <h4 className="font-bold text-slate-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                                Career Opportunities & Job Examples:
                              </h4>
                              <div className="grid gap-2 sm:gap-3">
                                {career.jobs.map((job, jidx) => (
                                  <div key={jidx} className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-2 flex-col sm:flex-row gap-2">
                                      <h5 className="font-bold text-slate-800 flex-1 text-sm sm:text-base">{job.title}</h5>
                                      <span className="flex items-center text-green-700 font-semibold text-xs sm:text-sm bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                        {job.salary}
                                      </span>
                                    </div>
                                    <p className="text-slate-600 text-xs sm:text-sm">{job.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Additional sections from original results */}
              {results.academicFocus && (
                <section className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-green-200 shadow-md">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-4 sm:mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                    Academic Focus Areas
                  </h2>
                  <ul className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-2 sm:space-y-3">
                    {results.academicFocus.map((focus, idx) => (
                      <li key={idx} className="text-xs sm:text-sm md:text-base text-slate-700 flex items-start leading-relaxed">
                        <span className="text-green-600 text-lg sm:text-xl mr-2 sm:mr-3">✓</span>
                        <span className="flex-1">{focus}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}

          <button
            onClick={() => { setResults(null); setStep(0); }}
            className="w-full mt-6 sm:mt-10 bg-linear-to-r from-slate-600 to-slate-700 text-white py-3 sm:py-4 rounded-xl font-bold hover:from-slate-700 hover:to-slate-800 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Start New Analysis
          </button>
        </div>
      );
    }

    if (analyzing) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-30"></div>
              <div className="relative bg-linear-to-r from-cyan-500 to-blue-600 rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center shadow-2xl">
                <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">Analyzing Your Profile</h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium mb-6">PathFinder AI is mapping your career journey...</p>
            <div className="flex justify-center space-x-3">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce shadow-lg"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-cyan-600 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="mb-6 sm:mb-10">
          <div className="flex justify-between mb-4">
            {getCurrentSections().map((section, idx) => (
              <div key={idx} className={`flex-1 h-3 sm:h-4 rounded-full mx-1 sm:mx-2 transition-all duration-500 border-2 ${
                idx < step ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-300' : 
                idx === step ? `bg-gradient-to-r ${colorClasses[section.color]} border-blue-300 shadow-lg` : 
                'bg-white border-blue-200'
              }`}>
                {idx === step && <div className="h-full bg-white/30 rounded-full animate-pulse"></div>}
              </div>
            ))}
          </div>
          <div className="hidden sm:flex justify-between text-xs text-blue-700 px-2 font-medium">
            {getCurrentSections().map((section, idx) => (
              <span key={idx} className={idx <= step ? 'font-bold text-blue-900' : 'text-blue-600'}>{section.title}</span>
            ))}
          </div>
          <p className="text-center text-sm sm:text-base text-blue-800 mt-3 sm:mt-4 font-bold bg-white/80 rounded-lg py-2 px-4 inline-block mx-auto">
            Step {step + 1} of {getCurrentSections().length}
          </p>
        </div>

        <div className={`mb-6 sm:mb-10 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-lg`}>
          <div className="flex items-center mb-6 sm:mb-8 flex-col sm:flex-row text-center sm:text-left">
            <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${colorClasses[currentSection.color]} shadow-lg mb-3 sm:mb-0 sm:mr-4`}>
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">{currentSection.title}</h2>
              <p className="text-sm sm:text-base md:text-lg text-blue-700 mt-1 font-medium">Tell us about your {currentSection.title.toLowerCase()}</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {currentSection.fields.map(field => (
              <div key={field.name} className="transition-all hover:translate-x-1">
                <label className="block text-blue-900 font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg flex items-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  {field.label}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="flex-1 bg-slate-200 text-slate-700 py-3 sm:py-4 rounded-xl font-bold hover:bg-slate-300 transition-all shadow-md hover:shadow-lg text-sm sm:text-base">
              ← Previous
            </button>
          )}
          {step < getCurrentSections().length - 1 ? (
            <button 
              onClick={() => canProceed() && setStep(step + 1)} 
              disabled={!canProceed()}
              className={`flex-1 bg-linear-to-r ${colorClasses[currentSection.color]} text-white py-3 sm:py-4 rounded-xl font-bold hover:shadow-xl transition-all shadow-lg text-sm sm:text-base ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next →
            </button>
          ) : (
            <button onClick={analyzeData} className="flex-1 bg-linear-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-4 rounded-xl font-bold hover:shadow-xl transition-all shadow-lg flex items-center justify-center text-sm sm:text-base">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Get My Career Path
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%)',
    }}>
      <InstallPWA />
      
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top curved lines */}
        <div className="absolute top-0 left-0 w-full h-32 opacity-20">
          <svg viewBox="0 0 1200 200" className="w-full h-full">
            <path d="M0,0 Q300,100 600,50 T1200,0 L1200,0 L0,0 Z" fill="rgba(33, 150, 243, 0.3)"/>
            <path d="M0,20 Q400,120 800,60 T1200,20 L1200,0 L0,0 Z" fill="rgba(33, 150, 243, 0.2)"/>
          </svg>
        </div>
        
        {/* Bottom right geometric shape */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-30">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <polygon points="400,400 400,200 200,400" fill="#1976d2"/>
            <polygon points="400,400 400,250 250,400" fill="#2196f3" opacity="0.8"/>
          </svg>
        </div>
        
        {/* Diagonal lines pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <svg viewBox="0 0 1200 800" className="w-full h-full">
            {Array.from({length: 20}, (_, i) => (
              <line 
                key={i}
                x1={800 + i * 20} 
                y1="0" 
                x2={1000 + i * 20} 
                y2="800" 
                stroke="#1976d2" 
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transition-transform duration-300 ease-in-out border-r border-blue-100`}
             style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.98)',
               backdropFilter: 'none',
               WebkitBackdropFilter: 'none'
             }}>
          <div className="flex items-center justify-between p-6 border-b border-blue-100 bg-white">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-blue-900">PathFinder</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-blue-700 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors touch-manipulation bg-blue-50"
              style={{ minWidth: '44px', minHeight: '44px' }}
              aria-label="Close navigation menu"
            >
              <X className="w-7 h-7" strokeWidth={2.5} />
            </button>
          </div>

          <nav className="p-4 bg-white h-full overflow-y-auto">
            <div className="space-y-2">
              {navigationTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabNavigation(tab.id);
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.style.backgroundColor = '';
                      // Double-ensure navigation happens on mobile
                      handleTabNavigation(tab.id);
                    }}
                    onTouchCancel={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                    className={`w-full flex items-center px-4 py-4 rounded-lg text-left transition-colors ios-touch-button mobile-nav-button ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-600 shadow-sm font-semibold'
                        : 'text-blue-700 hover:bg-blue-50 hover:text-blue-900 font-medium'
                    }`}
                    style={{ 
                      minHeight: '56px',
                      WebkitTapHighlightColor: 'rgba(33, 150, 243, 0.3)',
                      touchAction: 'manipulation',
                      cursor: 'pointer',
                      WebkitUserSelect: 'none',
                      userSelect: 'none',
                      WebkitTouchCallout: 'none',
                      border: 'none',
                      outline: 'none'
                    }}
                  >
                    <Icon className="w-6 h-6 mr-3 flex-shrink-0" strokeWidth={2} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base leading-tight">{tab.label}</div>
                      <div className="text-sm text-blue-600 leading-tight mt-1">{tab.description}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 flex-shrink-0 ml-2" strokeWidth={2} />
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <UserProfile user={user} onLogout={handleLogout} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-blue-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-blue-700 hover:text-blue-900 mr-4 p-2 rounded-lg hover:bg-blue-50 transition-colors touch-manipulation bg-blue-50 border border-blue-200"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-7 h-7" strokeWidth={2.5} />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-blue-900">
                    {navigationTabs.find(tab => tab.id === activeTab)?.label}
                  </h2>
                  <p className="text-sm text-blue-700 font-medium">
                    {navigationTabs.find(tab => tab.id === activeTab)?.description}
                  </p>
                  {/* Debug indicator for mobile testing */}
                  <p className="text-xs text-blue-500 font-mono lg:hidden">
                    Active: {activeTab}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors touch-manipulation"
                        style={{ minWidth: '44px', minHeight: '44px' }}>
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black z-40 lg:hidden"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            touchAction: 'none',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none'
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default PathFinderAppEnhanced;