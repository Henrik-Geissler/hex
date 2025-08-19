import { Tile } from '../types/Tile';
import { TileDictionary } from '../types/TileDictionary';

export class Deck implements TileDictionary {
  private static instance: Deck;
  private tiles: Tile[] = [];

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): Deck {
    if (!Deck.instance) {
      Deck.instance = new Deck();
    }
    return Deck.instance;
  }

  // Add a tile to the deck
  async add(tile: Tile): Promise<void> {
    this.tiles.push(tile);
    tile.location = 'Deck';
  }

  // Remove a tile from the deck
  async remove(tile: Tile): Promise<boolean> {
    const index = this.tiles.findIndex(t => t.id === tile.id);
    if (index !== -1) {
      this.tiles.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get all tiles in the deck
  getAllTiles(): Tile[] {
    return [...this.tiles];
  }

  // Get the number of tiles in the deck
  getTileCount(): number {
    return this.tiles.length;
  }

  // Draw a tile from the top of the deck
  async drawTile(): Promise<Tile | null> {
    if (this.tiles.length > 0) {
      const tile = this.tiles.shift()!;
      return tile;
    }
    return null;
  }

  // Shuffle the deck
  shuffle(): void {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
  }
}
