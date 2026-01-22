import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Star, MapPin, Briefcase, GraduationCap, Calendar, Send } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  field: string;
  experience: number;
  location: string;
  rating: number;
  totalSessions: number;
  specialties: string[];
  bio: string;
  avatar: string;
  availability: string[];
  price: string;
  languages: string[];
}

interface MentorMatchingProps {
  user: any;
  userStream?: string;
  careerInterests?: string[];
}

const MentorMatching: React.FC<MentorMatchingProps> = ({ user, userStream, careerInterests }) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [showBooking, setShowBooking] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample mentor data - in production, this would come from an API
  const sampleMentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Mukamuri',
      title: 'Senior Software Engineer',
      company: 'Econet Wireless',
      field: 'Technology',
      experience: 8,
      location: 'Harare, Zimbabwe',
      rating: 4.9,
      totalSessions: 156,
      specialties: ['Software Development', 'Career Transition', 'Leadership'],
      bio: 'Passionate about helping young developers build successful careers in tech. I have experience in full-stack development and team leadership.',
      avatar: '/api/placeholder/100/100',
      availability: ['Monday 18:00-20:00', 'Wednesday 18:00-20:00', 'Saturday 10:00-12:00'],
      price: 'Free',
      languages: ['English', 'Shona']
    },
    {
      id: '2',
      name: 'Prof. Michael Chivasa',
      title: 'Professor of Medicine',
      company: 'University of Zimbabwe',
      field: 'Healthcare',
      experience: 15,
      location: 'Harare, Zimbabwe',
      rating: 4.8,
      totalSessions: 89,
      specialties: ['Medical Career Guidance', 'Research', 'Academic Excellence'],
      bio: 'Dedicated to mentoring the next generation of healthcare professionals. Specializing in internal medicine and medical education.',
      avatar: '/api/placeholder/100/100',
      availability: ['Tuesday 16:00-18:00', 'Thursday 16:00-18:00'],
      price: '$25/hour',
      languages: ['English']
    },
    {
      id: '3',
      name: 'Grace Mutindi',
      title: 'Financial Analyst',
      company: 'Standard Chartered Bank',
      field: 'Finance',
      experience: 6,
      location: 'Bulawayo, Zimbabwe',
      rating: 4.7,
      totalSessions: 73,
      specialties: ['Financial Planning', 'Banking', 'Investment Analysis'],
      bio: 'Helping students understand the finance industry and build strong foundations in financial analysis and planning.',
      avatar: '/api/placeholder/100/100',
      availability: ['Monday 17:00-19:00', 'Friday 17:00-19:00'],
      price: '$20/hour',
      languages: ['English', 'Ndebele']
    },
    {
      id: '4',
      name: 'James Nyathi',
      title: 'Civil Engineer',
      company: 'Ministry of Transport',
      field: 'Engineering',
      experience: 12,
      location: 'Harare, Zimbabwe',
      rating: 4.6,
      totalSessions: 45,
      specialties: ['Infrastructure Development', 'Project Management', 'Engineering Ethics'],
      bio: 'Experienced civil engineer passionate about infrastructure development and mentoring young engineers.',
      avatar: '/api/placeholder/100/100',
      availability: ['Saturday 14:00-16:00', 'Sunday 14:00-16:00'],
      price: '$30/hour',
      languages: ['English', 'Shona']
    },
    {
      id: '5',
      name: 'Dr. Patricia Moyo',
      title: 'Clinical Psychologist',
      company: 'Private Practice',
      field: 'Psychology',
      experience: 10,
      location: 'Mutare, Zimbabwe',
      rating: 4.9,
      totalSessions: 112,
      specialties: ['Career Counseling', 'Mental Health', 'Personal Development'],
      bio: 'Specializing in career counseling and helping students overcome academic and personal challenges.',
      avatar: '/api/placeholder/100/100',
      availability: ['Wednesday 15:00-17:00', 'Saturday 09:00-11:00'],
      price: '$35/hour',
      languages: ['English', 'Shona']
    },
    {
      id: '6',
      name: 'Robert Chikwanha',
      title: 'Marketing Director',
      company: 'Delta Corporation',
      field: 'Business',
      experience: 9,
      location: 'Harare, Zimbabwe',
      rating: 4.5,
      totalSessions: 67,
      specialties: ['Marketing Strategy', 'Brand Management', 'Entrepreneurship'],
      bio: 'Passionate about marketing and helping young professionals build successful business careers.',
      avatar: '/api/placeholder/100/100',
      availability: ['Tuesday 18:00-20:00', 'Thursday 18:00-20:00'],
      price: '$25/hour',
      languages: ['English']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMentors(sampleMentors);
      setFilteredMentors(sampleMentors);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterMentors();
  }, [searchTerm, selectedField, mentors, userStream, careerInterests]);

  const filterMentors = () => {
    let filtered = mentors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        mentor.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by field
    if (selectedField !== 'all') {
      filtered = filtered.filter(mentor => mentor.field === selectedField);
    }

    // Prioritize mentors relevant to user's stream and interests
    filtered.sort((a, b) => {
      const aRelevance = calculateRelevance(a);
      const bRelevance = calculateRelevance(b);
      if (aRelevance !== bRelevance) return bRelevance - aRelevance;
      return b.rating - a.rating; // Secondary sort by rating
    });

    setFilteredMentors(filtered);
  };

  const calculateRelevance = (mentor: Mentor) => {
    let relevance = 0;

    // Stream relevance
    if (userStream) {
      const streamFieldMap: Record<string, string[]> = {
        'Sciences': ['Technology', 'Healthcare', 'Engineering', 'Research'],
        'Commercial': ['Finance', 'Business', 'Marketing', 'Economics'],
        'Arts': ['Psychology', 'Education', 'Law', 'Social Work']
      };

      const relevantFields = streamFieldMap[userStream] || [];
      if (relevantFields.includes(mentor.field)) {
        relevance += 3;
      }
    }

    // Career interests relevance
    if (careerInterests) {
      const matchingInterests = careerInterests.filter(interest =>
        mentor.specialties.some(specialty =>
          specialty.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(specialty.toLowerCase())
        )
      );
      relevance += matchingInterests.length;
    }

    return relevance;
  };

  const handleBookSession = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowBooking(true);
  };

  const submitBookingRequest = () => {
    if (!selectedMentor || !message.trim()) return;

    // In production, this would send a request to the backend
    const bookingData = {
      mentorId: selectedMentor.id,
      userId: user?.email,
      message: message.trim(),
      requestedAt: new Date().toISOString()
    };

    // Simulate API call
    console.log('Booking request:', bookingData);
    
    // Save to localStorage for demo
    const existingRequests = JSON.parse(localStorage.getItem(`mentor_requests_${user?.email}`) || '[]');
    existingRequests.push({
      ...bookingData,
      mentor: selectedMentor,
      status: 'pending'
    });
    localStorage.setItem(`mentor_requests_${user?.email}`, JSON.stringify(existingRequests));

    alert('Your mentorship request has been sent! The mentor will respond within 24 hours.');
    setShowBooking(false);
    setMessage('');
    setSelectedMentor(null);
  };

  const fields = ['all', 'Technology', 'Healthcare', 'Finance', 'Engineering', 'Business', 'Psychology'];

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center">
          <Users className="w-6 h-6 mr-2 text-blue-600" />
          Find a Mentor
        </h3>
        <span className="text-sm text-slate-500">{filteredMentors.length} mentors available</span>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search mentors by name, field, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          {fields.map(field => (
            <option key={field} value={field}>
              {field === 'all' ? 'All Fields' : field}
            </option>
          ))}
        </select>
      </div>

      {/* Mentors List */}
      <div className="space-y-4">
        {filteredMentors.map(mentor => (
          <div key={mentor.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {mentor.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{mentor.name}</h4>
                    <p className="text-blue-600 font-medium">{mentor.title}</p>
                    <p className="text-slate-600 text-sm">{mentor.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-slate-500 text-sm ml-1">({mentor.totalSessions})</span>
                    </div>
                    <p className="text-green-600 font-semibold">{mentor.price}</p>
                  </div>
                </div>

                <p className="text-slate-700 text-sm mb-3">{mentor.bio}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {mentor.specialties.map((specialty, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {mentor.experience} years experience
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {mentor.location}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {mentor.availability.length} slots available
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleBookSession(mentor)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Request Session
                  </button>
                  <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredMentors.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No mentors found matching your criteria.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBooking && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h4 className="text-xl font-bold text-slate-800 mb-4">
              Request Session with {selectedMentor.name}
            </h4>
            
            <div className="mb-4">
              <p className="text-slate-600 mb-2">Available times:</p>
              <ul className="text-sm text-slate-700">
                {selectedMentor.availability.map((time, idx) => (
                  <li key={idx} className="flex items-center mb-1">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    {time}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Message to mentor:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the mentor about your goals and what you'd like to discuss..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none h-24"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBooking(false)}
                className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitBookingRequest}
                disabled={!message.trim()}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorMatching;