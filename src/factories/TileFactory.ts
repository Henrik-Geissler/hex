import { Tile, TileDictionary, Color, Location } from '../types/TileTypes';

export class TileFactory {
  private tileDictionary: TileDictionary = {};
  private nextId: number = 1;

  // Create a single tile with specified properties
  createTile(
    score: number,
    pos: number,
    location: Location = 'Deck',
    color: Color = 'Off'
  ): Tile {
    const tile = new Tile(this.nextId, score, pos, location, color);
    this.tileDictionary[tile.id] = tile;
    this.nextId++;
    return tile;
  }

  // Create multiple tiles with the same configuration
  createMultipleTiles(
    count: number,
    score: number,
    startPos: number = 0,
    location: Location = 'Deck',
    color: Color = 'Off'
  ): Tile[] {
    const tiles: Tile[] = [];
    for (let i = 0; i < count; i++) {
      const tile = this.createTile(score, startPos + i, location, color);
      tiles.push(tile);
    }
    return tiles;
  }

  // Create tiles with different colors
  createColoredTiles(
    scores: number[],
    startPos: number = 0,
    location: Location = 'Deck'
  ): Tile[] {
    const colors: Color[] = ['Red', 'Orange', 'Yellow', 'Lime', 'Green', 'Cyan', 'Blue', 'Purple'];
    const tiles: Tile[] = [];
    
    scores.forEach((score, index) => {
      const color = colors[index % colors.length];
      const tile = this.createTile(score, startPos + index, location, color);
      tiles.push(tile);
    });
    
    return tiles;
  }

  // Get a tile by ID
  getTile(id: number): Tile | undefined {
    return this.tileDictionary[id];
  }

  // Get all tiles
  getAllTiles(): Tile[] {
    return Object.values(this.tileDictionary);
  }

  // Get tiles by location
  getTilesByLocation(location: Location): Tile[] {
    return Object.values(this.tileDictionary).filter(tile => tile.location === location);
  }

  // Get tiles by color
  getTilesByColor(color: Color): Tile[] {
    return Object.values(this.tileDictionary).filter(tile => tile.color === color);
  }

  // Remove a tile from the dictionary
  removeTile(id: number): boolean {
    if (this.tileDictionary[id]) {
      delete this.tileDictionary[id];
      return true;
    }
    return false;
  }

  // Clear all tiles
  clearAllTiles(): void {
    this.tileDictionary = {};
    this.nextId = 1;
  }

  // Get the tile dictionary
  getTileDictionary(): TileDictionary {
    return { ...this.tileDictionary };
  }

  // Get total number of tiles
  getTileCount(): number {
    return Object.keys(this.tileDictionary).length;
  }

  // Move all tiles from one location to another
  moveTiles(fromLocation: Location, toLocation: Location): number {
    const tilesToMove = this.getTilesByLocation(fromLocation);
    tilesToMove.forEach(tile => tile.moveTo(toLocation));
    return tilesToMove.length;
  }

  // Create a standard deck of tiles (example configuration)
  createStandardDeck(): Tile[] {
    const tiles: Tile[] = [];
    
    // Create tiles with different scores and colors
    const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const colors: Color[] = ['Red', 'Orange', 'Yellow', 'Lime', 'Green', 'Cyan', 'Blue', 'Purple'];
    
    scores.forEach((score, index) => {
      const color = colors[index % colors.length];
      const tile = this.createTile(score, index, 'Deck', color);
      tiles.push(tile);
    });
    
    return tiles;
  }
}
