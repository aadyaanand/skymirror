// SkyMirror Onboarding Flow
// Interactive storytelling introduction

let onboardingState = {
  currentStep: 0,
  currentPerspective: 0,
  userName: '',
  userLocation: '',
  hasSeenOnboarding: false
};

// Check if user has completed onboarding
function hasCompletedOnboarding() {
  return localStorage.getItem('skyMirrorOnboarding') === 'complete';
}

// Start onboarding sequence
function startOnboarding() {
  console.log('🚀 Starting onboarding...');
  
  // Hide main app
  document.getElementById('mainApp').style.display = 'none';
  
  // Show onboarding screen
  document.getElementById('onboardingScreen').style.display = 'flex';
  
  // Start with welcome
  showWelcome();
}

// Skip to main app
function skipOnboarding() {
  localStorage.setItem('skyMirrorOnboarding', 'complete');
  completeOnboarding();
}

function completeOnboarding() {
  document.getElementById('onboardingScreen').style.display = 'none';
  document.getElementById('mainApp').style.display = 'block';
  
  // Initialize the main SkyMirror app
  if (window.skyMirrorInit) {
    window.skyMirrorInit();
  }
}

// Step 1: Welcome
function showWelcome() {
  const container = document.getElementById('onboardingContent');
  container.innerHTML = `
    <div class="onboarding-step" style="text-align: center; animation: fadeIn 0.5s ease-out;">
      <!-- Big Sun -->
      <div style="width: 160px; height: 160px; margin: 0 auto 2rem; position: relative;">
        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
          <circle cx="50" cy="50" r="30" fill="rgba(249,168,38,0.3)" stroke="#F9A826" stroke-width="3"/>
          <line x1="50" y1="10" x2="50" y2="5" stroke="#F9A826" stroke-width="3" stroke-linecap="round"/>
          <line x1="50" y1="90" x2="50" y2="95" stroke="#F9A826" stroke-width="3" stroke-linecap="round"/>
          <line x1="10" y1="50" x2="5" y2="50" stroke="#F9A826" stroke-width="3" stroke-linecap="round"/>
          <line x1="90" y1="50" x2="95" y2="50" stroke="#F9A826" stroke-width="3" stroke-linecap="round"/>
          <line x1="20" y1="20" x2="15" y2="15" stroke="#F9A826" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="80" y1="20" x2="85" y2="15" stroke="#F9A826" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="20" y1="80" x2="15" y2="85" stroke="#F9A826" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="80" y1="80" x2="85" y2="85" stroke="#F9A826" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="42" cy="45" r="4" fill="#000"/>
          <circle cx="58" cy="45" r="4" fill="#000"/>
          <path d="M 40 55 Q 50 62 60 55" fill="none" stroke="#000" stroke-width="2.5"/>
        </svg>
      </div>
      
      <h2 style="font-size: 2.8rem; margin-bottom: 1.5rem; font-weight: 500;">Welcome to SkyMirror!</h2>
      <p style="font-size: 1.4rem; line-height: 2; max-width: 600px; margin: 0 auto 2.5rem; color: #333;">
        Did you know?<br>
        The <strong style="color: #F9A826;">Sun</strong> is 93 million miles away...<br>
        But it affects your life <strong>every single day!</strong> 🌟<br><br>
        Let's meet some friends who feel space weather too...
      </p>
      <button class="onboarding-btn" onclick="window.showPerspectives()">
        👋 Meet My Friends! →
      </button>
      <button class="onboarding-btn-skip" onclick="window.skipOnboarding()">
        Skip Stories
      </button>
    </div>
  `;
}

// Step 2: Show perspectives one by one
function showPerspectives() {
  if (onboardingState.currentPerspective >= window.SpacePerspectives.length) {
    showAboutYou();
    return;
  }
  
  const perspective = window.SpacePerspectives[onboardingState.currentPerspective];
  const container = document.getElementById('onboardingContent');
  
  const isLast = onboardingState.currentPerspective === window.SpacePerspectives.length - 1;
  
  // Get character illustration
  const illustration = window.CharacterIllustrations && window.CharacterIllustrations[perspective.illustration]
    ? window.CharacterIllustrations[perspective.illustration]
    : `<div style="font-size: 6rem;">${perspective.emoji}</div>`;
  
  // Color scheme for each character
  const colors = [
    '#B5EAD7', // Green for farmer
    '#A3C4F3', // Blue for pilot
    '#C8BFE7', // Purple for astronaut
    '#F9A826', // Orange for power grid
    '#FFD6E8', // Pink for engineer
    '#A3C4F3', // Blue for fisherman
    '#FEF3C7', // Yellow for solar flare
    '#C8BFE7'  // Purple for radio
  ];
  const bgColor = colors[onboardingState.currentPerspective % colors.length];
  
  container.innerHTML = `
    <div class="onboarding-step" style="animation: fadeIn 0.5s ease-out;">
      <!-- Character Illustration -->
      <div style="width: 180px; height: 180px; margin: 0 auto 1.5rem; padding: 1rem; background: ${bgColor}; border-radius: 50%; border: 3px solid #000; display: flex; align-items: center; justify-content: center;">
        ${illustration}
      </div>
      
      <!-- Character Name -->
      <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; color: #000;">
        ${perspective.emoji} ${perspective.character}
      </h2>
      <h3 style="font-size: 1.2rem; opacity: 0.7; margin-bottom: 2rem; font-weight: 400;">
        ${perspective.title}
      </h3>
      
      <!-- Story Box -->
      <div style="max-width: 650px; max-height: 40vh; overflow-y: auto; margin: 0 auto; padding: 2rem; background: white; border-radius: 16px; border: 3px solid #000; box-shadow: 8px 8px 0px rgba(0,0,0,0.1);">
        <p style="line-height: 2; white-space: pre-line; font-size: 1.1rem; text-align: left;">${perspective.story}</p>
      </div>
      
      <!-- Impact Box -->
      <div style="margin-top: 1.5rem; padding: 1.25rem; background: ${bgColor}; border-radius: 12px; border: 2px solid #000; max-width: 650px; margin-left: auto; margin-right: auto; box-shadow: 4px 4px 0px rgba(0,0,0,0.05);">
        <p style="font-size: 1rem; margin-bottom: 0.75rem;"><strong>⚠️ Challenge:</strong> ${perspective.impact}</p>
        <p style="font-size: 1rem;"><strong>✅ Solution:</strong> ${perspective.solution}</p>
      </div>
      
      <!-- Buttons -->
      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="onboarding-btn" onclick="window.nextPerspective()">
          ${isLast ? "🌟 What About Me? →" : "👉 Next Friend →"}
        </button>
        <button class="onboarding-btn-skip" onclick="window.skipOnboarding()">
          Skip Stories
        </button>
      </div>
      
      <!-- Progress -->
      <div style="margin-top: 1.5rem;">
        <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 0.5rem;">
          ${Array(window.SpacePerspectives.length).fill(0).map((_, i) => 
            `<div style="width: 30px; height: 6px; background: ${i === onboardingState.currentPerspective ? '#000' : 'rgba(0,0,0,0.2)'}; border-radius: 3px;"></div>`
          ).join('')}
        </div>
        <p style="opacity: 0.5; font-size: 0.9rem;">
          Friend ${onboardingState.currentPerspective + 1} of ${window.SpacePerspectives.length}
        </p>
      </div>
    </div>
  `;
}

function nextPerspective() {
  onboardingState.currentPerspective++;
  showPerspectives();
}

// Step 3: About You
function showAboutYou() {
  const container = document.getElementById('onboardingContent');
  container.innerHTML = `
    <div class="onboarding-step" style="text-align: center; animation: fadeIn 0.5s ease-out;">
      <!-- You character -->
      <div style="width: 180px; height: 180px; margin: 0 auto 2rem; padding: 1rem; background: linear-gradient(135deg, #FFD6E8, #C8BFE7); border-radius: 50%; border: 4px solid #000; display: flex; align-items: center; justify-content: center;">
        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
          <!-- Happy kid face -->
          <circle cx="50" cy="50" r="35" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="40" cy="45" r="5" fill="#000"/>
          <circle cx="60" cy="45" r="5" fill="#000"/>
          <path d="M 35 60 Q 50 72 65 60" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
          <!-- Stars in eyes -->
          <text x="40" y="40" font-size="8" fill="#F9A826">✨</text>
          <text x="60" y="40" font-size="8" fill="#F9A826">✨</text>
        </svg>
      </div>
      
      <h2 style="font-size: 2.8rem; margin-bottom: 1rem; font-weight: 600;">
        What About <span style="color: #A3C4F3;">YOU</span>?
      </h2>
      <p style="font-size: 1.4rem; line-height: 2; max-width: 600px; margin: 0 auto 2.5rem; color: #333;">
        Space weather affects <strong>everyone</strong> on Earth!<br>
        Including YOU! 🌍<br><br>
        Let's explore what's happening in<br>
        <strong style="color: #C8BFE7;">YOUR sky</strong> right now...
      </p>
      
      <!-- Feature Grid -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 500px; margin: 2rem auto;">
        <div style="padding: 1.5rem; background: #B5EAD7; border-radius: 12px; border: 2px solid #000; transition: transform 0.3s ease;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🌌</div>
          <div style="font-weight: 600; font-size: 1.1rem;">Northern Lights!</div>
          <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.25rem;">Are they visible tonight?</div>
        </div>
        
        <div style="padding: 1.5rem; background: #A3C4F3; border-radius: 12px; border: 2px solid #000; transition: transform 0.3s ease;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🌙</div>
          <div style="font-weight: 600; font-size: 1.1rem;">Moon Shapes</div>
          <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.25rem;">What does it look like?</div>
        </div>
        
        <div style="padding: 1.5rem; background: #C8BFE7; border-radius: 12px; border: 2px solid #000; transition: transform 0.3s ease;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">⭐</div>
          <div style="font-weight: 600; font-size: 1.1rem;">Star Stories</div>
          <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.25rem;">Click & learn!</div>
        </div>
        
        <div style="padding: 1.5rem; background: #FFD6E8; border-radius: 12px; border: 2px solid #000; transition: transform 0.3s ease;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎮</div>
          <div style="font-weight: 600; font-size: 1.1rem;">Fun Games</div>
          <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.25rem;">Play & learn!</div>
        </div>
      </div>
      
      <p style="font-size: 1.3rem; margin-top: 2.5rem; font-weight: 500;">
        Ready to explore? 🚀
      </p>
      
      <button class="onboarding-btn" onclick="window.finishOnboarding()" style="font-size: 1.3rem; padding: 1.5rem 3rem;">
        ✨ Show Me My Sky! →
      </button>
    </div>
  `;
}

function finishOnboarding() {
  // Mark as complete
  localStorage.setItem('skyMirrorOnboarding', 'complete');
  
  // Show completion animation
  const container = document.getElementById('onboardingContent');
  container.innerHTML = `
    <div class="onboarding-step" style="text-align: center; animation: fadeIn 0.5s ease-out;">
      <!-- Animated sky -->
      <div style="width: 200px; height: 200px; margin: 0 auto 2rem; position: relative;">
        <svg viewBox="0 0 200 200" style="width: 100%; height: 100%;">
          <!-- Moon and stars -->
          <circle cx="100" cy="80" r="40" fill="rgba(200,191,231,0.2)" stroke="#C8BFE7" stroke-width="3"/>
          <circle cx="30" cy="40" r="3" fill="#F9A826"/>
          <circle cx="170" cy="50" r="3" fill="#A3C4F3"/>
          <circle cx="50" cy="140" r="3" fill="#B5EAD7"/>
          <circle cx="160" cy="130" r="3" fill="#FFD6E8"/>
          <circle cx="90" cy="30" r="2" fill="#F9A826"/>
          <circle cx="120" cy="160" r="2" fill="#C8BFE7"/>
          
          <!-- Happy face on moon -->
          <circle cx="90" cy="75" r="4" fill="#000"/>
          <circle cx="110" cy="75" r="4" fill="#000"/>
          <path d="M 85 90 Q 100 100 115 90" fill="none" stroke="#000" stroke-width="2.5"/>
        </svg>
      </div>
      
      <h1 style="font-size: 3.5rem; margin-bottom: 1rem; font-weight: 600; background: linear-gradient(135deg, #A3C4F3, #C8BFE7, #B5EAD7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        Look Up! ✨
      </h1>
      <p style="font-size: 1.8rem; opacity: 0.8; font-weight: 400;">SkyMirror looks back...</p>
    </div>
  `;
  
  // Transition to main app after 2.5 seconds
  setTimeout(() => {
    completeOnboarding();
  }, 2500);
}

// Initialize onboarding on page load
function initOnboarding() {
  if (!hasCompletedOnboarding()) {
    startOnboarding();
  } else {
    // Skip straight to main app
    completeOnboarding();
  }
}

// Export functions
window.startOnboarding = startOnboarding;
window.skipOnboarding = skipOnboarding;
window.showWelcome = showWelcome;
window.showPerspectives = showPerspectives;
window.nextPerspective = nextPerspective;
window.showAboutYou = showAboutYou;
window.finishOnboarding = finishOnboarding;
window.initOnboarding = initOnboarding;

