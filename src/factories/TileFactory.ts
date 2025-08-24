import { Tile } from '../types/Tile';
import { BaseColors, Color } from '../types/Color';
import { Location } from '../types/Location';
import { DiscardPile } from '../directories/DiscardPile'; 
import { SpotType } from '../types/SpotType';
import { OffType } from '../types/OffType';

export class TileFactory {
  private static instance: TileFactory;
  private nextId: number = 1;
  private discardPile = DiscardPile.getInstance();

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
    pos: number = 0,
    color: Color = 'Off',
    score: number = 0,
  ): Tile {
    const tile = new Tile(this.nextId++, score, pos, Location.Air, color);
    return tile;
  }

  createFreeTile = (): Tile => this.createTile(0, Color.Free, SpotType.Free);
  createDoubleTile = (): Tile => this.createTile(0, Color.Free, SpotType.Double);
  createCoinTile = (): Tile => this.createTile(0, Color.Free, SpotType.Coin);
  createUpgradeTile = (): Tile => this.createTile(0, Color.Free, SpotType.Upgrade);

  createOffTile = (): Tile => this.createTile(0, Color.Off, OffType.Free);
 
  // Clone a tile with a new ID while keeping all other properties
  cloneTile(tile: Tile): Tile {
    return this.createTile(tile.pos, tile.color, tile.score);  
  }
 
  async createStandardDeck(): Promise<void> {
    const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
    
    for (let color = 0; color < BaseColors.length; color++) 
    for (let i = 0; i < scores.length; i++) {
       const tile = this.createTile(i, BaseColors[color], scores[i]);
       tile.location = Location.DiscardPile;
       this.discardPile.add(tile);
      }
  }
}
