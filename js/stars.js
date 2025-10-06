// Star Scene System - Complete Rewrite
// Ensures scenes always load

// Scene Illustrations
const SCENES = {
  day: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <!-- Sun (clickable) -->
    <g class="star" data-star="sun" style="cursor: pointer;">
      <circle cx="200" cy="100" r="40" fill="none" stroke="#000" stroke-width="2"/>
      <line x1="200" y1="40" x2="200" y2="20" stroke="#000" stroke-width="2"/>
      <line x1="200" y1="180" x2="200" y2="160" stroke="#000" stroke-width="2"/>
      <line x1="140" y1="100" x2="120" y2="100" stroke="#000" stroke-width="2"/>
      <line x1="280" y1="100" x2="260" y2="100" stroke="#000" stroke-width="2"/>
      <line x1="171" y1="71" x2="157" y2="57" stroke="#000" stroke-width="2"/>
      <line x1="229" y1="129" x2="243" y2="143" stroke="#000" stroke-width="2"/>
      <line x1="229" y1="71" x2="243" y2="57" stroke="#000" stroke-width="2"/>
      <line x1="171" y1="129" x2="157" y2="143" stroke="#000" stroke-width="2"/>
      <text x="200" y="155" font-size="10" fill="#000" text-anchor="middle">☉ Sol</text>
    </g>
    
    <!-- ISS (clickable) -->
    <g class="star" data-star="iss" style="cursor: pointer;">
      <rect x="318" y="78" width="8" height="4" fill="none" stroke="#000" stroke-width="1"/>
      <line x1="314" y1="80" x2="318" y2="80" stroke="#000" stroke-width="1"/>
      <line x1="326" y1="80" x2="330" y2="80" stroke="#000" stroke-width="1"/>
      <text x="335" y="82" font-size="8" fill="#000">ISS</text>
    </g>
    
    <!-- Orbit path -->
    <ellipse cx="200" cy="150" rx="120" ry="70" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="4,4" opacity="0.3"/>
    
    <!-- Stars (faint in daytime) -->
    <circle class="star" data-star="sirius" cx="80" cy="50" r="2" fill="#000" opacity="0.2" style="cursor: pointer;"/>
    <text x="70" y="45" font-size="7" fill="#000" opacity="0.3">Sirius</text>
    
    <circle class="star" data-star="vega" cx="340" cy="60" r="1.5" fill="#000" opacity="0.2" style="cursor: pointer;"/>
    <text x="330" y="55" font-size="7" fill="#000" opacity="0.3">Vega</text>
    
    <text x="200" y="290" font-size="9" fill="#000" text-anchor="middle" opacity="0.5">Click stars for their stories</text>
  </svg>`,
  
  night: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <!-- Moon (clickable) -->
    <g class="star" data-star="moon" style="cursor: pointer;">
      <circle cx="80" cy="60" r="25" fill="none" stroke="#000" stroke-width="2"/>
      <circle cx="90" cy="60" r="25" fill="#fff" stroke="none"/>
      <circle cx="80" cy="60" r="25" fill="none" stroke="#000" stroke-width="2"/>
      <circle cx="77" cy="55" r="4" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
      <circle cx="85" cy="62" r="3" fill="none" stroke="#000" stroke-width="0.8" opacity="0.3"/>
      <text x="80" y="95" font-size="9" fill="#000" text-anchor="middle">Luna</text>
    </g>
    
    <!-- Big Dipper -->
    <circle class="star" data-star="dubhe" cx="220" cy="60" r="2.5" fill="#000" style="cursor: pointer;"/>
    <circle class="star" data-star="merak" cx="235" cy="55" r="2.5" fill="#000" style="cursor: pointer;"/>
    <circle class="star" data-star="phecda" cx="250" cy="60" r="2.5" fill="#000" style="cursor: pointer;"/>
    <circle class="star" data-star="megrez" cx="258" cy="70" r="2.5" fill="#000" style="cursor: pointer;"/>
    <circle class="star" data-star="alioth" cx="255" cy="82" r="2.5" fill="#000" style="cursor: pointer;"/>
    <circle class="star" data-star="mizar" cx="245" cy="80" r="2.5" fill="#000" style="cursor: pointer;"/>
    <circle class="star" data-star="alkaid" cx="235" cy="75" r="2.5" fill="#000" style="cursor: pointer;"/>
    <line x1="220" y1="60" x2="235" y2="55" stroke="#000" stroke-width="0.5" opacity="0.3"/>
    <line x1="235" y1="55" x2="250" y2="60" stroke="#000" stroke-width="0.5" opacity="0.3"/>
    <line x1="250" y1="60" x2="258" y2="70" stroke="#000" stroke-width="0.5" opacity="0.3"/>
    <line x1="258" y1="70" x2="255" y2="82" stroke="#000" stroke-width="0.5" opacity="0.3"/>
    <line x1="255" y1="82" x2="245" y2="80" stroke="#000" stroke-width="0.5" opacity="0.3"/>
    <line x1="245" y1="80" x2="235" y2="75" stroke="#000" stroke-width="0.5" opacity="0.3"/>
    <line x1="235" y1="75" x2="220" y2="60" stroke="#000" stroke-width="0.5" opacity="0.3"/>
    <text x="240" y="100" font-size="8" fill="#000" text-anchor="middle">Ursa Major</text>
    
    <!-- Orion's Belt -->
    <circle class="star" data-star="alnitak" cx="150" cy="160" r="2.5" fill="#000" style="cursor: pointer;"/>
    <circle class="star" data-star="alnilam" cx="165" cy="158" r="2.5" fill="#000" style="cursor: pointer;"/>
    <circle class="star" data-star="mintaka" cx="180" cy="160" r="2.5" fill="#000" style="cursor: pointer;"/>
    <line x1="150" y1="160" x2="165" y2="158" stroke="#000" stroke-width="0.5" opacity="0.3"/>
    <line x1="165" y1="158" x2="180" y2="160" stroke="#000" stroke-width="0.5" opacity="0.3"/>
    <text x="165" y="178" font-size="8" fill="#000" text-anchor="middle">Orion's Belt</text>
    
    <!-- Bright stars -->
    <circle class="star" data-star="sirius" cx="60" cy="150" r="3" fill="#000" style="cursor: pointer;"/>
    <text x="50" y="145" font-size="8" fill="#000">Sirius</text>
    
    <circle class="star" data-star="vega" cx="330" cy="110" r="2.5" fill="#000" style="cursor: pointer;"/>
    <text x="320" y="105" font-size="8" fill="#000">Vega</text>
    
    <circle class="star" data-star="rigel" cx="310" cy="190" r="2.5" fill="#000" style="cursor: pointer;"/>
    <text x="300" y="185" font-size="8" fill="#000">Rigel</text>
    
    <circle class="star" data-star="betelgeuse" cx="130" cy="135" r="2.5" fill="#000" style="cursor: pointer;"/>
    <text x="115" y="130" font-size="7" fill="#000">Betelgeuse</text>
    
    <!-- Small stars -->
    <circle class="star" data-star="polaris" cx="200" cy="30" r="2" fill="#000" style="cursor: pointer;"/>
    <text x="190" y="25" font-size="7" fill="#000">Polaris ⭐</text>
    
    <circle cx="90" cy="120" r="1" fill="#000"/>
    <circle cx="280" cy="130" r="1" fill="#000"/>
    <circle cx="350" cy="170" r="1" fill="#000"/>
    <circle cx="140" cy="220" r="1" fill="#000"/>
    
    <!-- Milky Way -->
    <ellipse cx="200" cy="200" rx="150" ry="30" fill="none" stroke="#000" stroke-width="0.5" opacity="0.1" stroke-dasharray="4,2"/>
    
    <text x="200" y="290" font-size="9" fill="#000" text-anchor="middle" opacity="0.5">Click any star to explore</text>
  </svg>`
};

// Star Data with Stories
const STAR_INFO = {
  sun: {
    name: 'Sol (The Sun)',
    info: 'G-type Yellow Dwarf • 93 million miles • 4.6 billion years old',
    story: `Every culture has worshipped this star. Ancient Egyptians called it Ra, riding his solar barque across the sky.

This ordinary yellow star happened to form in exactly the right place with exactly the right mass to warm a small rocky planet at exactly the right distance for water to stay liquid. That accident created you.

When you feel sunshine on your skin, you're touching photons that began their journey at the Sun's core 100,000 years ago, bouncing through dense plasma before finally escaping to cross space in 8 minutes.

You are made of sunlight, transformed by plants into food, into flesh. Every atom heavier than hydrogen was forged in a dying star billions of years ago. You are, quite literally, starstuff contemplating itself.`
  },
  
  moon: {
    name: 'Luna (The Moon)',
    info: 'Natural Satellite • 238,855 miles • 4.5 billion years old',
    story: `The Moon was born in violence. 4.5 billion years ago, a Mars-sized planet called Theia slammed into proto-Earth at 9,000 mph. The collision vaporized both worlds. What re-condensed became Earth and its companion.

That face never changes because the Moon is tidally locked. Ancient craters billions of years old remain pristine. When Apollo astronauts landed in 1969, their footprints will last 100 million years.

The Moon is drifting away at 1.5 inches per year. Dinosaurs saw massive eclipses we'll never witness. In the deep future, our descendants won't see total solar eclipses at all.

Right now, the Moon appears exactly the same size as the Sun in our sky. Pure coincidence — and it gives us the universe's most perfect eclipses.`
  },
  
  iss: {
    name: 'International Space Station',
    info: 'Space Station • 408 km altitude • Launched 1998',
    story: `In 1998, the first two modules met in orbit — one Russian, one American, former Cold War enemies now building together.

Humans have lived continuously on the ISS since November 2, 2000. As you read this, people are floating above you, orbiting Earth every 90 minutes, watching 16 sunrises per day.

On a clear night, you can see it with your naked eye — a bright light moving faster than any plane. The most expensive thing humans have ever built: a $150 billion monument to cooperation, floating in the void.`
  },
  
  sirius: {
    name: 'Sirius (The Dog Star)',
    info: 'Binary Star • 8.6 light-years • Brightest star in night sky',
    story: `Ancient Egyptians built their calendar around this star. When Sirius rose just before the Sun in mid-July, they knew the Nile would flood, bringing life to the desert.

For thousands of years, no one knew Sirius had a companion. In 1862, telescope makers first saw it: Sirius B, a white dwarf so dense that a teaspoon would weigh 5 tons on Earth.

Sirius B is what our Sun will become in 5 billion years — a dead star's corpse, slowly cooling in darkness.`
  },
  
  polaris: {
    name: 'Polaris (The North Star)',
    info: 'Triple Star System • 433 light-years',
    story: `For a thousand years, this star has pointed north. Sailors crossed oceans by it. Escaped slaves fled to freedom beneath it.

Earth wobbles like a spinning top. Every 26,000 years, our axis traces a circle through the stars. Five thousand years ago, the "North Star" was Thuban. Twelve thousand years from now, it will be Vega.

We are living in the Age of Polaris. The ancient Greeks didn't. Our descendants 10,000 years hence won't.`
  },
  
  vega: {
    name: 'Vega (Alpha Lyrae)',
    info: 'Blue Star • 25 light-years • Future pole star',
    story: `Twelve thousand years ago, Vega was the North Star. Neanderthals navigated by it. In 13,700 AD, it will be again.

Vega spins so fast it bulges at the equator — not a sphere but an egg. It's surrounded by a massive disk of dust, possibly forming planets right now. We might be watching a solar system being born.

Carl Sagan chose Vega for humanity's first contact in "Contact" — it represents hope and aspiration.`
  },
  
  betelgeuse: {
    name: 'Betelgeuse (Alpha Orionis)',
    info: 'Red Supergiant • 642 light-years • Dying star',
    story: `Betelgeuse is dying, and when it goes, the fireworks will be spectacular.

If you placed it where the Sun sits, it would swallow Mercury, Venus, Earth, Mars, and nearly reach Jupiter. When iron forms at the core, the star has seconds left.

For weeks, it will shine as bright as the full Moon — visible in daylight. You'll be able to read by its light at midnight.

It could explode tonight. It could wait 100,000 years. You are watching the last days of a titan.`
  },
  
  rigel: {
    name: 'Rigel (Beta Orionis)',
    info: 'Blue Supergiant • 860 light-years • 120,000× Sun',
    story: `Rigel shines with the light of 120,000 Suns. If it replaced our Sun, Earth would vaporize instantly.

The light you see left Rigel in 1165 AD — the age of Knights Templar. That photon traveled while Genghis Khan conquered Asia, while Columbus sailed to America, while humans invented flight.

And tonight, after 860 years of journey, it hits your eye.`
  },
  
  dubhe: { name: 'Dubhe', info: '123 light-years', story: 'The pointer star that leads to Polaris. Sailors found north by following Dubhe and Merak for thousands of years.' },
  merak: { name: 'Merak', info: '79.7 light-years', story: 'The second pointer star. Draw a line from Merak through Dubhe to find true north.' },
  phecda: { name: 'Phecda', info: '83.2 light-years', story: 'The corner where the Big Dipper\'s handle meets the cup.' },
  megrez: { name: 'Megrez', info: '58.4 light-years', story: 'The dimmest star in the Big Dipper.' },
  alioth: { name: 'Alioth', info: '82.6 light-years', story: 'The brightest star in Ursa Major.' },
  mizar: { name: 'Mizar', info: '82.9 light-years', story: 'The famous double star. Can you see its companion Alcor? Ancient Arabs used it as a vision test.' },
  alkaid: { name: 'Alkaid', info: '103.9 light-years', story: 'The tip of the Dipper\'s handle. Arabic for "the leader."' },
  alnitak: { name: 'Alnitak', info: '1,260 light-years', story: 'Eastern star of Orion\'s Belt. Near it sits the Horsehead Nebula.' },
  alnilam: { name: 'Alnilam', info: '2,000 light-years', story: 'Middle star of Orion\'s Belt. The light you see left during the Roman Empire.' },
  mintaka: { name: 'Mintaka', info: '1,200 light-years', story: 'Western star of Orion\'s Belt. Egyptians aligned the Great Pyramid using these three stars.' }
};

// Initialize scene system
function initStarScene() {
  const container = document.getElementById('weatherScene');
  if (!container) {
    console.error('❌ weatherScene container not found!');
    return;
  }
  
  const hour = new Date().getHours();
  const scene = (hour >= 6 && hour < 19) ? 'day' : 'night';
  
  console.log(`🌟 Loading ${scene} scene...`);
  
  // Load scene
  container.innerHTML = SCENES[scene];
  
  // Attach click handlers
  setTimeout(() => {
    const stars = container.querySelectorAll('.star');
    console.log(`⭐ Found ${stars.length} clickable stars`);
    
    stars.forEach(star => {
      star.addEventListener('click', (e) => {
        e.stopPropagation();
        const starId = star.dataset.star;
        console.log(`🌟 Clicked: ${starId}`);
        showStarModal(starId);
      });
      
      star.addEventListener('mouseenter', () => {
        star.style.opacity = '0.6';
      });
      
      star.addEventListener('mouseleave', () => {
        star.style.opacity = '1';
      });
    });
  }, 100);
  
  // Update description
  const desc = document.getElementById('sceneDescription');
  if (desc) {
    desc.textContent = scene === 'night' 
      ? 'Starlight from distant suns. Click any star to hear its story.'
      : 'Our star shines 93 million miles away. Click celestial objects to learn more.';
  }
}

// Show star details modal
function showStarModal(starId) {
  const info = STAR_INFO[starId];
  if (!info) {
    console.warn(`No info for star: ${starId}`);
    return;
  }
  
  const modal = document.createElement('div');
  modal.id = 'starModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease-out;
  `;
  
  modal.innerHTML = `
    <div style="max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; background: white; border: 2px solid black; border-radius: 12px; padding: 2rem;">
      <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; margin-bottom: 1rem;">${info.name}</h2>
      <p style="font-size: 0.9rem; opacity: 0.7; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(0,0,0,0.1);">${info.info}</p>
      <div style="padding: 1.5rem; background: repeating-linear-gradient(0deg, transparent, transparent 25px, rgba(0,0,0,0.02) 25px, rgba(0,0,0,0.02) 26px); border-radius: 8px; line-height: 1.8;">
        ${info.story.split('\n\n').map(p => `<p style="margin-bottom: 1rem;">${p}</p>`).join('')}
      </div>
      <button onclick="this.closest('#starModal').remove()" style="margin-top: 1.5rem; padding: 0.75rem 2rem; background: black; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem;">Close</button>
    </div>
  `;
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
  
  document.body.appendChild(modal);
}

// Auto-init when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStarScene);
} else {
  // DOM already loaded, init immediately
  setTimeout(initStarScene, 100);
}

// Export for manual calls
window.initStarScene = initStarScene;
window.showStarModal = showStarModal;

