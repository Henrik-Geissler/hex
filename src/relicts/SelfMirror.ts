import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import {  getPlayedNeighbours } from '../directories/utils/getNeighbours';
import { Rarity } from '../types/Rarity';
import { Color } from '../types/Color'; 
import { handleMirrorClone } from '../utils/mutations/handleMirrorClone';

export class SelfMirror implements Relict {
  name: string = 'Self Mirror';
  description: string = 'Red Tiles mirror on other colored Tiles';
  icon: string = '🪞'; // Mirror emoji
  sellValue: number = 2;
  rarity: Rarity = Rarity.Filler;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    await this.TryMirroring(highlight, tile);
  }
  async onColorChange(highlight: () => Promise<void>, tileAfterColorChange: Tile): Promise<void> {
    await this.TryMirroring(highlight, tileAfterColorChange);
  }

  async TryMirroring(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Only proceed if the placed tile is red
    if (tile.matchesColor(Color.Red)) {
        for(const neighbor of getPlayedNeighbours(tile))  
            if(
          await handleMirrorClone(tile, neighbor)) 
    await highlight();}
    else
    for(const neighbor of getPlayedNeighbours(tile))  
        if (neighbor.matchesColor(Color.Red)) 
            if(
          await handleMirrorClone(neighbor, tile)) 
          await highlight(); 
  }
}
