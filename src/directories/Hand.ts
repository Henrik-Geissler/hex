import { Tile } from '../types/Tile';
import { TileDictionary } from '../types/TileDictionary';

export class Hand implements TileDictionary {
  private static instance: Hand;
  private tiles: Tile[] = [];

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): Hand {
    if (!Hand.instance) {
      Hand.instance = new Hand();
    }
    return Hand.instance;
  }

  // Add a tile to the hand
  async add(tile: Tile): Promise<void> {
    this.tiles.push(tile);
    tile.location = 'Hand';
  }

  // Remove a tile from the hand
  async remove(tile: Tile): Promise<boolean> {
    const index = this.tiles.findIndex(t => t.id === tile.id);
    if (index !== -1) {
      this.tiles.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get all tiles in the hand
  getAllTiles(): Tile[] {
    return [...this.tiles];
  }

  // Get the number of tiles in the hand
  getTileCount(): number {
    return this.tiles.length;
  }

}
