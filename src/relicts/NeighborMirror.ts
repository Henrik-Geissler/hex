import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { getPlayedNeighbours } from '../directories/utils/getNeighbours';
import { handleMirrorClone } from '../utils/mutations/handleMirrorClone';
import { Color } from '../types/Color';
import { Rarity } from '../types/Rarity';

export class NeighborMirror implements Relict {
  name: string = 'Red Mirror';
  description: string = 'When you place a Red Tile with exactly 2 Neighbours, Mirror them';
  icon: string = '✨'; // Sparkles emoji for mirror effect
  rarity: Rarity = Rarity.Rare;
  sellValue: number = 1;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    if(!tile.matchesColor(Color.Red)) return;
    const neighbors = getPlayedNeighbours(tile);
    if (neighbors.length !== 2) return; 
    for (const neighbor of neighbors) {
      if(await handleMirrorClone(neighbor, tile)) await highlight();
    }
  }
}
