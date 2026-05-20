/* ==========================================================================
   NEON NEXUS ECOSYSTEM ROUTER & AUDIO SYNTHESIZER
   Core UI and Dynamic Particle Engine
   ========================================================================== */

// 1. Ecosystem Global State
let masterMode = 'showcase'; // 'showcase' | 'simulator'
let currentDesktopPage = 'landing';
let currentMobilePage = 'splash';
let globalAccent = 'blue';
let globalAudio = true;

// Web Audio API Context (Lazily instantiated on first user interaction)
let audioCtx = null;

// Ambient Particles Core Config
let canvas = null;
let ctx = null;
let particles = [];
const PARTICLE_COUNT = 60;

// Initialize app when window loads
window.addEventListener('DOMContentLoaded', () => {
    // Select canvas and launch background particles
    initParticlesCanvas();
    
    // Bind all buttons and elements
    bindGlobalInteractions();

    // Push initial status text
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
});

// 2. Web Audio API Synthesizer - AAA Gaming Quality Sound Effects
function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Low-level synthesizer utility
function synthesizeSound(freqStart, freqEnd, duration, type = 'sine', volStart = 0.1, sweep = 'exponential') {
    if (!globalAudio) return;
    try {
        initAudioContext();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freqStart, audioCtx.currentTime);
        
        if (freqEnd && freqStart !== freqEnd) {
            if (sweep === 'exponential') {
                osc.frequency.exponentialRampToValueAtTime(freqEnd, audioCtx.currentTime + duration);
            } else {
                osc.frequency.linearRampToValueAtTime(freqEnd, audioCtx.currentTime + duration);
            }
        }
        
        gainNode.gain.setValueAtTime(volStart, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.warn("Audio Context blocked or failed to initialize:", e);
    }
}

// Game specific SFX triggers
function triggerAudioSFX(type) {
    if (!globalAudio) return;
    
    switch(type) {
        case 'click':
            // High-tech cyber lock-on click sound (quick laser frequency drop)
            synthesizeSound(800, 200, 0.12, 'sine', 0.15);
            break;
            
        case 'ai-click':
            // Darker machine tone sound click
            synthesizeSound(400, 150, 0.15, 'sawtooth', 0.08);
            break;
            
        case 'win':
            // Majestic major key arpeggio win sound
            setTimeout(() => synthesizeSound(523.25, 523.25, 0.15, 'sine', 0.15), 0);    // C5
            setTimeout(() => synthesizeSound(659.25, 659.25, 0.15, 'sine', 0.15), 100);  // E5
            setTimeout(() => synthesizeSound(783.99, 783.99, 0.15, 'sine', 0.15), 200);  // G5
            setTimeout(() => synthesizeSound(1046.50, 1500, 0.5, 'sine', 0.2), 300);    // C6 + glow glide
            break;
            
        case 'draw':
            // Futuristic draw sound (low cyber buzz chord)
            synthesizeSound(180, 90, 0.45, 'sawtooth', 0.15, 'linear');
            break;
            
        case 'menu-nav':
            // Light premium navigation swipe sound
            synthesizeSound(900, 1400, 0.08, 'triangle', 0.1);
            break;
            
        case 'glitch':
            // 404 glitch error sound
            synthesizeSound(120, 240, 0.25, 'sawtooth', 0.12);
            synthesizeSound(280, 80, 0.2, 'sine', 0.1);
            break;
    }
}

// 3. UI Router Toggles
function switchMasterMode(mode) {
    masterMode = mode;
    triggerAudioSFX('menu-nav');
    
    // Toggle active tabs
    document.querySelectorAll('.tab-trigger').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-tab-${mode}`).classList.add('active');
    
    // Show correct section
    document.querySelectorAll('.workspace-section').forEach(view => view.classList.remove('active'));
    document.getElementById(`master-${mode}-view`).classList.add('active');
}

// Link click inside Showcase Matrix will force-load that page in simulator
function launchScreen(device, screen) {
    switchMasterMode('simulator');
    
    if (device === 'desktop') {
        navigateToDesktop(screen);
    } else if (device === 'mobile') {
        navigateToMobile(screen);
    }
}

// Desktop Router Layouts
function navigateToDesktop(page) {
    currentDesktopPage = page;
    triggerAudioSFX('menu-nav');

    // Remove active styles everywhere
    document.querySelectorAll('.desktop-page').forEach(div => div.classList.remove('active'));
    document.querySelectorAll('.sidebar-item').forEach(li => li.classList.remove('active'));
    
    // Toggle correct view panel
    const targetPage = document.getElementById(`dp-${page}`);
    if (targetPage) targetPage.classList.add('active');
    
    // Highlight sidebar items
    const targetSidebar = document.getElementById(`d-menu-${page}`);
    if (targetSidebar) targetSidebar.classList.add('active');

    // Specific triggers on routing
    if (page === '404') {
        triggerAudioSFX('glitch');
    } else if (page === 'vs-computer' || page === 'multiplayer') {
        resetGameEngine();
    } else if (page === 'stats') {
        refreshDashboardMetrics();
    }
}

// Mobile Router Layouts
function navigateToMobile(screen) {
    currentMobilePage = screen;
    triggerAudioSFX('menu-nav');

    // Hide/show views
    document.querySelectorAll('.mobile-page').forEach(div => div.classList.remove('active'));
    const targetScreen = document.getElementById(`mp-${screen}`);
    if (targetScreen) targetScreen.classList.add('active');

    // Highlight custom navigation highlights
    document.querySelectorAll('.tab-bar-item').forEach(item => item.classList.remove('active'));
    
    if (screen === 'menu') {
        document.querySelectorAll('.tab-bar-item')[0].classList.add('active');
    } else if (screen === 'stats') {
        document.querySelectorAll('.tab-bar-item')[1].classList.add('active');
        refreshMobileStats();
    } else if (screen === 'how') {
        document.querySelectorAll('.tab-bar-item')[2].classList.add('active');
    } else if (screen === 'profile') {
        document.querySelectorAll('.tab-bar-item')[3].classList.add('active');
    }

    if (screen === 'game') {
        resetMobileGameEngine();
    }
}

// 4. Unified Ecosystem Settings Syncing
function setGlobalAccent(color) {
    globalAccent = color;
    triggerAudioSFX('click');

    // Update body theme class to blue, pink, green
    document.body.className = `neon-theme-${color}`;

    // Highlight correct color pickers on UI
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.classList.contains(`btn-theme-${color}`)) {
            btn.classList.add('active');
        }
    });
}

function toggleGlobalAudio() {
    globalAudio = !globalAudio;
    
    // Force active state to play instantly
    if (globalAudio) {
        initAudioContext();
        triggerAudioSFX('click');
    }

    // Sync button text & states across indicators
    const masterBtn = document.getElementById('sfx-master-toggle');
    const dBtn = document.getElementById('d-sfx-text-btn');
    const mBtn = document.getElementById('m-sfx-text-btn');

    if (globalAudio) {
        masterBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i> ON`;
        masterBtn.classList.add('active');
        if (dBtn) dBtn.textContent = 'ACTIVE ON';
        if (mBtn) mBtn.textContent = 'ACTIVE';
    } else {
        masterBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> OFF`;
        masterBtn.classList.remove('active');
        if (dBtn) dBtn.textContent = 'MUTED';
        if (mBtn) mBtn.textContent = 'MUTED';
    }
}

// Custom Grid variant selections
function changeGridVariant(variant) {
    triggerAudioSFX('click');
    const dBoard = document.getElementById('d-board');
    if (dBoard) {
        dBoard.className = `tic-tac-toe-board ${variant}`;
    }
}

// 5. Interactive Ambient Floating Particles canvas
function initParticlesCanvas() {
    canvas = document.getElementById('ambient-particles');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);

    // Populate array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new GlowParticle());
    }

    // Launch drawing loop
    drawParticlesLoop();
}

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

class GlowParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around margins
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        // Shift particle tint slightly depending on global accent
        let fillStyleStr = 'rgba(59, 130, 246, ';
        if (globalAccent === 'pink') fillStyleStr = 'rgba(255, 77, 141, ';
        if (globalAccent === 'green') fillStyleStr = 'rgba(16, 185, 129, ';

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = fillStyleStr + this.alpha + ')';
        ctx.shadowColor = globalAccent === 'blue' ? '#3b82f6' : (globalAccent === 'pink' ? '#ff4d8d' : '#10b981');
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur
    }
}

function drawParticlesLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw all points
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw close lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                
                let strokeColor = 'rgba(59, 130, 246, ';
                if (globalAccent === 'pink') strokeColor = 'rgba(255, 77, 141, ';
                if (globalAccent === 'green') strokeColor = 'rgba(16, 185, 129, ';
                
                const alpha = (1 - (dist / 100)) * 0.08;
                ctx.strokeStyle = strokeColor + alpha + ')';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(drawParticlesLoop);
}

// 6. Clock helper functions
function updateSystemTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.querySelectorAll('.mobile-time').forEach(el => el.textContent = timeStr);
}

// Bind master event handlers
function bindGlobalInteractions() {
    // Touch interface unlock event to support dynamic audio on mobile Safari
    window.addEventListener('click', () => {
        initAudioContext();
    }, { once: true });
}
