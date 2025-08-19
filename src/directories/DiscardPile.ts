import { Tile } from '../types/Tile';
import { TileDictionary } from '../types/TileDictionary';

export class DiscardPile implements TileDictionary {
  private static instance: DiscardPile;
  private tiles: Tile[] = [];

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): DiscardPile {
    if (!DiscardPile.instance) {
      DiscardPile.instance = new DiscardPile();
    }
    return DiscardPile.instance;
  }

  // Add a tile to the discard pile
  async add(tile: Tile): Promise<void> {
    this.tiles.push(tile);
    tile.location = 'DiscardPile';
  }

  // Remove a tile from the discard pile
  async remove(tile: Tile): Promise<boolean> {
    const index = this.tiles.findIndex(t => t.id === tile.id);
    if (index !== -1) {
      this.tiles.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get all tiles in the discard pile
  getAllTiles(): Tile[] {
    return [...this.tiles];
  }

  // Get the number of tiles in the discard pile
  getTileCount(): number {
    return this.tiles.length;
  }
  // Clear the discard pile
  async clearPile(): Promise<Tile[]> {
    const removedTiles = [...this.tiles];
    this.tiles = [];
    return removedTiles;
  }
}
