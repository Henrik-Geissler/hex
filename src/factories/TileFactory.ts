import { Tile } from '../types/Tile';
import { TileDictionary } from '../types/TileDictionary';
import { Color } from '../types/Color';
import { Location } from '../types/Location';
import { SpotType } from '../types/SpotType';
import { OffType } from '../types/OffType';

export class TileFactory {
  private static instance: TileFactory;
  private tileDictionary: TileDictionary = {};
  private nextId: number = 1;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): TileFactory {
    if (!TileFactory.instance) {
      TileFactory.instance = new TileFactory();
    }
    return TileFactory.instance;
  }

  // Create a single tile with specified properties
  createTile(
    location: Location = 'Deck',
    pos: number = 0,
    color: Color = 'Off',
    score: number= 0,
  ): Tile {
    const tile = new Tile(this.nextId, score, pos, location, color);
    this.tileDictionary[tile.id] = tile;
    this.nextId++;
    return tile;
  }
  createFreeTile = (
    pos: number) : Tile  => this.createTile(  Location.Board, pos, Color.Free, SpotType.Free); 
    createOffTile = (
      pos: number) : Tile  => this.createTile(  Location.Board, pos, Color.Off, OffType.Free); 
}
