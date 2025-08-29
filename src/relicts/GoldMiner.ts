import { Relict } from '../types/Relict';
import { GameState } from '../machines/GameState';
import { Rarety } from '../types/Rarety';

export class GoldMiner implements Relict {
  name: string = 'Gold Miner';
  description: string = 'Round Start: Earn 1 Gold';
  icon: string = '💰'; // Money bag emoji
  rarity: Rarety = Rarety.Filler;
  sellValue: number = 1; // Gold Miner can be sold for 1 gold

  // Only implement onRoundStart, others return default
  async onRoundStart(highlight: () => Promise<void>): Promise<void> {
    // Call the highlight callback to make the relict light up
    await highlight();
    
    const gameState = GameState.getInstance();
    gameState.addGold(1);
  }
}
