import { Relict } from '../types/Relict';
import { GameState } from '../machines/GameState';
import { Rarity } from '../types/Rarity';
export class DiscardRewarder implements Relict {
  name: string = 'Discard Rewarder';
  description: string = 'Round End: Get 1 Gold for each remaining Discard';
  icon: string = '🎁'; // Gift emoji - alternatives: 🏆 (trophy), ⭐ (star), 💎 (gem), 🎯 (target)
  sellValue: number = 3;
  rarity:Rarity = Rarity.Rare;
  async onRoundEnd(highlight: () => Promise<void>): Promise<void> {
    const gameState = GameState.getInstance();
    const remainingDiscards = gameState.getDiscards();
    
    if (remainingDiscards > 0) {
      await highlight();
      gameState.addGold(remainingDiscards);
    }
  }
}
