# PathFinder Backend API

This is the Python Flask backend for the PathFinder career guidance application. It uses intelligent algorithms to analyze student academic data and provide personalized career recommendations.

## 🚀 Quick Deploy

**Ready to deploy?** See [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for step-by-step instructions.

**Deployment options:** See [DEPLOYMENT.md](DEPLOYMENT.md) for all deployment platforms.

## Features

- Grade-based career matching algorithm
- Subject-specific career path recommendations
- Comprehensive career database for Sciences, Commercial, and Arts streams
- Real-time analysis based on academic performance
- Personalized study strategies and goal setting

## Local Development

### Setup Instructions

1. **Install Python 3.8+**

2. **Install Dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the Server**
```bash
python app.py
```

The API will start on `http://localhost:5000`

## API Endpoints

### POST /api/analyze
Analyzes student data and returns career recommendations.

**Request Body:**
```json
{
  "stream": "Sciences",
  "mathematics": "A",
  "physics": "B",
  "chemistry": "A",
  "attendance": "85",
  "studyHours": "4",
  ...
}
```

**Response:**
```json
{
  "careerPaths": [...],
  "academicFocus": [...],
  "challenges": [...],
  "opportunities": [...],
  "studyStrategies": [...],
  "goals": {...}
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "PathFinder API is running"
}
```

## Career Matching Algorithm

The system uses a scoring algorithm that:
1. Evaluates grades in required subjects for each career
2. Checks minimum grade requirements
3. Considers attendance and study habits
4. Calculates match percentage
5. Returns top 3 career recommendations

## Supported Career Paths

### Sciences Stream
- Software Engineering
- Medicine
- Engineering (Mechanical/Electrical/Civil)
- Data Science

### Commercial Stream
- Accounting
- Business Management
- Finance

### Arts Stream
- Law
- Journalism
- Education
- Social Sciences

## Deployment Files

- `Procfile` - For Heroku/Railway deployment
- `requirements.txt` - Python dependencies
- `runtime.txt` - Python version specification
- `render.yaml` - Render.com configuration
- `.gitignore` - Git ignore rules

## Production Considerations

- Uses Gunicorn WSGI server for production
- CORS enabled for cross-origin requests
- Environment-based port configuration
- Health check endpoint for monitoring

## Environment Variables

- `PORT` - Server port (default: 5000)
- `FLASK_ENV` - Environment (production/development)

## Future Enhancements

- Machine learning model training with historical data
- More career paths and specializations
- Integration with university admission requirements
- Scholarship matching system
- User authentication and progress tracking

## License

MIT License
