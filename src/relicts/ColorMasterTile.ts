import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile'; 
import { getNeighbours } from '../directories/utils/getNeighbours'; 
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { Rarity } from '../types/Rarity';
import { Hand } from '../directories/Hand';
import { Color } from '../types/Color';

export class ColorMasterTile implements Relict {
  name: string = 'Color Master Tile';
  description: string = 'When you hold all colors, place ghost copies on 1 free spots (Increases on Use)';
  icon: string = '🎨'; // Artist palette emoji
  sellValue: number = 2;
  rarity: Rarity = Rarity.Filler;
  counter: number = 0;
  maxCounter: number = 1;

  async onTurnStart(highlight: () => Promise<void>): Promise<void> {
    if (this.counter == 0) return;
    this.counter = 0;
      this.maxCounter++;
      this.updateDescription();
  }

  /**
   * Update the description to show current counter values
   */
  private updateDescription(): void {
    this.description = `When you hold all colors, place ghost copies on ${this.maxCounter} free spots (Increases on Use)`;
  }

  /**
   * Check if the hand contains at least one tile of each base color
   * @returns true if all base colors are present in the hand
   */
  private hasAllColors(): boolean {
    const hand = Hand.getInstance();
    const handTiles = hand.getAllTiles();
    
    // Check if we have at least one tile of each base color using matchesColor
    const hasRed = handTiles.some(tile => tile.matchesColor(Color.Red));
    const hasYellow = handTiles.some(tile => tile.matchesColor(Color.Yellow));
    const hasGreen = handTiles.some(tile => tile.matchesColor(Color.Green));
    const hasBlue = handTiles.some(tile => tile.matchesColor(Color.Blue));
    
    return hasRed && hasYellow && hasGreen && hasBlue;
  }

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> { 
    if (this.counter > this.maxCounter) return; 
    // Check if the hand contains all base colors
    if (!this.hasAllColors()) {
      return;
    }
    
    // Get all free neighbors of the placed tile
    const freeNeighbors = getNeighbours(tile).filter(n => n.isFree()); 
    
    // Place ghost copies on all free neighbors
    for (const freeNeighbor of freeNeighbors) {
      if (++this.counter > this.maxCounter) break; 
      const clonedTile = tile.CloneGhost();
      await highlight();
      await handleStartPlacement(clonedTile, freeNeighbor);
    }
  }
}
