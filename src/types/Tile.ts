import { TileFactory } from '../factories/TileFactory';
import { Color } from './Color';
import { Location } from './Location';
import { SpotType } from './SpotType';
import { Digit } from './Digit';


// Tile class with all required properties
export class Tile {
  public static readonly MAX_SCORE: number = 999;
  public readonly score: number;
  public id: number;
  public pos: number;
  public location: Location;
  public color: Color;
  public isBeeingPlaced?: Tile = undefined;
  public isGhost: boolean;

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
    this.isGhost = false;

    this.setScore(score);
  }

  // Setter method for score
  setScore(newScore: number): void {
    const possibleScore = Math.min(Math.max(newScore, 0), Tile.MAX_SCORE);
    // Update the readonly score property using Object.defineProperty
    Object.defineProperty(this, 'score', {
      value: possibleScore,
      writable: false,
      configurable: true
    });
  }

  // Method to get tile information as string
  toString(): string {
    return `#${this.id}: ${this.color}@${this.location}${this.pos} Score=${this.score}`;
  }

  isFree = () => this.color == Color.Free; 
  isFreeAndFreeSpot = () => this.isFree() && this.score == SpotType.Free; 
  isOff = () => this.color == Color.Off;
  isReal = () => !this.isFree() && !this.isOff();
  matchesColor = (color: Color) => this.color == color || this.color == Color.White;
  
  // Location helper methods
  isDeck = () => this.location === Location.Deck;
  isHand = () => this.location === Location.Hand;
  isBoard = () => this.location === Location.Board;
  isDiscardPile = () => this.location === Location.DiscardPile;
  isAir = () => this.location === Location.Air;
  isProcessed= () => this.isBeeingPlaced == undefined;
  isMaxed= () => this.score >= Tile.MAX_SCORE;
  
  // Count how often a specific digit appears in the tile's score
  countDigit(digit: Digit): 0 | 1 | 2 | 3 {
    return this.score.toString().split('').filter(d => d === digit.toString()).length as 0 | 1 | 2 | 3;
  }
  isDigit(digit: Digit): boolean {
    return this.countDigit(digit) > 0;
  }
  
  // Check if the tile's score is even
  isEven(): boolean {
    return this.score % 2 === 0;
  }
  
  // Check if the tile's score is odd
  isOdd(): boolean {
    return this.score % 2 === 1;
  }
  
  // Clone method that returns a new Tile with the same properties but a new ID
  Clone(): Tile {
    return TileFactory.getInstance().cloneTile(this);
  }
  
  // Clone method that returns a new Tile with the same properties but a new ID
  CloneGhost(): Tile {
    const ghost = this.Clone();
    ghost.isGhost = true; 
    return ghost;
  }
}
