from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Grade mapping
GRADE_MAP = {'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'U': 0, '': 0, 'Not Taken': 0}

# Enhanced career paths database with more specializations
CAREER_PATHS = {
    'Sciences': {
        'Software Engineering': {
            'required_subjects': ['mathematics', 'physics', 'computerScience'],
            'min_grades': {'mathematics': 3, 'physics': 3},
            'programs': [
                'Bachelor of Science in Computer Science',
                'Software Engineering Degree',
                'Computer Engineering',
                'Information Technology',
                'Artificial Intelligence and Machine Learning',
                'Cybersecurity'
            ],
            'universities': [
                'University of Zimbabwe - Department of Computer Science',
                'National University of Science and Technology (NUST)',
                'Chinhoyi University of Technology',
                'Midlands State University',
                'Africa University',
                'MIT (Massachusetts Institute of Technology)',
                'Stanford University',
                'Carnegie Mellon University'
            ],
            'jobs': [
                {'title': 'Junior Software Developer', 'salary': '$30k-50k', 'description': 'Entry-level position developing applications and software solutions.'},
                {'title': 'Full Stack Developer', 'salary': '$50k-80k', 'description': 'Mid-level role working on both frontend and backend systems.'},
                {'title': 'Senior Software Engineer', 'salary': '$80k-120k', 'description': 'Lead technical projects and mentor junior developers.'},
                {'title': 'AI/ML Engineer', 'salary': '$90k-150k', 'description': 'Develop artificial intelligence and machine learning solutions.'},
                {'title': 'DevOps Engineer', 'salary': '$70k-110k', 'description': 'Manage deployment pipelines and cloud infrastructure.'}
            ]
        },
        'Data Science & Analytics': {
            'required_subjects': ['mathematics', 'computerScience'],
            'min_grades': {'mathematics': 4},
            'programs': [
                'Bachelor of Science in Data Science',
                'Statistics and Data Analytics',
                'Applied Mathematics',
                'Computer Science with AI/ML specialization',
                'Business Intelligence and Analytics'
            ],
            'universities': [
                'University of Zimbabwe',
                'National University of Science and Technology (NUST)',
                'Midlands State University',
                'Africa University',
                'Harvard University',
                'UC Berkeley',
                'University of Oxford'
            ],
            'jobs': [
                {'title': 'Data Analyst', 'salary': '$40k-65k', 'description': 'Analyze data to provide business insights and recommendations.'},
                {'title': 'Data Scientist', 'salary': '$60k-100k', 'description': 'Build predictive models and machine learning solutions.'},
                {'title': 'Machine Learning Engineer', 'salary': '$70k-120k', 'description': 'Develop and deploy AI/ML systems at scale.'},
                {'title': 'Business Intelligence Analyst', 'salary': '$50k-85k', 'description': 'Create dashboards and reports for business decision-making.'}
            ]
        },
        'Medicine & Healthcare': {
            'required_subjects': ['biology', 'chemistry', 'physics'],
            'min_grades': {'biology': 4, 'chemistry': 4, 'physics': 3},
            'programs': [
                'Bachelor of Medicine and Bachelor of Surgery (MBChB)',
                'Bachelor of Pharmacy',
                'Bachelor of Dental Surgery',
                'Biomedical Sciences',
                'Nursing Science',
                'Medical Laboratory Sciences',
                'Physiotherapy'
            ],
            'universities': [
                'University of Zimbabwe - College of Health Sciences',
                'National University of Science and Technology (NUST) - Medical School',
                'Midlands State University - Faculty of Health Sciences',
                'Africa University - Health Sciences',
                'Harvard Medical School',
                'Johns Hopkins University',
                'University of Cambridge'
            ],
            'jobs': [
                {'title': 'Medical Doctor', 'salary': '$40k-100k', 'description': 'Diagnose and treat patients in hospitals or private practice.'},
                {'title': 'Pharmacist', 'salary': '$35k-70k', 'description': 'Dispense medications and provide pharmaceutical care.'},
                {'title': 'Medical Researcher', 'salary': '$50k-90k', 'description': 'Conduct research to advance medical knowledge.'},
                {'title': 'Specialist Surgeon', 'salary': '$100k-300k', 'description': 'Perform specialized surgical procedures.'},
                {'title': 'Public Health Officer', 'salary': '$45k-75k', 'description': 'Work on community health programs and disease prevention.'}
            ]
        },
        'Engineering': {
            'required_subjects': ['mathematics', 'physics'],
            'min_grades': {'mathematics': 4, 'physics': 4},
            'programs': [
                'Bachelor of Engineering (Mechanical/Electrical/Civil)',
                'Chemical Engineering',
                'Mining Engineering',
                'Industrial Engineering',
                'Environmental Engineering',
                'Aerospace Engineering'
            ],
            'universities': [
                'University of Zimbabwe - Faculty of Engineering',
                'National University of Science and Technology (NUST)',
                'Chinhoyi University of Technology',
                'Harare Institute of Technology',
                'MIT',
                'Stanford University',
                'Imperial College London'
            ],
            'jobs': [
                {'title': 'Mechanical Engineer', 'salary': '$45k-75k', 'description': 'Design and develop mechanical systems and machinery.'},
                {'title': 'Electrical Engineer', 'salary': '$50k-85k', 'description': 'Work on electrical systems, power generation, and electronics.'},
                {'title': 'Civil Engineer', 'salary': '$45k-80k', 'description': 'Design infrastructure projects like roads, bridges, and buildings.'},
                {'title': 'Mining Engineer', 'salary': '$60k-100k', 'description': 'Plan and oversee mining operations and mineral extraction.'}
            ]
        }
    },
    'Commercial': {
        'Accounting & Finance': {
            'required_subjects': ['accounting', 'mathematics'],
            'min_grades': {'accounting': 3, 'mathematics': 3},
            'programs': [
                'Bachelor of Accountancy (BAcc)',
                'Bachelor of Commerce in Accounting',
                'ACCA (Association of Chartered Certified Accountants)',
                'CPA (Certified Public Accountant)',
                'Bachelor of Science in Finance',
                'Chartered Financial Analyst (CFA)'
            ],
            'universities': [
                'University of Zimbabwe - Faculty of Commerce',
                'National University of Science and Technology (NUST)',
                'Midlands State University',
                'Africa University',
                'Wharton School - University of Pennsylvania',
                'London School of Economics',
                'University of Chicago Booth School'
            ],
            'jobs': [
                {'title': 'Junior Accountant', 'salary': '$25k-40k', 'description': 'Handle bookkeeping, financial records, and basic accounting tasks.'},
                {'title': 'Financial Analyst', 'salary': '$40k-70k', 'description': 'Analyze financial data and provide investment recommendations.'},
                {'title': 'Senior Accountant/CPA', 'salary': '$60k-100k', 'description': 'Manage financial reporting, audits, and strategic planning.'},
                {'title': 'Investment Banker', 'salary': '$80k-200k', 'description': 'Facilitate corporate finance transactions and investments.'},
                {'title': 'Chief Financial Officer', 'salary': '$120k-300k', 'description': 'Lead financial strategy and operations for organizations.'}
            ]
        },
        'Business Management & Entrepreneurship': {
            'required_subjects': ['businessStudies', 'economics'],
            'min_grades': {'businessStudies': 3, 'economics': 3},
            'programs': [
                'Bachelor of Business Administration (BBA)',
                'Bachelor of Commerce',
                'MBA (Master of Business Administration)',
                'Business Management and Entrepreneurship',
                'International Business',
                'Supply Chain Management'
            ],
            'universities': [
                'University of Zimbabwe - Graduate School of Management',
                'National University of Science and Technology (NUST)',
                'Midlands State University',
                'Africa University',
                'Harvard Business School',
                'Stanford Graduate School of Business',
                'INSEAD'
            ],
            'jobs': [
                {'title': 'Business Analyst', 'salary': '$35k-60k', 'description': 'Analyze business processes and recommend improvements.'},
                {'title': 'Project Manager', 'salary': '$50k-85k', 'description': 'Lead and coordinate business projects from start to finish.'},
                {'title': 'Entrepreneur/Business Owner', 'salary': '$40k-150k+', 'description': 'Start and manage your own business ventures.'},
                {'title': 'Management Consultant', 'salary': '$70k-130k', 'description': 'Advise organizations on strategic and operational improvements.'},
                {'title': 'Operations Manager', 'salary': '$55k-90k', 'description': 'Oversee daily business operations and optimize processes.'}
            ]
        },
        'Marketing & Digital Commerce': {
            'required_subjects': ['businessStudies', 'economics'],
            'min_grades': {'businessStudies': 3},
            'programs': [
                'Bachelor of Commerce in Marketing',
                'Digital Marketing and E-commerce',
                'Brand Management',
                'International Marketing',
                'Consumer Psychology'
            ],
            'universities': [
                'University of Zimbabwe',
                'National University of Science and Technology (NUST)',
                'Midlands State University',
                'Northwestern Kellogg',
                'Columbia Business School'
            ],
            'jobs': [
                {'title': 'Digital Marketing Specialist', 'salary': '$30k-55k', 'description': 'Manage online marketing campaigns and social media.'},
                {'title': 'Brand Manager', 'salary': '$45k-75k', 'description': 'Develop and execute brand strategies and campaigns.'},
                {'title': 'Marketing Director', 'salary': '$70k-120k', 'description': 'Lead marketing strategy and team management.'},
                {'title': 'E-commerce Manager', 'salary': '$50k-85k', 'description': 'Manage online sales platforms and digital commerce.'}
            ]
        }
    },
    'Arts': {
        'Law & Legal Studies': {
            'required_subjects': ['english', 'history'],
            'min_grades': {'english': 3, 'history': 3},
            'programs': [
                'Bachelor of Laws (LLB)',
                'Legal Studies',
                'International Law',
                'Human Rights Law',
                'Corporate Law',
                'Criminal Justice'
            ],
            'universities': [
                'University of Zimbabwe - Faculty of Law',
                'Midlands State University',
                'Africa University',
                'Great Zimbabwe University',
                'Harvard Law School',
                'Oxford University',
                'Yale Law School'
            ],
            'jobs': [
                {'title': 'Legal Assistant', 'salary': '$25k-45k', 'description': 'Support lawyers with research, documentation, and case preparation.'},
                {'title': 'Lawyer/Attorney', 'salary': '$50k-100k', 'description': 'Represent clients in legal matters and court proceedings.'},
                {'title': 'Corporate Counsel', 'salary': '$70k-130k', 'description': 'Provide legal advice to corporations and businesses.'},
                {'title': 'Judge/Magistrate', 'salary': '$80k-150k', 'description': 'Preside over court proceedings and make legal decisions.'},
                {'title': 'Human Rights Advocate', 'salary': '$40k-80k', 'description': 'Work on human rights cases and advocacy.'}
            ]
        },
        'Media & Communications': {
            'required_subjects': ['english', 'literature'],
            'min_grades': {'english': 3},
            'programs': [
                'Bachelor of Arts in Journalism and Media Studies',
                'Mass Communication',
                'Digital Media and Communications',
                'Broadcasting',
                'Public Relations',
                'Film and Television Production'
            ],
            'universities': [
                'University of Zimbabwe - Department of Media Studies',
                'National University of Science and Technology (NUST)',
                'Midlands State University',
                'Africa University',
                'Columbia Journalism School',
                'University of Southern California'
            ],
            'jobs': [
                {'title': 'Content Writer', 'salary': '$25k-45k', 'description': 'Create written content for websites, blogs, and publications.'},
                {'title': 'Journalist/Reporter', 'salary': '$30k-60k', 'description': 'Research and report news stories for media outlets.'},
                {'title': 'Media Producer', 'salary': '$45k-80k', 'description': 'Produce content for TV, radio, or digital platforms.'},
                {'title': 'Public Relations Manager', 'salary': '$50k-85k', 'description': 'Manage public image and communications for organizations.'},
                {'title': 'Social Media Manager', 'salary': '$35k-65k', 'description': 'Manage social media presence and digital engagement.'}
            ]
        },
        'Education & Training': {
            'required_subjects': ['english'],
            'min_grades': {'english': 3},
            'programs': [
                'Bachelor of Education',
                'Teaching Diploma',
                'Educational Psychology',
                'Curriculum Development',
                'Special Needs Education',
                'Educational Technology'
            ],
            'universities': [
                'University of Zimbabwe - Faculty of Education',
                'Great Zimbabwe University',
                'Bindura University of Science Education',
                'Midlands State University',
                'Teachers College Columbia University',
                'Harvard Graduate School of Education'
            ],
            'jobs': [
                {'title': 'Primary School Teacher', 'salary': '$20k-40k', 'description': 'Teach young children foundational subjects and skills.'},
                {'title': 'Secondary School Teacher', 'salary': '$25k-50k', 'description': 'Teach specialized subjects to high school students.'},
                {'title': 'Education Administrator', 'salary': '$40k-70k', 'description': 'Manage school operations and educational programs.'},
                {'title': 'Educational Consultant', 'salary': '$45k-80k', 'description': 'Advise on educational policies and curriculum development.'},
                {'title': 'Training and Development Manager', 'salary': '$50k-85k', 'description': 'Design and implement training programs for organizations.'}
            ]
        },
        'Psychology & Social Sciences': {
            'required_subjects': ['history', 'geography'],
            'min_grades': {'history': 3},
            'programs': [
                'Bachelor of Arts in Psychology',
                'Sociology',
                'Political Science',
                'Development Studies',
                'Social Work',
                'International Relations'
            ],
            'universities': [
                'University of Zimbabwe',
                'Midlands State University',
                'Africa University',
                'Great Zimbabwe University',
                'Stanford University',
                'University of Cambridge'
            ],
            'jobs': [
                {'title': 'Social Worker', 'salary': '$25k-45k', 'description': 'Support individuals and communities facing social challenges.'},
                {'title': 'Research Analyst', 'salary': '$35k-60k', 'description': 'Conduct research on social, political, or economic issues.'},
                {'title': 'NGO Program Manager', 'salary': '$40k-70k', 'description': 'Manage development programs for non-profit organizations.'},
                {'title': 'Clinical Psychologist', 'salary': '$50k-90k', 'description': 'Provide therapy and psychological assessment services.'},
                {'title': 'Policy Analyst', 'salary': '$45k-80k', 'description': 'Analyze and develop public policies and programs.'}
            ]
        }
    }
}

# In-memory storage for demo (in production, use a proper database)
user_data = {}
notifications_subscriptions = {}
progress_data = {}
mentor_requests = {}
aptitude_results = {}

def extract_features(form_data):
    """Extract and encode features from form data"""
    features = {}
    
    # Convert grades to numeric
    for subject in ['mathematics', 'physics', 'chemistry', 'biology', 'computerScience',
                    'english', 'history', 'geography', 'literature', 'religiousStudies',
                    'french', 'shona', 'ndebele', 'accounting', 'economics', 
                    'businessStudies', 'commerce', 'combinedScience']:
        grade = form_data.get(subject, '')
        features[f'{subject}_grade'] = GRADE_MAP.get(grade, 0)
    
    # Numeric features
    features['attendance'] = float(form_data.get('attendance', 0)) / 100
    features['studyHours'] = float(form_data.get('studyHours', 0))
    
    # Categorical encoding
    features['stream'] = {'Sciences': 2, 'Commercial': 1, 'Arts': 0}.get(form_data.get('stream', ''), 0)
    
    return features

def calculate_career_match(form_data, career_info, career_name):
    """Calculate match score for a career based on grades and requirements"""
    score = 0
    max_score = 0
    
    required_subjects = career_info.get('required_subjects', [])
    min_grades = career_info.get('min_grades', {})
    
    for subject in required_subjects:
        max_score += 5
        grade = form_data.get(subject, '')
        grade_value = GRADE_MAP.get(grade, 0)
        
        if subject in min_grades:
            if grade_value >= min_grades[subject]:
                score += grade_value
        else:
            score += grade_value
    
    # Bonus for high attendance and study hours
    attendance = float(form_data.get('attendance', 0))
    study_hours = float(form_data.get('studyHours', 0))
    
    if attendance >= 80:
        score += 2
        max_score += 2
    if study_hours >= 3:
        score += 1
        max_score += 1
    
    match_percentage = (score / max_score * 100) if max_score > 0 else 0
    return match_percentage, score, max_score

def get_career_recommendations(form_data):
    """Get top career recommendations based on form data"""
    stream = form_data.get('stream', '')
    
    if stream not in CAREER_PATHS:
        return []
    
    careers = CAREER_PATHS[stream]
    recommendations = []
    
    for career_name, career_info in careers.items():
        match_percentage, score, max_score = calculate_career_match(form_data, career_info, career_name)
        
        if match_percentage >= 40:  # Minimum 40% match
            recommendations.append({
                'name': career_name,
                'match_percentage': match_percentage,
                'score': score,
                'info': career_info
            })
    
    # Sort by match percentage
    recommendations.sort(key=lambda x: x['match_percentage'], reverse=True)
    
    return recommendations[:4]  # Return top 4

def generate_analysis(form_data):
    """Generate comprehensive career analysis"""
    recommendations = get_career_recommendations(form_data)
    
    if not recommendations:
        return {'error': 'Unable to generate recommendations. Please check your inputs.'}
    
    career_paths = []
    for rec in recommendations:
        career_info = rec['info']
        career_paths.append({
            'title': rec['name'],
            'reasoning': f"Based on your {form_data.get('stream', '')} stream performance with a {rec['match_percentage']:.1f}% match, this career aligns well with your academic strengths and subject grades.",
            'steps': f"Focus on excelling in {', '.join(career_info.get('required_subjects', []))}. Maintain high grades and seek practical experience through internships or projects.",
            'education': {
                'programs': career_info.get('programs', []),
                'universities': career_info.get('universities', [])
            },
            'jobs': career_info.get('jobs', [])
        })
    
    # Generate academic focus based on stream and grades
    academic_focus = []
    stream = form_data.get('stream', '')
    
    if stream == 'Sciences':
        if GRADE_MAP.get(form_data.get('mathematics', ''), 0) < 4:
            academic_focus.append('Strengthen your Mathematics foundation - it\'s crucial for Sciences careers')
        if GRADE_MAP.get(form_data.get('physics', ''), 0) < 4:
            academic_focus.append('Improve Physics understanding through practical experiments and problem-solving')
        academic_focus.append('Develop strong analytical and problem-solving skills')
        academic_focus.append('Engage in science competitions and projects')
        academic_focus.append('Consider taking additional computer science courses')
    elif stream == 'Commercial':
        if GRADE_MAP.get(form_data.get('accounting', ''), 0) < 4:
            academic_focus.append('Focus on mastering Accounting principles and practices')
        if GRADE_MAP.get(form_data.get('mathematics', ''), 0) < 4:
            academic_focus.append('Strengthen mathematical skills for business calculations')
        academic_focus.append('Develop business acumen through case studies and real-world examples')
        academic_focus.append('Stay updated with economic trends and business news')
        academic_focus.append('Learn digital marketing and e-commerce skills')
    else:  # Arts
        if GRADE_MAP.get(form_data.get('english', ''), 0) < 4:
            academic_focus.append('Enhance English language proficiency - reading, writing, and communication')
        academic_focus.append('Develop critical thinking and analytical skills')
        academic_focus.append('Engage in debates, writing competitions, and cultural activities')
        academic_focus.append('Build strong research and presentation skills')
    
    academic_focus.append('Maintain consistent study habits and high attendance')
    academic_focus.append('Seek mentorship from teachers and professionals in your field')
    
    # Generate challenges and solutions
    challenges = []
    attendance = float(form_data.get('attendance', 0))
    study_hours = float(form_data.get('studyHours', 0))
    
    if attendance < 80:
        challenges.append({
            'challenge': 'Low attendance rate affecting academic performance',
            'solution': 'Prioritize regular school attendance. Create a schedule and identify barriers preventing attendance. Consistent presence is crucial for success.'
        })
    
    if study_hours < 2:
        challenges.append({
            'challenge': 'Insufficient daily study time',
            'solution': 'Gradually increase study hours to at least 3-4 hours daily. Use time management techniques like Pomodoro. Create a dedicated study space.'
        })
    
    if form_data.get('accessToResources', '').find('Limited') != -1:
        challenges.append({
            'challenge': 'Limited access to learning resources',
            'solution': 'Utilize free online resources (Khan Academy, Coursera, YouTube). Join study groups. Visit local libraries. Seek scholarships for educational materials.'
        })
    
    if not challenges:
        challenges.append({
            'challenge': 'Maintaining motivation and avoiding burnout',
            'solution': 'Set realistic goals, celebrate small wins, take regular breaks, and maintain work-life balance. Join study groups for peer support.'
        })
    
    # Enhanced opportunities
    opportunities = [
        'Apply for scholarships and bursaries - many organizations support talented students',
        'Participate in career fairs and university open days to explore options',
        'Join relevant clubs and societies related to your career interests',
        'Seek internships or volunteer opportunities during school holidays',
        'Build a portfolio of projects, achievements, and extracurricular activities',
        'Network with professionals through LinkedIn and industry events',
        'Take online courses to develop additional skills',
        'Participate in hackathons, competitions, and academic olympiads',
        'Consider mentorship programs and career guidance sessions',
        'Explore international exchange programs and study abroad opportunities'
    ]
    
    # Enhanced study strategies
    study_strategies = [
        'Use active recall and spaced repetition for better retention',
        'Create mind maps and visual aids for complex topics',
        'Practice past exam papers and timed assessments',
        'Form study groups with motivated peers',
        'Teach concepts to others to reinforce your understanding',
        'Take regular breaks and maintain physical health through exercise',
        'Use technology tools like educational apps and online platforms',
        'Set specific, measurable, achievable, relevant, and time-bound (SMART) goals',
        'Track your progress and adjust study methods accordingly',
        'Seek help from teachers and tutors when needed'
    ]
    
    # Enhanced goals
    goals = {
        'shortTerm': [
            f'Improve grades in weaker subjects to at least a B grade',
            'Increase daily study time to 3-4 hours consistently',
            'Achieve 90%+ attendance rate',
            'Complete at least one online course or certification',
            'Join a relevant club or extracurricular activity',
            'Take an aptitude test to better understand your strengths',
            'Connect with a mentor in your field of interest'
        ],
        'longTerm': [
            f'Gain admission to a top university for {recommendations[0]["name"]}',
            'Secure scholarships or financial aid for higher education',
            'Complete internships or work experience in your chosen field',
            'Build a strong professional network',
            'Achieve career success and financial independence',
            'Develop expertise in emerging technologies or methodologies',
            'Consider pursuing advanced degrees or professional certifications'
        ]
    }
    
    return {
        'careerPaths': career_paths,
        'academicFocus': academic_focus,
        'challenges': challenges,
        'opportunities': opportunities,
        'studyStrategies': study_strategies,
        'goals': goals
    }

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        form_data = request.json
        
        # Validate required fields
        if not form_data.get('stream'):
            return jsonify({'error': 'Please select an academic stream'}), 400
        
        # Store user data for future reference
        user_id = form_data.get('userId', 'anonymous')
        user_data[user_id] = {
            'form_data': form_data,
            'timestamp': datetime.now().isoformat()
        }
        
        # Generate analysis
        analysis = generate_analysis(form_data)
        
        return jsonify(analysis)
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@app.route('/api/progress', methods=['POST'])
def save_progress():
    try:
        data = request.json
        user_id = data.get('userId')
        goals = data.get('goals', [])
        
        if not user_id:
            return jsonify({'error': 'User ID required'}), 400
        
        progress_data[user_id] = {
            'goals': goals,
            'updated_at': datetime.now().isoformat()
        }
        
        return jsonify({'success': True, 'message': 'Progress saved successfully'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/progress/<user_id>', methods=['GET'])
def get_progress(user_id):
    try:
        user_progress = progress_data.get(user_id, {'goals': []})
        return jsonify(user_progress)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/subscribe', methods=['POST'])
def subscribe_notifications():
    try:
        data = request.json
        user_id = data.get('userId')
        subscription = data.get('subscription')
        preferences = data.get('preferences', {})
        
        if not user_id or not subscription:
            return jsonify({'error': 'User ID and subscription required'}), 400
        
        notifications_subscriptions[user_id] = {
            'subscription': subscription,
            'preferences': preferences,
            'created_at': datetime.now().isoformat()
        }
        
        return jsonify({'success': True, 'message': 'Subscription saved successfully'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/notification-preferences', methods=['PUT'])
def update_notification_preferences():
    try:
        data = request.json
        user_id = data.get('userId')
        preferences = data.get('preferences', {})
        
        if not user_id:
            return jsonify({'error': 'User ID required'}), 400
        
        if user_id in notifications_subscriptions:
            notifications_subscriptions[user_id]['preferences'] = preferences
            notifications_subscriptions[user_id]['updated_at'] = datetime.now().isoformat()
        
        return jsonify({'success': True, 'message': 'Preferences updated successfully'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/mentor-requests', methods=['POST'])
def create_mentor_request():
    try:
        data = request.json
        user_id = data.get('userId')
        mentor_id = data.get('mentorId')
        message = data.get('message')
        
        if not all([user_id, mentor_id, message]):
            return jsonify({'error': 'User ID, mentor ID, and message required'}), 400
        
        request_id = f"{user_id}_{mentor_id}_{int(datetime.now().timestamp())}"
        
        mentor_requests[request_id] = {
            'user_id': user_id,
            'mentor_id': mentor_id,
            'message': message,
            'status': 'pending',
            'created_at': datetime.now().isoformat()
        }
        
        return jsonify({'success': True, 'request_id': request_id, 'message': 'Mentor request created successfully'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/mentor-requests/<user_id>', methods=['GET'])
def get_mentor_requests(user_id):
    try:
        user_requests = [
            {**request, 'id': request_id} 
            for request_id, request in mentor_requests.items() 
            if request['user_id'] == user_id
        ]
        return jsonify({'requests': user_requests})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/aptitude-results', methods=['POST'])
def save_aptitude_results():
    try:
        data = request.json
        user_id = data.get('userId')
        results = data.get('results', [])
        
        if not user_id:
            return jsonify({'error': 'User ID required'}), 400
        
        aptitude_results[user_id] = {
            'results': results,
            'updated_at': datetime.now().isoformat()
        }
        
        return jsonify({'success': True, 'message': 'Aptitude results saved successfully'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/aptitude-results/<user_id>', methods=['GET'])
def get_aptitude_results(user_id):
    try:
        user_results = aptitude_results.get(user_id, {'results': []})
        return jsonify(user_results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/send-notification', methods=['POST'])
def send_notification():
    """Send push notification to subscribed users"""
    try:
        data = request.json
        notification_type = data.get('type', 'general')
        message = data.get('message', 'New update available!')
        target_users = data.get('users', [])  # If empty, send to all
        
        # In a real implementation, this would use a service like Firebase Cloud Messaging
        # For demo purposes, we'll just log the notification
        
        sent_count = 0
        for user_id, subscription_data in notifications_subscriptions.items():
            if not target_users or user_id in target_users:
                preferences = subscription_data.get('preferences', {})
                
                # Check if user has enabled this type of notification
                notification_enabled = {
                    'career_update': preferences.get('careerUpdates', True),
                    'scholarship_alert': preferences.get('scholarshipAlerts', True),
                    'mentor_message': preferences.get('mentorMessages', True),
                    'progress_reminder': preferences.get('progressReminders', True)
                }.get(notification_type, True)
                
                if notification_enabled:
                    # Here you would send the actual push notification
                    print(f"Sending {notification_type} notification to {user_id}: {message}")
                    sent_count += 1
        
        return jsonify({
            'success': True, 
            'message': f'Notification sent to {sent_count} users',
            'sent_count': sent_count
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/scholarships', methods=['GET'])
def get_scholarships():
    """Get scholarship opportunities (mock data)"""
    try:
        # In production, this would fetch from a real scholarship database
        scholarships = [
            {
                'id': '1',
                'title': 'Zimbabwe Presidential Scholarship',
                'provider': 'Government of Zimbabwe',
                'amount': 'Full tuition + living allowance',
                'deadline': '2024-06-30',
                'category': 'Government',
                'featured': True
            },
            # Add more scholarships...
        ]
        
        return jsonify({'scholarships': scholarships})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy', 
        'message': 'PathFinder Enhanced API is running',
        'features': [
            'Career Analysis',
            'Progress Tracking',
            'Scholarship Database',
            'Aptitude Tests',
            'Mentor Matching',
            'Push Notifications',
            'Background Sync'
        ]
    })

if __name__ == '__main__':
    # Development server (not for production)
    # In production, use: gunicorn -c gunicorn.conf.py wsgi:app
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
