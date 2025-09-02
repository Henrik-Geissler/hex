import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Rarity } from '../types/Rarity'; 
import { getArea } from '../directories/utils/getArea';
import { handleUpgrade } from '../utils/mutations/handleUpgrade';

export class DigitAreaUpgrader implements Relict {
  name: string = 'Digit Area Upgrader';
  description: string = 'When placing a tile, upgrade all tiles in areas of same digits (excluding the placed tile)';
  icon: string = '🎪'; // Numbers emoji - alternatives: 📊 (bar chart), 🎯 (target), ⚡ (lightning), 🔄 (refresh), 📈 (trending up), 🎲 (dice), 🔟 (keycap 10), 📋 (clipboard), 🎪 (circus tent), 🏆 (trophy)
  rarity: Rarity = Rarity.Starter;
  sellValue: number = 1;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    await this.upgradeDigitAreas(highlight, tile);
  }

  private async upgradeDigitAreas(highlight: () => Promise<void>, placedTile: Tile): Promise<void> {
    // For each digit in the placed tile, find areas of tiles with that digit
    for (const digit of placedTile.getDigits()) {
      // Use getArea to find connected areas starting from the placed tile
      const area = getArea(placedTile, (tile) => tile.isDigit(digit));
      

      
      if (area.length <3) return;
        await highlight();
        
        // Upgrade each tile in the area
        for (const tileToUpgrade of area) {
          await handleUpgrade(tileToUpgrade);
        }
      }
    }
  } 
