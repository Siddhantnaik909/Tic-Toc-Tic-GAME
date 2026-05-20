/* ==========================================================================
   NEON NEXUS RESPONSIVE REDESIGN JAVASCRIPT
   Playable Board State, Unbeatable Minimax AI, and Web Audio SFX Synthesizer
   ========================================================================== */

// 1. Core State variables
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let currentPlayer = 'X'; // X always goes first
let gameMode = 'vs-computer'; // 'vs-computer' | 'multiplayer'
let aiDifficulty = 'hard'; // 'easy' | 'medium' | 'hard'

let scoreX = 0;
let scoreO = 0;
let totalMatches = 0;
let sfxEnabled = true;

// Web Audio Context
let audioCtx = null;

// Background Ambient Particles
let canvas = null;
let ctx = null;
let particles = [];
const PARTICLE_COUNT = 35;

// Winning combos
const WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    initCanvasParticles();
    resetBoardArena();
    updateScoreUI();
});

// --- 2. Web Audio API Synthesizer (AAA Gaming SFX Effects) ---
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSoundTone(freqStart, freqEnd, duration, type = 'sine', volume = 0.1) {
    if (!sfxEnabled) return;
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freqStart, audioCtx.currentTime);

        if (freqEnd && freqStart !== freqEnd) {
            osc.frequency.exponentialRampToValueAtTime(freqEnd, audioCtx.currentTime + duration);
        }

        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.warn("Audio Context blocked:", e);
    }
}

function playSound(type) {
    if (!sfxEnabled) return;

    switch(type) {
        case 'click-x':
            // High sweep click laser beep
            playSoundTone(900, 300, 0.12, 'sine', 0.18);
            break;
        case 'click-o':
            // Lower electronic tone click
            playSoundTone(500, 150, 0.15, 'triangle', 0.15);
            break;
        case 'win':
            // Uplifting electronica major chord arpeggio
            setTimeout(() => playSoundTone(523.25, 523.25, 0.15, 'sine', 0.12), 0);
            setTimeout(() => playSoundTone(659.25, 659.25, 0.15, 'sine', 0.12), 90);
            setTimeout(() => playSoundTone(783.99, 783.99, 0.15, 'sine', 0.12), 180);
            setTimeout(() => playSoundTone(1046.50, 1400, 0.45, 'sine', 0.18), 270);
            break;
        case 'draw':
            // Low digital parity flatline sound
            playSoundTone(180, 95, 0.45, 'sawtooth', 0.12);
            break;
        case 'nav':
            // Quick dynamic interface sweep
            playSoundTone(800, 1200, 0.08, 'sine', 0.08);
            break;
    }
}

function toggleAudioSFX() {
    sfxEnabled = !sfxEnabled;
    const btn = document.getElementById('nav-sfx-toggle');
    
    if (sfxEnabled) {
        initAudio();
        btn.innerHTML = `<i class="fa-solid fa-volume-high"></i> <span class="btn-text">SOUND ON</span>`;
        btn.classList.add('active');
        playSound('nav');
    } else {
        btn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> <span class="btn-text">SOUND OFF</span>`;
        btn.classList.remove('active');
    }
}

// --- 3. Mode & Accent Customizers ---
function setGameMode(mode) {
    if (gameMode === mode) return;
    gameMode = mode;
    playSound('nav');

    // Highlight menu button
    document.getElementById('btn-mode-ai').classList.remove('active');
    document.getElementById('btn-mode-local').classList.remove('active');

    if (mode === 'vs-computer') {
        document.getElementById('btn-mode-ai').classList.add('active');
        document.getElementById('ai-controls-panel').style.opacity = '1';
        document.getElementById('ai-controls-panel').style.pointerEvents = 'all';
        document.getElementById('player-o-label').textContent = 'Computer (O)';
        document.getElementById('avatar-o-icon').innerHTML = `<i class="fa-solid fa-robot"></i>`;
    } else {
        document.getElementById('btn-mode-local').classList.add('active');
        document.getElementById('ai-controls-panel').style.opacity = '0.4';
        document.getElementById('ai-controls-panel').style.pointerEvents = 'none';
        document.getElementById('player-o-label').textContent = 'Player O (Local)';
        document.getElementById('avatar-o-icon').innerHTML = `<i class="fa-solid fa-user"></i>`;
    }

    resetScores();
}

function setAccentTheme(color) {
    playSound('nav');
    document.body.className = `neon-theme-${color}`;

    // Highlight color btn
    document.querySelectorAll('.accent-selectors .color-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.classList.contains(`btn-${color}`)) btn.classList.add('active');
    });

    // Mirror in avatar O icon if pink
    const oAvatar = document.querySelector('.o-avatar');
    if (oAvatar) {
        oAvatar.className = (color === 'green') ? 'avatar o-avatar green-avatar' : 'avatar o-avatar';
    }

    const oProfile = document.getElementById('profile-o');
    if (oProfile) {
        oProfile.className = (color === 'green') ? 'score-profile o-green' : 'score-profile';
    }
}

// --- 4. Interactive Core Game loop ---
function makeMove(cellIndex) {
    if (!gameActive || board[cellIndex] !== '') return;

    // Block human clicks during AI think-time
    if (gameMode === 'vs-computer' && currentPlayer === 'O') return;

    board[cellIndex] = currentPlayer;
    playSound(currentPlayer === 'X' ? 'click-x' : 'click-o');

    // Render token
    const cellEl = document.querySelector(`.grid-cell[data-index="${cellIndex}"]`);
    if (cellEl) {
        cellEl.textContent = currentPlayer;
        cellEl.classList.add(currentPlayer === 'X' ? 'cell-x' : 'cell-y');
        if (currentPlayer === 'O' && document.body.classList.contains('neon-theme-green')) {
            cellEl.classList.add('o-green');
        }
    }

    if (evaluateGameOutcome()) return;

    // Rotate player turns
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    updateTurnBar();

    // AI routine if appropriate
    if (gameMode === 'vs-computer' && currentPlayer === 'O') {
        setTimeout(triggerAIMove, 500);
    }
}

function triggerAIMove() {
    if (!gameActive) return;

    const bestMoveIndex = getOptimalMove(board, aiDifficulty);
    board[bestMoveIndex] = 'O';
    playSound('click-o');

    const cellEl = document.querySelector(`.grid-cell[data-index="${bestMoveIndex}"]`);
    if (cellEl) {
        cellEl.textContent = 'O';
        cellEl.classList.add('cell-o');
        if (document.body.classList.contains('neon-theme-green')) {
            cellEl.classList.add('o-green');
        }
    }

    if (evaluateGameOutcome()) return;

    currentPlayer = 'X';
    updateTurnBar();
}

function updateTurnBar() {
    // Add turn hint classes to body for responsive hover preview glows
    document.body.classList.remove('active-turn-x', 'active-turn-o');
    document.body.classList.add(currentPlayer === 'X' ? 'active-turn-x' : 'active-turn-o');

    // Score profile highlights
    document.getElementById('profile-x').classList.remove('active');
    document.getElementById('profile-o').classList.remove('active');
    
    const textEl = document.getElementById('turn-meter-lbl');
    const fillEl = document.getElementById('turn-meter-fill');
    
    if (currentPlayer === 'X') {
        document.getElementById('profile-x').classList.add('active');
        document.getElementById('status-x-text').textContent = 'ACTIVE TURN';
        document.getElementById('status-o-text').textContent = 'WAITING';
        
        if (textEl) textEl.textContent = "Player X's Turn";
        if (fillEl) {
            fillEl.style.width = '30%';
            fillEl.style.backgroundColor = 'var(--neon-blue)';
            fillEl.style.boxShadow = '0 0 8px var(--neon-blue)';
        }
    } else {
        document.getElementById('profile-o').classList.add('active');
        document.getElementById('status-o-text').textContent = 'ACTIVE TURN';
        document.getElementById('status-x-text').textContent = 'WAITING';
        
        if (textEl) textEl.textContent = (gameMode === 'vs-computer') ? "Computer's Turn" : "Player O's Turn";
        if (fillEl) {
            fillEl.style.width = '70%';
            fillEl.style.backgroundColor = 'var(--neon-pink)';
            fillEl.style.boxShadow = '0 0 8px var(--neon-pink)';
        }
    }
}

// Win and draw conditions checking
function evaluateGameOutcome() {
    const win = scanWin(board);
    if (win) {
        gameActive = false;
        highlightWinningCells(win.line);
        playSound('win');
        
        setTimeout(() => {
            showResultOverlay('win', win.player);
        }, 550);
        return true;
    }

    const draw = scanDraw(board);
    if (draw) {
        gameActive = false;
        playSound('draw');
        setTimeout(() => {
            showResultOverlay('draw');
        }, 300);
        return true;
    }

    return false;
}

function highlightWinningCells(indices) {
    const cells = document.querySelectorAll('.grid-cell');
    indices.forEach(idx => {
        cells[idx].style.boxShadow = '0 0 15px var(--accent-primary)';
        cells[idx].style.borderColor = 'var(--accent-primary)';
    });
}

function showResultOverlay(outcome, winnerSymbol = null) {
    if (outcome === 'win') {
        const overlay = document.getElementById('victory-overlay');
        const title = document.getElementById('victory-title');
        const desc = document.getElementById('victory-desc');
        
        if (gameMode === 'vs-computer') {
            if (winnerSymbol === 'X') {
                title.textContent = 'VICTORY!';
                desc.textContent = `Player X beat the Computer on ${aiDifficulty} difficulty.`;
                scoreX++;
                appendLogEntry('VS Computer', `Computer (${aiDifficulty})`, 'WIN');
            } else {
                title.textContent = 'DEFEAT!';
                desc.textContent = `The Computer defeated Player X.`;
                scoreO++;
                appendLogEntry('VS Computer', `Computer (${aiDifficulty})`, 'LOSS');
            }
        } else {
            // Local 2 players
            title.textContent = `PLAYER ${winnerSymbol} WINS!`;
            desc.textContent = `Player ${winnerSymbol} won the match.`;
            if (winnerSymbol === 'X') scoreX++;
            else scoreO++;
            appendLogEntry('Local 2P', `Player O`, winnerSymbol === 'X' ? 'WIN' : 'LOSS');
        }
        overlay.classList.add('active');
        
    } else if (outcome === 'draw') {
        const overlay = document.getElementById('draw-overlay');
        overlay.classList.add('active');
        
        if (gameMode === 'vs-computer') {
            appendLogEntry('VS Computer', `Computer (${aiDifficulty})`, 'DRAW');
        } else {
            appendLogEntry('Local 2P', 'Player O', 'DRAW');
        }
    }
    
    totalMatches++;
    updateScoreUI();
}

function updateScoreUI() {
    document.getElementById('score-x-val').textContent = scoreX;
    document.getElementById('score-o-val').textContent = scoreO;
    document.getElementById('metric-games').textContent = totalMatches;
    
    const winrateEl = document.getElementById('metric-winrate');
    const rate = (totalMatches > 0) ? Math.round((scoreX / totalMatches) * 100) : 0;
    if (winrateEl) winrateEl.textContent = `${rate}%`;
}

function resetBoardArena() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';

    // Clear overlay cards
    document.getElementById('victory-overlay').classList.remove('active');
    document.getElementById('draw-overlay').classList.remove('active');

    // Clean grid nodes
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.textContent = '';
        cell.className = 'grid-cell';
        cell.style.boxShadow = '';
        cell.style.borderColor = '';
    });

    updateTurnBar();
}

function resetScores() {
    scoreX = 0;
    scoreO = 0;
    totalMatches = 0;
    
    // Clear list
    document.getElementById('session-log-list').innerHTML = `<li class="empty-log-msg">No matches played yet.</li>`;
    
    updateScoreUI();
    resetBoardArena();
}

// Add terminal entries in the operations column
function appendLogEntry(mode, opponent, outcome) {
    const list = document.getElementById('session-log-list');
    const emptyMsg = list.querySelector('.empty-log-msg');
    if (emptyMsg) emptyMsg.remove();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let spanClass = 'outcome-draw';
    if (outcome === 'WIN') spanClass = 'outcome-win';
    if (outcome === 'LOSS') spanClass = 'outcome-loss';

    const item = document.createElement('li');
    item.className = 'log-item';
    item.innerHTML = `
        <span>[${timestamp}] ${mode} vs ${opponent}</span>
        <span class="${spanClass}">${outcome}</span>
    `;

    list.insertBefore(item, list.firstChild);
    
    // Cap at 4 logs
    if (list.children.length > 4) {
        list.lastChild.remove();
    }
}

// AI Calibration levels
function setAIDifficulty(diff) {
    if (aiDifficulty === diff) return;
    aiDifficulty = diff;
    playSound('nav');

    document.getElementById('btn-diff-easy').classList.remove('active');
    document.getElementById('btn-diff-medium').classList.remove('active');
    document.getElementById('btn-diff-hard').classList.remove('active');

    document.getElementById(`btn-diff-${diff}`).classList.add('active');

    resetBoardArena();
}

// --- 5. Unbeatable AI Algorithms ---
function getOptimalMove(boardState, difficulty) {
    if (difficulty === 'easy') {
        return findRandomMove(boardState);
    }
    
    if (difficulty === 'medium') {
        // Defensive blocks and immediate win sweeps
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === '') {
                boardState[i] = 'O';
                if (scanWin(boardState)) {
                    boardState[i] = '';
                    return i;
                }
                boardState[i] = '';
            }
        }
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === '') {
                boardState[i] = 'X';
                if (scanWin(boardState)) {
                    boardState[i] = '';
                    return i;
                }
                boardState[i] = '';
            }
        }
        if (boardState[4] === '') return 4; // Center
        return findRandomMove(boardState);
    }

    // Minimax hard unbeatable bot
    let bestVal = -Infinity;
    let targetMove = -1;

    for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') {
            boardState[i] = 'O';
            let moveVal = minimaxEvaluate(boardState, 0, false);
            boardState[i] = '';

            if (moveVal > bestVal) {
                bestVal = moveVal;
                targetMove = i;
            }
        }
    }
    return targetMove;
}

function findRandomMove(boardState) {
    let empty = [];
    for (let i = 0; i < 9; i++) {
        if (boardState[i] === '') empty.push(i);
    }
    return empty[Math.floor(Math.random() * empty.length)];
}

function minimaxEvaluate(tempBoard, depth, isMax) {
    const win = scanWin(tempBoard);
    if (win) {
        return (win.player === 'O') ? (10 - depth) : (depth - 10);
    }
    if (scanDraw(tempBoard)) return 0;

    if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === '') {
                tempBoard[i] = 'O';
                let score = minimaxEvaluate(tempBoard, depth + 1, false);
                tempBoard[i] = '';
                best = Math.max(score, best);
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === '') {
                tempBoard[i] = 'X';
                let score = minimaxEvaluate(tempBoard, depth + 1, true);
                tempBoard[i] = '';
                best = Math.min(score, best);
            }
        }
        return best;
    }
}

function scanWin(boardState) {
    for (let line of WIN_LINES) {
        const [a, b, c] = line;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return { player: boardState[a], line: line };
        }
    }
    return null;
}

function scanDraw(boardState) {
    return boardState.every(c => c !== '');
}

// --- 6. Ambient Canvas Particles ---
function initCanvasParticles() {
    canvas = document.getElementById('ambient-particles');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    adjustCanvasSize();
    window.addEventListener('resize', adjustCanvasSize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new LightParticle());
    }

    animateParticles();
}

function adjustCanvasSize() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

class LightParticle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 0.8;
        this.alpha = Math.random() * 0.45 + 0.1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        let fill = 'rgba(59, 130, 246, ';
        let accent = document.body.className;
        if (accent.includes('pink')) fill = 'rgba(255, 77, 141, ';
        if (accent.includes('green')) fill = 'rgba(16, 185, 129, ';

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = fill + this.alpha + ')';
        ctx.fill();
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
