# 🔐 Quick Google OAuth Setup (5 Minutes)

## ✅ What's Added

Your login page now has:
- ✅ **Google Sign-In button** (blue button at top)
- ✅ **Name input option** (manual entry)
- ✅ **Guest mode** (no login required)

## 🚀 To Enable Google Sign-In:

### Step 1: Get Google Client ID

1. **Go to:** https://console.cloud.google.com/

2. **Create Project:**
   - Click "Select a project" → "New Project"
   - Name: "PathFinder"
   - Click "Create"

3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search "Google+ API"
   - Click "Enable"

4. **Create Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "PathFinder Web"

5. **Add Authorized Origins:**
   ```
   http://localhost:5173
   http://192.168.1.236:5173
   ```

6. **Add Redirect URIs:**
   ```
   http://localhost:5173
   http://192.168.1.236:5173
   ```

7. **Copy Client ID:**
   - Looks like: `123456789-abc123.apps.googleusercontent.com`

### Step 2: Add to Your App

1. **Open:** `src/career_guidance_app.tsx`

2. **Find line ~60:**
   ```typescript
   const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";
   ```

3. **Replace with your Client ID:**
   ```typescript
   const GOOGLE_CLIENT_ID = "123456789-abc123.apps.googleusercontent.com";
   ```

4. **Save the file**

### Step 3: Test It!

1. **Refresh browser** (Ctrl + F5)
2. **You'll see:**
   - Google Sign-In button at top
   - Name input in middle
   - Guest button at bottom
3. **Click "Sign in with Google"**
4. **Select your account**
5. **Done!** Your name and photo appear in header

---

## 📱 Current Login Options:

### Option 1: Google Sign-In (Recommended)
- One-click authentication
- Gets your name and photo automatically
- Most secure

### Option 2: Enter Name
- Type your name manually
- Quick and simple
- No Google account needed

### Option 3: Guest Mode
- Instant access
- No information needed
- Full app functionality

---

## ⚠️ Without Google Client ID:

The Google button will show but won't work until you add your Client ID. 

**But don't worry!** Users can still:
- ✅ Enter their name manually
- ✅ Use guest mode
- ✅ Access full app features

---

## 🎯 For Production:

When you deploy, add your production URL:

**Authorized Origins:**
```
https://your-app.vercel.app
```

**Redirect URIs:**
```
https://your-app.vercel.app
```

No code changes needed - it auto-detects!

---

## 📞 Need Help?

Read the full guide: `GOOGLE_AUTH_SETUP.md`

---

**Your app now has professional Google authentication!** 🎉

Users can choose:
- 🔵 Google Sign-In
- ✍️ Manual name entry  
- 👤 Guest mode

All three options work perfectly!
