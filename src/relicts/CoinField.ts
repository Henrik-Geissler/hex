import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { getNeighbours } from '../directories/utils/getNeighbours';
import { getArea } from '../directories/utils/getArea';
import { isAreasSame } from '../directories/utils/getArea';
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { TileFactory } from '../factories/TileFactory';
import { Rarity } from '../types/Rarity';
export class CoinField implements Relict {
  name: string = 'Coin Field';
  description: string = 'Surround an empty Area of X Tiles to fill it with Coins. (Number changes every round)';
  icon: string = '🪙'; // Coin emoji - alternatives: 💰 (money bag), 🪙 (coin), 🏆 (trophy), 💎 (gem)
  counter?: number = undefined;
  sellValue: number = 2;
  rarity:Rarity =Rarity.Starter;
  
  private targetSize: number = 1;

  async onRoundStart(_highlight: () => Promise<void>): Promise<void> {
    // Set internal variable to random value between 1 and 8 inclusive
    this.targetSize = Math.floor(Math.random() * 8) + 1;
    
    // Update description text
    this.description = `Surround an empty Area of ${this.targetSize} Tiles to fill it with Coins. (Number changes every round)`;
  }

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const neighbors = getNeighbours(tile);
    await this.checkArea(highlight,neighbors);
  }

  async onPlaceFreeOrOffTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    if (tile.isFreeAndFreeSpot()) {
      // If free, call with array that only has the newly placed tile
      await this.checkArea(highlight,[tile]);
    } else if (tile.isOff()) {
      // If off, call with all neighbors
      const neighbors = getNeighbours(tile);
      await this.checkArea(highlight,neighbors);
    }
  }

  private async checkArea(highlight: () => Promise<void>, tiles: Tile[]): Promise<void> {
    // Call getArea with the check being both tiles have to be free for every Tile in the array
    const areas: Tile[][] = [];
    
    for (const tile of tiles) { 
        const area = getArea(tile, (tile) => tile.isFree());
        areas.push(area); 
    }
    
    // Filter for areas that have the exact length of targetSize
    const targetAreas = areas.filter(area => area.length === this.targetSize);
    
    // Remove duplicates (checked with isAreasSame)
    const uniqueAreas: Tile[][] = [];
    for (const area of targetAreas) {
      const isDuplicate = uniqueAreas.some(existingArea => isAreasSame(area, existingArea));
      if (!isDuplicate) {
        uniqueAreas.push(area);
      }
    }
    
    // Call fillArea for each of the remaining tile arrays
    for (const area of uniqueAreas) {
        await highlight();
      await this.fillArea(area);
    }
  }

  private async fillArea(area: Tile[]): Promise<void> {
    for (const tile of area) { 
      const coinTile = TileFactory.getInstance().createCoinTile();
      await handleStartPlacement(coinTile, tile.pos);
    }
  }
}
