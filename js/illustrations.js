// Space-Focused Weather Illustrations
// Clickable stars with astronomical details

const WeatherScenes = {
  // Sunny day - show sun and space context
  sunny: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Sun -->
      <g class="star-clickable" data-star="sun">
        <circle cx="100" cy="100" r="30" fill="none" stroke="#000" stroke-width="2"/>
        <line x1="100" y1="50" x2="100" y2="35" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        <line x1="100" y1="165" x2="100" y2="150" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        <line x1="50" y1="100" x2="35" y2="100" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        <line x1="165" y1="100" x2="150" y2="100" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        <line x1="65" y1="65" x2="53" y2="53" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        <line x1="135" y1="135" x2="147" y2="147" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        <line x1="135" y1="65" x2="147" y2="53" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        <line x1="65" y1="135" x2="53" y2="147" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        <text x="100" y="145" font-family="monospace" font-size="8" fill="#000" text-anchor="middle" pointer-events="none">☉ Sol</text>
      </g>
      
      <!-- ISS orbit -->
      <ellipse cx="100" cy="100" rx="70" ry="45" fill="none" stroke="#000" stroke-width="0.8" stroke-dasharray="4,4" opacity="0.3"/>
      <circle cx="160" cy="90" r="3" fill="#000" class="star-clickable" data-star="iss"/>
      <text x="165" y="92" font-family="monospace" font-size="6" fill="#000" opacity="0.6" pointer-events="none">ISS</text>
      
      <!-- Distant stars visible in daytime (faint) -->
      <circle cx="40" cy="30" r="2" fill="#000" opacity="0.2" class="star-clickable" data-star="sirius"/>
      <text x="30" y="25" font-family="monospace" font-size="5" fill="#000" opacity="0.3" pointer-events="none">Sirius</text>
      
      <circle cx="170" cy="40" r="1.5" fill="#000" opacity="0.2" class="star-clickable" data-star="vega"/>
      <text x="160" y="35" font-family="monospace" font-size="5" fill="#000" opacity="0.3" pointer-events="none">Vega</text>
      
      <text x="100" y="195" font-family="monospace" font-size="6" fill="#000" text-anchor="middle" opacity="0.5" pointer-events="none">Click stars to learn more</text>
    </svg>
  `,
  
  // Cloudy - atmospheric view from space
  cloudy: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Earth's atmosphere layers -->
      <ellipse cx="100" cy="120" rx="80" ry="40" fill="none" stroke="#000" stroke-width="1.5"/>
      <text x="100" y="170" font-family="monospace" font-size="7" fill="#000" text-anchor="middle">Earth's Atmosphere</text>
      
      <!-- Cloud bands -->
      <path d="M 30 110 Q 60 105 100 110 Q 140 115 170 110" fill="none" stroke="#000" stroke-width="1.2" opacity="0.6"/>
      <text x="85" y="125" font-family="monospace" font-size="5" fill="#000" opacity="0.5">cloud layer</text>
      
      <!-- Weather satellites -->
      <g class="star-clickable" data-star="goes">
        <rect x="48" y="40" width="4" height="3" fill="none" stroke="#000" stroke-width="0.8"/>
        <line x1="46" y1="41.5" x2="48" y2="41.5" stroke="#000" stroke-width="0.8"/>
        <line x1="52" y1="41.5" x2="54" y2="41.5" stroke="#000" stroke-width="0.8"/>
        <text x="35" y="38" font-family="monospace" font-size="5" fill="#000">GOES-16</text>
      </g>
      
      <g class="star-clickable" data-star="aqua">
        <rect x="148" y="55" width="4" height="3" fill="none" stroke="#000" stroke-width="0.8"/>
        <line x1="146" y1="56.5" x2="148" y2="56.5" stroke="#000" stroke-width="0.8"/>
        <line x1="152" y1="56.5" x2="154" y2="56.5" stroke="#000" stroke-width="0.8"/>
        <text x="138" y="52" font-family="monospace" font-size="5" fill="#000">Aqua</text>
      </g>
      
      <!-- Distant stars through clouds -->
      <circle cx="60" cy="25" r="1.5" fill="#000" opacity="0.3" class="star-clickable" data-star="polaris"/>
      <text x="50" y="22" font-family="monospace" font-size="5" fill="#000" opacity="0.4">Polaris</text>
      
      <circle cx="140" cy="30" r="1.5" fill="#000" opacity="0.3" class="star-clickable" data-star="betelgeuse"/>
      <text x="125" y="27" font-family="monospace" font-size="5" fill="#000" opacity="0.4">Betelgeuse</text>
      
      <text x="100" y="195" font-family="monospace" font-size="6" fill="#000" text-anchor="middle" opacity="0.5">Click to explore satellites & stars</text>
    </svg>
  `,
  
  // Windy - jet stream and orbital mechanics
  windy: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Wind currents from space perspective -->
      <path d="M 20 60 Q 100 50 180 60" stroke="#000" stroke-width="1.5" fill="none" opacity="0.6"/>
      <text x="85" y="50" font-family="monospace" font-size="6" fill="#000" opacity="0.5">jet stream</text>
      
      <path d="M 20 100 Q 100 90 180 100" stroke="#000" stroke-width="1.2" fill="none" opacity="0.5"/>
      <path d="M 20 130 Q 100 120 180 130" stroke="#000" stroke-width="1" fill="none" opacity="0.4"/>
      
      <!-- Coriolis effect indicator -->
      <circle cx="100" cy="100" r="50" fill="none" stroke="#000" stroke-width="0.8" stroke-dasharray="3,3" opacity="0.3"/>
      <text x="100" y="160" font-family="monospace" font-size="5" fill="#000" text-anchor="middle" opacity="0.5">Earth's rotation</text>
      
      <!-- Navigation stars -->
      <g class="star-clickable" data-star="polaris">
        <line x1="100" y1="20" x2="100" y2="28"/>
        <line x1="96" y1="24" x2="104" y2="24"/>
        <circle cx="100" cy="24" r="2" fill="none" stroke="#000" stroke-width="0.8"/>
        <text x="85" y="17" font-family="monospace" font-size="6" fill="#000">Polaris ⭐</text>
      </g>
      
      <circle cx="40" cy="40" r="2" fill="#000" class="star-clickable" data-star="arcturus"/>
      <text x="25" y="38" font-family="monospace" font-size="5" fill="#000">Arcturus</text>
      
      <circle cx="160" cy="50" r="2" fill="#000" class="star-clickable" data-star="deneb"/>
      <text x="150" y="48" font-family="monospace" font-size="5" fill="#000">Deneb</text>
      
      <circle cx="60" cy="180" r="1.5" fill="#000" class="star-clickable" data-star="antares"/>
      <text x="50" y="178" font-family="monospace" font-size="5" fill="#000">Antares</text>
      
      <text x="100" y="195" font-family="monospace" font-size="6" fill="#000" text-anchor="middle" opacity="0.5">Ancient navigators used these stars</text>
    </svg>
  `,
  
  // Night - full star map with constellations
  night: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Moon -->
      <g class="star-clickable" data-star="moon">
        <circle cx="50" cy="40" r="18" fill="none" stroke="#000" stroke-width="1.5"/>
        <circle cx="58" cy="40" r="18" fill="#fff" stroke="none"/>
        <circle cx="50" cy="40" r="18" fill="none" stroke="#000" stroke-width="1.5"/>
        <circle cx="48" cy="35" r="3" fill="none" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <circle cx="55" cy="42" r="2" fill="none" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <text x="40" y="65" font-family="monospace" font-size="6" fill="#000">Luna</text>
      </g>
      
      <!-- Ursa Major (Big Dipper) -->
      <g class="constellation" data-star="ursa-major">
        <circle cx="120" cy="35" r="2" fill="#000" class="star-clickable" data-star="dubhe"/>
        <circle cx="130" cy="32" r="2" fill="#000" class="star-clickable" data-star="merak"/>
        <circle cx="140" cy="35" r="2" fill="#000" class="star-clickable" data-star="phecda"/>
        <circle cx="145" cy="42" r="2" fill="#000" class="star-clickable" data-star="megrez"/>
        <circle cx="143" cy="50" r="2" fill="#000" class="star-clickable" data-star="alioth"/>
        <circle cx="135" cy="48" r="2" fill="#000" class="star-clickable" data-star="mizar"/>
        <circle cx="127" cy="45" r="2" fill="#000" class="star-clickable" data-star="alkaid"/>
        <line x1="120" y1="35" x2="130" y2="32" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <line x1="130" y1="32" x2="140" y2="35" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <line x1="140" y1="35" x2="145" y2="42" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <line x1="145" y1="42" x2="143" y2="50" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <line x1="143" y1="50" x2="135" y2="48" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <line x1="135" y1="48" x2="127" y2="45" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <line x1="127" y1="45" x2="120" y2="35" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <text x="125" y="60" font-family="monospace" font-size="6" fill="#000">Ursa Major</text>
      </g>
      
      <!-- Orion's Belt -->
      <g class="constellation">
        <circle cx="80" cy="100" r="2" fill="#000" class="star-clickable" data-star="alnitak"/>
        <circle cx="90" cy="98" r="2" fill="#000" class="star-clickable" data-star="alnilam"/>
        <circle cx="100" cy="100" r="2" fill="#000" class="star-clickable" data-star="mintaka"/>
        <line x1="80" y1="100" x2="90" y2="98" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <line x1="90" y1="98" x2="100" y2="100" stroke="#000" stroke-width="0.5" opacity="0.3"/>
        <text x="75" y="115" font-family="monospace" font-size="6" fill="#000">Orion's Belt</text>
      </g>
      
      <!-- Bright stars -->
      <circle cx="30" cy="90" r="2.5" fill="#000" class="star-clickable" data-star="sirius"/>
      <text x="20" y="88" font-family="monospace" font-size="5" fill="#000">Sirius</text>
      
      <circle cx="170" cy="70" r="2" fill="#000" class="star-clickable" data-star="vega"/>
      <text x="160" y="68" font-family="monospace" font-size="5" fill="#000">Vega</text>
      
      <circle cx="160" cy="120" r="2" fill="#000" class="star-clickable" data-star="rigel"/>
      <text x="150" y="118" font-family="monospace" font-size="5" fill="#000">Rigel</text>
      
      <!-- Small stars -->
      <circle cx="45" cy="75" r="1" fill="#000" class="star-clickable" data-star="procyon"/>
      <circle cx="115" cy="80" r="1" fill="#000" class="star-clickable" data-star="capella"/>
      <circle cx="155" cy="150" r="1" fill="#000" class="star-clickable" data-star="aldebaran"/>
      <circle cx="70" cy="140" r="1" fill="#000" class="star-clickable" data-star="pollux"/>
      
      <!-- Milky Way band -->
      <ellipse cx="100" cy="130" rx="90" ry="20" fill="none" stroke="#000" stroke-width="0.5" opacity="0.1" stroke-dasharray="4,2"/>
      <text x="75" y="165" font-family="monospace" font-size="5" fill="#000" opacity="0.4">Milky Way</text>
      
      <text x="100" y="195" font-family="monospace" font-size="6" fill="#000" text-anchor="middle" opacity="0.5">Click any star to explore</text>
    </svg>
  `
};

// Star database with narrative histories
const StarData = {
  // Sun
  sun: {
    name: 'Sol (The Sun)',
    type: 'G-type Main Sequence (Yellow Dwarf)',
    distance: '93 million miles (1 AU)',
    age: '4.6 billion years',
    story: `Every culture has worshipped this star. Ancient Egyptians called it Ra, riding his solar barque across the sky. The Aztecs fed it human hearts to keep it burning. Greeks named it Helios, racing his golden chariot from east to west.

But here's what's truly remarkable: this ordinary yellow star, one of 400 billion in our galaxy, happened to form in exactly the right place with exactly the right mass to warm a small rocky planet at exactly the right distance for water to stay liquid. 

That accident of cosmic timing created you.

Today, its light takes 8 minutes and 20 seconds to reach your eyes. When you feel sunshine on your skin, you're touching photons that began their journey at the Sun's core 100,000 years ago, bouncing through dense plasma before finally escaping to cross space in 8 minutes.

You are made of sunlight, transformed by plants into food, into flesh. Every atom in your body heavier than hydrogen was forged in a dying star billions of years ago. You are, quite literally, starstuff contemplating itself.`
  },
  
  // Satellites
  iss: {
    name: 'International Space Station',
    type: 'Space Station',
    distance: '408 km altitude',
    speed: '17,150 mph',
    orbit: '90 minutes',
    story: `In 1998, the first two modules met in orbit — one Russian, one American, former Cold War enemies now building together. Over 23 years, astronauts from 19 countries added piece by piece until this impossible structure emerged: a football-field-sized laboratory hurtling through space at 17,000 mph.

Humans have lived continuously on the ISS since November 2, 2000. As you read this, people are floating above you, orbiting Earth every 90 minutes, watching 16 sunrises per day.

On a clear night, you can see it with your naked eye — a bright, steady light moving faster than any plane. No telescope needed. Just look up at the right time, and you'll see the most expensive thing humans have ever built: a $150 billion monument to cooperation, floating in the void.

Inside, astronauts drink recycled urine (purified to perfection), grow lettuce in microgravity, and conduct experiments that could cure diseases. They've proven we can live in space. Next: Mars.`
  },
  
  goes: {
    name: 'GOES-16 Weather Satellite',
    type: 'Geostationary Satellite',
    distance: '22,236 miles above Earth',
    launched: 'November 19, 2016',
    story: `This satellite doesn't move. It hovers above the Americas, locked to Earth's rotation at exactly the right altitude (22,236 miles) where orbital physics creates equilibrium.

Every 15 minutes, GOES-16 photographs the entire Western Hemisphere. Every 30 seconds, it can zoom into a hurricane, watching clouds spiral in near-real-time. When Hurricane Irma devastated Florida in 2017, GOES-16 was watching, sending data that saved thousands of lives.

Before satellites like this, hurricanes appeared without warning, drowning entire cities. The 1900 Galveston hurricane killed 8,000 people who had no idea it was coming. Now, we track every storm from birth to death.

GOES-16 sees in 16 different wavelengths — far beyond human vision — detecting invisible water vapor, measuring cloud-top temperatures, watching lightning strikes, even spotting wildfires the moment they ignite.

That weather app on your phone? It's reading data from here, 22,000 miles up, updated every 15 minutes.`
  },
  
  aqua: {
    name: 'Aqua Satellite',
    type: 'Earth Observation',
    distance: '438 miles altitude',
    launched: 'May 4, 2002',
    story: `Named for the Latin word for water, Aqua has one job: track every drop on Earth. For 22 years, it's been mapping rainfall, ocean temperatures, sea ice, glaciers — watching our planet's water move through air, land, and sea.

It crosses the equator every afternoon at precisely 1:30 PM local time, earning its nickname: "the afternoon satellite." This timing isn't random — afternoon light reveals maximum cloud development and ocean color.

Aqua proved the Arctic is warming twice as fast as the rest of Earth. It watched the 2004 tsunami's aftermath, measured Hurricane Katrina's fury, tracked the Australian megafires. It detected Pakistan's record 2022 floods — one-third of the country underwater.

Six instruments, 1,560 pounds, 27 feet long. It generates 89 GB of data every single day — more than the entire Library of Congress printed collection.

Climate scientists call it irreplaceable. When Aqua fails (it's past its 6-year design life), we'll lose eyes we didn't know we needed until we watched Earth's water cycle change in real-time.`
  },
  
  moon: {
    name: 'Luna (The Moon)',
    type: 'Natural Satellite',
    distance: '238,855 miles (1.28 light-seconds)',
    age: '4.5 billion years',
    story: `The Moon was born in violence. 4.5 billion years ago, a Mars-sized planet called Theia slammed into proto-Earth at 9,000 mph. The collision vaporized both worlds. What re-condensed from the debris became Earth and its companion.

Every culture has named it. Selene to Greeks. Luna to Romans. Chang'e to Chinese. Chandra to Hindus. It's the only celestial body that connects all human mythology — everyone sees the same face, always.

That face never changes because the Moon is tidally locked, showing us one side forever. Ancient craters billions of years old remain pristine — no wind or water to erode them. When Apollo astronauts landed in 1969, their footprints will last 100 million years.

The Moon is drifting away at 1.5 inches per year. In the deep past, it hung closer, larger in the sky. Dinosaurs saw massive eclipses we'll never witness. In the deep future, our descendants won't see total solar eclipses at all — the Moon will appear too small.

Right now, at this moment in cosmic history, the Moon appears exactly the same size as the Sun in our sky. That's pure coincidence — and it gives us the universe's most perfect eclipses.`
  },
  
  // Bright stars
  sirius: {
    name: 'Sirius (Alpha Canis Majoris)',
    type: 'Binary Star System',
    distance: '8.6 light-years',
    magnitude: '-1.46 (brightest!)',
    story: `The ancient Egyptians built their entire calendar around this star. When Sirius rose just before the Sun in mid-July, they knew the Nile would flood within days, bringing life to the desert. They called it Sothis, the Nile Star. Its rising marked New Year's Day.

The Greeks called it the "Dog Star" — Canis Major, the Great Dog, forever chasing Orion across the night sky. When Sirius rose with the Sun in summer ("dog days"), they believed its fierce light added heat to make those days sweltering.

For thousands of years, no one knew Sirius had a companion. Then in 1844, astronomers noticed it wobbling. Something invisible was pulling it. In 1862, telescope maker Alvan Graham Clark first saw it: Sirius B, a white dwarf star so dense that a teaspoon would weigh 5 tons on Earth.

Sirius B is what our Sun will become in 5 billion years — a dead star's corpse, slowly cooling in the darkness.

When you see Sirius tonight — the brightest star in the sky — you're seeing light that left 8.6 years ago. If Sirius exploded right now, you wouldn't know until 2033.`
  },
  
  polaris: {
    name: 'Polaris (The North Star)',
    type: 'Triple Star System',
    distance: '433 light-years',
    magnitude: '1.98',
    story: `For a thousand years, this star has pointed north. Sailors crossed oceans by it. Escaped slaves fled to freedom beneath it. Arctic explorers found their way home by it. Polaris sits almost directly above Earth's North Pole, the only star that doesn't appear to move.

But here's the secret: it hasn't always been the North Star, and it won't be forever.

Earth wobbles like a spinning top — astronomers call it "precession." Every 26,000 years, our axis traces a circle through the stars. Five thousand years ago, the "North Star" was Thuban in Draco. Twelve thousand years from now, it will be Vega.

For this brief moment in history — this eyeblink of cosmic time — we have Polaris. The ancient Greeks didn't. Our descendants 10,000 years hence won't. We are living in the Age of Polaris.

The light you see tonight left this star in 1591, when Shakespeare was writing his first plays and Galileo hadn't yet pointed a telescope at the sky. That photon traveled 433 years through absolute darkness to hit your retina tonight.`
  },
  
  vega: {
    name: 'Vega (Alpha Lyrae)',
    type: 'Young Blue Star',
    distance: '25 light-years',
    magnitude: '0.03 (5th brightest)',
    story: `Vega was humanity's first photographed star (1850) and the first star besides the Sun to have its spectrum recorded. Astronomers used it to define magnitude 0.00 — every other star's brightness is compared to Vega.

Twelve thousand years ago, Vega was the North Star. Neanderthals navigated by it. In 13,700 AD, it will be again — your distant descendants will sail by Vega as we sail by Polaris.

But Vega hides mysteries. It spins so fast it bulges at the equator — not a sphere but an egg. It's surrounded by a massive disk of dust, possibly forming planets right now. We might be watching a solar system being born.

In 1997, the movie "Contact" sent Jodie Foster's character to Vega — first contact with aliens transmitted from this blue beacon. Carl Sagan chose it deliberately: Vega means "swooping eagle" in Arabic, and for centuries, it's represented hope and aspiration.

Vega is only 455 million years old — one-tenth the Sun's age. When this star formed, Earth had no complex life yet. When Vega dies in 500 million years, Earth might be uninhabitable, too hot as the Sun expands.

We exist in Vega's youth, just as it exists in ours.`
  },
  
  betelgeuse: {
    name: 'Betelgeuse (Alpha Orionis)',
    type: 'Red Supergiant (Dying)',
    distance: '642 light-years',
    size: '900× larger than Sun',
    story: `Betelgeuse is dying, and when it goes, the fireworks will be spectacular.

This red supergiant is so massive that if you placed it where the Sun sits, it would swallow Mercury, Venus, Earth, Mars, and nearly reach Jupiter. Inside, it's frantically fusing heavier and heavier elements — helium into carbon, carbon into oxygen, oxygen into silicon, silicon into iron.

When iron forms at the core, fusion stops. Iron takes more energy to fuse than it releases. The star has seconds left.

The core collapses in 0.25 seconds. The outer layers crash inward, then explode outward faster than 10% the speed of light. For weeks, Betelgeuse will shine as bright as the full Moon — visible in daylight. You'll be able to read by its light at midnight.

Astronomers don't know when. It could explode tonight. It could wait 100,000 years. In cosmic terms, both timescales are "soon." The light delay means it might have already exploded 642 years ago — the news racing toward us through darkness.

When you look at Betelgeuse's dull red glow, you're seeing a star in its death throes, and you're seeing light from 1383 AD. That light left during the Hundred Years' War. It traveled through space while humans invented printing presses, steam engines, computers, and spacecraft.

You are watching the last days of a titan.`
  },
  
  rigel: {
    name: 'Rigel (Beta Orionis)',
    type: 'Blue Supergiant',
    distance: '860 light-years',
    luminosity: '120,000× the Sun',
    story: `Rigel shines with the light of 120,000 Suns. If it replaced our Sun, Earth would vaporize instantly.

In Arabic, its name means "the foot" — the left foot of Orion the Hunter, forever stepping across the celestial equator. Every culture saw Orion. Sumerians. Egyptians. Chinese. Mayans. This constellation is so obvious, so human-shaped, it appears in stories from every civilization.

Rigel appears as Beta Orionis — the second star — but it's brighter than Alpha (Betelgeuse). Why? Because by the time astronomers standardized names, Betelgeuse had faded. Stars change. They breathe. Betelgeuse dims and brightens unpredictably. Rigel stays constant, blazing blue-white.

Rigel is actually a triple star system. The main blue supergiant has two smaller companions locked in a cosmic dance. If you lived on a planet orbiting one of them, your sky would have three suns.

The light you see left Rigel in 1165 AD — the age of Knights Templar and early universities. That photon traveled through the void while Genghis Khan conquered Asia, while the Black Death ravaged Europe, while Columbus sailed to America, while humans invented flight and split the atom.

And tonight, after 860 years of journey, it hits your eye.`
  },
  
  // Ursa Major stars
  dubhe: {
    name: 'Dubhe (The Pointer Star)',
    type: 'Orange Giant',
    distance: '123 light-years',
    story: 'For thousands of years, sailors found north by following Dubhe and Merak — the "pointer stars." Draw a line from Merak through Dubhe, extend it five times the distance between them, and you'll find Polaris. This trick has guided countless voyages across dark oceans.',
    constellation: 'Ursa Major'
  },
  
  merak: {
    name: 'Merak (The Second Pointer)',
    distance: '79.7 light-years',
    story: 'Merak means "loins of the bear" in Arabic. With Dubhe, it forms the edge of the Big Dipper\'s cup — and the line that points to true north. Ancient Arab astronomers mapped the heavens with such precision that their star names endure today.',
    constellation: 'Ursa Major'
  },
  
  // Orion's Belt
  alnitak: {
    name: 'Alnitak (The Girdle)',
    type: 'Blue Supergiant',
    distance: '1,260 light-years',
    story: 'The eastern star of Orion\'s Belt. In Arabic, its name means "the girdle." Near Alnitak sits the Horsehead Nebula — a dark cloud of dust shaped like a horse\'s head, backlit by glowing hydrogen gas. The light you see tonight left this star during the Crusades.',
    constellation: 'Orion'
  },
  
  alnilam: {
    name: 'Alnilam (String of Pearls)',
    distance: '2,000 light-years',
    story: 'The middle star of Orion\'s Belt shines brighter than 375,000 Suns. Its name means "string of pearls." The light you see left Alnilam during the Roman Empire. When that photon began its journey, Jesus hadn\'t been born yet.',
    constellation: 'Orion'
  },
  
  mintaka: {
    name: 'Mintaka (The Belt)',
    distance: '1,200 light-years',
    story: 'Mintaka sits almost exactly on the celestial equator — the projection of Earth\'s equator into space. Ancient Egyptians aligned the Great Pyramid of Giza using Orion\'s Belt. All three belt stars pointed the way to the afterlife.',
    constellation: 'Orion'
  },
  
  // Other bright stars
  arcturus: {
    name: 'Arcturus (Bear Guardian)',
    type: 'Red Giant',
    distance: '36.7 light-years',
    magnitude: '-0.05 (4th brightest)',
    story: 'Arcturus blazes orange-red, a dying star in its giant phase. It\'s racing through space at 76 miles per second — fast enough to escape our galaxy eventually. The ancient Greeks called it "bear guardian" because it follows Ursa Major across the sky. In 1933, its light opened the Chicago World\'s Fair when astronomers focused Arcturus\'s photons onto photoelectric cells.',
    constellation: 'Boötes'
  },
  
  deneb: {
    name: 'Deneb (The Tail)',
    type: 'Blue-White Supergiant',
    distance: '2,615 light-years',
    luminosity: '196,000× Sun',
    story: 'Deneb marks the tail of Cygnus the Swan, flying south along the Milky Way. It\'s one of the most luminous stars in our galaxy — if it were as close as Sirius, it would shine as bright as a crescent Moon. The light you see left this star around 600 BC, when Buddha lived and Rome was founded.',
    constellation: 'Cygnus'
  },
  
  antares: {
    name: 'Antares (Rival of Mars)',
    type: 'Red Supergiant',
    distance: '550 light-years',
    size: '700× Sun\'s diameter',
    story: 'Ancient astronomers named it "Rival of Mars" because both glow blood-red and appear near each other in the sky. Antares is so massive that if you placed it where the Sun sits, its surface would extend past Mars\'s orbit. Like Betelgeuse, it\'s dying — and when it explodes, Earth will witness a supernova visible in daylight.',
    constellation: 'Scorpius'
  },
  
  // Small stars (brief stories)
  phecda: { name: 'Phecda', distance: '83.2 light-years', story: 'The third star in the Big Dipper, marking the corner where handle meets cup.', constellation: 'Ursa Major' },
  megrez: { name: 'Megrez', distance: '58.4 light-years', story: 'The dimmest of the Big Dipper stars, where the handle joins the bowl.', constellation: 'Ursa Major' },
  alioth: { name: 'Alioth', distance: '82.6 light-years', story: 'The brightest star in Ursa Major, first star in the Dipper\'s handle.', constellation: 'Ursa Major' },
  mizar: { name: 'Mizar', distance: '82.9 light-years', story: 'The famous double star in the Big Dipper\'s handle. Can you see its companion Alcor with your naked eye? Ancient Arabs used it as a vision test.', constellation: 'Ursa Major' },
  alkaid: { name: 'Alkaid', distance: '103.9 light-years', story: 'The tip of the Big Dipper\'s handle. Arabic for "the leader" — it leads the mourning procession across the sky.', constellation: 'Ursa Major' },
  procyon: { name: 'Procyon', distance: '11.4 light-years', story: 'Greek for "before the dog" — it rises before Sirius, the Dog Star.', constellation: 'Canis Minor' },
  capella: { name: 'Capella', distance: '42.9 light-years', story: 'Latin for "little goat." Actually four stars orbiting each other in pairs.', constellation: 'Auriga' },
  aldebaran: { name: 'Aldebaran', distance: '65.3 light-years', story: 'The eye of Taurus the Bull, glowing orange-red as it chases the Pleiades across the sky.', constellation: 'Taurus' },
  pollux: { name: 'Pollux', distance: '33.7 light-years', story: 'The immortal twin in Gemini, mourning his mortal brother Castor forever.', constellation: 'Gemini' }
};

// Export for use in app
window.WeatherScenes = WeatherScenes;
window.StarData = StarData;
