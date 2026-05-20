# 🎮 Tic Toc Tic — Modern Responsive Tic Tac Toe Game

<div align="center">

![Prodigy Tech](https://img.shields.io/badge/Prodigy%20Tech-Internship%20Task-ff4d8d?style=for-the-badge&logo=briefcase&logoColor=white)
![Task](https://img.shields.io/badge/Task-02%20%7C%20Tic%20Tac%20Toe-3b82f6?style=for-the-badge&logo=checkmarx&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=for-the-badge&logo=github&logoColor=white)

**A premium, fully responsive Tic Tac Toe game built as part of the Prodigy Tech Web Development Internship.**  
Features a modern neon gaming UI, unbeatable AI, synthesized sound effects, and smooth animations — playable on any device.

[🎮 Play Live](https://siddhantnaik909.github.io/Tic-Toc-Tic-GAME/) • [📂 View Source](https://github.com/Siddhantnaik909/Tic-Toc-Tic-GAME) • [🏢 Prodigy Tech](https://prodigyinfotech.dev/)

</div>

---

## 🏢 Internship Details

| Detail | Info |
|---|---|
| 🏢 **Organization** | Prodigy InfoTech |
| 👨‍💻 **Intern** | Siddhant Naik |
| 📋 **Task** | Task 02 — Build a Tic Tac Toe Web Application |
| 🛠️ **Domain** | Web Development |
| 📅 **Status** | ✅ Completed |

### 📋 Task Requirements (Prodigy Tech)
> Build an interactive Tic Tac Toe web application where two players can take turns clicking on a 3×3 grid, implementing functions to check for winning conditions or a draw, and displaying the result at the end of the game.

**What was delivered beyond the requirements:**
- ✅ Player vs Player (local 2-player mode)
- ✅ Player vs Computer with 3 AI difficulty levels (Easy / Medium / Hard Minimax)
- ✅ Win, draw, and loss detection with visual highlighting
- ✅ Live scoreboard and match history log
- ✅ Synthesized sound effects via Web Audio API
- ✅ Animated canvas particle background
- ✅ 3 switchable neon color themes
- ✅ Fully responsive for desktop, tablet, and mobile
- ✅ Premium glassmorphism UI with neon glow effects

---

## ✨ Features

- 🤖 **VS Computer** — Play against an AI with 3 difficulty levels:
  - 🟢 **Easy** — Random moves
  - 🟡 **Medium** — Tactical blocking & win detection
  - 🔴 **Hard** — Unbeatable Minimax algorithm
- 👥 **Local 2-Player** — Play with a friend on the same device
- 🎨 **3 Color Themes** — Switch between Neon Blue, Neon Pink, and Neon Green
- 🔊 **Sound Effects** — Synthesized Web Audio SFX (no external files needed)
- 📊 **Scoreboard** — Live score tracking and game history log
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile (down to 320px)
- ✨ **Premium UI** — Glassmorphism, soft glow effects, animated particles background
- 🚀 **No Dependencies** — Pure HTML, CSS, and JavaScript. No frameworks, no installs.

---

## 🖥️ Screenshots

| Desktop View | Mobile View |
|:---:|:---:|
| Side-by-side dashboard layout | Stacked card layout |
| Player profiles + Game board + Stats | Compact scorebar + Touch-friendly grid |

---

## 🚀 How to Play

### ▶️ Play Online (GitHub Pages)
Simply visit the live link:

👉 **[https://siddhantnaik909.github.io/Tic-Toc-Tic-GAME/](https://siddhantnaik909.github.io/Tic-Toc-Tic-GAME/)**

### 💻 Run Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Siddhantnaik909/Tic-Toc-Tic-GAME.git
   ```
2. **Open the game:**
   ```bash
   cd Tic-Toc-Tic-GAME
   # Simply open index.html in your browser
   start index.html      # Windows
   open index.html       # macOS
   xdg-open index.html  # Linux
   ```
   No server or build step required!

---

## 📁 Project Structure

```
Tic-Toc-Tic-GAME/
├── index.html        # Main game page (HTML structure + embedded JS logic)
├── style.css         # Visual styles (glassmorphism, neon glow, responsive layout)
├── README.md         # This file
└── archive/          # Old/backup files (not used by the game)
    ├── app.js
    ├── game.css
    ├── game.js
    └── style.css
```

---

## 🛠️ Technology Stack

| Technology | Usage |
|---|---|
| **HTML5** | Game structure, semantic markup |
| **CSS3** | Responsive layout, glassmorphism, animations, neon glow |
| **Vanilla JavaScript** | Game logic, AI engine, Web Audio synthesis |
| **Web Audio API** | Synthesized sound effects (no external assets) |
| **Canvas API** | Animated floating particle background |

---

## 🤖 AI Engine Details

The computer opponent uses three distinct intelligence levels:

| Difficulty | Strategy |
|---|---|
| 🟢 Easy | Picks a completely random empty cell |
| 🟡 Medium | Wins immediately if possible, blocks player wins, prefers center |
| 🔴 Hard | Uses the **Minimax algorithm** — mathematically unbeatable |

The **Minimax algorithm** evaluates every possible future game state recursively, always choosing the move that leads to the best outcome for the computer, making it impossible to beat on Hard difficulty.

---

## 📱 Responsive Design

The game is fully responsive across all screen sizes:

| Screen | Layout |
|---|---|
| **Desktop (> 850px)** | 3-column dashboard: Scoreboard \| Game Board \| Settings |
| **Tablet (500–850px)** | 2-column layout with stacked bottom section |
| **Mobile (< 500px)** | Single-column stacked layout with touch-friendly cells |
| **Small Mobile (< 600px)** | Navigation buttons collapse to icon-only toggles (🤖 👥 🔊) |

---

## 🎨 Design Highlights

- **Dark Navy / Black Background** (`#03050c`)
- **Neon Blue Accent** (`#3b82f6`)
- **Neon Pink Accent** (`#ff4d8d`)
- **Neon Green Accent** (`#10b981`)
- **Inter Font** — Clean, modern, highly legible
- **Glassmorphism Cards** — `backdrop-filter: blur()` with translucent borders
- **Soft Glow Shadows** — `box-shadow` neon glow effects on active elements
- **Ambient Particles** — Canvas-rendered floating light particles

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👤 Author

**Siddhant Naik**
- GitHub: [@Siddhantnaik909](https://github.com/Siddhantnaik909)
- Internship: [Prodigy InfoTech](https://prodigyinfotech.dev/) — Web Development Intern

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

🏢 Built as part of **Prodigy Tech Web Development Internship** — Task 02

Made with ❤️ by **Siddhant Naik**

⭐ **Star this repo if you enjoyed the game!** ⭐

</div>
