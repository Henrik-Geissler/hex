import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { getPlayedNeighbours } from '../directories/utils/getNeighbours';
import { handleConsume } from '../utils/mutations/handleConsume';

export class NeighborDevourer implements Relict {
  name: string = 'Neighbor Devourer';
  description: string = 'When a Tile is placed with 6 neighbours, it consumes them all';
  icon: string = '🦖';
  sellValue: number = 1;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Get all non-free, non-off neighbors
    const neighbors = getPlayedNeighbours(tile);
    
    // Check if exactly 6 neighbors exist
    if (neighbors.length === 6) {
      await highlight();
      
      // Consume all 6 neighbors
      for (const neighbor of neighbors) {
        await handleConsume(tile, neighbor);
      }
    }
  }
}
