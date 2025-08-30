import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Rarity } from '../types/Rarity'; 
import { Hand } from '../directories/Hand';
import { Color } from '../types/Color';

export class ColorMaster implements Relict {
  name: string = 'Color Master';
  description: string = 'While you hold all Colors ...';
  icon: string = '🌈'; // Rainbow emoji
  sellValue: number = 3;
  rarity: Rarity = Rarity.Starter;


  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Check if player holds all colors
    if (!this.hasAllColors()) return;
        await highlight();
       
  }

  private hasAllColors(): boolean {
    const hand = Hand.getInstance();
    const handTiles = hand.getAllTiles();
    
    const colors = new Set<Color>();
    
    // Collect all colors from hand tiles
    for (const tile of handTiles) {
      if (tile.isReal()) {
        colors.add(tile.color);
      }
    }

    // Check if we have all the main colors (excluding Off and Free)
    const mainColors = [Color.Red, Color.Green, Color.Blue, Color.Yellow];
    return mainColors.every(color => colors.has(color));
  }
}
