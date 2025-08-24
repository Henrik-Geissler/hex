import { Relict } from '../types/Relict';
import { GameState } from '../machines/GameState';

export class DiscardRewarder implements Relict {
  name: string = 'Discard Rewarder';
  description: string = 'Round End: Get 1 Gold for each remaining Discard';
  icon: string = '🗑️'; // Trash can emoji for discarding
  sellValue: number = 1;

  async onRoundEnd(highlight: () => Promise<void>): Promise<void> {
    const gameState = GameState.getInstance();
    const remainingDiscards = gameState.getDiscards();
    
    if (remainingDiscards > 0) {
      await highlight();
      gameState.addGold(remainingDiscards);
    }
  }
}
