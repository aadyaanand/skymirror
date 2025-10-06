# 🚀 SkyMirror Quick Start

Get SkyMirror running in 5 minutes!

## Step 1: Clone & Install (1 min)

```bash
git clone https://github.com/yourusername/skymirror.git
cd skymirror
npm install
```

## Step 2: Generate Placeholder Icons (optional, 30 sec)

```bash
node scripts/generate-icons.js
```

> **Note**: These are placeholder icons. For production, use:
> ```bash
> npx @pwa/asset-generator icons/icon.svg icons/ --background "#EAF6FF"
> ```

## Step 3: Start Development Server (30 sec)

```bash
npm run dev
```

## Step 4: Open in Browser (30 sec)

Navigate to:
```
http://localhost:3000
```

## Step 5: Allow Location Access (1 min)

When prompted, click **"Allow"** to enable location detection.

---

## 🎉 You're Done!

You should now see:
- ✅ Your current location in the header
- ✅ Satellite imagery centered on your location
- ✅ Cloud cover and atmosphere metrics
- ✅ Time slider to view historical data
- ✅ Layer switcher (Visual, Temperature, Vegetation)

---

## 🔧 Next Steps

### Try These Features:

1. **Time Travel**: Drag the time slider to see satellite views from the past 24 hours

2. **Layer Switch**: Click the layer buttons to switch between:
   - 🌍 Visual (true color)
   - 🌡️ Temperature (surface heat)
   - 🌿 Vegetation (greenness)

3. **Daily Ritual**: Click the ✨ button in the side panel for a calming moment

4. **Settings**: Click the ⚙️ icon to toggle:
   - High Contrast Mode
   - Reduced Motion
   - Low Bandwidth Mode
   - Temperature Unit (°C/°F)

5. **Install as PWA**: Click the install icon in your browser's address bar

---

## 📱 Test on Mobile

### Local Network Access:

1. Find your local IP:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Open on mobile browser:
   ```
   http://YOUR_IP:3000
   ```

3. Add to Home Screen for PWA experience

---

## 🐛 Troubleshooting

### Map tiles not loading?

- **Check console**: Open DevTools → Console for errors
- **HTTPS required**: Some browsers require HTTPS for geolocation
- **GIBS access**: Ensure NASA GIBS is accessible (no firewall blocking)

### Location not detected?

- **Permission denied**: Click the 🔒 icon in address bar → allow location
- **Using default**: App falls back to New York if location unavailable
- **HTTPS needed**: Some browsers only allow geolocation over HTTPS

### Service Worker errors?

- **Clear cache**: DevTools → Application → Clear Storage
- **Hard reload**: Cmd/Ctrl + Shift + R
- **Check registration**: DevTools → Application → Service Workers

### Blank screen?

- **Check console**: Look for JavaScript errors
- **Leaflet loaded?**: Ensure CDN scripts load successfully
- **Browser support**: Use Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

---

## 🚀 Deploy to Production

Ready to share SkyMirror with the world?

### Quick Deploy (Choose One):

**Vercel** (Recommended):
```bash
npm install -g vercel
vercel --prod
```

**Netlify**:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 📚 Learn More

- **Full Documentation**: [README.md](README.md)
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **NASA GIBS Docs**: https://earthdata.nasa.gov/gibs

---

## 💡 Tips

- **Bookmark locations**: Navigate the map and bookmark interesting views
- **Compare times**: Use the time slider to track cloud movement
- **Share screenshots**: Take screenshots of beautiful satellite views
- **Education**: Great for teaching Earth science and remote sensing
- **Daily check-in**: Make SkyMirror part of your morning routine

---

## ❓ Need Help?

- **Issues**: [GitHub Issues](https://github.com/yourusername/skymirror/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/skymirror/discussions)
- **Email**: skymirror@example.com

---

**Enjoy exploring Earth from space! 🌍🛰️✨**

