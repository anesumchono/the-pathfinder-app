import React, { useState, useEffect } from 'react';
import { Search, DollarSign, Calendar, MapPin, ExternalLink, Filter, Star } from 'lucide-react';

interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  location: string;
  eligibility: string[];
  description: string;
  link: string;
  category: string;
  featured: boolean;
}

interface ScholarshipDatabaseProps {
  user: any;
  userStream?: string;
}

const ScholarshipDatabase: React.FC<ScholarshipDatabaseProps> = ({ user, userStream }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample scholarship data - in production, this would come from an API
  const sampleScholarships: Scholarship[] = [
    {
      id: '1',
      title: 'Zimbabwe Presidential Scholarship',
      provider: 'Government of Zimbabwe',
      amount: 'Full tuition + living allowance',
      deadline: '2024-06-30',
      location: 'Zimbabwe',
      eligibility: ['Zimbabwean citizen', 'Excellent academic record', 'Financial need'],
      description: 'Prestigious scholarship for outstanding students pursuing higher education in Zimbabwe.',
      link: 'https://www.zimscholarships.gov.zw',
      category: 'Government',
      featured: true
    },
    {
      id: '2',
      title: 'STEM Excellence Scholarship',
      provider: 'Zimbabwe Science Foundation',
      amount: '$5,000 per year',
      deadline: '2024-08-15',
      location: 'Zimbabwe',
      eligibility: ['STEM field', 'Minimum B average', 'Community service'],
      description: 'Supporting students pursuing Science, Technology, Engineering, and Mathematics.',
      link: 'https://www.stemsupport.org.zw',
      category: 'STEM',
      featured: false
    },
    {
      id: '3',
      title: 'Commonwealth Scholarship',
      provider: 'Commonwealth Scholarship Commission',
      amount: 'Full funding',
      deadline: '2024-12-01',
      location: 'UK',
      eligibility: ['Commonwealth citizen', 'First-class degree', 'Leadership potential'],
      description: 'Fully funded scholarships for Master\'s and PhD studies in the UK.',
      link: 'https://www.commonwealthscholarships.org',
      category: 'International',
      featured: true
    },
    {
      id: '4',
      title: 'African Development Bank Scholarship',
      provider: 'African Development Bank',
      amount: 'Full tuition + stipend',
      deadline: '2024-07-31',
      location: 'Various African countries',
      eligibility: ['African citizen', 'Development-focused studies', 'Work experience'],
      description: 'Supporting African students in development-related fields.',
      link: 'https://www.afdb.org/scholarships',
      category: 'Development',
      featured: false
    },
    {
      id: '5',
      title: 'Women in Technology Scholarship',
      provider: 'Tech Women Zimbabwe',
      amount: '$3,000',
      deadline: '2024-09-30',
      location: 'Zimbabwe',
      eligibility: ['Female student', 'Technology field', 'Academic excellence'],
      description: 'Empowering women to pursue careers in technology and innovation.',
      link: 'https://www.techwomen.org.zw',
      category: 'Technology',
      featured: false
    },
    {
      id: '6',
      title: 'Chevening Scholarship',
      provider: 'UK Government',
      amount: 'Full funding',
      deadline: '2024-11-02',
      location: 'UK',
      eligibility: ['Leadership potential', 'Work experience', 'English proficiency'],
      description: 'One-year Master\'s degree scholarship in the UK for future leaders.',
      link: 'https://www.chevening.org',
      category: 'International',
      featured: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setScholarships(sampleScholarships);
      setFilteredScholarships(sampleScholarships);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterScholarships();
  }, [searchTerm, selectedCategory, scholarships]);

  const filterScholarships = () => {
    let filtered = scholarships;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(scholarship =>
        scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.eligibility.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scholarship => scholarship.category === selectedCategory);
    }

    // Prioritize scholarships relevant to user's stream
    if (userStream) {
      filtered.sort((a, b) => {
        const aRelevant = isRelevantToStream(a, userStream);
        const bRelevant = isRelevantToStream(b, userStream);
        if (aRelevant && !bRelevant) return -1;
        if (!aRelevant && bRelevant) return 1;
        return 0;
      });
    }

    setFilteredScholarships(filtered);
  };

  const isRelevantToStream = (scholarship: Scholarship, stream: string) => {
    const streamKeywords = {
      'Sciences': ['STEM', 'science', 'technology', 'engineering', 'mathematics', 'medicine', 'research'],
      'Commercial': ['business', 'commerce', 'finance', 'economics', 'management', 'accounting'],
      'Arts': ['arts', 'humanities', 'literature', 'history', 'social', 'development', 'education']
    };

    const keywords = streamKeywords[stream as keyof typeof streamKeywords] || [];
    return keywords.some(keyword =>
      scholarship.title.toLowerCase().includes(keyword) ||
      scholarship.description.toLowerCase().includes(keyword) ||
      scholarship.category.toLowerCase().includes(keyword)
    );
  };

  const categories = ['all', 'Government', 'International', 'STEM', 'Technology', 'Development'];

  const isDeadlineApproaching = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return daysUntilDeadline <= 30 && daysUntilDeadline > 0;
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil((date.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilDeadline < 0) return 'Expired';
    if (daysUntilDeadline === 0) return 'Due today';
    if (daysUntilDeadline <= 7) return `${daysUntilDeadline} days left`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-slate-200 rounded-lg p-4">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
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
          <DollarSign className="w-6 h-6 mr-2 text-green-600" />
          Scholarship Database
        </h3>
        <span className="text-sm text-slate-500">{filteredScholarships.length} scholarships found</span>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Scholarships */}
      {filteredScholarships.some(s => s.featured) && (
        <div className="mb-6">
          <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Featured Scholarships
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredScholarships.filter(s => s.featured).map(scholarship => (
              <div key={scholarship.id} className="border-2 border-yellow-200 bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-bold text-slate-800 flex-1">{scholarship.title}</h5>
                  <Star className="w-5 h-5 text-yellow-500 ml-2" />
                </div>
                <p className="text-sm text-slate-600 mb-2">{scholarship.provider}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {scholarship.amount}
                  </span>
                  <span className={`flex items-center ${isDeadlineApproaching(scholarship.deadline) ? 'text-red-600 font-semibold' : ''}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDeadline(scholarship.deadline)}
                  </span>
                </div>
                <a
                  href={scholarship.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Learn More <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Scholarships */}
      <div className="space-y-4">
        {filteredScholarships.map(scholarship => (
          <div key={scholarship.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-slate-800">{scholarship.title}</h4>
                  {scholarship.featured && <Star className="w-4 h-4 text-yellow-500" />}
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {scholarship.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{scholarship.provider}</p>
                <p className="text-sm text-slate-700 mb-3">{scholarship.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-3">
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {scholarship.amount}
                  </span>
                  <span className={`flex items-center ${isDeadlineApproaching(scholarship.deadline) ? 'text-red-600 font-semibold' : ''}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDeadline(scholarship.deadline)}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {scholarship.location}
                  </span>
                </div>

                <div className="mb-3">
                  <h5 className="font-semibold text-slate-700 text-sm mb-1">Eligibility:</h5>
                  <div className="flex flex-wrap gap-1">
                    {scholarship.eligibility.map((req, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Now <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              
              {isDeadlineApproaching(scholarship.deadline) && (
                <span className="text-red-600 font-semibold text-sm">
                  ⚠️ Deadline approaching!
                </span>
              )}
            </div>
          </div>
        ))}
        
        {filteredScholarships.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No scholarships found matching your criteria.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDatabase;