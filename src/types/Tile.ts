import { TileFactory } from '../factories/TileFactory';
import { Color } from './Color';
import { Location } from './Location';
import { SpotType } from './SpotType';

// Tile class with all required properties
export class Tile {
  public readonly score: number;
  public id: number;
  public pos: number;
  public location: Location;
  public color: Color;
  public isBeeingPlaced?: Tile = undefined;

  constructor(
    id: number,
    score: number,
    pos: number,
    location: Location =Location.Deck,
    color: Color = Color.Off
  ) {
    this.id = id;
    this.pos = pos;
    this.location = location;
    this.color = color;
    this.score = score;

    this.setScore(score);
  }

  // Setter method for score
  setScore(newScore: number): void {
    const possibleScore = Math.min(Math.max(newScore, 0), 9999);
    // Update the readonly score property using Object.defineProperty
    Object.defineProperty(this, 'score', {
      value: possibleScore,
      writable: false,
      configurable: true
    });
  }

  // Method to get tile information as string
  toString(): string {
    return `Tile ${this.id}: Score=${this.score}, Pos=${this.pos}, Location=${this.location}, Color=${this.color}`;
  }

  isFree = () => this.color == Color.Free; 
  isFreeAndFreeSpot = () => this.isFree() && this.score == SpotType.Free; 
  isOff = () => this.color == Color.Off;
  isReal = () => !this.isFree() && !this.isOff();
  matchesColor = (color: Color) => this.color == color || this.color == Color.White;
  
  // Clone method that returns a new Tile with the same properties but a new ID
  Clone(): Tile {
    return TileFactory.getInstance().cloneTile(this);
  }
}
