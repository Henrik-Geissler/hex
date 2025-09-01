import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Rarity } from '../types/Rarity';
import { getE, getW } from '../directories/utils/getNeighbours';
import { handleColorChange } from '../utils/mutations/handleColorChange';

export class LeftColorChanger implements Relict {
  name: string = 'Brush';
  description: string = 'Tiles give their Color to the left';
  icon: string = '🖌️'; // Brush emoji
  sellValue: number = 2;
  rarity: Rarity = Rarity.Filler;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    await this.spreadColor(highlight, tile);
  }
  async onColorChange(highlight: () => Promise<void>, tileAfterColorChange: Tile): Promise<void> {
      await this.spreadColor(highlight, tileAfterColorChange);
  }
  async spreadColor(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const leftNeighbor = getW(tile);
    const rightNeighbor = getE(tile)
    
    if (leftNeighbor.isReal()) {
        await highlight();
        await handleColorChange(leftNeighbor,tile.color); 
      }
    if (    rightNeighbor      .isReal()) {
      await highlight();
      await handleColorChange(tile,rightNeighbor.color); 
    }
  }
}
