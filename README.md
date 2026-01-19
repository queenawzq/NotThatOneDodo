# Not That One, Dodo!

A casual catch-and-avoid game built with **Phaser 3 + TypeScript + Vite**. Help Dodo the dog catch good treats and avoid the bad ones!

![Game Preview](public/assets/screenshots/gameplay.png)

## Gameplay

- **Move Dodo** left and right using arrow keys, WASD, or mouse/touch
- **Catch good treats** like chicken, broccoli, carrots, and peanut butter to earn points
- **Avoid bad treats** like chocolate, ice cream, and cherries - they'll cost you lives or points!
- **Survive** as long as you can while the difficulty increases

## Screenshots

| Menu | Gameplay | Game Over |
|------|----------|-----------|
| ![Menu](public/assets/screenshots/menu.png) | ![Gameplay](public/assets/screenshots/gameplay.png) | ![Game Over](public/assets/screenshots/gameover.png) |

## Treats

### Safe Treats (Catch these!)
| Treat | Points |
|-------|--------|
| Chicken | +10 |
| Broccoli | +15 |
| Carrot | +10 |
| Peanut Butter | +20 |

### Unsafe Treats (Avoid these!)
| Treat | Effect |
|-------|--------|
| Chocolate | -1 Life |
| Ice Cream | -10 Points |
| Cherries | -1 Life |

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/queenawzq/NotThatOneDodo.git
cd NotThatOneDodo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## Controls

| Input | Action |
|-------|--------|
| ← / A | Move left |
| → / D | Move right |
| Mouse/Touch | Dodo follows pointer |
| Space/Enter | Start game / Play again |
| Escape | Return to menu |

## Tech Stack

- **Framework:** [Phaser 3](https://phaser.io/) (v3.90.0)
- **Language:** TypeScript
- **Build Tool:** [Vite](https://vitejs.dev/)

## Project Structure

```
NotThatOneDodo/
├── public/assets/       # Game assets (sprites, images)
├── src/
│   ├── main.ts          # Entry point
│   └── game/
│       ├── GameConfig.ts
│       ├── constants/   # Game settings & treat definitions
│       ├── scenes/      # Boot, Preload, Menu, Game, GameOver
│       ├── objects/     # Player, Treat, TreatFactory
│       ├── systems/     # Score, Lives, Difficulty, Input
│       ├── ui/          # Score display, Lives, Popups
│       └── effects/     # Screen shake, Player feedback
```

## License

MIT
