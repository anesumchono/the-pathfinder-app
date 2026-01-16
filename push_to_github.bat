@echo off
echo ========================================
echo   PathFinder - Push to GitHub
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating commit...
git commit -m "Initial commit - PathFinder Career Guidance App"

echo.
echo ========================================
echo   IMPORTANT: Next Steps
echo ========================================
echo.
echo 1. Go to https://github.com and create a new repository
echo 2. Name it: pathfinder-career-app
echo 3. DO NOT initialize with README
echo 4. Copy the repository URL
echo.
echo Then run these commands (replace YOUR_USERNAME):
echo.
echo git remote add origin https://github.com/YOUR_USERNAME/pathfinder-career-app.git
echo git branch -M main
echo git push -u origin main
echo.
echo ========================================

pause
