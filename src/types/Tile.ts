import { TileFactory } from '../factories/TileFactory';
import { Color } from './Color';
import { Location } from './Location';

// Tile class with all required properties
export class Tile {
  public score: number;
  public id: number;
  public pos: number;
  public location: Location;
  public color: Color;

  constructor(
    id: number,
    score: number,
    pos: number,
    location: Location =Location.Deck,
    color: Color = Color.Off
  ) {
    this.id = id;
    this.score = score;
    this.pos = pos;
    this.location = location;
    this.color = color;
  }
 

  // Method to get tile information as string
  toString(): string {
    return `Tile ${this.id}: Score=${this.score}, Pos=${this.pos}, Location=${this.location}, Color=${this.color}`;
  }

  isFree = () => this.color == Color.Free; 
  isOff = () => this.color == Color.Off;
  matchesColor = (color: Color) => this.color == color || this.color == Color.White;
  
  // Clone method that returns a new Tile with the same properties but a new ID
  Clone(): Tile {
    return TileFactory.getInstance().cloneTile(this);
  }
}
