import { Relict, Triggering } from '../types/Relict';
import { Tile } from '../types/Tile';

export class Empty implements Relict {
  name: string = 'Empty';
  description: string = 'An empty relict slot';
  icon: string = ' '; // Empty circle emoji
  counter?: number = undefined;
  sellValue: number = 0; // Empty slots have no sell value

  // All methods return default Triggering with triggers: false
  async onChoose(): Promise<Triggering> {
    return { triggers: false };
  }

  async onRoundStart(): Promise<Triggering> {
    return { triggers: false };
  }

  async onDrawTile(tile: Tile): Promise<Triggering> {
    return { triggers: false };
  }

  async onPlaceTile(tile: Tile): Promise<Triggering> {
    return { triggers: false };
  }

  async onScoreTile(tile: Tile): Promise<Triggering> {
    return { triggers: false };
  }

  async onAfterPlaceTile(tile: Tile): Promise<Triggering> {
    return { triggers: false };
  }

  async onDiscard(tiles: Tile[]): Promise<Triggering> {
    return { triggers: false };
  }
}
