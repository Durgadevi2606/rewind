# REWIND — An Atmospheric Indie Undo-Puzzle Adventure

> *"Every mistake leaves a trace. Every rewind tells a story."*

**REWIND** is a production-quality, portfolio-grade indie puzzle game built with **React**, **Vite**, and **Custom CSS**. It demonstrates the fundamental Computer Science **Stack Data Structure (LIFO)** through an atmospheric, undo-based puzzle adventure set in a forgotten dream garden.

---

## 🌸 Creative Vision & Art Direction

REWIND delivers the tactile feel of an art-directed indie title:
- **Atmospheric Palette**: Built upon porcelain pink (`#F8E9E7`), warm ivory (`#FFF9F3`), soft rose (`#E8B9C0`), dusty pink (`#CB8297`), deep berry ink (`#783D54`), muted lavender (`#C9C4D9`), and botanical sage (`#A8B9A0`).
- **Original Handcrafted Artwork**: Hand-authored SVG illustrations and procedural styling for the character (**Sprout**, a tiny botanical dream guardian), glowing memory crystal blooms, carved stone pedestals, engraved botanical pressure plates, rose vine trellises, and ancient starry portals.
- **Editorial Typography**: Pairing **Fraunces** (an optical-size variable editorial serif) with **Plus Jakarta Sans** for crisp gameplay HUDs and **JetBrains Mono** for data structure inspection.
- **Organic Procedural Audio**: Tactile sound effects synthesized live via the **Web Audio API**—bell harmonics, stone slides, and a reverse-phase temporal whoosh on Rewind. Zero external audio file dependencies.

---

## 🏛️ The Stack Data Structure: Heart of the Game

In `src/game/Stack.js`, a pure ES6 `Stack` class encapsulates Last-In, First-Out (LIFO) semantics:

- `push(snapshot)`: Pushes an immutable board state snapshot onto the top of the stack in $\mathcal{O}(1)$ time.
- `pop()`: Removes and returns the top snapshot in $\mathcal{O}(1)$ time.
- `peek()`: Inspects the Top of Stack (`TOS`) without mutation.
- `isEmpty()`: Verifies if the timeline is at origin.
- `size()`: Returns current stack depth.
- `toArray()` / `toReversedArray()`: Returns immutable state arrays for live visualization.

### State Snapshot Guarantee
Before every valid movement or push, a deep immutable snapshot of the mutable board state (player position, facing direction, fragment collection flags, pushable pedestal coordinates, and switch/gate states) is pushed to the stack. If an action is invalid (walking into a garden wall or closed bramble gate), the stack is preserved without spurious history entries.

### The Rewind Mechanic
When **REWIND** is triggered (via `Z`, `Backspace`, or UI click):
1. Verifies `rewindBudget > 0` and `!stack.isEmpty()`.
2. Pops the top snapshot.
3. Completely restores the prior board state in $\mathcal{O}(1)$ time.
4. Consumes 1 rewind petal token from the level budget.
5. Restores the exact prior move count.
6. Renders a temporal ghost trace at the rewind origin (*"Every mistake leaves a trace"*).

---

## 🌿 Handcrafted Levels

Five distinct garden levels, each exploring a unique mechanic:

1. **The Dewdrop Pathway** ($7 \times 7$): Movement fundamentals, collecting morning memory fragments, and awakening the dormant garden arch.
2. **The Whispering Brambles** ($8 \times 8$): Briar cul-de-sacs and dead ends teaching tactical rewinds.
3. **The Sunstone Terraces** ($8 \times 8$): Sokoban-style pushable pedestals and recovering from corner traps.
4. **The Moonlit Gates** ($9 \times 9$): Botanical pressure plates and weighted vine gate mechanisms.
5. **The Glass Conservatory** ($10 \times 10$): The forgotten sanctum puzzle coordinating dual switches, gates, pedestals, and 4 sacred memory blooms.

---

## 💻 Tech Stack & Architecture

- **Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS with custom tokens (`tokens.css`, `typography.css`, `game.css`, `components.css`)
- **Audio**: Web Audio API procedural synthesizer (`soundEngine.js`)
- **Persistence**: Defensive `localStorage` with fallback (`storage.js`)
- **Testing**: Vitest test runner with unit tests for `Stack`, `gameState`, and `storage`

```
src/
├── audio/
│   └── soundEngine.js       # Web Audio API procedural sound synthesizer
├── components/
│   ├── Character.jsx        # Handcrafted SVG guardian sprite with directional facing
│   ├── ControlsBar.jsx      # Tactile Rewind button, Stack DSA & Archive toggles
│   ├── GameBoard.jsx        # Responsive grid, collision entities, and touch swipe
│   ├── GameScreen.jsx       # Gameplay orchestrator and keyboard listeners
│   ├── GameTile.jsx         # SVG illustrations: Fragments, Pedestals, Switches, Gates
│   ├── HowToPlayModal.jsx   # Rules guide + interactive mini-demo + DSA explanation
│   ├── HUD.jsx              # Moves, Rewind Petals meter, Memory counter
│   ├── LevelSelectScreen.jsx# 5 garden cards with stars and par metrics
│   ├── Navbar.jsx           # Audio mute, settings, and navigation
│   ├── SettingsModal.jsx    # Sound, reduced motion, touch controls, reset
│   ├── StackInspectorModal.jsx # Live LIFO call stack frames & CS analysis
│   ├── TimeArchivePanel.jsx # Visual timeline drawer of past states
│   ├── TitleScreen.jsx      # Wordmark, garden backdrop, and primary play actions
│   ├── TouchControls.jsx    # On-screen D-pad for mobile devices
│   └── VictoryModal.jsx     # Star rating, par move comparison, and progression
├── game/
│   ├── gameState.js         # State machine, collision engine, and undo coordinator
│   ├── levels.js            # 5 handcrafted garden puzzle definitions
│   └── Stack.js             # Pure Stack data structure implementation
├── styles/
│   ├── components.css       # UI components, modals, and screen layouts
│   ├── game.css             # Grid layout, tile animations, and entity shaders
│   ├── tokens.css           # Design tokens, color system, and radii
│   └── typography.css       # Fraunces serif and Plus Jakarta Sans type scale
├── utils/
│   └── storage.js           # Defensive localStorage progress management
├── App.jsx                  # Root application controller
├── index.css                # Master CSS entry point
└── main.jsx                 # React root mount
tests/
├── gameState.test.js        # Engine, collision, mechanics, and undo test suite
├── Stack.test.js            # LIFO data structure unit tests
└── storage.test.js          # Persistence and edge case tests
```

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18+ or v22+)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated Unit Tests
```bash
npm test
```
*All 22 unit tests for the Stack, state engine, and persistence will execute and pass.*

### 3. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser to enter the garden.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized, minified production bundle in `dist/`.

---

## 🎮 Controls

| Action | Keyboard | Touch / Mobile |
| :--- | :--- | :--- |
| **Move Up** | `W` or `↑` | Tap `▲` or Swipe Up |
| **Move Down** | `S` or `↓` | Tap `▼` or Swipe Down |
| **Move Left** | `A` or `←` | Tap `◀` or Swipe Left |
| **Move Right** | `D` or `→` | Tap `▶` or Swipe Right |
| **Rewind Step** | `Z` or `Backspace` | Tap **REWIND** Button |
| **Restart Level** | `R` | Tap Restart Button |
| **Stack Inspector** | Click `Stack DSA` | Tap `Stack DSA` |
| **Time Archive** | Click `Archive` | Tap `Archive` |
