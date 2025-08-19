import { Tile } from '../types/Tile';
import { TileDictionary } from '../types/TileDictionary';

export class Deck implements TileDictionary {
  private static instance: Deck;
  private tiles: Tile[] = [];
  private listeners: Array<() => void> = [];

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): Deck {
    if (!Deck.instance) {
      Deck.instance = new Deck();
    }
    return Deck.instance;
  }

  async add(tile: Tile): Promise<void> {
    this.tiles.push(tile);
    this.notifyListeners();
  }

  async remove(tile: Tile): Promise<boolean> {
    const index = this.tiles.findIndex(t => t.id === tile.id);
    if (index !== -1) {
      this.tiles.splice(index, 1);
      this.notifyListeners();
      return true;
    }
    return false;
  }

  getAllTiles(): Tile[] {
    return [...this.tiles];
  }

  getTileCount(): number {
    return this.tiles.length;
  }

  drawTile(): Tile | null {
    if (this.tiles.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * this.tiles.length);
    const tile = this.tiles.splice(randomIndex, 1)[0];
    this.notifyListeners();
    return tile;
  }

  shuffle(): void {
    // Fisher-Yates shuffle algorithm
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
  }

  clear(): void {
    this.tiles = [];
    this.notifyListeners();
  }

  // Add listener for deck changes
  addListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  // Remove listener
  removeListener(listener: () => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}
