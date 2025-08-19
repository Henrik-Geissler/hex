import { Relict, Triggering } from '../types/Relict';
import { Tile } from '../types/Tile';

export class PiggyBank implements Relict {
  name: string = 'Piggy Bank';
  description: string = 'Round Start: Sell value increases by 1';
  icon: string = '🐷'; // Pig emoji
  sellValue: number = 15; // Starting sell value

  // Only implement onRoundStart, others return default
  async onRoundStart(): Promise<Triggering> {
    this.sellValue += 1; // Increase sell value by 5 each round
    return { triggers: true };
  }

}
