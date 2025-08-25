import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Color } from '../types/Color';
import { handleUpgrade } from '../utils/mutations/handleUpgrade';
import { Board } from '../directories/Board';
import { getNeighbours } from '../directories/utils/getNeighbours';

export class BlueUpgrader implements Relict {
  name: string = 'Blue Upgrader';
  description: string = 'Placed Tiles upgrade for each blue neighbor';
  icon: string = '🔵';  
  sellValue: number = 1;
  rarety:Rarety =Rarety.Starter;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> { 
    const blueNeighborCount = getNeighbours(tile).filter(t => t.matchesColor(Color.Blue)).length;
    if(blueNeighborCount === 0) return; 
    await highlight();  
    for (let i = 0; i < blueNeighborCount; i++) {
      await handleUpgrade(tile);
    }
  }
}
