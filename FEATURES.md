# 🌌 SkyMirror — Complete Feature Guide

## The Meditative Sky Companion

SkyMirror is now a **full-featured interactive sky exploration app** that combines real-world data with minimalist design, creating a meditative and educational experience.

---

## 🎴 10 Interactive Weather & Space Cards

### 1. 💨 Wind
- Real-time wind speed & direction
- Poetic descriptions ("gentle northern breeze")
- Animated wind swirls background
- **Data**: Open-Meteo API

### 2. 🌡️ Temperature
- Current temp + "feels like"
- Descriptive text ("comfortable", "warm")
- Pulsing heat shimmer animation
- Toggle °C / °F in settings

### 3. 🍃 Air Quality
- US AQI (Air Quality Index)
- PM2.5 and PM10 levels
- Quality description ("Good", "Moderate")
- Breathing pulse animation
- **Data**: Open-Meteo Air Quality API

### 4. ☁️ Sky Condition
- Current weather condition
- Cloud cover percentage
- Weather codes (WMO standard)
- Drifting cloud animation

### 5. 💧 Humidity & Pressure
- Humidity percentage
- Atmospheric pressure (hPa)
- Visibility distance
- "Feels" descriptions

### 6. ☀️ Sun & Moon
- Daytime / Nighttime indicator
- Sunrise & sunset times
- Time until next event
- Dynamic sun/moon icon

### 7. 🌌 Aurora Activity ⭐ NEW
- **Real NOAA SWPC solar data!**
- Kp index (geomagnetic activity)
- Aurora visibility chance for your latitude
- Animated aurora curtains
- Activity levels: Calm / Moderate / Active
- **Data**: NOAA Space Weather Prediction Center

### 8. 🌙 Moon Phase ⭐ NEW
- Current moon phase calculated
- Visual SVG moon with illumination
- Phase names (New, Crescent, Quarter, Gibbous, Full)
- Illumination percentage
- Accurate crater details

### 9. 🎵 Sky Soundscape ⭐ NEW
- **Convert weather to ambient audio!**
- Wind → whooshing sounds
- Rain → gentle tapping
- Atmosphere → deep drone
- Play/Stop controls
- **Uses Web Audio API**

### 10. 💡 Did You Know?
- 20 random weather & space facts
- Educational and surprising
- Refreshes on each load

---

## 🌟 Current Scene - Interactive Star Map

### Features:
- **Full-width illustrated card**
- Shows **Sun** (day) or **night sky** (after 7 PM)
- **30+ clickable stars & objects**
- Each click reveals rich narrative history

### Daytime Scene:
- ☉ **Sol (The Sun)** - clickable
- 🛰️ **ISS** - clickable
- ⭐ **Sirius & Vega** (faintly visible)
- Orbit path visualization

### Nighttime Scene:
- 🌙 **Moon** with craters - clickable
- **Big Dipper** (7 stars, all clickable!)
  - Dubhe, Merak, Phecda, Megrez, Alioth, Mizar, Alkaid
- **Orion's Belt** (3 stars with connecting lines)
  - Alnitak, Alnilam, Mintaka
- **Bright Stars**:
  - Sirius (brightest!), Polaris (North Star), Vega, Betelgeuse, Rigel
- **Constellation lines** connecting stars
- Milky Way band

### Star Stories:
Every star has a rich narrative including:
- Ancient mythology & cultural significance
- Navigation history
- Scientific discoveries
- Light travel time context ("This light left during the Crusades...")
- Future predictions
- Human-scale comparisons
- Emotional connections

---

## 🎵 Sky Soundscape System

### How It Works:
1. Click **▶ Play** on Soundscape card
2. Weather data converts to audio:
   - **Wind speed** → whooshing noise (frequency increases with speed)
   - **Precipitation** → rhythmic tapping
   - **Cloud cover** → atmospheric drone (lower = more clouds)
3. Click **⏹ Stop** to silence

### Technical:
- Uses **Web Audio API**
- Real-time synthesis
- Dynamic frequency mapping
- Filtered noise for wind
- Oscillators for atmosphere
- Burst generators for rain

### Ritual Chime:
- Opening Daily Ritual plays a gentle 528 Hz chime
- "Miracle tone" frequency
- 2-second fade-out

---

## 🌌 Aurora & Solar Activity

### Real Space Weather Data:
- **NOAA SWPC** (Space Weather Prediction Center)
- Solar wind magnetic field strength
- Kp index (geomagnetic activity 0-9)
- Aurora visibility forecast for your latitude

### Activity Levels:
- **Quiet** (Kp 0-2): No auroras
- **Unsettled** (Kp 3): Possible at high latitudes
- **Active** (Kp 4-5): Auroras likely above 50°N
- **Storm** (Kp 6-9): Visible much farther south!

### Visualization:
- Animated aurora curtains
- Pastel waves (blue, green, purple)
- Shimmer animation
- Intensity matches activity level

### Recommendations:
- "High chance tonight! Head somewhere dark."
- "Active sun, but you're too far south."
- "Quiet skies tonight. Enjoy the stars instead."

---

## 🌙 Moon Phase Tracking

### Calculated Phases:
- 🌑 New Moon
- 🌒 Waxing Crescent
- 🌓 First Quarter
- 🌔 Waxing Gibbous
- 🌕 Full Moon
- 🌖 Waning Gibbous
- 🌗 Last Quarter
- 🌘 Waning Crescent

### Display:
- SVG moon visualization
- Accurate illumination shading
- Crater details
- Percentage illuminated
- Phase name

---

## 🕊️ Daily Ritual

### Experience:
1. Click black banner at bottom
2. **Gentle chime plays** (528 Hz)
3. Typewriter animation on title
4. Reflect on today's sky
5. Save with weather context

### Stored Data:
- Your reflection text
- Date & time
- Current weather conditions
- Temperature, sky, wind

### View Reflections:
- Click 📜 icon in header
- Scroll through all saved reflections
- Each shows weather context
- Maximum 50 kept

---

## 📊 Data Sources

### Weather Data:
- **Open-Meteo** - Temperature, wind, clouds, humidity
- **Open-Meteo Air Quality** - AQI, PM2.5, PM10
- Global coverage, free, no API key

### Space Weather:
- **NOAA SWPC** - Solar activity, Kp index, aurora forecasts
- Real-time updates
- Free public API

### Astronomical:
- **Moon phase calculation** - Accurate algorithm
- **Star database** - 30+ stars with stories
- **Constellation mapping** - Big Dipper, Orion

### Location:
- **OpenStreetMap Nominatim** - Reverse geocoding
- **Browser Geolocation** - Auto-detect position

---

## ✨ Unique Features

### Meditative Experience
- Minimalist black & white design
- Soft pastel accents
- Gentle animations
- Poetic descriptions
- Soundscape for ambient relaxation

### Educational Content
- Rich star narratives
- Weather facts
- Scientific context
- Historical mythology
- Astronomical education

### Interactive Exploration
- Click stars to learn stories
- Play weather as sound
- Track moon phases
- Monitor aurora activity
- Save daily reflections

### Privacy-First
- No tracking
- No backend
- Client-side only
- Data stored locally
- Open source

---

## 🎨 Design System

### Colors:
- **Base**: White (#FFFFFF) & Black (#000000)
- **Accents**:
  - Wind: Soft Blue (#A3C4F3)
  - Temperature: Muted Coral (#F9A8A8)
  - Air: Pastel Green (#B5EAD7)
  - Sky/Aurora: Dusty Lilac (#C8BFE7)

### Typography:
- **IBM Plex Sans** (thin weights)
- **Space Grotesk** (headers)
- Monospace for data values

### Animations:
- Wind swirls (4s loop)
- Heat shimmer (3s pulse)
- Air breathing (2s)
- Cloud drift (8s)
- Aurora shimmer (3s)

---

## 🚀 Complete Tech Stack

### Frontend:
- Vanilla JavaScript (ES6+)
- HTML5 / CSS3
- Web Audio API
- SVG animations

### APIs:
- Open-Meteo (weather)
- Open-Meteo Air Quality
- NOAA SWPC (space weather)
- OpenStreetMap (geocoding)

### Features:
- PWA (Progressive Web App)
- Service Worker (offline support)
- LocalStorage (reflections)
- Geolocation API
- Web Audio API

---

## 📱 How to Use

### First Visit:
1. Allow location when prompted
2. Wait 2-3 seconds for data
3. Explore 10 weather/space cards
4. Scroll to "Current Scene"
5. Click stars to read stories

### Listen to Your Sky:
1. Scroll to "Sky Soundscape" card
2. Click **▶ Play**
3. Hear wind, rain, atmosphere as audio
4. Click **⏹ Stop** when done

### Daily Ritual:
1. Click black banner at bottom
2. Listen to gentle chime
3. Write reflection about the sky
4. Click Submit
5. View all reflections via 📜 icon

### Explore Stars:
1. Scroll to "Current Scene" card
2. Click any star or celestial object
3. Read rich narrative history
4. Learn mythology, science, navigation
5. Close and click another

### Check Aurora:
1. Look at "Aurora Activity" card
2. See Kp index and visibility chance
3. Watch animated aurora waves
4. Get recommendations

### Track Moon:
1. "Moon Phase" card shows current phase
2. See illumination percentage
3. Visual SVG representation

---

## 🎯 Perfect for Space Apps

### Technical Excellence:
✅ Real NASA/NOAA space weather data  
✅ Multiple API integrations  
✅ Web Audio synthesis  
✅ PWA with offline support  
✅ Accessibility features  

### User Experience:
✅ Beautiful minimalist design  
✅ Interactive storytelling  
✅ Educational content  
✅ Meditative soundscapes  
✅ Daily reflection journaling  

### Innovation:
✅ Weather-to-audio conversion  
✅ Clickable star encyclopedia  
✅ Aurora visibility forecasts  
✅ Moon phase calculations  
✅ Poetic weather descriptions  

---

## 🌟 Summary

**SkyMirror** is now a complete meditative sky companion featuring:

- 🌡️ **10 interactive cards** with real weather & space data
- 🌟 **30+ clickable stars** with rich narratives
- 🌌 **Aurora forecasts** from NOAA space weather
- 🌙 **Moon phase tracking** with visual SVGs
- 🎵 **Ambient soundscapes** generated from weather
- 🕊️ **Daily ritual** with chime & reflections
- 📖 **Educational content** (myths, science, history)
- 🎨 **Beautiful line-art** aesthetic
- 📱 **Fully responsive** & works offline

**Made with 💙 for Earth & space observation enthusiasts**

Look up. SkyMirror looks back. 🌍🛰️✨

