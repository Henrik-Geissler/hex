import { TileFactory } from "../factories/TileFactory";
import { Tile } from "../types/Tile";
import { TileDictionary } from "../types/TileDictionary";  
import { handleStartPlacement } from "../utils/mutations/handleStartPlacement";
import { Location } from "../types/Location";

export class Board implements TileDictionary {
  private static instance: Board; 
  private tiles: Record<number, Tile> = {};
  private listeners: (() => void)[] = [];

  private constructor() {}

  public static getInstance(): Board {
    if (!Board.instance) {
      Board.instance = new Board();
    }
    return Board.instance;
  }

  /**
   * Initialize a field at a specific position with an Off tile if it doesn't exist
   * @param pos - Position to initialize
   */
  private initializeField(pos: number): void {
    if (!(pos in this.tiles)) {
      const emptyTile = TileFactory.getInstance().createOffTile();
      emptyTile.pos = pos;
      emptyTile.location = Location.Board;
      this.tiles[pos] = emptyTile;
    }
  }

  async add(tile: Tile): Promise<void> {
    this.tiles[tile.pos] = tile;
    this.notifyListeners();
  }

  async remove(tile: Tile): Promise<boolean> {
    await handleStartPlacement(TileFactory.getInstance().createFreeTile(), tile)
    tile.location = "Air" 
    tile.isBeeingPlaced=undefined
    return true;
  }

  async clear(): Promise<void> {
    this.tiles = {};
    this.notifyListeners();
  }

  getAllTiles(): Tile[] {
    return Object.values(this.tiles);
  }

  getAllPlayedTiles(): Tile[] {
    return Object.values(this.tiles).filter(tile => tile.isReal());
  }

  getTileCount(): number {
    return Object.keys(this.tiles).length;
  }

  getTileAtPos(pos: number): Tile {
    this.initializeField(pos);
    const tile = this.tiles[pos];
    return tile;
  }

  /**
   * Check if a position has a tile (including Off tiles)
   * @param pos - Position to check
   * @returns True if position has any tile
   */
  hasTileAtPos(pos: number): boolean {
    return pos in this.tiles;
  }

  /**
   * Get all positions that have tiles
   * @returns Array of position numbers
   */
  getAllPositions(): number[] {
    return Object.keys(this.tiles).map(Number);
  }

  addListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  removeListener(listener: () => void): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // Public method to trigger UI updates when tiles are modified externally
  public triggerUpdate(): void {
    this.notifyListeners();
  }
}
