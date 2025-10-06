// Hand-drawn SVG Icons
// Line art, slightly imperfect style

const Icons = {
  wind: `
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <!-- Wind swirl -->
      <path d="M 8 20 Q 15 15, 24 20 Q 33 25, 40 20" 
            fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 6 28 Q 13 23, 22 28 Q 31 33, 38 28" 
            fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 10 36 Q 17 31, 26 36 Q 35 41, 42 36" 
            fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
  
  sun: `
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <!-- Sun circle -->
      <circle cx="24" cy="24" r="8" fill="none" stroke="#000" stroke-width="1.5"/>
      <!-- Rays -->
      <line x1="24" y1="4" x2="24" y2="10" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="24" y1="38" x2="24" y2="44" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="4" y1="24" x2="10" y2="24" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="38" y1="24" x2="44" y2="24" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="10" y1="10" x2="14" y2="14" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="34" y1="34" x2="38" y2="38" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="34" y1="14" x2="38" y2="10" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="10" y1="38" x2="14" y2="34" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
  
  thermometer: `
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <!-- Thermometer bulb -->
      <circle cx="24" cy="36" r="6" fill="none" stroke="#000" stroke-width="1.5"/>
      <!-- Tube -->
      <rect x="20" y="10" width="8" height="26" rx="4" fill="none" stroke="#000" stroke-width="1.5"/>
      <!-- Mercury -->
      <line x1="24" y1="32" x2="24" y2="16" stroke="#000" stroke-width="2"/>
      <!-- Marks -->
      <line x1="28" y1="14" x2="31" y2="14" stroke="#000" stroke-width="1"/>
      <line x1="28" y1="20" x2="30" y2="20" stroke="#000" stroke-width="1"/>
      <line x1="28" y1="26" x2="31" y2="26" stroke="#000" stroke-width="1"/>
    </svg>
  `,
  
  leaf: `
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <!-- Leaf outline -->
      <path d="M 24 8 Q 38 14, 40 28 Q 38 38, 24 40 Q 10 38, 8 28 Q 10 14, 24 8 Z" 
            fill="none" stroke="#000" stroke-width="1.5"/>
      <!-- Leaf vein -->
      <line x1="24" y1="10" x2="24" y2="38" stroke="#000" stroke-width="1"/>
      <!-- Side veins -->
      <path d="M 24 18 Q 28 20, 32 24" fill="none" stroke="#000" stroke-width="0.8"/>
      <path d="M 24 24 Q 29 26, 34 30" fill="none" stroke="#000" stroke-width="0.8"/>
      <path d="M 24 18 Q 20 20, 16 24" fill="none" stroke="#000" stroke-width="0.8"/>
      <path d="M 24 24 Q 19 26, 14 30" fill="none" stroke="#000" stroke-width="0.8"/>
    </svg>
  `,
  
  cloud: `
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <!-- Cloud shape -->
      <path d="M 12 28 Q 12 22 16 20 Q 18 16 22 16 Q 26 14 30 16 Q 34 18 36 22 Q 40 22 40 28 Q 40 32 36 32 L 16 32 Q 12 32 12 28 Z" 
            fill="none" stroke="#000" stroke-width="1.5"/>
      <!-- Inner detail -->
      <path d="M 16 26 Q 20 24 24 26 Q 28 28 32 26" 
            fill="none" stroke="#000" stroke-width="0.8" opacity="0.5"/>
    </svg>
  `,
  
  droplet: `
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <!-- Water droplet -->
      <path d="M 24 8 Q 16 20, 16 28 Q 16 36, 24 40 Q 32 36, 32 28 Q 32 20, 24 8 Z" 
            fill="none" stroke="#000" stroke-width="1.5"/>
      <!-- Highlight -->
      <ellipse cx="21" cy="22" rx="3" ry="5" fill="none" stroke="#000" stroke-width="0.8" opacity="0.4"/>
    </svg>
  `
};

// Function to inject icons into DOM
function loadIcons() {
  const iconMap = {
    windIcon: 'wind',
    tempIcon: 'sun',
    airIcon: 'leaf',
    skyIcon: 'cloud'
  };
  
  Object.entries(iconMap).forEach(([elementId, iconName]) => {
    const element = document.getElementById(elementId);
    if (element && Icons[iconName]) {
      element.innerHTML = Icons[iconName];
    }
  });
}

// Load icons when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadIcons);
} else {
  loadIcons();
}

// Export for use in other scripts
window.Icons = Icons;

