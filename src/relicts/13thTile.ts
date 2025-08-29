import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Board } from '../directories/Board'; 
import { getNeighbours } from '../directories/utils/getNeighbours'; 
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { Rarity } from '../types/Rarity';
export class The13thTile implements Relict {
  name: string = 'The 13th Tile';
  description: string = 'The 13th Tile, thats placed on the board also place copies on every free neighbor';
  icon: string = '🎲';
  sellValue: number = 1;
  rarity:Rarity =Rarity.Starter;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    
    const boardTiles = Board.getInstance().getAllPlayedTiles();
    
    if (boardTiles.length !== 13) return;
    
    const freeNeighbors = getNeighbours(tile).filter(n => n.isFree());

    if(freeNeighbors.length === 0) return;
    
    await highlight();
    
    for (const freeNeighbor of freeNeighbors) {
      const clonedTile = tile.Clone();
      await handleStartPlacement(clonedTile, freeNeighbor.pos);
    }
  }
}
