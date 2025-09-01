import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Rarity } from '../types/Rarity';
import { Digit } from '../types/Digit';
import { handleCoin } from '../utils/mutations/handleCoin';
import { TimeManager } from '../managers/TimeManager';

export class DigitGoldRewarder implements Relict {
  name: string = 'Digit Gold Rewarder';
  icon: string = '💰'; // Money bag emoji
  rarity: Rarity = Rarity.Starter;
  sellValue: number = 3;
  
  private targetDigit: Digit = 1; // Default starting digit

  get description(): string {
    return `When you discard a ${this.targetDigit}, get a Gold. (Number changes every Round)`;
  }

  /**
   * Called at the start of each round
   * Changes the target digit to a random number 1-9
   */
  async onRoundStart(highlight: () => Promise<void>): Promise<void> { 
    this.targetDigit = (Math.floor(Math.random() * 9) + 1) as Digit;
  }
  async onChoose(highlight: () => Promise<void>, relict: Relict): Promise<void> {
    this.targetDigit = (Math.floor(Math.random() * 9) + 1) as Digit;
      
  }

  /**
   * Called when tiles are discarded
   * Checks if any discarded tile contains the target digit and gives gold
   */
  async onDiscard(highlight: () => Promise<void>, tiles: Tile[]): Promise<void> { 
    
    for (const tile of tiles)  
      if (tile.isDigit(this.targetDigit) ) {
        await highlight();
        await handleCoin(tile);
        await TimeManager.Wait(300);
      }  
  }
}
