// Cute Line-Art Character SVGs for Perspectives

const CharacterIllustrations = {
  farmer: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- Hat -->
      <ellipse cx="100" cy="50" rx="45" ry="12" fill="none" stroke="#F9A826" stroke-width="2"/>
      <ellipse cx="100" cy="45" rx="30" ry="15" fill="none" stroke="#F9A826" stroke-width="2"/>
      
      <!-- Face -->
      <circle cx="100" cy="80" r="35" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Eyes -->
      <circle cx="88" cy="75" r="4" fill="#000"/>
      <circle cx="112" cy="75" r="4" fill="#000"/>
      
      <!-- Smile -->
      <path d="M 85 90 Q 100 100 115 90" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Body -->
      <rect x="70" y="110" width="60" height="60" fill="none" stroke="#000" stroke-width="2" rx="5"/>
      
      <!-- Overalls straps -->
      <line x1="85" y1="110" x2="85" y2="90" stroke="#A3C4F3" stroke-width="3"/>
      <line x1="115" y1="110" x2="115" y2="90" stroke="#A3C4F3" stroke-width="3"/>
      
      <!-- Arms -->
      <line x1="70" y1="125" x2="50" y2="140" stroke="#000" stroke-width="2"/>
      <line x1="130" y1="125" x2="150" y2="140" stroke="#000" stroke-width="2"/>
      
      <!-- Tractor (tiny) -->
      <circle cx="45" cy="150" r="8" fill="none" stroke="#B5EAD7" stroke-width="2"/>
      <rect x="38" y="138" width="14" height="8" fill="none" stroke="#B5EAD7" stroke-width="2"/>
    </svg>
  `,
  
  pilot: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- Pilot cap -->
      <ellipse cx="100" cy="52" rx="38" ry="10" fill="none" stroke="#A3C4F3" stroke-width="2"/>
      <path d="M 70 52 Q 100 40 130 52" fill="none" stroke="#A3C4F3" stroke-width="2"/>
      
      <!-- Face -->
      <circle cx="100" cy="85" r="32" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Aviator sunglasses -->
      <ellipse cx="88" cy="80" rx="12" ry="8" fill="none" stroke="#000" stroke-width="2"/>
      <ellipse cx="112" cy="80" rx="12" ry="8" fill="none" stroke="#000" stroke-width="2"/>
      <line x1="100" y1="80" x2="100" y2="80" stroke="#000" stroke-width="2"/>
      
      <!-- Smile -->
      <path d="M 85 95 Q 100 102 115 95" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Body/Uniform -->
      <rect x="72" y="115" width="56" height="50" fill="none" stroke="#000" stroke-width="2" rx="5"/>
      
      <!-- Wings badge -->
      <path d="M 85 130 L 80 135 L 85 140 L 100 135 L 115 140 L 120 135 L 115 130 Z" fill="none" stroke="#F9A826" stroke-width="1.5"/>
      
      <!-- Airplane (tiny) -->
      <path d="M 140 150 L 155 145 L 165 150 M 155 145 L 155 155" stroke="#C8BFE7" stroke-width="2" fill="none"/>
    </svg>
  `,
  
  astronaut: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- Helmet -->
      <circle cx="100" cy="80" r="42" fill="none" stroke="#A3C4F3" stroke-width="3"/>
      <ellipse cx="100" cy="80" rx="38" ry="35" fill="rgba(163,196,243,0.1)"/>
      
      <!-- Face through helmet -->
      <circle cx="92" cy="75" r="3" fill="#000"/>
      <circle cx="108" cy="75" r="3" fill="#000"/>
      <path d="M 90 88 Q 100 93 110 88" fill="none" stroke="#000" stroke-width="1.5"/>
      
      <!-- Spacesuit -->
      <rect x="65" y="118" width="70" height="60" fill="none" stroke="#000" stroke-width="2" rx="8"/>
      
      <!-- NASA patch -->
      <circle cx="85" cy="140" r="8" fill="none" stroke="#F9A826" stroke-width="1.5"/>
      <text x="85" y="144" font-size="8" fill="#F9A826" text-anchor="middle" font-weight="bold">★</text>
      
      <!-- Life support -->
      <rect x="120" y="128" width="12" height="20" fill="none" stroke="#B5EAD7" stroke-width="1.5" rx="2"/>
      
      <!-- Stars around -->
      <circle cx="30" cy="40" r="2" fill="#F9A826"/>
      <circle cx="170" cy="60" r="2" fill="#C8BFE7"/>
      <circle cx="50" cy="150" r="2" fill="#B5EAD7"/>
      <circle cx="160" cy="140" r="2" fill="#A3C4F3"/>
    </svg>
  `,
  
  powerGrid: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- Hard hat -->
      <ellipse cx="100" cy="48" rx="38" ry="12" fill="none" stroke="#F9A826" stroke-width="2"/>
      <path d="M 68 48 Q 100 35 132 48" fill="rgba(249,168,38,0.1)" stroke="#F9A826" stroke-width="2"/>
      
      <!-- Face -->
      <circle cx="100" cy="85" r="30" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Eyes -->
      <circle cx="90" cy="80" r="4" fill="#000"/>
      <circle cx="110" cy="80" r="4" fill="#000"/>
      
      <!-- Smile -->
      <path d="M 88 95 Q 100 103 112 95" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Body/Vest -->
      <rect x="73" y="112" width="54" height="48" fill="none" stroke="#000" stroke-width="2" rx="5"/>
      <line x1="100" y1="112" x2="100" y2="160" stroke="#F9A826" stroke-width="2"/>
      
      <!-- Lightning bolt -->
      <path d="M 145 135 L 135 145 L 142 145 L 132 160 L 145 148 L 138 148 Z" fill="#F9A826" stroke="#000" stroke-width="1.5"/>
      
      <!-- Power tower (tiny) -->
      <line x1="50" y1="150" x2="50" y2="170" stroke="#C8BFE7" stroke-width="2"/>
      <line x1="45" y1="155" x2="55" y2="155" stroke="#C8BFE7" stroke-width="1.5"/>
    </svg>
  `,
  
  engineer: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- Hair -->
      <path d="M 75 55 Q 100 45 125 55" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Face -->
      <circle cx="100" cy="80" r="32" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Glasses -->
      <circle cx="88" cy="75" r="10" fill="none" stroke="#000" stroke-width="2"/>
      <circle cx="112" cy="75" r="10" fill="none" stroke="#000" stroke-width="2"/>
      <line x1="98" y1="75" x2="102" y2="75" stroke="#000" stroke-width="2"/>
      
      <!-- Smile -->
      <path d="M 87 92 Q 100 98 113 92" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Lab coat -->
      <rect x="70" y="110" width="60" height="55" fill="none" stroke="#000" stroke-width="2" rx="5"/>
      <line x1="100" y1="110" x2="100" y2="165" stroke="#000" stroke-width="1"/>
      
      <!-- Pocket with pen -->
      <rect x="75" y="120" width="15" height="12" fill="none" stroke="#A3C4F3" stroke-width="1.5"/>
      <line x1="82" y1="120" x2="82" y2="115" stroke="#F9A826" stroke-width="2"/>
      
      <!-- Satellite (tiny) -->
      <rect x="140" y="135" width="12" height="8" fill="none" stroke="#C8BFE7" stroke-width="1.5"/>
      <line x1="140" y1="139" x2="133" y2="139" stroke="#C8BFE7" stroke-width="1.5"/>
      <line x1="152" y1="139" x2="159" y2="139" stroke="#C8BFE7" stroke-width="1.5"/>
    </svg>
  `,
  
  fisherman: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- Captain hat -->
      <ellipse cx="100" cy="55" rx="40" ry="10" fill="none" stroke="#000" stroke-width="2"/>
      <rect x="85" y="48" width="30" height="8" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Face -->
      <circle cx="100" cy="85" r="30" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Beard -->
      <path d="M 75 100 Q 100 115 125 100" fill="rgba(0,0,0,0.1)" stroke="#000" stroke-width="1.5"/>
      
      <!-- Eyes -->
      <circle cx="90" cy="80" r="4" fill="#000"/>
      <circle cx="110" cy="80" r="4" fill="#000"/>
      
      <!-- Smile -->
      <path d="M 88 92 Q 100 97 112 92" fill="none" stroke="#000" stroke-width="1.5"/>
      
      <!-- Sweater/Jacket -->
      <rect x="72" y="113" width="56" height="50" fill="none" stroke="#000" stroke-width="2" rx="5"/>
      <path d="M 72 125 L 128 125" stroke="#A3C4F3" stroke-width="1.5" stroke-dasharray="4,4"/>
      
      <!-- Fish (tiny) -->
      <ellipse cx="145" cy="145" rx="15" ry="8" fill="none" stroke="#B5EAD7" stroke-width="2"/>
      <path d="M 160 145 L 168 140 L 168 150 Z" fill="none" stroke="#B5EAD7" stroke-width="2"/>
      
      <!-- Waves -->
      <path d="M 30 175 Q 40 170 50 175 Q 60 180 70 175" fill="none" stroke="#A3C4F3" stroke-width="1.5"/>
    </svg>
  `,
  
  solarFlare: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- Sun core -->
      <circle cx="100" cy="100" r="40" fill="rgba(249,168,38,0.2)" stroke="#F9A826" stroke-width="3"/>
      
      <!-- Sun rays (animated feel) -->
      <line x1="100" y1="40" x2="100" y2="20" stroke="#F9A826" stroke-width="3" stroke-linecap="round"/>
      <line x1="100" y1="160" x2="100" y2="180" stroke="#F9A826" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="100" x2="20" y2="100" stroke="#F9A826" stroke-width="3" stroke-linecap="round"/>
      <line x1="160" y1="100" x2="180" y2="100" stroke="#F9A826" stroke-width="3" stroke-linecap="round"/>
      
      <line x1="60" y1="60" x2="45" y2="45" stroke="#F9A826" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="140" y1="60" x2="155" y2="45" stroke="#F9A826" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="140" x2="45" y2="155" stroke="#F9A826" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="140" y1="140" x2="155" y2="155" stroke="#F9A826" stroke-width="2.5" stroke-linecap="round"/>
      
      <!-- Happy face -->
      <circle cx="88" cy="95" r="5" fill="#000"/>
      <circle cx="112" cy="95" r="5" fill="#000"/>
      <path d="M 85 110 Q 100 120 115 110" fill="none" stroke="#000" stroke-width="3"/>
      
      <!-- CME burst -->
      <path d="M 100 60 Q 120 50 140 40" fill="none" stroke="#C8BFE7" stroke-width="2" stroke-dasharray="5,5"/>
      <circle cx="140" cy="40" r="3" fill="#C8BFE7"/>
    </svg>
  `,
  
  radioOperator: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- Headphones -->
      <path d="M 70 70 Q 70 50 100 50 Q 130 50 130 70" fill="none" stroke="#000" stroke-width="3"/>
      <rect x="65" y="70" width="12" height="20" fill="rgba(163,196,243,0.2)" stroke="#000" stroke-width="2" rx="3"/>
      <rect x="123" y="70" width="12" height="20" fill="rgba(163,196,243,0.2)" stroke="#000" stroke-width="2" rx="3"/>
      
      <!-- Face -->
      <circle cx="100" cy="90" r="28" fill="none" stroke="#000" stroke-width="2"/>
      
      <!-- Eyes -->
      <circle cx="90" cy="85" r="4" fill="#000"/>
      <circle cx="110" cy="85" r="4" fill="#000"/>
      
      <!-- Focused expression -->
      <line x1="88" y1="100" x2="112" y2="100" stroke="#000" stroke-width="2"/>
      
      <!-- Body -->
      <rect x="75" y="115" width="50" height="45" fill="none" stroke="#000" stroke-width="2" rx="5"/>
      
      <!-- Radio equipment -->
      <rect x="135" y="125" width="25" height="20" fill="none" stroke="#B5EAD7" stroke-width="2" rx="2"/>
      <circle cx="145" cy="135" r="3" fill="#B5EAD7"/>
      <circle cx="153" cy="135" r="3" fill="#B5EAD7"/>
      
      <!-- Radio waves -->
      <path d="M 160 125 Q 170 120 175 125" fill="none" stroke="#C8BFE7" stroke-width="1.5"/>
      <path d="M 160 130 Q 172 127 178 130" fill="none" stroke="#C8BFE7" stroke-width="1.5"/>
    </svg>
  `
};

window.CharacterIllustrations = CharacterIllustrations;

