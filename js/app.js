// SkyMirror — Monochrome + Soft Pastels Edition
// Scientific sketchbook that breathes

class SkyMirror {
  constructor() {
    console.log('🌌 SkyMirror constructor starting...');
    
    this.location = { lat: 40.7128, lng: -74.0060 }; // Default NYC
    this.currentWeather = null;
    this.settings = {
      tempUnit: 'C',
      autoRitual: true
    };
    
    // Initialize APIs (check they exist)
    this.weatherAPI = window.WeatherAPI ? new window.WeatherAPI() : null;
    this.auroraAPI = window.AuroraAPI ? new window.AuroraAPI() : null;
    this.moonPhase = window.MoonPhase ? new window.MoonPhase() : null;
    this.soundscape = window.SkySoundscape ? new window.SkySoundscape() : null;
    
    console.log('APIs initialized:', {
      weather: !!this.weatherAPI,
      aurora: !!this.auroraAPI,
      moon: !!this.moonPhase,
      soundscape: !!this.soundscape
    });
    
    this.init();
  }
  
  async init() {
    console.log('🌫️ skymirror initializing...');
    
    // Show loading
    this.showLoading();
    
    // Load settings
    this.loadSettings();
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Get location
    await this.requestLocation();
    
    // Initialize star scene (loads default scene immediately)
    if (window.initStarScene) {
      window.initStarScene();
    }
    
    // Fetch weather data
    await this.updateWeather();
    
    // Hide loading
    this.hideLoading();
    
    // Start auto-refresh (every 10 minutes)
    setInterval(() => this.updateWeather(), 600000);
    
    // Typewriter effect on ritual title
    this.typewriterEffect();
    
    console.log('✨ skymirror ready');
  }
  
  loadSettings() {
    const saved = localStorage.getItem('skyMirrorSettings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
    
    document.getElementById('tempUnit').value = this.settings.tempUnit;
    document.getElementById('autoRitual').checked = this.settings.autoRitual;
  }
  
  saveSettings() {
    localStorage.setItem('skyMirrorSettings', JSON.stringify(this.settings));
  }
  
  initEventListeners() {
    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', () => {
      document.getElementById('settingsModal').classList.add('active');
    });
    
    document.getElementById('closeSettings').addEventListener('click', () => {
      document.getElementById('settingsModal').classList.remove('active');
    });
    
    document.getElementById('tempUnit').addEventListener('change', (e) => {
      this.settings.tempUnit = e.target.value;
      this.saveSettings();
      this.updateWeather();
    });
    
    document.getElementById('autoRitual').addEventListener('change', (e) => {
      this.settings.autoRitual = e.target.checked;
      this.saveSettings();
    });
    
    // Ritual buttons
    document.getElementById('ritualBtn').addEventListener('click', () => {
      this.openRitualModal();
    });
    
    document.getElementById('ritualBanner').addEventListener('click', () => {
      this.openRitualModal();
    });
    
    document.getElementById('cancelRitual').addEventListener('click', () => {
      document.getElementById('ritualModal').classList.remove('active');
    });
    
    document.getElementById('saveRitual').addEventListener('click', () => {
      this.saveReflection();
    });
    
    // Notes button
    document.getElementById('notesBtn').addEventListener('click', () => {
      this.showReflections();
    });
    
    document.getElementById('closeNotes').addEventListener('click', () => {
      document.getElementById('notesModal').classList.remove('active');
    });
    
    // Click outside modals to close
    document.querySelectorAll('.ritual-modal, .notes-modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
    
    // Soundscape controls
    document.getElementById('playSoundBtn').addEventListener('click', () => {
      if (this.currentWeather) {
        this.soundscape.play(this.currentWeather);
        document.getElementById('soundDescription').textContent = 'Playing your sky\'s sound...';
      }
    });
    
    document.getElementById('stopSoundBtn').addEventListener('click', () => {
      this.soundscape.stop();
      document.getElementById('soundDescription').textContent = 'Wind, rain, and atmosphere as audio';
    });
  }
  
  async requestLocation() {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000
          });
        });
        
        this.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        console.log('📍 Location:', this.location);
        
      } catch (error) {
        console.warn('Location access denied, using default');
      }
    }
  }
  
  async updateWeather() {
    try {
      console.log('📡 Fetching weather data...');
      
      // Fetch all data in parallel
      const promises = [
        this.weatherAPI ? this.weatherAPI.getWeather(this.location.lat, this.location.lng) : null,
        this.weatherAPI ? this.weatherAPI.getAirQuality(this.location.lat, this.location.lng) : null,
        this.auroraAPI ? this.auroraAPI.getAuroraForecast(this.location.lat) : null
      ];
      
      const [weather, airQuality, aurora] = await Promise.all(promises);
      
      // Store for soundscape
      this.currentWeather = weather;
      
      // Update all cards
      if (weather) {
        this.updateWindCard(weather);
        this.updateTempCard(weather);
        this.updateSkyCard(weather);
        this.updateHumidityCard(weather);
        this.updateFunFact(weather);
        this.updateTimeline(weather);
      }
      
      if (airQuality) {
        this.updateAirCard(airQuality);
      }
      
      if (aurora) {
        this.updateAuroraCard(aurora);
      }
      
      // These don't need API data
      this.updateSunMoonCard();
      this.updateMoonPhase();
      
      console.log('✅ All data updated:', { weather, aurora });
      
    } catch (error) {
      console.error('❌ Failed to update weather:', error);
      
      // Still try to update moon and fun fact
      this.updateMoonPhase();
      this.updateFunFact({});
    }
  }
  
  updateWindCard(weather) {
    const direction = this.weatherAPI.getWindDirection(weather.windDirection);
    const description = this.weatherAPI.getWindDescription(weather.windSpeed);
    
    document.getElementById('windValue').textContent = `${weather.windSpeed} km/h`;
    document.getElementById('windDescription').textContent = 
      `${description} ${direction.toLowerCase()} breeze`;
  }
  
  updateTempCard(weather) {
    let temp = weather.temperature;
    let apparent = weather.apparentTemp;
    
    if (this.settings.tempUnit === 'F') {
      temp = Math.round(temp * 9/5 + 32);
      apparent = Math.round(apparent * 9/5 + 32);
    }
    
    const unit = this.settings.tempUnit === 'F' ? '°F' : '°C';
    const description = this.weatherAPI.getTempDescription(weather.temperature);
    
    document.getElementById('tempValue').textContent = `${temp}${unit}`;
    document.getElementById('tempDescription').textContent = 
      `${description} — feels like ${apparent}${unit}`;
  }
  
  updateAirCard(airQuality) {
    document.getElementById('airValue').textContent = `AQI ${airQuality.aqi}`;
    document.getElementById('airDescription').textContent = 
      `Air quality ${airQuality.description.toLowerCase()}`;
  }
  
  updateSkyCard(weather) {
    const weatherInfo = this.weatherAPI.interpretWeatherCode(weather.weatherCode);
    const cloudiness = weather.cloudCover;
    
    let cloudinessText = 'clear';
    if (cloudiness > 75) cloudinessText = 'overcast';
    else if (cloudiness > 50) cloudinessText = 'mostly cloudy';
    else if (cloudiness > 25) cloudinessText = 'partly cloudy';
    
    document.getElementById('skyValue').textContent = weatherInfo.condition;
    document.getElementById('skyDescription').textContent = 
      `${cloudinessText} — ${cloudiness}% cloud cover`;
  }
  
  updateHumidityCard(weather) {
    const humidity = weather.humidity;
    
    let feeling = 'comfortable';
    if (humidity > 80) feeling = 'very humid';
    else if (humidity > 65) feeling = 'humid';
    else if (humidity < 30) feeling = 'dry';
    
    document.getElementById('humidityValue').textContent = `${humidity}%`;
    document.getElementById('humidityDescription').textContent = `Feels ${feeling}`;
    
    // Fake pressure and visibility for now (would need additional API)
    const pressure = 1013 + Math.floor(Math.random() * 20) - 10;
    const visibility = weather.cloudCover < 50 ? '10+ km' : '5-8 km';
    
    document.getElementById('pressureValue').textContent = `${pressure} hPa`;
    document.getElementById('visibilityValue').textContent = visibility;
  }
  
  updateSunMoonCard() {
    const now = new Date();
    const hour = now.getHours();
    
    // Calculate approximate sunrise/sunset (simplified)
    const sunrise = new Date(now);
    sunrise.setHours(6, 30, 0);
    const sunset = new Date(now);
    sunset.setHours(18, 45, 0);
    
    const isDaytime = hour >= 6 && hour < 19;
    
    // Update icon
    const iconContainer = document.getElementById('sunMoonIcon');
    if (isDaytime) {
      iconContainer.innerHTML = window.Icons.sun;
    } else {
      iconContainer.innerHTML = `
        <svg viewBox="0 0 48 48">
          <circle cx="26" cy="24" r="12" fill="none" stroke="#000" stroke-width="1.5"/>
          <circle cx="32" cy="24" r="12" fill="#fff" stroke="none"/>
          <circle cx="26" cy="24" r="12" fill="none" stroke="#000" stroke-width="1.5"/>
        </svg>
      `;
    }
    
    document.getElementById('sunMoonValue').textContent = isDaytime ? 'Daytime' : 'Nighttime';
    
    const timeUntil = isDaytime 
      ? `${Math.floor((sunset - now) / 3600000)}h until sunset`
      : `${Math.floor((sunrise.setDate(sunrise.getDate() + 1) - now) / 3600000)}h until sunrise`;
    
    document.getElementById('sunMoonDescription').textContent = timeUntil;
    
    document.getElementById('sunriseValue').textContent = '6:30 AM';
    document.getElementById('sunsetValue').textContent = '6:45 PM';
  }
  
  updateAuroraCard(aurora) {
    const kpLevels = ['Quiet', 'Quiet', 'Unsettled', 'Active', 'Active', 'Minor Storm', 'Major Storm', 'Severe Storm', 'Extreme Storm'];
    const kpText = kpLevels[Math.min(aurora.kpIndex, 8)] || 'Unknown';
    
    document.getElementById('auroraValue').textContent = `Kp ${aurora.kpIndex}`;
    document.getElementById('auroraDescription').textContent = `${kpText} — ${aurora.visibilityChance}% visible tonight`;
    
    // Render aurora animation
    const vizContainer = document.getElementById('auroraViz');
    if (vizContainer && window.renderAuroraAnimation) {
      window.renderAuroraAnimation(vizContainer, aurora.activity);
    }
    
    console.log('🌌 Aurora updated:', aurora);
  }
  
  updateMoonPhase() {
    try {
      console.log('🌙 Updating moon phase...');
      
      if (!this.moonPhase) {
        console.error('MoonPhase not initialized!');
        return;
      }
      
      const phase = this.moonPhase.calculatePhase();
      console.log('🌙 Phase calculated:', phase);
      
      const vizContainer = document.getElementById('moonPhaseViz');
      const descContainer = document.getElementById('moonDescription');
      
      if (!vizContainer) {
        console.error('moonPhaseViz container not found!');
        return;
      }
      
      if (!descContainer) {
        console.error('moonDescription container not found!');
        return;
      }
      
      vizContainer.innerHTML = this.moonPhase.renderMoonSVG(phase);
      descContainer.textContent = `${phase.illumination}% illuminated — ${phase.name}`;
      
      console.log('✅ Moon phase updated successfully');
    } catch (error) {
      console.error('Moon phase update failed:', error);
    }
  }
  
  updateFunFact(weather) {
    try {
      console.log('💡 Updating fun fact...');
      
      const facts = [
        'A single cloud can weigh more than 1 million pounds — about the weight of 100 elephants!',
        'The International Space Station orbits at 408 km altitude, completing one orbit every 90 minutes.',
        'Wind is actually just air molecules moving from high-pressure to low-pressure areas.',
        'The highest temperature ever recorded on Earth was 134°F (56.7°C) in Death Valley, California.',
        'Starlight you see tonight left its star years ago — Polaris\'s light is 433 years old when it reaches you.',
        'Humidity affects how hot or cold we feel. High humidity makes hot days feel even hotter!',
        'The Moon is slowly drifting away from Earth at about 3.8 cm per year.',
        'Clear skies aren\'t actually empty — they\'re full of invisible water vapor, air molecules, and cosmic rays.',
        'The sun\'s light takes about 8 minutes and 20 seconds to reach Earth — we see the past when we look up.',
        'Cumulonimbus clouds can tower up to 12 km high — reaching into the stratosphere!',
        'A raindrop falls at approximately 7-18 miles per hour, depending on its size.',
        'Lightning is hotter than the surface of the sun, reaching temperatures of about 30,000°C!',
        'The Big Dipper isn\'t a constellation — it\'s an asterism, part of Ursa Major (the Great Bear).',
        'The fastest wind speed ever recorded was 253 mph during Tropical Cyclone Olivia in 1996.',
        'On a clear night, you can see about 2,500 stars with your naked eye from a dark location.',
        'Clouds form when water vapor condenses onto tiny particles like dust, pollen, or even sea salt in the air.',
        'The Milky Way contains 200-400 billion stars, and you\'re looking at its edge when you see that cloudy band at night.',
        'Earth\'s atmosphere is 78% nitrogen, 21% oxygen, and 1% other gases — but that 1% includes vital CO₂ and water vapor.',
        'Jet streams are narrow bands of fast wind at 9-16 km altitude, traveling up to 400 km/h!',
        'The first weather satellite, TIROS-1, launched in 1960 and revolutionized meteorology by showing clouds from space.'
      ];
      
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      const factContainer = document.getElementById('funFact');
      
      if (!factContainer) {
        console.error('funFact container not found!');
        return;
      }
      
      factContainer.innerHTML = `<p>${randomFact}</p>`;
      console.log('✅ Fun fact updated');
    } catch (error) {
      console.error('Fun fact update failed:', error);
    }
  }
  
  updateTimeline(weather) {
    const timeline = document.getElementById('timeline');
    const now = new Date();
    const events = [];
    
    // Generate timeline events from hourly data
    for (let i = 0; i < 24; i += 3) {
      const eventTime = new Date(now.getTime() - (24 - i) * 3600000);
      const temp = Math.round(weather.hourly.temperature[i]);
      const wind = Math.round(weather.hourly.windSpeed[i]);
      const clouds = weather.hourly.cloudCover[i];
      
      let description = '';
      if (clouds > 75) description = 'overcast skies';
      else if (clouds > 50) description = 'cloudy with breaks';
      else if (clouds > 25) description = 'scattered clouds';
      else description = 'clear skies';
      
      if (wind > 20) description += ', windy';
      
      events.push({
        time: eventTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        description
      });
    }
    
    // Render timeline
    timeline.innerHTML = events.map(event => `
      <div class="timeline-item fade-in">
        <div class="timeline-dot"></div>
        <div class="timeline-time">${event.time}</div>
        <div class="timeline-description">${event.description}</div>
      </div>
    `).join('');
  }
  
  openRitualModal() {
    const modal = document.getElementById('ritualModal');
    modal.classList.add('active');
    
    // Play gentle chime
    this.soundscape.playChime();
    
    // Re-trigger typewriter effect
    this.typewriterEffect();
  }
  
  typewriterEffect() {
    const title = document.getElementById('ritualTitle');
    const text = "Today's Reflection";
    
    // Clear and restart
    title.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${index * 0.05}s`;
      title.appendChild(span);
    });
  }
  
  saveReflection() {
    const input = document.getElementById('ritualInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    // Get current weather for context
    const weather = {
      temperature: document.getElementById('tempValue').textContent,
      sky: document.getElementById('skyValue').textContent,
      wind: document.getElementById('windDescription').textContent
    };
    
    // Save reflection
    const reflections = JSON.parse(localStorage.getItem('skyMirrorReflections') || '[]');
    reflections.unshift({
      date: new Date().toISOString(),
      text: text,
      weather: weather
    });
    
    // Keep only last 50 reflections
    if (reflections.length > 50) {
      reflections.length = 50;
    }
    
    localStorage.setItem('skyMirrorReflections', JSON.stringify(reflections));
    
    // Clear input and close modal
    input.value = '';
    document.getElementById('ritualModal').classList.remove('active');
    
    // Show success animation (floating cloud)
    this.showSuccessAnimation();
    
    console.log('💭 Reflection saved');
  }
  
  showSuccessAnimation() {
    // Simple fade-out on banner
    const banner = document.getElementById('ritualBanner');
    banner.style.opacity = '0.5';
    setTimeout(() => {
      banner.style.opacity = '1';
    }, 1000);
  }
  
  showReflections() {
    const reflections = JSON.parse(localStorage.getItem('skyMirrorReflections') || '[]');
    const container = document.getElementById('reflectionsList');
    
    if (reflections.length === 0) {
      container.innerHTML = `
        <p style="text-align: center; opacity: 0.5; padding: 3rem 0;">
          No reflections yet. Start by capturing today's sky.
        </p>
      `;
    } else {
      container.innerHTML = reflections.map(reflection => {
        const date = new Date(reflection.date);
        const dateStr = date.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        });
        
        return `
          <div class="reflection-item fade-in">
            <div class="reflection-date">${dateStr}</div>
            <div class="reflection-text">${reflection.text}</div>
            ${reflection.weather ? `
              <div style="margin-top: 0.75rem; font-size: 0.85rem; opacity: 0.5;">
                ${reflection.weather.temperature} · ${reflection.weather.sky} · ${reflection.weather.wind}
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }
    
    document.getElementById('notesModal').classList.add('active');
  }
  
  showLoading() {
    document.getElementById('loading').classList.remove('hidden');
  }
  
  hideLoading() {
    document.getElementById('loading').classList.add('hidden');
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.skyMirror = new SkyMirror();
  });
} else {
  window.skyMirror = new SkyMirror();
}

// Export for window
window.SkyMirror = SkyMirror;
