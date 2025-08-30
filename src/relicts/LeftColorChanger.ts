import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Rarity } from '../types/Rarity';
import { getNeighbours } from '../directories/utils/getNeighbours';
import { handleColorChange } from '../utils/mutations/handleColorChange';

export class LeftColorChanger implements Relict {
  name: string = 'Brush';
  description: string = 'Tiles give their Color to the left';
  icon: string = '🖌️'; // Brush emoji
  sellValue: number = 2;
  rarity: Rarity = Rarity.Starter;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    await this.spreadColor(highlight, tile);
  }
  async onColorChange(highlight: () => Promise<void>, tileAfterColorChange: Tile): Promise<void> {
      await this.spreadColor(highlight, tileAfterColorChange);
  }
  async spreadColor(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const neighbors = getNeighbours(tile);
    
    if (neighbors[4].isReal()) {
        await highlight();
        await handleColorChange(neighbors[4],tile.color); 
      }
    if (neighbors[1].isReal()) {
      await highlight();
      await handleColorChange(tile,neighbors[1].color); 
    }
  }
}
