# نفائس المحاضرات — Nafais al-Muhadirat

A professional digital study platform for *The Exquisite Lectures* — a classical Islamic theological text covering the orthodox Sunni creed (Aqidah).

## Features

- 📖 **Parallel Reader** — Side-by-side Arabic (Matn) and English translation/commentary
- 🔤 **Adjustable Font Size** — Reader comfort controls
- 🎧 **Audio Player** — Persistent recitation player with scrubber
- 🎬 **Video Companions** — YouTube lecture embeds per chapter
- 📊 **Progress Tracker** — Bookmark and track chapter completion
- 🌙 **Refined Dark Theme** — Parchment-and-gold aesthetic built for long reading sessions
- 📱 **Responsive** — Fully functional on mobile and desktop

## Tech Stack

- **React 18** — Component architecture
- **Tailwind CSS 3** — Utility-first styling
- **Lucide React** — Icon set
- **Google Fonts** — Cinzel, Cormorant Garamond, Amiri, JetBrains Mono

## Getting Started

### Prerequisites
- Node.js ≥ 16
- npm ≥ 8

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

The `build/` folder contains the optimised production build, ready for deployment.

## Project Structure

```
nafais-al-muhadirat/
├── public/
│   └── index.html          # HTML shell with Google Fonts
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx      # Collapsible chapter navigation
│   │   ├── ReaderView.jsx   # Main text reader with controls
│   │   ├── AudioPlayer.jsx  # Persistent bottom audio bar
│   │   ├── AboutView.jsx    # Introduction & historical overview
│   │   ├── ProgressView.jsx # Chapter completion tracker
│   │   └── TelegramModal.jsx # Support gateway modal
│   ├── data/
│   │   └── chapters.js      # All 13 chapter data
│   ├── App.jsx              # Root component & state
│   ├── index.js             # React entry point
│   └── index.css            # Global styles & CSS variables
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Deploying to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
# Also add: "homepage": "https://<username>.github.io/<repo-name>"

npm run deploy
```

## Customisation

- **Chapter data** — Edit `src/data/chapters.js` to update YouTube IDs, audio URLs, or text content.
- **Theme colours** — All design tokens are CSS custom properties in `src/index.css` (`:root` block).
- **Fonts** — Update `public/index.html` Google Fonts link and `tailwind.config.js` `fontFamily`.

## License

This project is for educational and non-commercial scholarly purposes.
