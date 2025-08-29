import { Relict } from '../types/Relict'; 
import { Rarity } from '../types/Rarity';

export class PiggyBank implements Relict {
  name: string = 'Piggy Bank';
  description: string = 'Round Start: Sell value increases by 1';
  icon: string = '🐷'; // Pig emoji
  rarity: Rarity = Rarity.Filler;
  sellValue: number = 1; // Starting sell value

  // Only implement onRoundStart, others return default
  async onRoundStart(highlight: () => Promise<void>): Promise<void> {
    // Call the highlight callback to make the relict light up
    await highlight();
    
    this.sellValue += 1; // Increase sell value by 1 each round
  }

}
