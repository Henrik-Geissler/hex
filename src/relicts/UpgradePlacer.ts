import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Board } from '../directories/Board';
import { TileFactory } from '../factories/TileFactory'; 
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { Rarity } from '../types/Rarity';

export class UpgradePlacer implements Relict {
  name: string = 'Upgrade Placer';
  icon: string = '📍'; // Pin emoji - alternatives: 🎯 (target), ⬆️ (up arrow), 🔧 (wrench), ⚡ (lightning)
  rarity: Rarity = Rarity.Starter;
  sellValue: number = 1;
  
  private upgradeSlots: number = 1; // Start with 1 upgrade slot

  get description(): string {
    return `Start with ${this.upgradeSlots} Upgrade Tile${this.upgradeSlots !== 1 ? 's' : ''} (Increases every Round)`;
  }

  /**
   * Called at the start of each round
   * Places Upgrade tiles on random tiles after free tiles are placed
   */
  async onRoundStart(highlight: () => Promise<void>): Promise<void> {
    const board = Board.getInstance();
    const tileFactory = TileFactory.getInstance();
    const allTiles = board.getAllTiles();
    const freeTiles = allTiles.filter(tile => tile.isFreeAndFreeSpot());
    
    // Randomly select tiles to upgrade based on current upgrade slots
    const tilesToUpgrade = this.getRandomTiles(freeTiles, Math.min(this.upgradeSlots, freeTiles.length));
    
    // Place Upgrade tiles on the selected positions
    for (const tile of tilesToUpgrade) {
      const upgradeTile = tileFactory.createUpgradeTile();
      await highlight();
      await handleStartPlacement(upgradeTile, tile.pos); 
    }
  }

  /**
   * Called at the end of each round
   * Increases the number of upgrade slots
   */
  async onRoundEnd(highlight: () => Promise<void>): Promise<void> {
    this.upgradeSlots++;
    await highlight();
  }

  /**
   * Get random tiles from an array
   * @param tiles - Array of tiles to select from
   * @param count - Number of tiles to select
   * @returns Array of randomly selected tiles
   */
  private getRandomTiles(tiles: Tile[], count: number): Tile[] {
    const shuffled = [...tiles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
