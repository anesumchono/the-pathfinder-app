# 🎓 PathFinder - Career Guidance PWA

An intelligent career guidance Progressive Web App that analyzes student academic performance and provides personalized career recommendations for Sciences, Commercial, and Arts streams.

## ✨ Features

- 📱 **Progressive Web App**: Install on any device - iOS, Android, Desktop
- 🔄 **Works Offline**: Access your career guidance even without internet
- 📊 **Smart Career Matching**: Algorithm-based recommendations using academic grades
- 🎓 **University Recommendations**: Top universities in Zimbabwe and worldwide
- 💼 **Job Market Insights**: Salary ranges and career opportunities
- 📚 **Study Strategies**: Personalized learning recommendations
- 🎯 **Goal Setting**: Short-term and long-term career goals
- 🌟 **Beautiful UI**: Modern, responsive design with Tailwind CSS v4
- 📲 **Installable**: Add to home screen like a native app

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React Icons

### Backend
- Python 3.8+
- Flask
- Flask-CORS
- Gunicorn (production server)

### PWA Features
- Service Worker for offline support
- Web App Manifest
- Install prompt
- Caching strategy

## 🚀 Quick Start

### 📖 New User? Start Here!
Read **`START_HERE.md`** for a complete guide to deploying your PWA!

### 💻 Run Locally

#### Frontend
```bash
npm install
npm run dev
```
Opens at: `http://localhost:5173`

#### Backend
```bash
cd backend
python app.py
```
Runs at: `http://localhost:5000`

### 📱 Test on Phone
- Frontend: `http://192.168.1.236:5173`
- Backend: `http://192.168.1.236:5000`

### 🌐 Deploy to Production

1. **Create Icons** (15 min)
   - Open `create_icon.html` in browser
   - Download all sizes
   - Save to `public/icons/`

2. **Push to GitHub** (5 min)
   - Run `push_to_github.bat`
   - Or follow `GITHUB_SETUP.md`

3. **Deploy Backend** (10 min)
   - Follow `backend/QUICK_DEPLOY.md`
   - Deploy to Render.com (free)

4. **Deploy Frontend** (10 min)
   - Deploy to Vercel/Netlify (free)
   - Update API URL in code

5. **Test PWA** (5 min)
   - Install on iPhone/Android
   - Test offline functionality

**Total time: ~45 minutes | Cost: $0**

## 📁 Project Structure

```
├── backend/
│   ├── app.py                    # Flask API with career algorithm
│   ├── requirements.txt          # Python dependencies
│   ├── Procfile                  # Deployment config
│   ├── QUICK_DEPLOY.md          # Deployment guide
│   └── DEPLOYMENT.md            # All deployment options
├── public/
│   ├── icons/                   # PWA app icons (create these!)
│   ├── manifest.json            # PWA configuration
│   └── sw.js                    # Service Worker
├── src/
│   ├── components/
│   │   └── InstallPWA.tsx       # Install prompt component
│   ├── career_guidance_app.tsx  # Main app component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles
├── index.html                   # HTML with PWA meta tags
├── vite.config.ts               # Vite + PWA config
├── START_HERE.md                # 👈 START HERE!
├── QUICK_REFERENCE.md           # Quick reference card
├── TODO_CHECKLIST.md            # Step-by-step tasks
├── CURRENT_STATUS.md            # Detailed status
├── PWA_GUIDE.md                 # PWA documentation
├── GITHUB_SETUP.md              # Git setup guide
├── create_icon.html             # Icon generator tool
└── push_to_github.bat           # Quick GitHub push
```

## Career Paths Supported

### Sciences Stream
- Software Engineering / Computer Science
- Medicine / Healthcare
- Engineering (Mechanical, Electrical, Civil)
- Data Science / AI

### Commercial Stream
- Accounting / Finance
- Business Management
- Investment Banking
- Entrepreneurship

### Arts Stream
- Law / Legal Studies
- Journalism / Media
- Education / Teaching
- Social Sciences

## How It Works

1. **Data Collection**: Students input their academic stream, subject grades, attendance, and study habits
2. **Analysis**: The backend algorithm evaluates grades against career requirements
3. **Matching**: Calculates match percentages for different career paths
4. **Recommendations**: Returns top 3 career matches with detailed information
5. **Guidance**: Provides personalized study strategies, challenges, and goals

## API Endpoints

### POST /api/analyze
Analyzes student data and returns career recommendations.

### GET /api/health
Health check endpoint.

## 📱 PWA Installation

### iPhone (Safari)
1. Open your deployed URL
2. Tap Share button
3. Tap "Add to Home Screen"
4. Tap "Add"

### Android (Chrome)
1. Open your deployed URL
2. Tap "Add to Home Screen" banner
3. Tap "Install"

### Desktop (Chrome/Edge)
1. Open your deployed URL
2. Click install icon in address bar
3. Click "Install"

## 📚 Documentation

- **`START_HERE.md`** - Complete getting started guide
- **`QUICK_REFERENCE.md`** - Quick reference card
- **`TODO_CHECKLIST.md`** - Step-by-step deployment tasks
- **`CURRENT_STATUS.md`** - Detailed project status
- **`PWA_GUIDE.md`** - PWA implementation details
- **`GITHUB_SETUP.md`** - Git and GitHub setup
- **`backend/QUICK_DEPLOY.md`** - Backend deployment guide

## 💰 Hosting Cost

**FREE TIER:**
- Backend (Render.com): $0/month
- Frontend (Vercel/Netlify): $0/month
- **Total: $0/month** 🎉

**Optional:**
- Custom domain: $10-15/year

## 🎯 What Makes This Special

✅ **No App Store** - Users install directly from browser  
✅ **Free Hosting** - $0/month with free tiers  
✅ **Instant Updates** - No approval process  
✅ **Works Offline** - Cached for offline use  
✅ **Cross-Platform** - iOS, Android, Desktop  
✅ **Fast** - Loads instantly from cache  
✅ **Professional** - Looks like a native app  

## 🚀 Future Enhancements

- [ ] Push notifications for career updates
- [ ] User accounts and progress tracking
- [ ] Integration with scholarship databases
- [ ] Career aptitude tests
- [ ] Mentor matching system
- [ ] More career paths and specializations
- [ ] Background sync for offline submissions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.
