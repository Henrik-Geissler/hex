import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Board } from '../directories/Board';
import { Hand } from '../directories/Hand';
import { handleConsume } from '../utils/mutations/handleConsume';

export class ColorConsumer implements Relict {
  name: string = 'Color Consumer';
  description: string = 'The first Tile of each Color consumes the lowest Tile in your hand';
  icon: string = '🍽️';
  sellValue: number = 1;
  rarety:Rarety =Rarety.Starter;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    
    // Get all played tiles on the board
    const isColorOnBoardAlready = Board.getInstance().getAllTiles().some(t => t.matchesColor(tile.color)&&t!==tile);
    if (isColorOnBoardAlready) return; 
    const handTiles = Hand.getInstance().getAllTiles();
    
    if (handTiles.length === 0) return; 
    await highlight();
    
    // Find the lowest scoring tile in hand
    const lowestHandTile = handTiles.reduce((lowest, current) => 
      (current.score || 0) < (lowest.score || 0) ? current : lowest
    );
     
    await handleConsume(tile, lowestHandTile);
      
  }
}
