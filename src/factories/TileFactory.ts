import { Tile } from '../types/Tile';
import { TileDictionary } from '../types/TileDictionary';
import { Color } from '../types/Color';
import { Location } from '../types/Location';

export class TileFactory {
  private tileDictionary: TileDictionary = {};
  private nextId: number = 1;

  // Create a single tile with specified properties
  createTile(
    score: number,
    pos: number,
    location: Location = 'Deck',
    color: Color = 'Off'
  ): Tile {
    const tile = new Tile(this.nextId, score, pos, location, color);
    this.tileDictionary[tile.id] = tile;
    this.nextId++;
    return tile;
  }  
 
}
