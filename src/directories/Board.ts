import { TileFactory } from "../factories/TileFactory";
import { Tile } from "../types/Tile";
import { TileDictionary } from "../types/TileDictionary"; 
import { handleTilePlacement } from "./utils/handleTilePlacement";

export class Board implements TileDictionary {
  private static instance: Board; 
  private tiles: Tile[] = [];
  private listeners: (() => void)[] = [];

  private constructor() {}

  public static getInstance(): Board {
    if (!Board.instance) {
      Board.instance = new Board();
    }
    return Board.instance;
  }

  async add(tile: Tile): Promise<void> {
    while(tile.pos>this.tiles.length) 
    handleTilePlacement(TileFactory.getInstance().createOffTile(), this.tiles.length);
    if(tile.pos==this.tiles.length)
      this.tiles.push(tile);
    else
    this.tiles[tile.pos] = tile;
    this.notifyListeners();
  }

  async remove(tile: Tile): Promise<boolean> {
    await handleTilePlacement(TileFactory.getInstance().createFreeTile(), tile)
    return true;
  }

  async clear(): Promise<void> {
    this.tiles = [];
    this.notifyListeners();
  }

  getAllTiles(): Tile[] {
    return [...this.tiles];
  }
  getAllPlayedTiles(): Tile[] {
    return this.tiles.filter(tile => !tile.isFree() && !tile.isOff());
  }

  getTileCount(): number {
    return this.tiles.length;
  }
  getTileAtPos(pos: number): Tile {
    return this.tiles[pos];
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
