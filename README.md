# 🎮 Tic Toc Tic — Modern Responsive Tic Tac Toe Game

<div align="center">

![Tic Tac Toe](https://img.shields.io/badge/Game-Tic%20Tac%20Toe-3b82f6?style=for-the-badge&logo=gamepad&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=for-the-badge&logo=github&logoColor=white)

**A premium, fully responsive Tic Tac Toe game with a modern neon gaming UI, unbeatable AI, and smooth animations — playable on any device.**

[🎮 Play Live](https://siddhantnaik909.github.io/Tic-Toc-Tic-GAME/) • [📂 View Source](https://github.com/Siddhantnaik909/Tic-Toc-Tic-GAME)

</div>

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
├── archive/          # Old/backup files (not used by the game)
│   ├── app.js
│   ├── game.css
│   ├── game.js
│   └── style.css
└── README.md         # This file
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
| **Desktop (> 850px)** | 3-column dashboard: Scoreboard | Game Board | Settings |
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

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ and lots of ☕

⭐ **Star this repo if you enjoyed the game!** ⭐

</div>
