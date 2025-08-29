import { getNeighbours } from '../directories/utils/getNeighbours';
import { TileFactory } from '../factories/TileFactory';
import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { Rarity } from '../types/Rarity';
export class Digit5Expander implements Relict {
  name: string = 'Digit 5 Expander';
  description: string = 'When a Tile is placed, for each digit 5 in the played tiles score, replace a neighbouring Off Tile with a Free Tile';
  icon: string = '🔢'; // Number emoji - alternatives: ⬆️ (up arrow), 🔧 (wrench), ⚡ (lightning), 📈 (chart)
  sellValue: number = 1;
  rarity:Rarity = Rarity.Rare;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> { 
    let fives = tile.score.toString().split('').filter(digit => digit === '5').length;

    const offNeighbors = getNeighbours(tile).filter(n => n.isOff());
    
    // Shuffle the off neighbors for random selection
    for (let i = offNeighbors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [offNeighbors[i], offNeighbors[j]] = [offNeighbors[j], offNeighbors[i]];
    }

    for (let neighbor of offNeighbors) {
        if(fives--<1) break;
        await highlight();
        await handleStartPlacement(TileFactory.getInstance().createFreeTile(), neighbor.pos);
    }
  }
}
