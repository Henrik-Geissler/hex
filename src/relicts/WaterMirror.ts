import { getNeighbours, getPlayedNeighbours } from '../directories/utils/getNeighbours';
import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile'; 
import { handleMirrorClone } from '../utils/mutations/handleMirrorClone';
import { Rarety } from '../types/Rarety';

export class WaterMirror implements Relict {
  name: string = 'Water Mirror';
  description: string = 'All Tiles get Mirrored by Water';
  icon: string = '💧'; // Water drop emoji
  rarity: Rarety = Rarety.Rare;
  sellValue: number = 1;

  /**
   * Called when a normal tile is placed
   * Check for Off tiles in neighbors and call handleMirroring with them
   */
  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const neighbors = getNeighbours(tile);
    
    // Find Off tiles in neighbors
    const offNeighbors = neighbors.filter(neighbor => 
      neighbor.isOff()
    );
    
    if (offNeighbors.length === 0) return;
    
    // Mirror the placed tile across each Off neighbor
    for (const offNeighbor of offNeighbors) {
      if (await handleMirrorClone(tile, offNeighbor)) {
        await highlight();
      }
    }
  }

  /**
   * Called when a Free or Off tile is placed
   * Call handleMirroring for all neighbors
   */
  async onPlaceFreeOrOffTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    if(!tile.isOff()) return;
    const neighbors = getPlayedNeighbours(tile);
    
    // Mirror all neighbors across this Free/Off tile
    for (const neighbor of neighbors) {
      if (await handleMirrorClone(neighbor, tile)) {
        await highlight();
      }
    }
  }
} 

