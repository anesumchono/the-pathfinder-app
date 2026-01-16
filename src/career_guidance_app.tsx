import React, { useState } from 'react';
import { GraduationCap, BookOpen, TrendingUp, Home, Heart, Target, Sparkles, Award, Lightbulb, Users, Building2, Briefcase, DollarSign } from 'lucide-react';
import InstallPWA from './components/InstallPWA';

const PathFinderApp = () => {
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  
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
      // Determine the correct API URL based on where the app is accessed from
      const hostname = window.location.hostname;
      const apiUrl = hostname === 'localhost' || hostname === '127.0.0.1'
        ? 'http://localhost:5000/api/analyze'
        : `http://${hostname}:5000/api/analyze`;
      
      console.log('Calling API:', apiUrl);
      console.log('Form data:', formData);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Analysis failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const analysis = await response.json();
      console.log('Analysis result:', analysis);
      setResults(analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage = error.message || 'Network error. Please check your connection and try again.';
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

  const currentSection = getCurrentSections()[step];
  const Icon = currentSection?.icon;
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-indigo-500',
    red: 'from-red-500 to-pink-500',
    amber: 'from-amber-500 to-orange-500'
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
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-3 sm:p-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border border-slate-200">
            <div className="text-center mb-6 sm:mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg">
                <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">PathFinder</h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600">Your Personalized Career Roadmap</p>
            </div>

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

                <section className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-green-200 shadow-md">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-4 sm:mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                    Academic Focus Areas
                  </h2>
                  <ul className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-2 sm:space-y-3">
                    {results.academicFocus?.map((focus, idx) => (
                      <li key={idx} className="text-xs sm:text-sm md:text-base text-slate-700 flex items-start leading-relaxed">
                        <span className="text-green-600 text-lg sm:text-xl mr-2 sm:mr-3 font-bold">✓</span>
                        <span className="flex-1">{focus}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-amber-200 shadow-md">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-700 mb-4 sm:mb-6 flex items-center">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                    Challenges & Solutions
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {results.challenges?.map((item, idx) => (
                      <div key={idx} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-amber-500 shadow-sm">
                        <p className="font-bold text-slate-800 mb-2 sm:mb-3 flex items-center flex-wrap text-sm sm:text-base">
                          <span className="bg-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm mr-2 sm:mr-3 mb-1 sm:mb-0">Challenge {idx + 1}</span>
                          {item.challenge}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-3 sm:pl-4 border-l-2 border-amber-200">
                          <span className="font-semibold text-amber-700">Solution:</span> {item.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-linear-to-br from-purple-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-200 shadow-md">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 mb-4 sm:mb-6 flex items-center">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                    Opportunities to Explore
                  </h2>
                  <ul className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-2 sm:space-y-3">
                    {results.opportunities?.map((opp, idx) => (
                      <li key={idx} className="text-xs sm:text-sm md:text-base text-slate-700 flex items-start leading-relaxed">
                        <span className="text-purple-600 text-lg sm:text-xl mr-2 sm:mr-3">★</span>
                        <span className="flex-1">{opp}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-teal-200 shadow-md">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-700 mb-4 sm:mb-6 flex items-center">
                    <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                    Study Strategies
                  </h2>
                  <ul className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-2 sm:space-y-3">
                    {results.studyStrategies?.map((strategy, idx) => (
                      <li key={idx} className="text-xs sm:text-sm md:text-base text-slate-700 flex items-start leading-relaxed">
                        <span className="text-teal-600 text-lg sm:text-xl mr-2 sm:mr-3 font-bold">→</span>
                        <span className="flex-1">{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-linear-to-br from-pink-50 to-rose-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-pink-200 shadow-md">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-700 mb-4 sm:mb-6 flex items-center">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                    Your Goals Roadmap
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                      <h3 className="font-bold text-slate-800 mb-3 sm:mb-4 flex items-center text-base sm:text-lg flex-wrap">
                        <span className="bg-pink-100 text-pink-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm mr-2 sm:mr-3 mb-1 sm:mb-0">Next 6 Months</span>
                      </h3>
                      <ul className="space-y-2 sm:space-y-3">
                        {results.goals?.shortTerm?.map((goal, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start leading-relaxed">
                            <span className="text-pink-600 mr-2 font-bold">{idx + 1}.</span>
                            <span className="flex-1">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                      <h3 className="font-bold text-slate-800 mb-3 sm:mb-4 flex items-center text-base sm:text-lg flex-wrap">
                        <span className="bg-rose-100 text-rose-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm mr-2 sm:mr-3 mb-1 sm:mb-0">1-3 Years</span>
                      </h3>
                      <ul className="space-y-2 sm:space-y-3">
                        {results.goals?.longTerm?.map((goal, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start leading-relaxed">
                            <span className="text-rose-600 mr-2 font-bold">{idx + 1}.</span>
                            <span className="flex-1">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            )}

            <button
              onClick={() => { setResults(null); setStep(0); }}
              className="w-full mt-6 sm:mt-10 bg-linear-to-r from-slate-600 to-slate-700 text-white py-3 sm:py-4 rounded-xl font-bold hover:from-slate-700 hover:to-slate-800 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (analyzing) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 text-center border border-slate-200 max-w-md w-full">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-linear-to-r from-indigo-500 to-purple-600 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center animate-pulse">
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">Analyzing Your Profile</h2>
          <p className="text-slate-600 text-base sm:text-lg">PathFinder AI is mapping your career journey...</p>
          <div className="mt-4 sm:mt-6 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-3 sm:p-6">
      <InstallPWA />
      <div className="max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border border-slate-200">
          <div className="text-center mb-6 sm:mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg animate-pulse">
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">PathFinder</h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600">Discover Your Perfect Career Path</p>
          </div>

          <div className="mb-6 sm:mb-10">
            <div className="flex justify-between mb-3">
              {getCurrentSections().map((section, idx) => (
                <div key={idx} className={`flex-1 h-2 sm:h-3 rounded-full mx-0.5 sm:mx-1 transition-all duration-500 ${
                  idx < step ? 'bg-linear-to-r from-green-400 to-emerald-500' : 
                  idx === step ? `bg-linear-to-r ${colorClasses[section.color]}` : 
                  'bg-slate-200'
                }`}>
                  {idx === step && <div className="h-full bg-white/30 rounded-full animate-pulse"></div>}
                </div>
              ))}
            </div>
            <div className="hidden sm:flex justify-between text-xs text-slate-500 px-2">
              {getCurrentSections().map((section, idx) => (
                <span key={idx} className={idx <= step ? 'font-semibold text-indigo-600' : ''}>{section.title}</span>
              ))}
            </div>
            <p className="text-center text-xs sm:text-sm text-slate-600 mt-2 sm:mt-3 font-medium">
              Step {step + 1} of {getCurrentSections().length}
            </p>
          </div>

          <div className={`mb-6 sm:mb-10 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-linear-to-br ${colorClasses[currentSection.color]} bg-opacity-10 border-2 border-opacity-20`} style={{borderColor: currentSection.color}}>
            <div className="flex items-center mb-6 sm:mb-8 flex-col sm:flex-row text-center sm:text-left">
              <div className={`p-3 sm:p-4 rounded-xl bg-linear-to-br ${colorClasses[currentSection.color]} shadow-lg mb-3 sm:mb-0 sm:mr-4`}>
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">{currentSection.title}</h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-1">Tell us about your {currentSection.title.toLowerCase()}</p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {currentSection.fields.map(field => (
                <div key={field.name} className="transition-all hover:translate-x-1">
                  <label className="block text-slate-700 font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg flex items-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-slate-500" />
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
      </div>
    </div>
  );
};

export default PathFinderApp;
