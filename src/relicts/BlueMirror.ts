import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Color } from '../types/Color';
import { getNeighbours } from '../directories/utils/getNeighbours'; 
import { handleMirrorClone } from '../utils/mutations/handleMirrorClone';
import { Rarity } from '../types/Rarity';
export class BlueMirror implements Relict {
  name: string = 'Blue Mirror';
  description: string = 'Placed Tiles are mirrored at blue neighbors';
  icon: string = '🔷'; // Blue circle emoji - alternatives: 💎 (gem), 🌊 (wave), 🔷 (blue diamond), �� (mirror)
  rarity: Rarity = Rarity.Filler;
  sellValue: number = 1;
  
  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const neighbors = getNeighbours(tile);
    
    const blueNeighbors = neighbors.filter(neighbor => 
       neighbor.matchesColor(Color.Blue)
    );
    
    if (blueNeighbors.length === 0) return;
    for (const blueNeighbor of blueNeighbors)
      if(await handleMirrorClone(tile, blueNeighbor)) await highlight();
  }
}
