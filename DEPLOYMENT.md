# SkyMirror Deployment Guide

This guide covers deploying SkyMirror to various platforms.

## Pre-Deployment Checklist

Before deploying to production:

### 1. Generate Real PWA Icons

Replace placeholder icons with proper ones:

```bash
# Install PWA Asset Generator
npm install -g @pwa/asset-generator

# Generate icons from SVG
npx @pwa/asset-generator icons/icon.svg icons/ \
  --background "#EAF6FF" \
  --padding "10%" \
  --manifest manifest.json \
  --index index.html
```

### 2. Update Manifest

Edit `manifest.json` and update:
- `name` and `short_name` (if customized)
- `start_url` (should be your production URL or `/`)
- Remove placeholder screenshot references if not provided

### 3. Test PWA Compliance

```bash
# Use Lighthouse
npx lighthouse https://your-site.com --view

# Check for:
# - PWA badge (green)
# - Service Worker registered
# - Manifest valid
# - Icons present
# - Offline support
```

### 4. Test CORS

Ensure NASA GIBS tiles load correctly from your domain:
- Open your deployed site
- Check browser console for CORS errors
- Verify map tiles display

### 5. Configure HTTPS

**Required for PWA features!** All deployment platforms below provide HTTPS by default.

---

## Vercel Deployment

### Option 1: CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Other
   - **Build Command**: (leave empty)
   - **Output Directory**: `.` (root)
6. Click "Deploy"

### Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `skymirror.app`)
3. Configure DNS as instructed

---

## Netlify Deployment

### Option 1: CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir .
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "New site from Git"
4. Connect GitHub repository
5. Configure:
   - **Build Command**: (leave empty)
   - **Publish Directory**: `.` (root)
6. Click "Deploy site"

### Configuration

The `netlify.toml` file is already configured with:
- Security headers
- Service Worker caching
- SPA fallback (optional)

---

## Cloudflare Pages

### GitHub Integration

1. Push code to GitHub
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Pages
3. Click "Create a project"
4. Connect GitHub repository
5. Configure:
   - **Framework Preset**: None
   - **Build Command**: `echo "No build"`
   - **Build Output Directory**: `/`
6. Click "Save and Deploy"

### Custom Domain

1. Go to Pages project → Custom Domains
2. Add domain
3. Cloudflare will automatically configure DNS if domain is on Cloudflare

---

## GitHub Pages

### Setup

1. Create `gh-pages` branch:
   ```bash
   git checkout --orphan gh-pages
   git reset --hard
   ```

2. Copy all files to `gh-pages`:
   ```bash
   git checkout main -- .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Click Save

4. Access at: `https://yourusername.github.io/skymirror/`

### Update Base Path

If deploying to a subdirectory (e.g., `/skymirror/`), update paths in:

- `index.html`: `<link>` and `<script>` tags
- `manifest.json`: `start_url` to `/skymirror/`
- `sw.js`: Cache paths

---

## Custom Server (Apache/Nginx)

### Apache (.htaccess)

```apache
# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "DENY"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Service Worker
<Files "sw.js">
  Header set Service-Worker-Allowed "/"
  Header set Cache-Control "public, max-age=0, must-revalidate"
</Files>

# Manifest
<Files "manifest.json">
  Header set Content-Type "application/manifest+json"
</Files>
```

### Nginx (nginx.conf)

```nginx
server {
    listen 80;
    server_name skymirror.app;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name skymirror.app;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /var/www/skymirror;
    index index.html;
    
    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Service Worker
    location = /sw.js {
        add_header Service-Worker-Allowed "/" always;
        add_header Cache-Control "public, max-age=0, must-revalidate" always;
    }
    
    # Manifest
    location = /manifest.json {
        add_header Content-Type "application/manifest+json" always;
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Environment Variables

SkyMirror requires **no environment variables** for basic operation! 🎉

NASA GIBS is publicly accessible without API keys.

### Optional (Future Features)

If you add optional features:

**Vercel**: Project Settings → Environment Variables

**Netlify**: Site Settings → Build & Deploy → Environment

**Cloudflare Pages**: Settings → Environment Variables

---

## Post-Deployment Testing

### 1. PWA Installation Test

**Desktop (Chrome/Edge)**:
1. Open site in browser
2. Click install icon in address bar
3. Confirm installation
4. Launch app from desktop/start menu

**Mobile (iOS)**:
1. Open site in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Launch from home screen

**Mobile (Android)**:
1. Open site in Chrome
2. Tap menu (three dots)
3. Tap "Install app" or "Add to Home Screen"
4. Launch from app drawer

### 2. Offline Test

1. Load the app once (to cache assets)
2. Open DevTools → Application → Service Workers
3. Check "Offline" checkbox
4. Reload page
5. Verify app loads with cached tiles

### 3. Performance Test

```bash
# Lighthouse CI
npm install -g @lhci/cli

lhci autorun --collect.url=https://your-site.com
```

Target scores:
- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 90+
- **PWA**: ✓ (installable)

### 4. Cross-Browser Test

Test on:
- Chrome/Edge (Chromium) ✓
- Firefox ✓
- Safari (desktop + iOS) ✓
- Chrome Android ✓

### 5. Mobile Devices

Test on actual devices:
- iPhone (Safari)
- Android (Chrome)
- Tablet (iPad/Android)

---

## Monitoring & Analytics

### Optional: Add Analytics

**Privacy-friendly options:**

1. **Plausible** (privacy-focused):
   ```html
   <script defer data-domain="skymirror.app" src="https://plausible.io/js/script.js"></script>
   ```

2. **Fathom Analytics**:
   ```html
   <script src="https://cdn.usefathom.com/script.js" data-site="YOUR_SITE_ID" defer></script>
   ```

Add scripts to `index.html` before closing `</body>` tag.

### Service Worker Updates

Monitor Service Worker registration:

```javascript
// In app.js
navigator.serviceWorker.register('/sw.js').then(registration => {
  registration.addEventListener('updatefound', () => {
    console.log('New version available! Reload to update.');
    // Optionally show update notification to user
  });
});
```

---

## Troubleshooting

### Issue: Map tiles not loading

**Cause**: CORS or HTTPS issues

**Solution**:
- Ensure site is served over HTTPS
- Check browser console for CORS errors
- Verify GIBS endpoint is accessible

### Issue: Service Worker not registering

**Cause**: Incorrect path or HTTPS required

**Solution**:
- Ensure `sw.js` is in root directory
- Serve site over HTTPS (required for SW)
- Check DevTools → Application → Service Workers

### Issue: PWA not installable

**Cause**: Missing manifest or icons

**Solution**:
- Validate `manifest.json` (use [Web Manifest Validator](https://manifest-validator.appspot.com/))
- Ensure icons exist and are referenced correctly
- Check Lighthouse PWA audit

### Issue: App shell not caching

**Cause**: Service Worker cache strategy issue

**Solution**:
- Clear browser cache
- Unregister old Service Workers
- Check `sw.js` cache names and strategies

---

## Updating Your Deployment

### Quick Update

```bash
# Commit changes
git add .
git commit -m "Update: feature description"
git push origin main

# Vercel/Netlify/Cloudflare will auto-deploy
```

### Manual Update (Traditional Hosting)

```bash
# Build (if needed - not required for SkyMirror)
# npm run build

# Upload files via FTP/SCP
scp -r * user@server:/var/www/skymirror/

# Or use rsync
rsync -avz --delete . user@server:/var/www/skymirror/
```

### Service Worker Cache Update

When updating, increment cache version in `sw.js`:

```javascript
// Change from:
const CACHE_VERSION = 'skymirror-v1.0.0';

// To:
const CACHE_VERSION = 'skymirror-v1.1.0';
```

This ensures old caches are cleared and new assets are fetched.

---

## Success! 🎉

Your SkyMirror deployment is complete. Users can now:

- View satellite imagery for any location
- Install as a PWA on desktop/mobile
- Use offline after initial load
- Experience a calm, beautiful interface

**Share your deployment**:
- Submit to [Space Apps Challenge](https://www.spaceappschallenge.org/)
- Post on social media with #SkyMirror
- Add to [PWA Directory](https://pwa-directory.com/)

---

Need help? Check the [main README](README.md) or open an issue on GitHub.

