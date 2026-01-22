@echo off
echo ========================================
echo   PathFinder - Production Mode
echo ========================================
echo.

REM Start Backend with Waitress in new window
echo Starting Backend (Waitress WSGI)...
start "PathFinder Backend (Production)" cmd /k "cd backend && python serve.py"
timeout /t 3 /nobreak >nul

REM Start Frontend in new window
echo Starting Frontend...
start "PathFinder Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Servers Starting!
echo ========================================
echo.
echo Backend (Waitress):  http://localhost:5000
echo Frontend (Vite):     http://localhost:5173
echo Network:             http://192.168.1.236:5173
echo.
echo Press any key to close this window...
echo (The servers will keep running in their own windows)
pause >nul
