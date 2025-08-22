import { RelictManager } from '../managers/RelictManager';
import { Location } from '../types/Location';
import { Tile } from '../types/Tile';
import { TileDictionary } from '../types/TileDictionary';
import { Deck } from './Deck'; 

export class Hand implements TileDictionary {
  private static instance: Hand;
  private tiles: Tile[] = [];
  private listeners: Array<() => void> = [];

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): Hand {
    if (!Hand.instance) {
      Hand.instance = new Hand();
    }
    return Hand.instance;
  }
  
  public static HandSize = 7;
  
  async drawFull(): Promise<void> {
    while(this.tiles.length < Hand.HandSize) {
      const tile = await Deck.getInstance().drawTile();
      if (tile) {
        this.add(tile);
        await RelictManager.getInstance().onDrawTile(tile);
      }
      else {
        break;
      }
    }
  }
  
  // Add a tile to the hand
  async add(tile: Tile): Promise<void> {
    this.tiles.push(tile);
    tile.location = Location.Hand;
    this.notifyListeners();
  }

  // Remove a tile from the hand
  async remove(tile: Tile): Promise<boolean> {
    const index = this.tiles.findIndex(t => t.id === tile.id);
    if (index !== -1) {
      this.tiles.splice(index, 1);
      this.notifyListeners();
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

  async clear(): Promise<void> {
    this.tiles = [];
    this.notifyListeners();
  }

  // Add listener for hand changes
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

  // Public method to trigger UI updates when tiles are modified externally
  public triggerUpdate(): void {
    this.notifyListeners();
  }
}
