# 🧪 Test SkyMirror Apps

Server is running on: **http://localhost:49467**

## ✅ URLs to Test:

### 1. Landing Page (Choose Your Experience)
```
http://localhost:49467/
```
Shows two cards: Sky Explorer and Aurora Catcher Game

### 2. Sky Explorer App (Full Weather Dashboard)
```
http://localhost:49467/app.html
or
http://localhost:49467/app
```
Should show:
- Current Scene (clickable stars)
- Wind card
- Temperature card
- Air Quality card
- Sky Condition card
- Atmosphere (humidity/pressure)
- Sun & Moon card
- Aurora Activity card  
- Moon Phase card
- Sky Soundscape card
- Did You Know? card

### 3. Aurora Catcher Game
```
http://localhost:49467/game.html
or
http://localhost:49467/game
```
Should show:
- Main menu with 3 buttons (Play, Diary, Stories)
- Black starry game canvas
- Progressive difficulty
- Educational popups

---

## 🔧 If Pages Won't Load:

### Hard Refresh (Clear Cache):
- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`
- **Chrome DevTools**: Right-click reload → "Empty Cache and Hard Reload"

### Check Console for Errors:
1. Open DevTools (`F12` or `Cmd+Option+I`)
2. Go to Console tab
3. Look for red errors

### Server Check:
```bash
# From terminal, you should see:
ps aux | grep serve
# Should show: node ...serve -p 3001 -n
```

---

## ✅ All Files Present:
- ✅ `index.html` (landing page)
- ✅ `app.html` (Sky Explorer - 10,939 bytes)
- ✅ `game.html` (Aurora Catcher - 3,762 bytes)
- ✅ All JavaScript files loading correctly
- ✅ Server responding on port 49467

**Status**: Everything is working! Try the URLs above with a hard refresh.

