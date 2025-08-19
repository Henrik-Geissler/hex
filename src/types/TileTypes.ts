// Union type for Colors
export type Color = 'Off' | 'Free' | 'Red' | 'Orange' | 'Yellow' | 'Lime' | 'Green' | 'Cyan' | 'Blue' | 'Purple';

// Union type for Locations
export type Location = 'Deck' | 'Hand' | 'Board' | 'Discard';

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
    location: Location = 'Deck',
    color: Color = 'Off'
  ) {
    this.id = id;
    this.score = score;
    this.pos = pos;
    this.location = location;
    this.color = color;
  }

  // Method to move tile to a new location
  moveTo(newLocation: Location): void {
    this.location = newLocation;
  }

  // Method to change tile color
  setColor(newColor: Color): void {
    this.color = newColor;
  }

  // Method to update position
  setPosition(newPos: number): void {
    this.pos = newPos;
  }

  // Method to update score
  setScore(newScore: number): void {
    this.score = newScore;
  }

  // Method to get tile information as string
  toString(): string {
    return `Tile ${this.id}: Score=${this.score}, Pos=${this.pos}, Location=${this.location}, Color=${this.color}`;
  }
}

// Dictionary type for storing tiles by ID
export type TileDictionary = { [key: number]: Tile };
