# 🔧 SkyMirror - Complete Technical Documentation

## Project Overview

**SkyMirror** is a dual-purpose space weather education platform built with vanilla JavaScript, HTML5, and CSS3. It combines real-time meteorological and space weather data visualization with gamified learning experiences. Built for the NASA Space Apps Challenge 2025 "Stellar Stories" theme.

**Tech Stack:**
- Pure vanilla JavaScript (ES6+) - No frameworks
- HTML5 & CSS3
- Web APIs: Geolocation, Web Audio, Canvas, LocalStorage
- External APIs: Open-Meteo, NOAA SWPC, NASA data sources

---

## Architecture Overview

### File Structure

```
skymirror/
├── index.html              # Landing page (choose experience)
├── app.html                # Main Sky Explorer application
├── game.html               # Aurora Catcher mini-game
│
├── js/
│   ├── app.js              # Main application controller (SkyMirror class)
│   ├── weather.js          # WeatherAPI class - Open-Meteo integration
│   ├── aurora.js           # AuroraAPI class - NOAA SWPC integration
│   ├── moon.js             # MoonPhase class - Lunar calculations
│   ├── soundscape.js       # SkySoundscape class - Web Audio API
│   ├── stars.js            # Celestial objects & clickable star stories
│   ├── icons.js            # SVG icon generation for weather cards
│   ├── perspectives.js     # 8 character stories (NASA challenge requirement)
│   ├── characters.js       # SVG line-art character illustrations
│   ├── onboarding.js       # Interactive tutorial flow
│   ├── game.js             # Aurora Catcher game logic
│   └── illustrations.js    # Legacy SVG illustrations (deprecated)
│
├── styles/
│   ├── main.css            # App styles (black/white line-art aesthetic)
│   └── game.css            # Game-specific styles
│
├── icons/                  # PWA icons (72px - 512px, maskable variants)
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker for offline support
├── robots.txt              # SEO configuration
├── netlify.toml            # Netlify deployment config
└── vercel.json             # Vercel deployment config
```

---

## Core Application (app.html + app.js)

### 1. SkyMirror Class (`js/app.js`)

**Main application controller** - Singleton class that orchestrates all features.

#### Constructor
```javascript
class SkyMirror {
  constructor() {
    this.location = { lat: 40.7128, lng: -74.0060 }; // Default NYC
    this.currentWeather = null;
    this.settings = {
      tempUnit: 'C',
      autoRitual: true
    };
    
    // Initialize API instances
    this.weatherAPI = new WeatherAPI();
    this.auroraAPI = new AuroraAPI();
    this.moonPhase = new MoonPhase();
    this.soundscape = new SkySoundscape();
    
    this.init();
  }
}
```

#### Initialization Flow
```javascript
async init() {
  1. showLoading()                  // Display loading animation
  2. loadSettings()                 // Load from localStorage
  3. initEventListeners()           // Attach UI event handlers
  4. requestLocation()              // Geolocation API (async)
  5. initStarScene()                // Load celestial objects SVG
  6. loadNewPerspective()           // Load random character story
  7. updateWeather()                // Fetch all data (async)
  8. hideLoading()                  // Hide loading animation
  9. Start 10-minute auto-refresh   // setInterval
  10. typewriterEffect()            // Subtle UI animation
}
```

#### Data Fetching Strategy
**Parallel API Calls** for performance:
```javascript
async updateWeather() {
  const [weather, airQuality, aurora] = await Promise.all([
    this.weatherAPI.getWeather(lat, lng),
    this.weatherAPI.getAirQuality(lat, lng),
    this.auroraAPI.getAuroraForecast(lat)
  ]);
  
  // Update all 11 cards conditionally
  if (weather) {
    this.updateWindCard(weather);
    this.updateTempCard(weather);
    this.updateSkyCard(weather);
    this.updateHumidityCard(weather);
    this.updateTimeline(weather);
  }
  
  if (airQuality) this.updateAirCard(airQuality);
  if (aurora) this.updateAuroraCard(aurora);
  
  // These don't need API data
  this.updateSunMoonCard();
  this.updateMoonPhase();
  this.updateFunFact();
}
```

---

### 2. Weather Cards (11 Interactive Cards)

Each card follows this pattern:
```javascript
updateWindCard(weather) {
  // Extract data
  const speed = weather.windSpeed;
  
  // Kid-friendly interpretation
  let description = '';
  if (speed < 5) description = '🍃 Almost no wind - perfect for bubbles!';
  else if (speed < 15) description = '🌬️ Gentle breeze - great for flying kites!';
  // ...
  
  // Update DOM
  document.getElementById('windValue').textContent = `${speed} km/h`;
  document.getElementById('windDescription').textContent = description;
}
```

**Cards:**
1. **Current Scene** - SVG illustration with 30+ clickable stars
2. **Wind** - Speed, direction, kid-friendly activity suggestions
3. **Temperature** - Celsius/Fahrenheit with clothing recommendations
4. **Air Quality** - US AQI with health impacts
5. **Sky** - Cloud cover, weather codes, stargazing hints
6. **Atmosphere** - Humidity, pressure, visibility
7. **Sun & Moon** - Day/night indicator, sunrise/sunset times
8. **Aurora Activity** - Real NOAA Kp index, visibility forecast
9. **Moon Phase** - Calculated phase with SVG visualization
10. **Soundscape** - Play/stop ambient weather audio
11. **Did You Know** - Random educational facts

---

## API Integrations

### WeatherAPI (`js/weather.js`)

**Data Source:** Open-Meteo API (free, no key required)

```javascript
class WeatherAPI {
  async getWeather(lat, lng) {
    const url = `https://api.open-meteo.com/v1/forecast?
      latitude=${lat}&longitude=${lng}
      &current=temperature_2m,apparent_temperature,
               relative_humidity_2m,weather_code,
               cloud_cover,wind_speed_10m,wind_direction_10m
      &hourly=temperature_2m,weather_code
      &timezone=auto`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      temperature: data.current.temperature_2m,
      apparentTemp: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      cloudCover: data.current.cloud_cover,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      weatherCode: data.current.weather_code,
      hourly: data.hourly
    };
  }
  
  async getAirQuality(lat, lng) {
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?
      latitude=${lat}&longitude=${lng}
      &current=us_aqi,pm10,pm2_5`;
    
    // Returns US AQI, PM2.5, PM10
  }
}
```

**Features:**
- Wind direction conversion (degrees → cardinal directions)
- Weather code interpretation (WMO standard codes)
- Temperature descriptions based on thresholds
- Auto-timezone detection

---

### AuroraAPI (`js/aurora.js`)

**Data Source:** NOAA Space Weather Prediction Center

```javascript
class AuroraAPI {
  async getAuroraForecast(latitude) {
    // Fetches real-time Kp index from NOAA
    const url = 'https://services.swpc.noaa.gov/products/noaa-scales.json';
    
    const data = await fetch(url).then(r => r.json());
    const kpIndex = parseInt(data.G?.Scale) || 0;
    
    // Calculate visibility based on latitude
    const visibilityLatitudes = {
      0: 67, 1: 64, 2: 62, 3: 59, 
      4: 56, 5: 53, 6: 50, 7: 47, 
      8: 43, 9: 40
    };
    
    const requiredLatitude = visibilityLatitudes[kpIndex];
    const visibilityChance = Math.abs(latitude) >= requiredLatitude ? 80 : 20;
    
    return {
      kpIndex,
      activity: kpText,
      visibilityChance
    };
  }
}
```

**Visualization:**
```javascript
function renderAuroraAnimation(container, activity) {
  // Creates animated SVG aurora curtains
  // Uses pastel colors: #A3C4F3, #B5EAD7, #C8BFE7
  // Wave paths with quadratic curves
}
```

---

### MoonPhase (`js/moon.js`)

**Pure calculation** - No API needed!

```javascript
class MoonPhase {
  calculatePhase() {
    const date = new Date();
    
    // Algorithm based on astronomical formula
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    // Calculate days since known new moon
    const daysSinceNewMoon = /* complex calculation */;
    const phase = (daysSinceNewMoon % 29.53) / 29.53;
    
    // Determine phase name
    let name = '';
    if (phase < 0.03) name = 'New Moon';
    else if (phase < 0.22) name = 'Waxing Crescent';
    else if (phase < 0.28) name = 'First Quarter';
    // ... etc
    
    return {
      phase: phase,
      illumination: Math.round(phase * 100),
      name: name
    };
  }
  
  renderMoonSVG(phaseData) {
    // Creates SVG with:
    // - Base circle (moon outline)
    // - Shadow mask (for crescent/gibbous)
    // - Craters and maria details
    // Returns complete SVG string
  }
}
```

---

### SkySoundscape (`js/soundscape.js`)

**Web Audio API** implementation - Converts weather to sound!

```javascript
class SkySoundscape {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillators = [];
    this.gainNodes = [];
  }
  
  play(weatherData) {
    // Wind → White noise + low-pass filter
    const wind = this.createWindSound(weatherData.windSpeed);
    
    // Rain → High-frequency ticks
    if (weatherData.precipitation) {
      const rain = this.createRainSound(weatherData.precipitation);
    }
    
    // Atmosphere → Deep drone (based on pressure)
    const atmosphere = this.createAtmosphereDrone(weatherData.pressure);
    
    // Mix all sources
    this.mixAudio([wind, rain, atmosphere]);
  }
  
  createWindSound(speed) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 50 + speed * 10; // Speed affects pitch
    gainNode.gain.value = Math.min(speed / 100, 0.3); // Speed affects volume
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    oscillator.start();
    
    return { oscillator, gainNode };
  }
}
```

---

## Celestial Objects & Stories (`js/stars.js`)

### Scene System

**Dynamic SVG scenes** based on time of day:

```javascript
const SCENES = {
  day: `<svg viewBox="0 0 400 300">
    <!-- Sun (clickable) -->
    <g class="star" data-star="sun" style="cursor: pointer;">
      <circle cx="80" cy="60" r="30" fill="rgba(249,168,38,0.2)" 
              stroke="#F9A826" stroke-width="3"/>
      <!-- Sun rays... -->
    </g>
    
    <!-- ISS (clickable) -->
    <g class="star" data-star="iss">
      <!-- ISS illustration -->
    </g>
    
    <!-- Mercury, Venus, Mars... -->
  </svg>`,
  
  night: `<svg viewBox="0 0 400 300">
    <!-- Moon, stars, constellations... -->
  </svg>`
};
```

### Star Data Structure

**30+ celestial objects** with educational narratives:

```javascript
const StarData = {
  sun: {
    name: 'Sol (The Sun)',
    type: 'G-type Main Sequence (Yellow Dwarf)',
    distance: '93 million miles (1 AU)',
    age: '4.6 billion years',
    story: `Every culture has worshipped this star...
            [Full narrative history - 500+ words]`
  },
  
  iss: {
    name: 'International Space Station',
    type: 'Space Station',
    distance: '254 miles above Earth',
    speed: '17,500 mph',
    story: `Orbiting Earth every 90 minutes...`
  }
  // ... 30+ more objects
};
```

### Initialization & Interaction

```javascript
function initStarScene() {
  const container = document.getElementById('weatherScene');
  const hour = new Date().getHours();
  const scene = (hour >= 6 && hour < 19) ? 'day' : 'night';
  
  // Load appropriate scene
  container.innerHTML = SCENES[scene];
  
  // Attach click handlers
  const stars = container.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const starId = star.dataset.star;
      showStarModal(starId);
    });
  });
}

function showStarModal(starId) {
  const data = StarData[starId];
  
  // Populate modal
  document.getElementById('starModalTitle').textContent = data.name;
  document.getElementById('starModalContent').innerHTML = `
    <p><strong>Type:</strong> ${data.type}</p>
    <p><strong>Distance:</strong> ${data.distance}</p>
    <p style="white-space: pre-line; margin-top: 1rem;">${data.story}</p>
  `;
  
  // Show modal
  document.getElementById('starModal').classList.add('active');
}
```

---

## Perspectives System (`js/perspectives.js` + `js/characters.js`)

### Character Stories

**8 first-person narratives** addressing NASA challenge requirements:

```javascript
const SpacePerspectives = [
  {
    character: "Farmer Maya",
    emoji: "🌾",
    illustration: "farmer",  // Links to SVG in characters.js
    title: "GPS and Precision Farming",
    story: `Hi! I'm Maya, and I farm corn in Iowa...
            [500-word first-person narrative]`,
    impact: "GPS accuracy decreases during solar storms",
    solution: "Farmers monitor space weather forecasts"
  },
  // ... 7 more perspectives
];
```

### Character Illustrations

**Hand-drawn SVG line-art** with pastel color schemes:

```javascript
const CharacterIllustrations = {
  farmer: `<svg viewBox="0 0 200 200">
    <!-- Straw hat -->
    <ellipse cx="100" cy="50" rx="45" ry="12" stroke="#F9A826"/>
    
    <!-- Face with simple features -->
    <circle cx="100" cy="80" r="35" stroke="#000"/>
    <circle cx="88" cy="75" r="4" fill="#000"/>  // Eyes
    <circle cx="112" cy="75" r="4" fill="#000"/>
    <path d="M 85 90 Q 100 100 115 90"/>        // Smile
    
    <!-- Overalls and tiny tractor -->
  </svg>`,
  
  // ... 7 more character SVGs
};
```

### Display Function

```javascript
function loadNewPerspective() {
  const perspective = getRandomPerspective();
  
  document.getElementById('perspectiveEmoji').textContent = perspective.emoji;
  document.getElementById('perspectiveCharacter').textContent = perspective.character;
  document.getElementById('perspectiveTitle').textContent = perspective.title;
  document.getElementById('perspectiveStory').textContent = perspective.story;
}
```

---

## Onboarding Flow (`js/onboarding.js`)

### State Management

```javascript
let onboardingState = {
  currentStep: 0,
  currentPerspective: 0,
  userName: '',
  userLocation: '',
  hasSeenOnboarding: false
};

function hasCompletedOnboarding() {
  return localStorage.getItem('skyMirrorOnboarding') === 'complete';
}
```

### Screen Flow

```javascript
// 1. Check completion status
initOnboarding() {
  if (!hasCompletedOnboarding()) {
    startOnboarding();  // Show tutorial
  } else {
    completeOnboarding();  // Skip to main app
  }
}

// 2. Start sequence
startOnboarding() {
  document.getElementById('mainApp').style.display = 'none';
  document.getElementById('onboardingScreen').style.display = 'flex';
  showWelcome();
}

// 3. Welcome screen
showWelcome() {
  // Display: Happy Sun + introduction text
  // Button: "👋 Meet My Friends! →"
}

// 4. Character stories (loop through 8)
showPerspectives() {
  if (currentPerspective >= 8) {
    showAboutYou();
    return;
  }
  
  const perspective = SpacePerspectives[currentPerspective];
  
  // Display:
  // - Character illustration in colored circle
  // - Name and title
  // - Full story in scrollable box
  // - Impact/Solution boxes
  // - Progress dots (1/8, 2/8, etc.)
  // - "👉 Next Friend →" button
}

// 5. Feature preview
showAboutYou() {
  // Display:
  // - "What About YOU?" headline
  // - 2x2 grid of features (Northern Lights, Moon, Stars, Games)
  // - "✨ Show Me My Sky! →" button
}

// 6. Launch animation
finishOnboarding() {
  localStorage.setItem('skyMirrorOnboarding', 'complete');
  
  // Show "Look Up! SkyMirror looks back..." for 2.5 seconds
  setTimeout(() => completeOnboarding(), 2500);
}

// 7. Complete
completeOnboarding() {
  document.getElementById('onboardingScreen').style.display = 'none';
  document.getElementById('mainApp').style.display = 'block';
  
  // Initialize main SkyMirror app
  window.skyMirror = new SkyMirror();
}
```

---

## Aurora Catcher Game (`game.html` + `js/game.js`)

### Game State

```javascript
let gameState = {
  score: 0,
  timeLeft: 60,
  auroras: [],
  aurorasCaught: 0,
  storiesUnlocked: 0,
  gameInterval: null,
  spawnInterval: null,
  gameSpeed: 1.0  // Progressive difficulty
};
```

### Game Loop Architecture

```javascript
function initGame() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  // Reset state
  gameState.score = 0;
  gameState.timeLeft = 60;
  gameState.auroras = [];
  gameState.gameSpeed = 1.0;
  
  // Spawn auroras every 1.5 seconds
  gameState.spawnInterval = setInterval(() => {
    spawnAurora();
  }, 1500);
  
  // 60 FPS game loop
  gameState.gameInterval = setInterval(() => {
    updateGame(ctx, canvas);
    drawGame(ctx, canvas);
    updateSpeedIndicator();
  }, 1000 / 60);
  
  // Countdown timer
  const timerInterval = setInterval(() => {
    gameState.timeLeft--;
    if (gameState.timeLeft <= 0) {
      endGame();
      clearInterval(timerInterval);
    }
  }, 1000);
  
  // Click handler
  canvas.addEventListener('click', handleClick);
}
```

### Aurora Physics

```javascript
function spawnAurora() {
  const aurora = {
    x: Math.random() * canvas.width,
    y: -50,
    baseSpeed: 0.8 + Math.random() * 0.7,  // Slow start
    width: 80 + Math.random() * 40,
    color: ['#A3C4F3', '#B5EAD7', '#C8BFE7'][Math.floor(Math.random() * 3)],
    caught: false
  };
  gameState.auroras.push(aurora);
}

function updateGame(ctx, canvas) {
  // Progressive difficulty: 1.0x → 2.5x speed
  gameState.gameSpeed = 1.0 + ((60 - gameState.timeLeft) / 60) * 1.5;
  
  // Update positions
  gameState.auroras.forEach(aurora => {
    aurora.y += aurora.baseSpeed * gameState.gameSpeed;
  });
  
  // Remove off-screen auroras
  gameState.auroras = gameState.auroras.filter(a => a.y < canvas.height + 50);
}
```

### Rendering

```javascript
function drawGame(ctx, canvas) {
  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Stable white stars
  starField.forEach(star => {
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Draw auroras (curved strokes)
  gameState.auroras.forEach(aurora => {
    ctx.strokeStyle = aurora.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(aurora.x, aurora.y);
    ctx.quadraticCurveTo(
      aurora.x + aurora.width / 2,
      aurora.y - 20,
      aurora.x + aurora.width,
      aurora.y
    );
    ctx.stroke();
  });
}
```

### Educational Popups

```javascript
const auroraFacts = [
  {
    title: "What Causes Auroras?",
    text: "Auroras happen when charged particles from the Sun..."
  },
  // 6 total facts
];

function showEducationalPopup() {
  const fact = auroraFacts[Math.floor(Math.random() * 6)];
  document.getElementById('popupTitle').textContent = fact.title;
  document.getElementById('popupText').textContent = fact.text;
  document.getElementById('eduPopup').classList.add('active');
}
```

### Persistence

```javascript
function endGame() {
  // Save to localStorage
  const total = parseInt(localStorage.getItem('totalAuroras') || '0');
  localStorage.setItem('totalAuroras', total + (score / 10));
  
  // Save diary entry
  saveDiaryEntry(`Caught ${score / 10} auroras! Learned about space weather.`);
  
  // Update stats
  updateStats();
}
```

### Story Unlocking System

```javascript
function loadStories() {
  const totalAuroras = parseInt(localStorage.getItem('totalAuroras') || '0');
  
  const stories = [
    { name: 'The Sun', unlocked: true },
    { name: 'Solar Wind', unlocked: totalAuroras >= 5 },
    { name: 'Aurora Borealis', unlocked: totalAuroras >= 10 },
    { name: 'CME Journey', unlocked: totalAuroras >= 20 }
  ];
  
  // Render grid with locked/unlocked states
}
```

---

## Styling System (`styles/main.css`)

### Design Tokens

```css
:root {
  /* Colors - Black & White + Pastel Highlights */
  --white: #FFFFFF;
  --black: #000000;
  --gray-light: #DADADA;
  
  /* Pastel Accents */
  --accent-wind: #A3C4F3;   /* Sky blue */
  --accent-temp: #F9A8A8;   /* Warm pink */
  --accent-air: #B5EAD7;    /* Mint green */
  --accent-sky: #C8BFE7;    /* Lavender */
  
  /* Typography */
  --font-primary: 'IBM Plex Sans', sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 3rem;
  
  /* Timing */
  --duration-short: 0.2s;
  --duration-medium: 0.3s;
  --ease-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

### Card Styling Pattern

```css
.weather-card {
  background: var(--white);
  border: 1px solid var(--black);
  border-radius: 12px;
  padding: var(--spacing-lg);
  transition: all var(--duration-medium) var(--ease-smooth);
}

.weather-card:hover {
  transform: scale(1.02);  /* Breathing effect */
}

/* Pastel gradient backgrounds */
.card-wind {
  background: linear-gradient(135deg, 
    rgba(163, 196, 243, 0.08) 0%, 
    var(--white) 100%
  );
  border-left: 3px solid var(--accent-wind);
}

/* Similar for temp, air, sky, aurora, moon, sound cards */
```

### Grid Layout

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.card-illustration {
  grid-column: 1 / -1;  /* Full width */
  min-height: 350px;
  max-height: 500px;
  overflow: hidden;
}
```

### Modal System

```css
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  display: none;  /* Hidden by default */
  z-index: 9999;
}

.modal.active {
  display: flex;  /* Show when activated */
}
```

---

## Event Handling System

### Main App Event Listeners

```javascript
initEventListeners() {
  // Settings
  document.getElementById('settingsBtn').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.add('active');
  });
  
  document.getElementById('closeSettings').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.remove('active');
  });
  
  // Temperature unit toggle
  document.getElementById('tempUnit').addEventListener('change', (e) => {
    this.settings.tempUnit = e.target.value;
    this.saveSettings();
    this.updateWeather();  // Refresh with new unit
  });
  
  // Soundscape controls
  document.getElementById('playSoundBtn').addEventListener('click', () => {
    if (this.currentWeather && this.soundscape) {
      this.soundscape.play(this.currentWeather);
    }
  });
  
  document.getElementById('stopSoundBtn').addEventListener('click', () => {
    this.soundscape?.stop();
  });
  
  // Ritual/reflection system
  document.getElementById('ritualBtn').addEventListener('click', () => {
    this.openRitualModal();
  });
  
  document.getElementById('saveRitual').addEventListener('click', () => {
    this.saveReflection();
  });
  
  // Notes/reflections viewer
  document.getElementById('notesBtn').addEventListener('click', () => {
    this.showReflections();
  });
}
```

---

## Data Persistence (LocalStorage)

### Storage Schema

```javascript
// Settings
localStorage.setItem('skyMirrorSettings', JSON.stringify({
  tempUnit: 'C',
  autoRitual: true
}));

// Reflections/Diary
localStorage.setItem('skyMirrorReflections', JSON.stringify([
  {
    date: '2025-10-05T20:30:00.000Z',
    location: 'New York, NY',
    weather: 'Clear skies',
    text: 'Saw three shooting stars tonight...',
    mood: '✨'
  }
]));

// Onboarding completion
localStorage.setItem('skyMirrorOnboarding', 'complete');

// Game progress
localStorage.setItem('totalAuroras', '25');
localStorage.setItem('diaryEntries', JSON.stringify([
  {
    date: '2025-10-05T21:00:00.000Z',
    text: 'Caught 15 auroras! Learned about CMEs.'
  }
]));
```

### Save/Load Pattern

```javascript
saveReflection() {
  const text = document.getElementById('ritualText').value;
  
  const reflection = {
    date: new Date().toISOString(),
    location: this.location,
    weather: this.currentWeather?.condition || 'Unknown',
    text: text,
    mood: '✨'
  };
  
  const reflections = JSON.parse(
    localStorage.getItem('skyMirrorReflections') || '[]'
  );
  
  reflections.unshift(reflection);  // Add to beginning
  localStorage.setItem('skyMirrorReflections', 
    JSON.stringify(reflections.slice(0, 50))  // Keep last 50
  );
}
```

---

## PWA Implementation

### Service Worker (`sw.js`)

```javascript
const CACHE_NAME = 'skymirror-v1';
const urlsToCache = [
  '/',
  '/app.html',
  '/game.html',
  '/styles/main.css',
  '/styles/game.css',
  '/js/app.js',
  '/js/game.js',
  // ... all JS files
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### Manifest (`manifest.json`)

```json
{
  "name": "SkyMirror - Space Weather Explorer",
  "short_name": "SkyMirror",
  "description": "Interactive space weather education platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#000000",
  "icons": [
    { "src": "/icons/icon-72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

---

## Performance Optimizations

### 1. Parallel API Calls
```javascript
const [weather, airQuality, aurora] = await Promise.all([...]);
```
Instead of sequential: Saves ~2-3 seconds on load

### 2. Conditional Rendering
```javascript
if (weather) this.updateWindCard(weather);
if (airQuality) this.updateAirCard(airQuality);
```
Cards gracefully degrade if API fails

### 3. Debounced Auto-Refresh
```javascript
setInterval(() => this.updateWeather(), 600000); // Every 10 minutes
```
Not on every interaction - prevents API spam

### 4. Lazy Icon Loading
```javascript
function loadIcons() {
  document.addEventListener('DOMContentLoaded', () => {
    // Generate SVG icons only when needed
  });
}
```

### 5. Canvas Optimization (Game)
```javascript
// Stable star field (calculated once)
const starField = [];
for (let i = 0; i < 100; i++) {
  starField.push({
    x: Math.random() * 800,
    y: Math.random() * 600,
    size: Math.random() > 0.8 ? 2 : 1,
    brightness: 0.5 + Math.random() * 0.5
  });
}

// Stars don't recalculate every frame - just draw from array
```

---

## Error Handling

### Graceful Degradation Pattern

```javascript
async updateWeather() {
  try {
    const weather = await this.weatherAPI.getWeather(lat, lng);
    this.updateWindCard(weather);
  } catch (error) {
    console.error('❌ Weather API failed:', error);
    
    // Show fallback content
    document.getElementById('windValue').textContent = '—';
    document.getElementById('windDescription').textContent = 
      'Unable to fetch weather data';
    
    // Still try other features
    this.updateMoonPhase();  // Works without API
    this.updateFunFact();    // Works without API
  }
}
```

### Null Checks

```javascript
updateSunMoonCard() {
  const iconContainer = document.getElementById('sunMoonIcon');
  
  if (iconContainer) {  // Verify element exists
    iconContainer.innerHTML = /* SVG */;
  }
  
  // Safe chaining
  this.soundscape?.stop();  // Won't crash if soundscape is null
}
```

---

## Key Design Patterns

### 1. Class-Based Architecture
- `SkyMirror` - Main controller (singleton)
- `WeatherAPI` - API wrapper
- `AuroraAPI` - API wrapper
- `MoonPhase` - Calculation engine
- `SkySoundscape` - Audio engine

### 2. Module Pattern
Each JS file exports to `window`:
```javascript
window.WeatherAPI = WeatherAPI;
window.initStarScene = initStarScene;
window.loadNewPerspective = loadNewPerspective;
```

### 3. Observer Pattern
Settings changes trigger updates:
```javascript
document.getElementById('tempUnit').addEventListener('change', (e) => {
  this.settings.tempUnit = e.target.value;
  this.saveSettings();           // Persist
  this.updateWeather();          // Refresh display
});
```

### 4. State Management
Centralized in class properties:
```javascript
this.location = { lat, lng };     // User location
this.currentWeather = data;       // Latest weather
this.settings = { ... };          // User preferences
```

---

## Accessibility Features

### ARIA Labels
```html
<button class="icon-btn" id="settingsBtn" 
        aria-label="Settings" 
        title="Settings">⚙️</button>
```

### Keyboard Navigation
All interactive elements are `<button>` or `<a>` tags (natively focusable)

### Semantic HTML
```html
<header class="header">...</header>
<main class="dashboard">...</main>
<article class="weather-card">...</article>
```

### Color Contrast
- Black text on white backgrounds (21:1 ratio)
- Pastel accents used only for backgrounds/borders
- Never rely on color alone (always have text labels)

---

## Deployment Configuration

### Vercel (`vercel.json`)
```json
{
  "buildCommand": null,
  "outputDirectory": ".",
  "framework": null,
  "installCommand": "npm install",
  "devCommand": "npx serve -p 8080"
}
```

### Netlify (`netlify.toml`)
```toml
[build]
  publish = "."
  command = ""

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Static site** - No build step required!

---

## Testing Strategy

### Manual Testing Checklist

1. **Geolocation**
   - Allow location → Should fetch local weather
   - Deny location → Should use NYC default

2. **Weather Cards**
   - All 11 cards populate with data
   - Icons load correctly
   - Descriptions are kid-friendly

3. **Interactive Features**
   - Click stars → Modal appears with story
   - Click soundscape play → Audio starts
   - Settings modal → Changes persist

4. **Onboarding**
   - First visit → Shows tutorial
   - Clear localStorage → Tutorial reappears
   - Skip button → Goes to main app
   - All 8 characters display correctly

5. **Game**
   - Auroras fall and speed up
   - Click detection works
   - Score increments
   - Stories unlock at 5, 10, 20 catches
   - Diary saves sessions

### Browser Console Tests

```javascript
// Test API
const api = new WeatherAPI();
await api.getWeather(40.7128, -74.0060);

// Test moon phase
const moon = new MoonPhase();
const phase = moon.calculatePhase();
console.log(phase);

// Test soundscape
const sound = new SkySoundscape();
sound.play({ windSpeed: 15, precipitation: 0 });

// Reset onboarding
localStorage.removeItem('skyMirrorOnboarding');
location.reload();

// Check game progress
console.log('Total auroras:', localStorage.getItem('totalAuroras'));
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  User Opens app.html                                    │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  onboarding.js: initOnboarding()                        │
│  ├─ Check localStorage('skyMirrorOnboarding')          │
│  ├─ If NOT complete → Show tutorial                    │
│  └─ If complete → Start main app                       │
└─────────────────┬───────────────────────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
   [Tutorial]          [Main App]
        │                    │
        │                    ▼
        │         ┌──────────────────────┐
        │         │ app.js: SkyMirror    │
        │         │ constructor()        │
        │         └──────────┬───────────┘
        │                    │
        │                    ▼
        │         ┌──────────────────────┐
        │         │ init()               │
        │         │ ├─ loadSettings()   │
        │         │ ├─ requestLocation()│
        │         │ ├─ initStarScene()  │
        │         │ └─ updateWeather()  │
        │         └──────────┬───────────┘
        │                    │
        │                    ▼
        │         ┌──────────────────────┐
        │         │ Parallel API Calls   │
        │         │ ├─ WeatherAPI       │
        │         │ ├─ AuroraAPI        │
        │         │ └─ (MoonPhase calc) │
        │         └──────────┬───────────┘
        │                    │
        │                    ▼
        │         ┌──────────────────────┐
        │         │ Update 11 Cards      │
        │         │ ├─ Wind              │
        │         │ ├─ Temperature       │
        │         │ ├─ Air Quality       │
        │         │ ├─ Sky Condition     │
        │         │ ├─ Humidity          │
        │         │ ├─ Sun/Moon          │
        │         │ ├─ Aurora            │
        │         │ ├─ Moon Phase        │
        │         │ ├─ Soundscape        │
        │         │ ├─ Fun Fact          │
        │         │ └─ Perspective Story │
        │         └──────────────────────┘
        │
        ▼
   [User Completes Tutorial]
        │
        ▼
   [Main App Loads]
```

---

## API Response Handling

### Open-Meteo Response Structure
```json
{
  "current": {
    "temperature_2m": 21.5,
    "apparent_temperature": 20.2,
    "relative_humidity_2m": 65,
    "cloud_cover": 45,
    "wind_speed_10m": 12.3,
    "wind_direction_10m": 230,
    "weather_code": 3
  },
  "hourly": {
    "time": ["2025-10-05T00:00", ...],
    "temperature_2m": [18, 19, 20, ...],
    "weather_code": [2, 2, 3, ...]
  }
}
```

### NOAA SWPC Response
```json
{
  "G": {
    "Scale": "3",
    "Text": "Strong"
  },
  "S": { "Scale": "0" },
  "R": { "Scale": "1" }
}
```

### Data Transformation
```javascript
// Raw API → Kid-friendly
interpretWeatherCode(code) {
  const codes = {
    0: { condition: 'Clear Sky', icon: '☀️' },
    1: { condition: 'Mainly Clear', icon: '🌤️' },
    2: { condition: 'Partly Cloudy', icon: '⛅' },
    3: { condition: 'Overcast', icon: '☁️' },
    // ... WMO standard codes 0-99
  };
  return codes[code] || { condition: 'Unknown', icon: '❓' };
}
```

---

## Security Considerations

### 1. No API Keys Exposed
- Open-Meteo: Public, no key
- NOAA: Public, no key
- All client-side code

### 2. Input Sanitization
```javascript
saveReflection() {
  const text = document.getElementById('ritualText').value;
  
  // Sanitize before storing
  const sanitized = text.replace(/<script>/gi, '').substring(0, 1000);
  
  localStorage.setItem(/* sanitized data */);
}
```

### 3. CORS Handling
All APIs support CORS - no proxy needed

---

## Browser Compatibility

**Minimum Requirements:**
- ES6 support (2015+)
- Canvas API
- Web Audio API
- LocalStorage
- Geolocation API
- CSS Grid

**Tested Browsers:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Polyfills Not Needed** - Modern browsers only

---

## Build & Deployment

### No Build Step!
Static HTML/CSS/JS - **works immediately**

### Local Development
```bash
cd skymirror
npm install      # Install serve
npm start        # Starts on port 8080
```

### Production Deployment
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# GitHub Pages
# Just push to gh-pages branch
```

**Environment Variables:** None required!

---

## Code Quality

### ESLint-Ready Structure
```javascript
// Strict mode implicit in modules
'use strict';

// No global pollution
(function() {
  // All code wrapped
  window.SkyMirror = SkyMirror;  // Explicit export
})();
```

### Console Logging Strategy
```javascript
// Informative logging for debugging
console.log('🌌 SkyMirror constructor starting...');
console.log('📡 Fetching weather data...');
console.log('✅ All data updated:', { weather, aurora });
console.error('❌ Failed to update weather:', error);
```

### Naming Conventions
- **Classes**: PascalCase (`SkyMirror`, `WeatherAPI`)
- **Functions**: camelCase (`updateWindCard`, `showStarModal`)
- **Constants**: UPPERCASE (`SCENES`, `StarData`)
- **DOM IDs**: camelCase (`windValue`, `settingsModal`)
- **CSS classes**: kebab-case (`weather-card`, `card-wind`)

---

## Extension Points

### Adding New Weather Cards
1. Add HTML structure to `app.html`
2. Add update function to `SkyMirror` class
3. Call in `updateWeather()` method
4. Add CSS styles for card variant

### Adding New API Sources
1. Create new class in `js/newapi.js`
2. Initialize in `SkyMirror` constructor
3. Add to parallel fetch in `updateWeather()`
4. Export to `window`

### Adding New Perspectives
1. Add story object to `SpacePerspectives` array
2. Create SVG illustration in `CharacterIllustrations`
3. Link with `illustration` property
4. Automatically appears in onboarding flow

---

## Summary Statistics

**Lines of Code:**
- JavaScript: ~3,500 lines
- CSS: ~700 lines
- HTML: ~400 lines
- **Total: ~4,600 lines**

**Files:**
- 3 HTML pages
- 11 JavaScript modules
- 2 CSS stylesheets
- 10 PWA icons
- 8 markdown documentation files

**Features:**
- 11 interactive weather cards
- 30+ clickable celestial objects
- 8 character perspective stories
- 1 educational mini-game
- 6 game educational popups
- 4 story unlockables
- PWA installability
- Offline support

**APIs Integrated:**
- Open-Meteo Weather API
- Open-Meteo Air Quality API  
- NOAA Space Weather Prediction Center
- Web Geolocation API
- Web Audio API
- Canvas API
- LocalStorage API

**Fully Functional** - No TODO comments, no incomplete features.

---

## For ChatGPT Context

This is a complete, production-ready web application that:
1. ✅ Requires zero build tools
2. ✅ Uses only vanilla JavaScript
3. ✅ Integrates real NASA/NOAA data
4. ✅ Provides educational value through storytelling
5. ✅ Gamifies learning with Aurora Catcher
6. ✅ Works offline as PWA
7. ✅ Addresses NASA Space Apps Challenge requirements
8. ✅ Kid-friendly UI with line-art aesthetic
9. ✅ All code pushed to GitHub
10. ✅ Ready to deploy to Vercel/Netlify

**Repository:** https://github.com/aadyaanand/skymirror

