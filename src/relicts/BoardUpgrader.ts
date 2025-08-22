import { Relict } from '../types/Relict';
import { Board } from '../directories/Board';
import { handleUpgrade } from '../utils/mutations/handleUpgrade';

export class BoardUpgrader implements Relict {
  name: string = 'Board Upgrader';
  description: string = 'On Round End Upgrade all Tiles on the Board';
  icon: string = '⬆️';
  sellValue: number = 1;

  async onRoundEnd(highlight: () => Promise<void>): Promise<void> {
    const boardTiles = Board.getInstance().getAllPlayedTiles();
    
    if(boardTiles.length === 0) return;

    await highlight();
    
    for (const tile of boardTiles) 
      await handleUpgrade(tile);
    
  }
}
