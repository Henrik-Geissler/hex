import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Color } from '../types/Color';
import { handleUpgrade } from '../utils/mutations/handleUpgrade';
import { Board } from '../directories/Board';
import { getNeighbours } from '../directories/utils/getNeighbours';
import { Rarity } from '../types/Rarity';
export class BlueUpgrader implements Relict {
  name: string = 'Blue Upgrader';
  description: string = 'Placed Tiles upgrade for each blue neighbor';
  icon: string = '🔷'; // Blue diamond emoji - alternatives: ⬆️ (up arrow), 🔵 (blue circle), 💎 (gem), ⭐ (star)
  sellValue: number = 1;
  rarity:Rarity =Rarity.Starter;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> { 
    const blueNeighborCount = getNeighbours(tile).filter(t => t.matchesColor(Color.Blue)).length;
    if(blueNeighborCount === 0) return; 
    await highlight();  
    for (let i = 0; i < blueNeighborCount; i++) {
      await handleUpgrade(tile);
    }
  }
}
