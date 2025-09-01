import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { getNeighbours } from '../directories/utils/getNeighbours';
import { Rarity } from '../types/Rarity'; 
import { handleUpgrade } from '../utils/mutations/handleUpgrade';

export class EvenSteven implements Relict {
  name: string = 'Even Steven';
  description: string = 'Even Tiles upgrade for each neighbour tile when placed';
  icon: string = '🔢'; // Number emoji
  sellValue: number = 2;
  rarity: Rarity = Rarity.Starter;

  /**
   * Check if a tile's score is even
   * @param tile - The tile to check
   * @returns true if the tile's score is even
   */
  private isEvenTile(tile: Tile): boolean {
    return tile.isEven();
  }
 

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Only proceed if the placed tile is even
    if (!this.isEvenTile(tile)) {
      return;
    }

    // Get all neighboring tiles (not free or off tiles)
    const neighbors = getNeighbours(tile).filter(n => n.isReal()); 
    for (const neighbor of neighbors) {
        await highlight();
      await handleUpgrade(tile); 
    }
  }
}
