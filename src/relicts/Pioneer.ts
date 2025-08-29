import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { GameState } from '../machines/GameState';
import { handleDouble } from '../utils/mutations/handleDouble';
import { Rarity } from '../types/Rarity';

export class Pioneer implements Relict {
  name: string = 'Pioneer'; // TODO: change to 'First Strike'
  description: string = 'The first Tile on A Board Doubles';
  icon: string = '🚀'; // Rocket emoji - alternatives: ⚡ (lightning), 🎯 (target), 🥇 (first place), 🔥 (fire)
  rarity: Rarity = Rarity.Starter;
  sellValue: number = 1;

  // Implement onPlaceTile to check if this is the first tile on an empty board
  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const gameState = GameState.getInstance();
    if (!gameState.getIsBoardEmpty()) return;
      await highlight();
      await handleDouble(tile);
  }
}
