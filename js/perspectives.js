// Space Weather Perspectives
// Stories from people affected by space weather

const SpacePerspectives = [
  {
    character: "👨‍🌾 Farmer Maya",
    emoji: "🌾",
    title: "GPS and Precision Farming",
    story: `Hi! I'm Maya, and I farm corn in Iowa. You might wonder - what does space weather have to do with farming?

Well, I use GPS to drive my tractor in perfectly straight lines. This helps me plant seeds exactly where they need to go and saves fuel. But when the Sun sends out big solar storms, the GPS signals get confused!

During a strong solar storm, my GPS can be off by several feet. That might not sound like much, but when you're planting thousands of acres, it really matters. Sometimes I have to stop work completely until the storm passes.

The auroras are beautiful, but they mean my GPS might not work right for a few days. So I always check space weather forecasts before starting my big planting days!`,
    impact: "GPS accuracy decreases during solar storms",
    solution: "Farmers monitor space weather forecasts"
  },
  
  {
    character: "✈️ Pilot James",
    emoji: "🛩️",
    title: "Flying Through Solar Radiation",
    story: `I'm Captain James, and I fly airplanes across the North Pole from New York to Tokyo. It's the shortest route, but it's also where space weather hits hardest!

When there's a big solar storm, we get exposed to more radiation up here at 35,000 feet - kind of like getting extra X-rays. It's usually safe, but during major storms, we have to fly a different route that's farther south.

This means the flight takes longer and uses more fuel. We also lose radio contact sometimes because solar storms mess with radio waves. Imagine trying to talk to air traffic control and the radio just goes bzzzzt!

During the really big storms, airlines can cancel polar flights completely. Safety first! I always check the space weather report before every flight.`,
    impact: "Increased radiation exposure and communication disruptions",
    solution: "Pilots reroute flights during severe storms"
  },
  
  {
    character: "👨‍🚀 Astronaut Chen",
    emoji: "🚀",
    title: "Living in Space During Solar Storms",
    story: `Hello from the International Space Station! I'm Dr. Chen, and I've been living in space for 3 months.

Up here, we don't have Earth's atmosphere to protect us from the Sun's radiation. When Mission Control tells us a CME is coming, we have to take shelter in the most protected parts of the station.

Solar storms can damage our equipment and give us unhealthy radiation doses. During a big storm last week, we had to cancel our spacewalk and stay inside the Russian module, which has extra shielding.

The auroras look AMAZING from up here though - we see them from above! They look like glowing green and red curtains wrapping around the whole planet. But they also remind us that the Sun is very powerful and we need to respect it.

Without space weather monitoring from Earth, we wouldn't be safe up here!`,
    impact: "Radiation danger and mission delays",
    solution: "Astronauts shelter in protected areas and postpone spacewalks"
  },
  
  {
    character: "⚡ Power Grid Manager Sarah",
    emoji: "🔌",
    title: "Protecting Your Electricity",
    story: `I'm Sarah, and I work at a power company. My job is to make sure electricity keeps flowing to your homes, schools, and hospitals.

Solar storms create something called "geomagnetically induced currents" - basically, the Earth's magnetic field starts acting like a giant electrical wire when it gets hit by solar particles. This can overload our power transformers!

In 1989, a massive solar storm knocked out power in Quebec, Canada for 9 hours. Six million people had no electricity in the middle of winter! The storm caused $2 billion in damage.

Now we watch space weather forecasts very carefully. When we see a big storm coming, we adjust the power grid - kind of like turning down the volume before a loud sound. We might disconnect some transformers temporarily to protect them.

It's like preparing for a hurricane, but from space! Thanks to better forecasting, we've prevented major blackouts.`,
    impact: "Power grid damage and blackouts",
    solution: "Grid operators adjust systems before storms arrive"
  },
  
  {
    character: "📡 Satellite Engineer Dr. Patel",
    emoji: "🛰️",
    title: "Protecting Satellites",
    story: `Namaste! I'm Dr. Patel, and I design and monitor satellites that orbit Earth.

Space weather is my biggest challenge. Solar storms can:
- Fry satellite electronics with radiation
- Drag satellites down (the atmosphere expands during storms!)
- Scramble GPS signals
- Damage solar panels

We lost 40 SpaceX Starlink satellites in February 2022 because a solar storm made the atmosphere thicker, creating drag that pulled them down. Each satellite costs millions of dollars!

To protect satellites, we:
- Point solar panels away during storms (like closing your eyes to bright light)
- Power down non-essential systems
- Move satellites to safer orbits
- Use special radiation-hardened electronics

Every satellite I launch has to be tough enough to survive 10-15 years of solar storms. It's like building a house that can withstand constant hurricanes!`,
    impact: "Satellite damage, signal disruption, orbital decay",
    solution: "Engineers design radiation-hardened satellites and take protective measures"
  },
  
  {
    character: "🌊 Fisherman Diego",
    emoji: "🎣",
    title: "Navigation at Sea",
    story: `¡Hola! I'm Diego, a fishing boat captain from Chile. I spend weeks at sea fishing for tuna.

Out on the ocean, I depend on GPS to know exactly where I am and to find my way back home. We also use it to mark good fishing spots - when you find a school of fish in the middle of the ocean, you need GPS to come back tomorrow!

During solar storms, the GPS can be wrong by hundreds of feet, or stop working completely. This is dangerous because if we can't navigate, we might not find our way back to port in bad weather.

We also use satellite communications to check weather forecasts and talk to our families. Solar storms can knock those out too. It's scary being out on the ocean with no communications!

Now I check space weather forecasts just like I check ocean weather. If a big solar storm is coming, I try to stay closer to shore or make sure I have backup navigation equipment. The Sun affects everyone, even fishermen!`,
    impact: "GPS and communication failures at sea",
    solution: "Mariners use backup navigation and monitor forecasts"
  },
  
  {
    character: "☀️ A Solar Flare's Journey",
    emoji: "🌟",
    title: "I Am a Coronal Mass Ejection!",
    story: `WHOOOOSH! I just exploded off the Sun's surface! I'm a Coronal Mass Ejection (CME) - a massive cloud of billions of tons of solar plasma!

I was born when tangled magnetic fields on the Sun suddenly snapped and released incredible energy. Now I'm racing through space at 1,000 kilometers per SECOND! Earth is 150 million kilometers away, but I'll get there in just 15-18 hours.

As I zoom through space, I'm carrying:
- Super hot plasma (1 million degrees!)
- Powerful magnetic fields
- Billions of charged particles

I can see Earth ahead - that beautiful blue marble. When I hit Earth's magnetosphere (its protective magnetic shield), I'm going to shake things up!

I'll squeeze Earth's magnetosphere, making it wobble. My particles will slide down magnetic field lines toward the North and South Poles. When they crash into oxygen and nitrogen in the atmosphere, they'll create beautiful auroras!

But I'll also cause trouble:
- Satellites will feel my radiation
- Power grids will feel electrical currents
- GPS will get confused
- Radio communications will be disrupted

I'm not trying to be mean - I'm just following the laws of physics! This is what the Sun does. And honestly? The auroras I create are worth it. They're SPECTACULAR! 

See you in 18 hours, Earth! 🌍✨`,
    impact: "Multiple technological systems affected",
    solution: "Earth's magnetosphere provides protection; forecasting helps prepare"
  },
  
  {
    character: "📻 Radio Operator Elena",
    emoji: "📡",
    title: "When Radio Waves Disappear",
    story: `Hi everyone! I'm Elena, and I run emergency radio communications for a search and rescue team in Alaska.

In remote Alaska, cell phones don't work. We rely on radio waves that bounce off the ionosphere (a layer of Earth's atmosphere) to communicate across long distances. It's like throwing a ball that bounces off the ceiling to reach someone far away.

But solar storms mess up the ionosphere! Suddenly, our radio waves don't bounce anymore - they just go straight through into space. This means we can lose contact with pilots, rescue teams, and remote villages.

Last year during a solar storm, we lost radio contact for 6 hours right when we needed to coordinate a medical evacuation. We had to use satellite phones (which are much more expensive) as backup.

For indigenous communities in the Arctic who depend on radio for safety, space weather forecasts are as important as regular weather forecasts. We've learned to have backup plans and multiple communication methods.

The auroras are incredible up here, but they're a reminder that the Sun is powerful and we need to be prepared!`,
    impact: "Radio blackouts, especially at high latitudes",
    solution: "Multiple backup communication systems"
  }
];

// Get a random perspective
function getRandomPerspective() {
  return SpacePerspectives[Math.floor(Math.random() * SpacePerspectives.length)];
}

// Get perspective by character name
function getPerspective(characterName) {
  return SpacePerspectives.find(p => p.character.includes(characterName));
}

// Load and display a new perspective (for the card in main app)
function loadNewPerspective() {
  const perspective = getRandomPerspective();
  
  const emojiEl = document.getElementById('perspectiveEmoji');
  const charEl = document.getElementById('perspectiveCharacter');
  const titleEl = document.getElementById('perspectiveTitle');
  const storyEl = document.getElementById('perspectiveStory');
  
  if (emojiEl) emojiEl.textContent = perspective.emoji;
  if (charEl) charEl.textContent = perspective.character;
  if (titleEl) titleEl.textContent = perspective.title;
  if (storyEl) storyEl.textContent = perspective.story;
  
  console.log('📖 Loaded perspective:', perspective.character);
}

// Export to window
window.SpacePerspectives = SpacePerspectives;
window.getRandomPerspective = getRandomPerspective;
window.getPerspective = getPerspective;
window.loadNewPerspective = loadNewPerspective;

