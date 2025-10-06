// SkyMirror — Educational Space Weather Game

// Game State
let gameState = {
  score: 0,
  timeLeft: 60,
  auroras: [],
  aurorasCaught: 0,
  storiesUnlocked: 0,
  gameInterval: null,
  spawnInterval: null,
  gameSpeed: 1.0 // Starts at 1x, increases over time
};

// Aurora Facts for Educational Popups
const auroraFacts = [
  {
    title: "What Causes Auroras?",
    text: "Auroras happen when charged particles from the Sun (solar wind) collide with gases in Earth's atmosphere! The green color comes from oxygen molecules 60-150 miles up."
  },
  {
    title: "Solar Wind Speed",
    text: "The solar wind travels at 250-750 km/second! When it hits Earth's magnetosphere, it can cause beautiful auroras and affect satellites and GPS."
  },
  {
    title: "The Kp Index",
    text: "Scientists use the Kp index (0-9) to measure geomagnetic storms. Kp 5+ means auroras might be visible in northern US states!"
  },
  {
    title: "Aurora Colors",
    text: "Green auroras are most common (oxygen at 60-150 miles). Red auroras happen higher up (150+ miles). Blue/purple come from nitrogen!"
  },
  {
    title: "Space Weather Impacts",
    text: "Strong solar storms can disrupt GPS, damage satellites, and even cause power blackouts! The 1989 Quebec blackout affected 6 million people."
  },
  {
    title: "Ancient Auroras",
    text: "Vikings thought auroras were reflections from the armor of Valkyries! Ancient Chinese called them 'dragon lights in the sky.'"
  }
];

// Navigation
function startGame() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('gameScreen').classList.add('active');
  initGame();
}

function showDiary() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('diaryScreen').classList.add('active');
  loadDiary();
}

function showStories() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('storiesScreen').classList.add('active');
  loadStories();
}

function backToMenu() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('mainMenu').classList.add('active');
  if (gameState.gameInterval) {
    clearInterval(gameState.gameInterval);
    clearInterval(gameState.spawnInterval);
  }
  updateStats();
}

// Generate stable star field (doesn't change during game)
const starField = [];
for (let i = 0; i < 100; i++) {
  starField.push({
    x: Math.random() * 800,
    y: Math.random() * 600,
    size: Math.random() > 0.8 ? 2 : 1,
    brightness: 0.5 + Math.random() * 0.5
  });
}

// Aurora Catcher Game
function initGame() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  // Reset game state
  gameState.score = 0;
  gameState.timeLeft = 60;
  gameState.auroras = [];
  gameState.gameSpeed = 1.0;
  
  document.getElementById('gameScore').textContent = '0';
  document.getElementById('gameTime').textContent = '60';
  
  // Spawn auroras
  gameState.spawnInterval = setInterval(() => {
    spawnAurora();
  }, 1500);
  
  // Game loop
  gameState.gameInterval = setInterval(() => {
    updateGame(ctx, canvas);
    drawGame(ctx, canvas);
    
    // Update speed indicator
    document.getElementById('gameSpeed').textContent = gameState.gameSpeed.toFixed(1);
  }, 1000 / 60); // 60 FPS
  
  // Timer
  const timerInterval = setInterval(() => {
    gameState.timeLeft--;
    document.getElementById('gameTime').textContent = gameState.timeLeft;
    
    if (gameState.timeLeft <= 0) {
      endGame();
      clearInterval(timerInterval);
    }
  }, 1000);
  
  // Click handler
  canvas.addEventListener('click', handleClick);
}

function spawnAurora() {
  const canvas = document.getElementById('gameCanvas');
  const aurora = {
    x: Math.random() * canvas.width,
    y: -50,
    baseSpeed: 0.8 + Math.random() * 0.7, // Slower base speed (0.8-1.5)
    width: 80 + Math.random() * 40,
    height: 30,
    color: ['#A3C4F3', '#B5EAD7', '#C8BFE7'][Math.floor(Math.random() * 3)],
    caught: false
  };
  gameState.auroras.push(aurora);
}

function updateGame(ctx, canvas) {
  // Gradually increase speed (reaches 2x speed by 30 seconds)
  gameState.gameSpeed = 1.0 + ((60 - gameState.timeLeft) / 60) * 1.5;
  
  // Move auroras down with dynamic speed
  gameState.auroras = gameState.auroras.filter(aurora => {
    if (!aurora.caught) {
      aurora.y += aurora.baseSpeed * gameState.gameSpeed;
      return aurora.y < canvas.height + 50;
    }
    return false;
  });
}

function drawGame(ctx, canvas) {
  // Clear canvas - BLACK BACKGROUND
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw stable star field - WHITE STARS
  starField.forEach(star => {
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Draw auroras
  gameState.auroras.forEach(aurora => {
    ctx.strokeStyle = aurora.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(aurora.x, aurora.y);
    ctx.quadraticCurveTo(
      aurora.x + aurora.width / 2,
      aurora.y - 20,
      aurora.x + aurora.width,
      aurora.y
    );
    ctx.stroke();
    
    // Inner wave
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(aurora.x + 10, aurora.y + 10);
    ctx.quadraticCurveTo(
      aurora.x + aurora.width / 2,
      aurora.y - 10,
      aurora.x + aurora.width - 10,
      aurora.y + 10
    );
    ctx.stroke();
    ctx.globalAlpha = 1;
  });
}

function handleClick(e) {
  const canvas = document.getElementById('gameCanvas');
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  
  // Check if clicked on aurora
  for (let i = gameState.auroras.length - 1; i >= 0; i--) {
    const aurora = gameState.auroras[i];
    if (clickX >= aurora.x && clickX <= aurora.x + aurora.width &&
        clickY >= aurora.y - 20 && clickY <= aurora.y + 20) {
      // Caught!
      aurora.caught = true;
      gameState.auroras.splice(i, 1);
      gameState.score += 10;
      gameState.aurorasCaught++;
      document.getElementById('gameScore').textContent = gameState.score;
      
      // Show educational popup
      showEducationalPopup();
      break;
    }
  }
}

function showEducationalPopup() {
  const fact = auroraFacts[Math.floor(Math.random() * auroraFacts.length)];
  document.getElementById('popupTitle').textContent = fact.title;
  document.getElementById('popupText').textContent = fact.text;
  document.getElementById('eduPopup').classList.add('active');
}

function closePopup() {
  document.getElementById('eduPopup').classList.remove('active');
}

function endGame() {
  clearInterval(gameState.gameInterval);
  clearInterval(gameState.spawnInterval);
  
  // Save score
  saveDiaryEntry(`Caught ${gameState.score / 10} auroras! Learned about space weather.`);
  
  // Update total
  const total = parseInt(localStorage.getItem('totalAuroras') || '0');
  localStorage.setItem('totalAuroras', total + (gameState.score / 10));
  
  alert(`Game Over! You caught ${gameState.score / 10} auroras and earned ${gameState.score} points!`);
  backToMenu();
}

// Diary System
function saveDiaryEntry(text) {
  const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
  entries.unshift({
    date: new Date().toISOString(),
    text: text
  });
  localStorage.setItem('diaryEntries', JSON.stringify(entries.slice(0, 50)));
}

function loadDiary() {
  const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
  const container = document.getElementById('diaryEntries');
  
  if (entries.length === 0) {
    container.innerHTML = '<p style="text-align: center; opacity: 0.5; padding: 3rem;">No entries yet. Play Aurora Catcher to start your journey!</p>';
    return;
  }
  
  container.innerHTML = entries.map(entry => `
    <div class="diary-entry">
      <div class="entry-date">${new Date(entry.date).toLocaleDateString()}</div>
      <div class="entry-text">${entry.text}</div>
    </div>
  `).join('');
}

// Stories System
function loadStories() {
  // Get TOTAL auroras from localStorage, not just current session
  const totalAuroras = parseInt(localStorage.getItem('totalAuroras') || '0');
  
  const stories = [
    { 
      name: 'The Sun', 
      emoji: '☀️', 
      unlocked: true,
      story: 'Our star, the Sun, is the source of all space weather. Every 11 years, its activity peaks, creating spectacular auroras!'
    },
    { 
      name: 'Solar Wind', 
      emoji: '💨', 
      unlocked: totalAuroras >= 5,
      story: 'The solar wind is a stream of charged particles flowing from the Sun at 250-750 km/second. When it reaches Earth, magic happens!'
    },
    { 
      name: 'Aurora Borealis', 
      emoji: '🌌', 
      unlocked: totalAuroras >= 10,
      story: 'Northern Lights dance when solar particles collide with oxygen and nitrogen in Earth\'s atmosphere 60-150 miles up. Green, red, and purple ribbons paint the night sky!'
    },
    { 
      name: 'CME Journey', 
      emoji: '🌊', 
      unlocked: totalAuroras >= 20,
      story: 'Coronal Mass Ejections are massive clouds of solar plasma. When they hit Earth, they can create the most powerful geomagnetic storms and brightest auroras!'
    },
  ];
  
  const container = document.getElementById('storiesGrid');
  container.innerHTML = stories.map(story => `
    <div class="story-card ${story.unlocked ? '' : 'locked'}" ${story.unlocked ? `onclick="showStory('${story.name}', '${story.story}')"` : ''}>
      <div style="font-size: 3rem; text-align: center;">${story.emoji}</div>
      <div style="text-align: center; margin-top: 0.5rem; font-weight: 500;">${story.name}</div>
      ${!story.unlocked ? `<div style="font-size: 0.8rem; opacity: 0.5; text-align: center; margin-top: 0.25rem;">Catch ${story.unlocked === false ? '?' : ''} more auroras</div>` : '<div style="font-size: 0.8rem; color: #A3C4F3; text-align: center; margin-top: 0.25rem;">Click to read</div>'}
    </div>
  `).join('');
}

function showStory(name, story) {
  document.getElementById('popupTitle').textContent = name;
  document.getElementById('popupText').textContent = story;
  document.getElementById('eduPopup').classList.add('active');
}

// Stats Update
function updateStats() {
  const total = parseInt(localStorage.getItem('totalAuroras') || '0');
  document.getElementById('totalAuroras').textContent = total;
  
  const stories = Math.min(Math.floor(total / 5), 4);
  document.getElementById('totalStories').textContent = stories;
  gameState.storiesUnlocked = stories;
}

// Initialize
updateStats();

