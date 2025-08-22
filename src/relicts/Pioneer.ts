import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { GameState } from '../machines/GameState';
import { handleDouble } from '../utils/handleDouble';

export class Pioneer implements Relict {
  name: string = 'Pioneer';
  description: string = 'The first Tile on A Board Doubles';
  icon: string = '🚀'; // Rocket emoji
  sellValue: number = 2;

  // Implement onPlaceTile to check if this is the first tile on an empty board
  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const gameState = GameState.getInstance();
    if(tile.isFree() || tile.isOff()) return;
    if (!gameState.getIsBoardEmpty()) return;
      await highlight();
      await handleDouble(tile);
  }
}
