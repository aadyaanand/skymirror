// Moon Phase Calculator

class MoonPhase {
  calculatePhase(date = new Date()) {
    // Simplified moon phase calculation
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    let c, e, jd, b;
    
    if (month < 3) {
      year--;
      month += 12;
    }
    
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);
    
    if (b >= 8) b = 0;
    
    const phases = [
      { name: 'New Moon', emoji: '🌑', illumination: 0 },
      { name: 'Waxing Crescent', emoji: '🌒', illumination: 15 },
      { name: 'First Quarter', emoji: '🌓', illumination: 50 },
      { name: 'Waxing Gibbous', emoji: '🌔', illumination: 75 },
      { name: 'Full Moon', emoji: '🌕', illumination: 100 },
      { name: 'Waning Gibbous', emoji: '🌖', illumination: 75 },
      { name: 'Last Quarter', emoji: '🌗', illumination: 50 },
      { name: 'Waning Crescent', emoji: '🌘', illumination: 15 }
    ];
    
    console.log('🌙 Calculated phase index:', b, 'Phase:', phases[b]);
    return phases[b];
  }
  
  renderMoonSVG(phase) {
    const illumination = phase.illumination;
    
    console.log('🌙 Rendering moon SVG for:', phase.name, 'illumination:', illumination);
    
    return `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="width: 120px; height: 120px;">
        <!-- Moon circle -->
        <circle cx="60" cy="60" r="45" fill="#fff" stroke="#000" stroke-width="2"/>
        
        <!-- Shadow for phase -->
        ${illumination < 100 ? `
          <ellipse cx="${60 + (50 - illumination) * 0.5}" cy="60" rx="${(100 - illumination) * 0.45}" ry="45" fill="#000" opacity="0.7"/>
        ` : ''}
        
        <!-- Craters -->
        <circle cx="55" cy="55" r="5" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
        <circle cx="68" cy="62" r="3" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
        <circle cx="58" cy="70" r="4" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
        
        <!-- Outer circle -->
        <circle cx="60" cy="60" r="45" fill="none" stroke="#000" stroke-width="2"/>
        
        <!-- Label -->
        <text x="60" y="115" font-family="monospace" font-size="10" fill="#000" text-anchor="middle">${phase.emoji} ${phase.name}</text>
      </svg>
    `;
  }
}

// Export
window.MoonPhase = MoonPhase;

