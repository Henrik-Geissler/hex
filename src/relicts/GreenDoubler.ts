import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Color } from '../types/Color';
import { handleDouble } from '../utils/mutations/handleDouble';
import { handleRandomColorChange } from '../utils/mutations/handleRandomColorChange';

export class GreenDoubler implements Relict {
  name: string = 'Green Doubler';
  description: string = 'When you place a green Tile, Double it and change its color';
  icon: string = '🌿'; // Leaf emoji
  sellValue: number = 2;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Check if the tile is green
    if (!tile.matchesColor(Color.Green)) return;
    
    await highlight();
    
    // Double the tile first
    await handleDouble(tile);
    await handleRandomColorChange(tile);
  }
}
