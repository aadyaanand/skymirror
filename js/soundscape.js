// Sky Soundscape System
// Convert weather data into ambient audio

class SkySoundscape {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gains = [];
  }
  
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  
  async play(weather) {
    this.init();
    
    if (this.isPlaying) {
      this.stop();
    }
    
    this.isPlaying = true;
    
    // Create soundscape based on weather
    this.createWindSound(weather.windSpeed);
    this.createRainSound(weather.precipitation);
    this.createAtmosphereSound(weather.cloudCover);
    
    console.log('🎵 Soundscape playing');
  }
  
  createWindSound(windSpeed) {
    if (windSpeed < 5) return;
    
    // Wind as filtered noise
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200 + windSpeed * 20;
    
    const gain = this.audioContext.createGain();
    gain.gain.value = Math.min(windSpeed / 100, 0.15);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioContext.destination);
    
    noise.start();
    this.oscillators.push(noise);
    this.gains.push(gain);
  }
  
  createRainSound(precipitation) {
    if (precipitation < 0.1) return;
    
    // Rain as rhythmic noise bursts
    const interval = setInterval(() => {
      if (!this.isPlaying) {
        clearInterval(interval);
        return;
      }
      
      const osc = this.audioContext.createOscillator();
      osc.frequency.value = 100 + Math.random() * 200;
      
      const gain = this.audioContext.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(precipitation * 0.05, this.audioContext.currentTime + 0.01);
      gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.05);
    }, 50);
  }
  
  createAtmosphereSound(cloudCover) {
    // Atmospheric drone based on cloud cover
    const osc = this.audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 110 - cloudCover * 0.3; // Lower frequency for more clouds
    
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.02;
    
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    
    osc.start();
    this.oscillators.push(osc);
    this.gains.push(gain);
  }
  
  playChime() {
    this.init();
    
    // Gentle chime for ritual mode
    const osc = this.audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 528; // "Miracle tone"
    
    const gain = this.audioContext.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2);
    
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 2);
  }
  
  stop() {
    this.oscillators.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    this.gains.forEach(g => {
      g.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
    });
    this.oscillators = [];
    this.gains = [];
    this.isPlaying = false;
    console.log('🔇 Soundscape stopped');
  }
}

// Export
window.SkySoundscape = SkySoundscape;

