// Aurora & Solar Activity System
// NOAA SWPC integration

class AuroraAPI {
  constructor() {
    // NOAA Space Weather Prediction Center
    this.swpcUrl = 'https://services.swpc.noaa.gov/json';
  }
  
  async getSolarActivity() {
    try {
      // Get solar wind data
      const response = await fetch(`${this.swpcUrl}/rtsw/rtsw_mag_1m.json`);
      const data = await response.json();
      
      // Get most recent reading
      const latest = data[data.length - 1];
      
      // Parse solar activity
      const bt = Math.abs(parseFloat(latest.bt) || 0);
      const bz = parseFloat(latest.bz_gsm) || 0;
      
      let activity = 'calm';
      let kpIndex = 1;
      
      if (bt > 15) {
        activity = 'active';
        kpIndex = 5;
      } else if (bt > 10) {
        activity = 'moderate';
        kpIndex = 3;
      }
      
      return {
        activity,
        kpIndex,
        magneticField: bt.toFixed(1),
        bzComponent: bz.toFixed(1),
        auroraVisible: kpIndex >= 5
      };
    } catch (error) {
      console.warn('Solar activity fetch failed, using fallback');
      return this.getFallbackData();
    }
  }
  
  async getAuroraForecast(lat) {
    // Estimate aurora visibility based on latitude and Kp index
    const solar = await this.getSolarActivity();
    
    const absLat = Math.abs(lat);
    let visibilityChance = 0;
    
    if (solar.kpIndex >= 7 && absLat > 40) visibilityChance = 70;
    else if (solar.kpIndex >= 5 && absLat > 50) visibilityChance = 50;
    else if (solar.kpIndex >= 3 && absLat > 60) visibilityChance = 30;
    else if (absLat > 65) visibilityChance = 15;
    
    return {
      ...solar,
      latitude: lat,
      visibilityChance,
      recommendation: this.getRecommendation(visibilityChance, solar.kpIndex)
    };
  }
  
  getRecommendation(chance, kp) {
    if (chance > 60) return 'High chance tonight! Head somewhere dark.';
    if (chance > 30) return 'Moderate chance. Watch the northern horizon.';
    if (kp > 5) return 'Active sun, but you\'re too far south to see auroras.';
    return 'Quiet skies tonight. Enjoy the stars instead.';
  }
  
  getFallbackData() {
    return {
      activity: 'calm',
      kpIndex: 2,
      magneticField: '5.2',
      bzComponent: '2.1',
      auroraVisible: false
    };
  }
}

// Aurora visualization
function renderAuroraAnimation(container, activity) {
  const intensity = activity === 'active' ? 1 : activity === 'moderate' ? 0.6 : 0.3;
  
  const svg = `
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Aurora curtains -->
      <g opacity="${intensity}">
        <path class="aurora-wave" d="M 0 100 Q 50 ${80 - Math.random()*20} 100 ${100 - Math.random()*30} T 200 ${90 - Math.random()*20} T 300 100" 
              fill="none" stroke="#A3C4F3" stroke-width="2" opacity="0.6"/>
        <path class="aurora-wave" d="M 0 110 Q 50 ${90 - Math.random()*20} 100 ${110 - Math.random()*30} T 200 ${100 - Math.random()*20} T 300 110" 
              fill="none" stroke="#B5EAD7" stroke-width="2" opacity="0.5" style="animation-delay: 0.5s;"/>
        <path class="aurora-wave" d="M 0 120 Q 50 ${100 - Math.random()*20} 100 ${120 - Math.random()*30} T 200 ${110 - Math.random()*20} T 300 120" 
              fill="none" stroke="#C8BFE7" stroke-width="2" opacity="0.4" style="animation-delay: 1s;"/>
      </g>
      
      <!-- Stars -->
      <circle cx="50" cy="40" r="1" fill="#000"/>
      <circle cx="120" cy="30" r="1" fill="#000"/>
      <circle cx="200" cy="45" r="1" fill="#000"/>
      <circle cx="270" cy="35" r="1" fill="#000"/>
      
      <!-- Horizon -->
      <line x1="0" y1="160" x2="300" y2="160" stroke="#000" stroke-width="1"/>
      
      <!-- Activity indicator -->
      <text x="150" y="190" font-family="monospace" font-size="10" fill="#000" text-anchor="middle" opacity="0.6">
        Solar activity: ${activity}
      </text>
      
      <style>
        .aurora-wave {
          animation: auroraShimmer 3s ease-in-out infinite;
        }
        @keyframes auroraShimmer {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-5px) scaleY(1.1); }
        }
      </style>
    </svg>
  `;
  
  container.innerHTML = svg;
}

// Export
window.AuroraAPI = AuroraAPI;
window.renderAuroraAnimation = renderAuroraAnimation;

