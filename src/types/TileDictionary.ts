import { Tile } from './Tile';

// Interface for Tile Dictionary with async methods
export interface TileDictionary {
  add(tile: Tile): Promise<void>;
  remove(tile: Tile): Promise<boolean>;
  clear(): Promise<void>;
  getAllTiles(): Tile[];
  getTileCount(): number;
}
