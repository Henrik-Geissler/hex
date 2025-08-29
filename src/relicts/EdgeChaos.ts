import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { getNeighbours } from '../directories/utils/getNeighbours';
import { handleRandomColorChange } from '../utils/mutations/handleRandomColorChange';
import { Rarity } from '../types/Rarity';

export class EdgeChaos implements Relict {
  name: string = 'Edge Chaos';
  description: string = 'Tiles placed on the edge of the game board switch to a random color';
  icon: string = '🌀'; // Cyclone emoji - alternatives: 🌪️ (tornado), ⚡ (lightning), 🔥 (fire), 💫 (dizzy)
  sellValue: number = 1;
  rarity:Rarity =Rarity.Rare;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Check if the placed tile is on the edge of the board
    // A tile is on the edge if any of its neighbors are off tiles
    const neighbors = getNeighbours(tile);
    if (neighbors.some(n => n.isOff())) {
      await highlight();
      await handleRandomColorChange(tile);
    }
  }
}
