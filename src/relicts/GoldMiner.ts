import { Relict, Triggering } from '../types/Relict';
import { Tile } from '../types/Tile';
import { GameState } from '../machines/GameState';

export class GoldMiner implements Relict {
  name: string = 'Gold Miner';
  description: string = 'Round Start: Earn 5 Gold';
  icon: string = '💰'; // Money bag emoji
  sellValue: number = 25; // Gold Miner can be sold for 25 gold

  // Only implement onRoundStart, others return default
  async onRoundStart(): Promise<Triggering> {
    const gameState = GameState.getInstance();
    gameState.addGold(5);
    return { triggers: true };
  }
}
