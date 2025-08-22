import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Board } from '../directories/Board';
import { handleUpgrade } from '../utils/mutations/handleUpgrade';
import { Color } from '../types/Color';

export class GreenGrowth implements Relict {
  name: string = 'Green Growth';
  description: string = 'When you draw a green Tile, upgrade all green Tiles on the board';
  icon: string = '🌱';
  sellValue: number = 1;

  async onDrawTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {

    if (!tile.matchesColor(Color.Green)) return;

    const boardTiles = Board.getInstance().getAllPlayedTiles().filter(t => t.matchesColor(Color.Green));

    if (boardTiles.length === 0) return;
    
    for (const boardTile of boardTiles) {
        await highlight();
        await handleUpgrade(boardTile); 
    }
  }
}
