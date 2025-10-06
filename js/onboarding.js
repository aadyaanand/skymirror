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
      <h1 style="font-size: 4rem; margin-bottom: 1rem;">🌌</h1>
      <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Welcome to SkyMirror</h2>
      <p style="font-size: 1.3rem; line-height: 1.8; max-width: 600px; margin: 2rem auto; opacity: 0.8;">
        Every day, something amazing happens 93 million miles away.<br><br>
        The Sun sends invisible waves of energy and particles toward Earth. This is called <strong>space weather</strong>.<br><br>
        It affects real people all around the world, in ways you might not expect...
      </p>
      <button class="onboarding-btn" onclick="window.showPerspectives()">
        Let's Meet Them →
      </button>
      <button class="onboarding-btn-skip" onclick="window.skipOnboarding()">
        Skip Introduction
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
  
  container.innerHTML = `
    <div class="onboarding-step" style="animation: fadeIn 0.5s ease-out;">
      <div style="font-size: 4rem; margin-bottom: 1rem;">${perspective.emoji}</div>
      <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${perspective.character}</h2>
      <h3 style="font-size: 1.3rem; opacity: 0.7; margin-bottom: 2rem;">${perspective.title}</h3>
      
      <div style="max-width: 700px; margin: 0 auto; padding: 2rem; background: rgba(163, 196, 243, 0.05); border-radius: 12px; border: 1px solid rgba(0,0,0,0.1);">
        <p style="line-height: 1.8; white-space: pre-line; font-size: 1.05rem;">${perspective.story}</p>
      </div>
      
      <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(181, 234, 215, 0.1); border-radius: 8px; max-width: 700px; margin-left: auto; margin-right: auto;">
        <p style="font-size: 0.95rem;"><strong>💡 Impact:</strong> ${perspective.impact}</p>
        <p style="font-size: 0.95rem; margin-top: 0.5rem;"><strong>✅ Solution:</strong> ${perspective.solution}</p>
      </div>
      
      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
        <button class="onboarding-btn" onclick="window.nextPerspective()">
          ${isLast ? "What About Me? →" : "Next Person →"}
        </button>
        <button class="onboarding-btn-skip" onclick="window.skipOnboarding()">
          Skip to App
        </button>
      </div>
      
      <p style="margin-top: 1rem; opacity: 0.5; font-size: 0.9rem;">
        Story ${onboardingState.currentPerspective + 1} of ${window.SpacePerspectives.length}
      </p>
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
      <h1 style="font-size: 4rem; margin-bottom: 1rem;">🌍</h1>
      <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">What About You?</h2>
      <p style="font-size: 1.3rem; line-height: 1.8; max-width: 600px; margin: 2rem auto; opacity: 0.8;">
        Space weather affects everyone on Earth, including you!<br><br>
        SkyMirror will show you what's happening in the sky above you <strong>right now</strong>.<br><br>
        You'll see:
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; max-width: 800px; margin: 2rem auto;">
        <div class="feature-preview">
          <div style="font-size: 2.5rem;">🌌</div>
          <div style="font-weight: 500; margin-top: 0.5rem;">Northern Lights</div>
          <div style="font-size: 0.85rem; opacity: 0.7;">Real-time aurora forecasts</div>
        </div>
        <div class="feature-preview">
          <div style="font-size: 2.5rem;">🌙</div>
          <div style="font-weight: 500; margin-top: 0.5rem;">Moon Phases</div>
          <div style="font-size: 0.85rem; opacity: 0.7;">See tonight's moon shape</div>
        </div>
        <div class="feature-preview">
          <div style="font-size: 2.5rem;">⭐</div>
          <div style="font-weight: 500; margin-top: 0.5rem;">Star Stories</div>
          <div style="font-size: 0.85rem; opacity: 0.7;">Click 30+ celestial objects</div>
        </div>
        <div class="feature-preview">
          <div style="font-size: 2.5rem;">🎮</div>
          <div style="font-weight: 500; margin-top: 0.5rem;">Learning Games</div>
          <div style="font-size: 0.85rem; opacity: 0.7;">Catch auroras & learn!</div>
        </div>
      </div>
      
      <p style="font-size: 1.1rem; margin-top: 2rem; opacity: 0.8;">
        Ready to explore your sky?
      </p>
      
      <button class="onboarding-btn" onclick="window.finishOnboarding()">
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
      <h1 style="font-size: 5rem; margin-bottom: 1rem;">🌟</h1>
      <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Look up!</h2>
      <p style="font-size: 1.5rem; opacity: 0.8;">SkyMirror looks back...</p>
    </div>
  `;
  
  // Transition to main app after 2 seconds
  setTimeout(() => {
    completeOnboarding();
  }, 2000);
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

