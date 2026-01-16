# PathFinder Backend Deployment Guide

## Quick Deploy Options

### Option 1: Deploy to Render (Recommended - Free Tier Available)

1. **Create a Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Push Code to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy on Render**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder (or root if backend is at root)
   - Configure:
     - **Name:** pathfinder-api
     - **Environment:** Python 3
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `gunicorn app:app`
     - **Plan:** Free
   - Click "Create Web Service"

4. **Get Your API URL**
   - After deployment, you'll get a URL like: `https://pathfinder-api.onrender.com`
   - Copy this URL

5. **Update Frontend**
   - In `src/career_guidance_app.tsx`, change:
   ```typescript
   const response = await fetch('http://localhost:5000/api/analyze', {
   ```
   to:
   ```typescript
   const response = await fetch('https://pathfinder-api.onrender.com/api/analyze', {
   ```

---

### Option 2: Deploy to Railway (Free Tier Available)

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect Python and deploy

3. **Configure**
   - Add environment variable: `PORT=5000`
   - Railway will provide a public URL

4. **Update Frontend** with the Railway URL

---

### Option 3: Deploy to PythonAnywhere (Free Tier)

1. **Create Account**
   - Go to https://www.pythonanywhere.com
   - Sign up for free account

2. **Upload Code**
   - Go to "Files" tab
   - Upload your backend folder

3. **Create Web App**
   - Go to "Web" tab
   - Click "Add a new web app"
   - Choose Flask
   - Set path to your app.py

4. **Install Dependencies**
   - Open Bash console
   ```bash
   pip install --user flask flask-cors pandas numpy scikit-learn gunicorn
   ```

5. **Configure WSGI**
   - Edit WSGI configuration file
   - Point to your app.py

6. **Get URL**
   - Your app will be at: `https://yourusername.pythonanywhere.com`

---

### Option 4: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and Create App**
   ```bash
   cd backend
   heroku login
   heroku create pathfinder-api
   ```

3. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

4. **Get URL**
   ```bash
   heroku open
   ```

---

## Testing Your Deployed API

Once deployed, test your API:

```bash
curl https://your-api-url.com/api/health
```

Should return:
```json
{"status": "healthy", "message": "PathFinder API is running"}
```

Test the analyze endpoint:
```bash
curl -X POST https://your-api-url.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"stream":"Sciences","mathematics":"A","physics":"B","attendance":"90","studyHours":"4"}'
```

---

## Environment Variables (if needed)

For production, you may want to add:
- `FLASK_ENV=production`
- `PORT=5000` (or as required by platform)

---

## Troubleshooting

### CORS Issues
If you get CORS errors, ensure `flask-cors` is installed and CORS is enabled in app.py

### Module Not Found
Ensure all dependencies are in `requirements.txt`

### Port Issues
Most platforms set PORT automatically. The app is configured to use `os.environ.get('PORT', 5000)`

---

## Free Tier Limitations

- **Render:** Spins down after 15 min of inactivity (cold starts)
- **Railway:** 500 hours/month free
- **PythonAnywhere:** Limited CPU time
- **Heroku:** No longer offers free tier

**Recommendation:** Use Render for best free tier experience.

---

## After Deployment

1. Update frontend API URL
2. Test all endpoints
3. Monitor logs for errors
4. Consider upgrading to paid tier for production use
