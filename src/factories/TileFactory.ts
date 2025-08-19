import { Tile } from '../types/Tile';
import { BaseColors, Color } from '../types/Color';
import { Location } from '../types/Location';
import { Deck } from '../directories/Deck';
import { Hand } from '../directories/Hand';
import { DiscardPile } from '../directories/DiscardPile';

export class TileFactory {
  private static instance: TileFactory;
  private nextId: number = 1;

  // Directory instances
  private deck = Deck.getInstance();
  private hand = Hand.getInstance();
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
    location: Location = 'Deck',
    pos: number = 0,
    color: Color = 'Off',
    score: number = 0,
  ): Tile {
    const tile = new Tile(this.nextId, score, pos, location, color);
      switch (location) {
        case Location.Deck:
          this.deck.add(tile);
          break;
        case Location.Hand:
          this.hand.add(tile);
          break;
        case Location.DiscardPile:
          this.discardPile.add(tile);
          break;
        default:
          break;
    }
    this.nextId++;
    return tile;
  }

  createFreeTile = (pos: number): Tile => this.createTile(Location.Board, pos, Color.Free, 0);

  createOffTile = (pos: number): Tile => this.createTile(Location.Board, pos, Color.Off, 0);
 
  async createStandardDeck(): Promise<void> {
    const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
    
    for (let color = 0; color < BaseColors.length; color++) 
    for (let i = 0; i < scores.length; i++) { 
      const tile = this.createTile('Deck', i, BaseColors[color], scores[i]);
      await this.deck.add(tile);
    }
  }
}
