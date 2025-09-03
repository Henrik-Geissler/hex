import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { getW, getE } from '../directories/utils/getNeighbours';
import { handleConsume } from '../utils/mutations/handleConsume';
import { Rarity } from '../types/Rarity';
import { Color } from '../types/Color';

export class LittleRedRaptor implements Relict {
  name: string = 'Little Red Raptor';
  description: string = 'Red tiles eat their left and right neighbors if they are different colors';
  icon: string = '🦖'; // T-Rex emoji - represents the raptor theme
  rarity: Rarity = Rarity.Starter;
  sellValue: number = 1;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    await this.TryEatNeighbors(highlight, tile, true);
    await this.TryEatNeighbors(highlight, tile, false);
    await this.TryEatNeighbors(highlight, getE(tile), true);
    await this.TryEatNeighbors(highlight, getW(tile), false);
  }
  async onColorChange(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    await this.TryEatNeighbors(highlight, tile, true);
    await this.TryEatNeighbors(highlight, tile, false);
    await this.TryEatNeighbors(highlight, getE(tile), true);
    await this.TryEatNeighbors(highlight, getW(tile), false);
  }

  async TryEatNeighbors(highlight: () => Promise<void>, redTile: Tile, left:boolean): Promise<void> {
    // Only work with red tiles
    if (!redTile.matchesColor(Color.Red)) return;
    
    // Get left and right neighbors using the new direction functions
    const neighbor = left ? getW(redTile) : getE(redTile); // West neighbor 
    
    // Try to eat left neighbor if it's a different color and exists
    if (neighbor.isReal() && !neighbor.matchesColor(Color.Red)) {
      await highlight();
      await handleConsume(redTile, neighbor); 
    } 
  }
}
