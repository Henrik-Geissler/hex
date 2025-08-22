import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Board } from '../directories/Board';
import { Hand } from '../directories/Hand';
import { handleIncrement } from '../utils/mutations/handleIncrement';

export class Incrementer implements Relict {
  name: string = 'Incrementer';
  description: string = 'Whenever a tile is placed, increment all board and hand tiles';
  icon: string = '📈';
  sellValue: number = 3;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    await highlight();
    
    // Get all board tiles and increment them
    const boardTiles = Board.getInstance().getAllPlayedTiles();
    for (const boardTile of boardTiles) {
      await handleIncrement(boardTile);
    }
    
    // Get all hand tiles and increment them
    const handTiles = Hand.getInstance().getAllTiles();
    for (const handTile of handTiles) {
      await handleIncrement(handTile);
    }
  }
}
