# 🔧 Fix "Load Failed" Backend Issue

## The Problem
The app shows "Load Failed" or "Analysis Error" because the backend isn't connecting properly.

## ✅ Solution: Use the Startup Script

### Step 1: Close Everything
1. Close all browser tabs with PathFinder
2. Close any command windows running servers

### Step 2: Run the Startup Script
1. **Double-click** `START_SERVERS.bat` in your project folder
2. Two new windows will open:
   - **PathFinder Backend** (Python/Flask)
   - **PathFinder Frontend** (Vite)

### Step 3: Wait for Startup
- Backend window will show: `Running on http://127.0.0.1:5000`
- Frontend window will show: `Local: http://localhost:5173`
- Wait about 5-10 seconds for both to fully start

### Step 4: Test the App
1. Open browser
2. Go to: http://localhost:5173
3. Fill in the form
4. Click "Analyze My Path"
5. Should work now! ✅

---

## 🧪 Test Backend Separately

### Option 1: Use Test Page
1. Open `test_backend.html` in your browser
2. Click "Test Health Endpoint"
3. Should show: `{"status": "healthy", "message": "PathFinder API is running"}`
4. Click "Test Analysis Endpoint"
5. Should show career recommendations

### Option 2: Manual Test
1. Make sure backend is running
2. Open browser
3. Go to: http://localhost:5000/api/health
4. Should see JSON response

---

## 🔍 Troubleshooting Steps

### Issue 1: Backend Won't Start

**Error:** "ModuleNotFoundError: No module named 'flask'"

**Fix:**
```bash
cd backend
pip install -r requirements.txt
```

---

### Issue 2: Port 5000 Already in Use

**Error:** "Address already in use"

**Fix Option A - Kill the process:**
```bash
netstat -ano | findstr :5000
taskkill /PID [number] /F
```

**Fix Option B - Use different port:**
Edit `backend/app.py`, change last line to:
```python
app.run(host='0.0.0.0', port=5001, debug=False)
```

Then update frontend `src/career_guidance_app.tsx` line 167:
```typescript
? 'http://localhost:5001/api/analyze'
```

---

### Issue 3: CORS Error

**Error:** "Access to fetch blocked by CORS policy"

**Fix:** Make sure `flask-cors` is installed:
```bash
cd backend
pip install flask-cors
```

---

### Issue 4: Backend Starts Then Stops

**Possible causes:**
1. Python not in PATH
2. Virtual environment not activated
3. Missing dependencies

**Fix:**
1. Use `START_SERVERS.bat` (handles everything)
2. Or manually:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

---

## 📱 Network Access (iPhone/Android)

### If testing on phone:

1. **Make sure both servers are running**
2. **Find your computer's IP:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.236)

3. **On your phone, open:**
   - Frontend: `http://YOUR_IP:5173`
   - Example: `http://192.168.1.236:5173`

4. **Make sure firewall allows connections:**
   - Windows Firewall → Allow an app
   - Allow Python and Node.js

---

## ✅ Quick Checklist

Before testing the app:

- [ ] Backend running (see "Running on http://127.0.0.1:5000")
- [ ] Frontend running (see "Local: http://localhost:5173")
- [ ] Both windows stay open (don't close them)
- [ ] Wait 5-10 seconds after starting
- [ ] Test backend health: http://localhost:5000/api/health
- [ ] Open app: http://localhost:5173

---

## 🎯 Recommended Workflow

### Every time you want to run the app:

1. **Double-click** `START_SERVERS.bat`
2. **Wait** for both servers to start
3. **Open** http://localhost:5173
4. **Use** the app!
5. **When done**, close the two server windows

---

## 🆘 Still Not Working?

### Check these:

1. **Python installed?**
   ```bash
   python --version
   ```
   Should show Python 3.8 or higher

2. **Node.js installed?**
   ```bash
   node --version
   ```
   Should show Node 18 or higher

3. **Dependencies installed?**
   ```bash
   cd backend
   pip list
   ```
   Should show flask, flask-cors, gunicorn

4. **Port available?**
   ```bash
   netstat -ano | findstr :5000
   ```
   Should be empty (port free)

---

## 📞 Alternative: Run Manually

### Terminal 1 (Backend):
```bash
cd backend
python app.py
```
Leave this running!

### Terminal 2 (Frontend):
```bash
npm run dev
```
Leave this running!

### Browser:
Open http://localhost:5173

---

## 🎉 Success Indicators

You'll know it's working when:

✅ Backend window shows: "Running on http://127.0.0.1:5000"  
✅ Frontend window shows: "Local: http://localhost:5173"  
✅ Browser opens the app without errors  
✅ Form submission shows career recommendations  
✅ No "Load Failed" or "Analysis Error" messages  

---

**Use `START_SERVERS.bat` for the easiest experience!** 🚀
