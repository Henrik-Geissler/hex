import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Rarity } from '../types/Rarity';
import { getNeighbours } from '../directories/utils/getNeighbours';
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { Location } from '../types/Location';

export class Rotator implements Relict {
  name: string = 'Rotator';
  description: string = 'After placing a tile, rotate the neighbours';
  icon: string = '🔧'; // Lightning bolt emoji
  sellValue: number = 1;
  rarity: Rarity = Rarity.Rare;

  // Registry to track tiles that have already been rotated by ID
  private isRotated: boolean = false;

  async onTurnStart(highlight: () => Promise<void>): Promise<void> {
    // Clean the registry at the start of each turn
    this.isRotated = false
  }

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Check if the tile has already been rotated
    if (this.isRotated) {
      return;
    }

    // Add to registry
    this.isRotated =true;

    const neighbors = getNeighbours(tile);
    const pos = neighbors.map(neighbor => neighbor.pos);
    // Get neighbors and trigger relict effects for each
    await handleStartPlacement(neighbors[5],pos[0]);
    await handleStartPlacement(neighbors[4],pos[5]);
    await handleStartPlacement(neighbors[3],pos[4]);
    await handleStartPlacement(neighbors[2],pos[3]);
    await handleStartPlacement(neighbors[1],pos[2]);
    neighbors[0].location = Location.Air
    await handleStartPlacement(neighbors[0],pos[1]);
  }
}
