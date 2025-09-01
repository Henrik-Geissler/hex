import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { handleDisappear } from '../utils/mutations/handleDisappear';
import { Rarity } from '../types/Rarity';

export class OddDisappearance implements Relict {
  name: string = 'Odd Disappearance';
  description: string = 'Odd Tiles disappear for the round after placement';
  icon: string = '👻'; // Ghost emoji - alternatives: 💨 (dash), 🚫 (prohibited), ⚡ (lightning), 💫 (dizzy)
  rarity: Rarity = Rarity.Rare;
  sellValue: number = 1;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Check if the tile's score is odd
    if (!tile.isOdd()) return;
    
    await highlight();
    await handleDisappear(tile);
  }
}
