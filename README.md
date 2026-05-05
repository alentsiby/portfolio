# 🚀 Futuristic Electronics & Computer Science Portfolio

Welcome to the source code for my **Futuristic Portfolio**! This repository hosts a premium, high-tech personal website tailored for a B.Tech student with a dual focus on Electronics and Computer Science.

The design bridges the gap between hardware and software, utilizing an "antigravity" aesthetic, neon circuit-inspired animations, and a sleek dark theme.

![Portfolio Preview](./assets/preview.png) *(Note: Add a screenshot of the portfolio here)*

---

## 🌟 Key Features

*   **Antigravity Aesthetic**: Floating, glassmorphic UI elements with smooth transitions.
*   **Circuit-Inspired Canvas Animation**: A custom HTML5 Canvas background that simulates a dynamic electronic network, routing signals and illuminating nodes.
*   **Hardware/Software Showcase**: A structured layout designed to display both hardware schematics and software repositories without clutter.
*   **Fully Responsive**: Adapts seamlessly from mobile devices to ultrawide desktop monitors.
*   **Interactive Terminal Effect**: A simulated terminal environment that types out introductions and capabilities.
*   **High-Performance**: Pure vanilla HTML/CSS/JS stack ensuring fast load times without heavy framework overhead.

---

## 🛠️ Tech Stack

*   **Structure**: Semantic HTML5
*   **Styling**: Vanilla CSS3 (Custom Variables, Flexbox/Grid, Glassmorphism, Animations)
*   **Logic & Animation**: Modern ES6+ JavaScript, HTML5 Canvas API
*   **Icons**: FontAwesome / Custom SVGs
*   **Fonts**: Inter & Fira Code (Google Fonts)

---

## 🚀 Getting Started

### Prerequisites

No special prerequisites are needed! Since this is a static site built with Vanilla HTML/CSS/JS, you only need a modern web browser.

### Running Locally

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/yourusername/futuristic-portfolio.git
    cd futuristic-portfolio
    ```

2.  **Serve the files**:
    You can simply open `index.html` in your browser. However, for the best experience (and to avoid CORS issues if you add external assets later), serve it using a local HTTP server:

    *Using Python 3:*
    ```bash
    python3 -m http.server 8080
    ```

    *Using Node.js (`serve`):*
    ```bash
    npx serve .
    ```

3.  **View**: Open your browser and navigate to `http://localhost:8080`.

---

## 📂 Project Structure

```text
futuristic-portfolio/
├── index.html        # Main HTML structure
├── style.css         # All styles (Variables, Layout, Glassmorphism, Animations)
├── script.js         # Interactivity, DOM manipulation, Canvas Network Animation
├── assets/           # Images, SVGs, and other media
│   └── profile.jpg   # Profile picture
├── README.md         # This documentation file
├── LICENSE           # License details
└── .gitignore        # Files ignored by git
```

---

## 🎨 Design System

*   **Primary Background**: Deep Navy / Cyber Black (`#0a0b10`)
*   **Accent Colors**: Electric Cyan (`#00f3ff`), Neon Purple (`#bc13fe`), Matrix Green (`#00ff9d`)
*   **Typography**: `Inter` for general readability, `Fira Code` for technical/terminal elements.

---

## 🤝 Customizing

Want to make it your own? Here are a few quick tips:

1.  **Update Content**: Open `index.html` and replace my information with yours (e.g., in the `<header>`, `#about`, `#skills`, and `#projects` sections).
2.  **Change Colors**: Open `style.css` and look for the `:root` block at the top. You can change the `--neon-blue`, `--neon-purple`, and `--neon-green` variables to alter the entire theme instantly.
3.  **Tweak Animations**: Check `script.js` to modify the speed, particle count, or connection radius of the background canvas animation.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Engineered with ⚡ by Alent.*
