An interactive chart for visualizing A/B testing statistics using React, Next.js, and Recharts.

## Demo

[Live demo on GitHub Pages](https://shishel-zaitcevich.github.io/interictive_line_chart/)

## Features

### Main features

- Display of conversion rate chart for all variations
- Interactive tooltip with data on hover
- Variation selector (at least one variation is always selected)
- Automatic adaptation of X and Y axes when changing selection
- Switching periods: Day / Week
- Responsive design (671px - 1300px)

- Line style switcher: Line / Smooth / Step / Area
- Theme switcher: Light / Dark
- Export chart to PNG

## Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Charts**: Recharts
- **Export to png**: html2canvas
- **Icons**: Lucide React
- **Architecture**: Feature-Sliced Design (FSD)
- **Code Quality**: ESLint, Prettier

## Installation and launch

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Format code
npm run format

# Check code
npm run lint
```

The application will be available at [http://localhost:5173/interictive_line_chart/](http://localhost:5173/interictive_line_chart/)

## Project structure (FSD)

```
src/
├── app/              # Next.js App Router
├── shared/           # Reusable components and utilities
├── entities/         # Business entities
├── features/         # Functional blocks
├── widgets/          # Composite blocks
└── data/             # Static data
```
