import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { getPlayedNeighbours } from '../directories/utils/getNeighbours';
import { handleConsume } from '../utils/mutations/handleConsume';
import { Rarity } from '../types/Rarity';

export class NeighborDevourer implements Relict {
  name: string = 'Neighbor Devourer';
  description: string = 'When a Tile is placed with 6 neighbours, it consumes them all';
  icon: string = '🐉'; // T-Rex emoji - alternatives: 🐉 (dragon), 🔥 (fire), ⚡ (lightning), 💀 (skull)
  rarity: Rarity = Rarity.Starter;
  sellValue: number = 1;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> { 
    if(await this.TryEat(highlight,tile)) return;
    const neighbors = getPlayedNeighbours(tile);
    for (const neighbor of neighbors) 
      if(await this.TryEat(highlight,neighbor)) return;
  }
  async TryEat(highlight: () => Promise<void>,tile: Tile): Promise<boolean> {
    const neighbors = getPlayedNeighbours(tile); 
    if (neighbors.length !== 6) return false;
      await highlight(); 
      for (const neighbor of neighbors) 
        await handleConsume(tile, neighbor);
      return true; 
  }
}
