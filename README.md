# Tile Game - React TypeScript

A React TypeScript application demonstrating the use of Union types, Tile class, and Tile Factory pattern.

## Features

### Union Types
- **Color**: `'Off' | 'Free' | 'Red' | 'Orange' | 'Yellow' | 'Lime' | 'Green' | 'Cyan' | 'Blue' | 'Purple'`
- **Location**: `'Deck' | 'Hand' | 'Board' | 'Discard'`

### Tile Class
The `Tile` class includes:
- `score`: number - The tile's score value
- `id`: number - Unique identifier
- `pos`: number - Position value
- `location`: Location - Current location (Deck, Hand, Board, or Discard)
- `color`: Color - Tile color from the Color union type

### Tile Factory
The `TileFactory` class provides:
- Create individual tiles with custom properties
- Create multiple tiles with the same configuration
- Create colored tiles with different scores
- Manage a dictionary of tiles (key: number, value: Tile)
- Move tiles between locations
- Filter tiles by location or color
- Remove tiles from the dictionary

## Project Structure

```
src/
├── types/
│   └── TileTypes.ts          # Union types and Tile class
├── factories/
│   └── TileFactory.ts        # Tile Factory implementation
├── components/
│   ├── TileGame.tsx          # Main game component
│   └── TileGame.css          # Styling for the game
├── App.tsx                   # Main App component
├── App.css                   # App styling
├── index.tsx                 # React entry point
└── index.css                 # Global styles
```

## Usage Examples

### Creating Types and Classes

```typescript
import { Color, Location, Tile, TileDictionary } from './types/TileTypes';
import { TileFactory } from './factories/TileFactory';

// Create a tile
const tile = new Tile(1, 5, 0, 'Deck', 'Red');

// Create a tile factory
const factory = new TileFactory();

// Create tiles using the factory
const newTile = factory.createTile(10, 1, 'Hand', 'Blue');
const multipleTiles = factory.createMultipleTiles(5, 3, 0, 'Deck', 'Green');
const coloredTiles = factory.createColoredTiles([1, 2, 3, 4, 5], 0, 'Board');

// Get tiles by location
const deckTiles = factory.getTilesByLocation('Deck');
const redTiles = factory.getTilesByColor('Red');

// Move tiles between locations
factory.moveTiles('Deck', 'Hand');
```

### Dictionary Usage

```typescript
// The TileFactory maintains a dictionary internally
const tileDict: TileDictionary = factory.getTileDictionary();

// Access tiles by ID
const tile = factory.getTile(1);

// Remove tiles
factory.removeTile(1);
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Game Features

The interactive demo includes:
- Create new tiles with custom colors and locations
- Visual representation of tiles in different locations
- Move tiles between locations (Deck → Hand → Board → Discard)
- Remove individual tiles
- Real-time statistics
- Responsive design for mobile devices

## TypeScript Features Demonstrated

- Union Types for type safety
- Class implementation with methods
- Factory pattern for object creation
- Dictionary/Record types
- React hooks with TypeScript
- Proper type annotations throughout

## Color Mapping

Each color in the Color union type is mapped to a specific hex color:
- Off: #666666 (Gray)
- Free: #ffffff (White)
- Red: #ff4444
- Orange: #ff8844
- Yellow: #ffcc44
- Lime: #88ff44
- Green: #44ff44
- Cyan: #44ffcc
- Blue: #4488ff
- Purple: #8844ff
