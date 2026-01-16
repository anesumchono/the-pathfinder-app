@echo off
echo ========================================
echo   PathFinder - Starting Servers
echo ========================================
echo.

REM Start Backend in new window
echo Starting Backend Server...
start "PathFinder Backend" cmd /k "cd backend && python app.py"
timeout /t 3 /nobreak >nul

REM Start Frontend in new window
echo Starting Frontend Server...
start "PathFinder Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Servers Starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo Network:  http://192.168.1.236:5173
echo.
echo Press any key to close this window...
echo (The servers will keep running in their own windows)
pause >nul
