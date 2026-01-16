# 📦 Push PathFinder to GitHub

## Step 1: Install Git (if not installed)

Download and install Git from: https://git-scm.com/download/win

After installation, restart your terminal.

## Step 2: Configure Git (First Time Only)

Open Command Prompt or PowerShell and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email.

## Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in top right
3. Click "New repository"
4. Fill in:
   - **Repository name:** `pathfinder-career-app`
   - **Description:** "AI-powered career guidance application for students"
   - **Visibility:** Public (or Private if you prefer)
   - **DO NOT** check "Initialize with README"
5. Click "Create repository"

## Step 4: Initialize Git in Your Project

Open Command Prompt in your project folder:

```bash
cd "C:\Users\MTC ICT\Downloads\phisher_66"
```

Then run:

```bash
git init
```

## Step 5: Create .gitignore File

This tells Git which files to ignore. Run:

```bash
echo node_modules/ > .gitignore
echo dist/ >> .gitignore
echo .env >> .gitignore
echo *.log >> .gitignore
echo .DS_Store >> .gitignore
echo backend/venv/ >> .gitignore
echo backend/__pycache__/ >> .gitignore
echo backend/*.pyc >> .gitignore
```

## Step 6: Add All Files

```bash
git add .
```

## Step 7: Commit Your Code

```bash
git commit -m "Initial commit - PathFinder Career Guidance App"
```

## Step 8: Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/pathfinder-career-app.git
```

## Step 9: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

You'll be asked to login to GitHub. Use your GitHub credentials.

## Step 10: Verify

Go to your GitHub repository URL:
```
https://github.com/YOUR_USERNAME/pathfinder-career-app
```

You should see all your files!

---

## 🎉 Done!

Your PathFinder app is now on GitHub!

## Next Steps:

1. **Deploy Backend:** Follow `backend/QUICK_DEPLOY.md`
2. **Deploy Frontend:** Use Vercel or Netlify
3. **Share:** Give others the GitHub link

---

## Common Issues:

### "git is not recognized"
- Git is not installed or not in PATH
- Restart terminal after installing Git

### "Permission denied"
- You need to authenticate with GitHub
- Use GitHub Desktop or Personal Access Token

### "Repository not found"
- Check the repository URL
- Make sure you created the repository on GitHub

---

## Alternative: Use GitHub Desktop (Easier)

1. Download GitHub Desktop: https://desktop.github.com
2. Install and login
3. Click "Add" → "Add Existing Repository"
4. Select your project folder
5. Click "Publish repository"
6. Done!

---

## Files That Will Be Uploaded:

✅ Frontend code (src/, index.html, etc.)
✅ Backend code (backend/)
✅ Configuration files
✅ Documentation (README.md, etc.)

❌ node_modules (ignored)
❌ dist (ignored)
❌ venv (ignored)

---

## Your Repository Will Include:

- Complete React frontend
- Python Flask backend
- Deployment guides
- Documentation
- All configuration files

Perfect for sharing and deploying! 🚀
