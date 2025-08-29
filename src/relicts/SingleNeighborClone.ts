import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { getNeighbours } from '../directories/utils/getNeighbours'; 
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { Rarity } from '../types/Rarity';

export class SingleNeighborClone implements Relict {
  name: string = 'Single Neighbor Clone';
  description: string = 'If you place a tile with only one free neighbor, clone it to that spot';
  icon: string = '🔄';
  rarity: Rarity = Rarity.Rare;
  sellValue: number = 1;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const neighbors = getNeighbours(tile);
    const freeNeighbors = neighbors.filter(n => n.isFree());
    
    // Check if there's exactly one free neighbor
    if (freeNeighbors.length !== 1) return;
    
    await highlight();
    
    const freeNeighbor = freeNeighbors[0];
    const clonedTile = tile.Clone();
    await handleStartPlacement(clonedTile, freeNeighbor.pos);
  }
}
