import { TileFactory } from "../factories/TileFactory";
import { Tile } from "../types/Tile";
import { TileDictionary } from "../types/TileDictionary";  
import { handleStartPlacement } from "../utils/mutations/handleStartPlacement";
import { Location } from "../types/Location";

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
    this.fillUntil(tile.pos);
    this.tiles[tile.pos] = tile;
    this.notifyListeners();
  }

  fillUntil(pos: number): void {
    while(pos>=this.tiles.length) {
      const emptyTile = TileFactory.getInstance().createOffTile();
      emptyTile.pos = this.tiles.length;
      emptyTile.location = Location.Board;
      this.tiles.push(emptyTile);
    }
  }

  async remove(tile: Tile): Promise<boolean> {
    await handleStartPlacement(TileFactory.getInstance().createFreeTile(), tile)
    tile.location = "Air" 
    tile.isBeeingPlaced=undefined
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
    this.fillUntil(pos);
    const tile = this.tiles[pos];
    if(tile== undefined) 
      throw new Error("tile") ;
    return tile;
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
