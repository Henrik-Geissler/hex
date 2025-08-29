import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { handleDisappear } from '../utils/mutations/handleDisappear';
import { Rarety } from '../types/Rarety';

export class OddDisappearance implements Relict {
  name: string = 'Odd Disappearance';
  description: string = 'Odd Tiles disappear for the round after placement';
  icon: string = '👻';
  rarity: Rarety = Rarety.Rare;
  sellValue: number = 1;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Check if the tile's score is odd
    if ((tile.score || 0) % 2 === 0) return;
    
    await highlight();
    await handleDisappear(tile);
  }
}
