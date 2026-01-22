# 🚀 PathFinder Production Setup Guide

## ✅ What's New

Your backend now uses **Waitress** - a production-ready WSGI server!

### Why Waitress?
- ✅ **Production-ready** - Built for real-world deployment
- ✅ **Windows-compatible** - Works perfectly on Windows
- ✅ **Multi-threaded** - Handles multiple requests simultaneously
- ✅ **Stable** - Battle-tested and reliable
- ✅ **Easy to use** - Simple configuration

### vs Development Server:
| Feature | Flask Dev Server | Waitress (Production) |
|---------|------------------|----------------------|
| Speed | Slow | Fast |
| Concurrent Requests | 1 at a time | Multiple (4 threads) |
| Stability | Basic | Production-grade |
| Security | Limited | Enhanced |
| Use Case | Development only | Production-ready |

---

## 📁 New Files Created

### Backend Files:
- `backend/serve.py` - Production server script
- `backend/wsgi.py` - WSGI entry point
- `backend/gunicorn.conf.py` - Gunicorn config (for Linux deployment)
- `backend/start_dev.bat` - Development mode
- `backend/start_prod.bat` - Production mode

### Startup Scripts:
- `START_SERVERS.bat` - Development mode (Flask dev server)
- `START_SERVERS_PROD.bat` - Production mode (Waitress)

---

## 🎯 How to Run

### Development Mode (Testing):
```bash
# Option 1: Use the batch file
START_SERVERS.bat

# Option 2: Manual
cd backend
python app.py
```

### Production Mode (Real Use):
```bash
# Option 1: Use the batch file
START_SERVERS_PROD.bat

# Option 2: Manual
cd backend
python serve.py
```

---

## 🔧 Current Setup

### Waitress Configuration:
- **Host:** 0.0.0.0 (all interfaces)
- **Port:** 5000
- **Threads:** 4 worker threads
- **Scheme:** HTTP
- **Identifier:** PathFinder-API

### Performance:
- Handles 4 concurrent requests
- Non-blocking I/O
- Efficient resource usage
- Automatic request queuing

---

## 🌐 Deployment Options

### Option 1: Windows Server
```bash
# Install dependencies
pip install -r requirements.txt

# Run production server
python serve.py
```

### Option 2: Linux Server (Render, Railway, etc.)
```bash
# Install dependencies
pip install -r requirements.txt

# Use Gunicorn (Linux-only)
gunicorn -c gunicorn.conf.py wsgi:app
```

### Option 3: Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "serve.py"]
```

---

## 📊 Server Comparison

### Development Server (Flask):
```
python app.py
```
- ✅ Hot reload
- ✅ Debug mode
- ✅ Easy testing
- ❌ Single-threaded
- ❌ Not for production

### Production Server (Waitress):
```
python serve.py
```
- ✅ Multi-threaded (4 workers)
- ✅ Production-ready
- ✅ Stable and secure
- ✅ Windows-compatible
- ❌ No hot reload

### Production Server (Gunicorn - Linux):
```
gunicorn -c gunicorn.conf.py wsgi:app
```
- ✅ Multi-process workers
- ✅ Industry standard
- ✅ Highly scalable
- ❌ Linux/Unix only
- ❌ Doesn't work on Windows

---

## 🚀 Quick Start

### For Local Testing:
1. **Double-click:** `START_SERVERS.bat`
2. **Access:** http://localhost:5173
3. **Develop and test**

### For Production Testing:
1. **Double-click:** `START_SERVERS_PROD.bat`
2. **Access:** http://localhost:5173
3. **Test production performance**

### For Deployment:
1. **Push to GitHub**
2. **Deploy backend** (Render/Railway)
3. **Deploy frontend** (Vercel/Netlify)
4. **Done!**

---

## 🔒 Security Features

### Waitress Includes:
- ✅ Request timeout handling
- ✅ Connection limits
- ✅ Buffer overflow protection
- ✅ Secure headers
- ✅ DOS protection

### Additional Security (Recommended):
- Use HTTPS in production
- Add rate limiting
- Implement authentication
- Use environment variables
- Enable CORS properly

---

## 📈 Performance Tips

### Optimize Waitress:
```python
# In serve.py, adjust:
threads=4,          # Increase for more concurrent requests
channel_timeout=120, # Adjust timeout
recv_bytes=8192,    # Buffer size
send_bytes=8192     # Buffer size
```

### Monitor Performance:
- Check response times
- Monitor memory usage
- Track concurrent connections
- Log errors and warnings

---

## 🐛 Troubleshooting

### Issue: Port already in use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID [number] /F
```

### Issue: Slow performance
- Increase thread count in `serve.py`
- Check database queries
- Optimize API endpoints
- Use caching

### Issue: Server crashes
- Check error logs
- Verify dependencies
- Test with development server first
- Check memory usage

---

## 📦 Deployment Checklist

- [ ] Install Waitress: `pip install waitress`
- [ ] Test locally: `python serve.py`
- [ ] Update requirements.txt
- [ ] Configure environment variables
- [ ] Set up HTTPS (production)
- [ ] Test all endpoints
- [ ] Monitor performance
- [ ] Set up logging
- [ ] Configure backups
- [ ] Document deployment

---

## 🎯 Next Steps

### For Development:
1. Use `START_SERVERS.bat`
2. Develop features
3. Test thoroughly

### For Production:
1. Use `START_SERVERS_PROD.bat`
2. Test performance
3. Deploy to cloud

### For Deployment:
1. Follow `backend/QUICK_DEPLOY.md`
2. Use Gunicorn on Linux
3. Use Waitress on Windows

---

## 📞 Quick Commands

### Start Production Server:
```bash
cd backend
python serve.py
```

### Start Development Server:
```bash
cd backend
python app.py
```

### Install Dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### Test API:
```bash
curl http://localhost:5000/api/health
```

---

## ✅ Current Status

**Backend Server:** Waitress (Production-ready) ✅  
**Frontend Server:** Vite (Development) ✅  
**Ready for:** Local testing and production deployment ✅  

---

**Your backend is now production-ready with Waitress!** 🚀

For deployment:
- **Windows servers:** Use Waitress (current setup)
- **Linux servers:** Use Gunicorn (already configured)
- **Both work perfectly!**
