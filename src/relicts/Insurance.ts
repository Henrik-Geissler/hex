import { Relict } from '../types/Relict';
import { Board } from '../directories/Board';
import { Rarity } from '../types/Rarity';
import { boardTileIntoDiscardPile } from '../utils/boardTileIntoDiscardPile';
import { hasPlayableCard } from '../utils/isLooseFunction';
import { TimeManager } from '../managers/TimeManager';

export class Insurance implements Relict {
  name: string = 'Insurance';
  description: string = 'When you cant play any Tile, clear the board';
  icon: string = '🛡️'; // Shield emoji
  sellValue: number = 2;
  rarity: Rarity = Rarity.Rare;

  async onTurnStart(highlight: () => Promise<void>): Promise<void> {
    // Check if the player can't play any tiles (lose condition)
    if (!hasPlayableCard()) {
      await highlight();
      await TimeManager.Wait(200);
      // Clear the board by moving all tiles to discard pile
      const boardTiles = Board.getInstance().getAllPlayedTiles();
      for (const tile of boardTiles) {
        await boardTileIntoDiscardPile(tile);
      }
    }
  }
}
