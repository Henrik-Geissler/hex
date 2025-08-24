import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Board } from '../directories/Board';
import { TileFactory } from '../factories/TileFactory'; 
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement'; 
import { getNeighbours } from '../directories/utils/getNeighbours'; 

export class WaterToucher implements Relict {
  name: string = 'Water Toucher';
  description: string = 'When you touch the water for the first time, Add a double and a coin to the board';
  icon: string = '🏊'; // Swimmer emoji for touching water
  sellValue: number = 1;
  
  private hasTouchedWater: boolean = false;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Check if this is the first time touching water (Blue tiles)
    if (this.hasTouchedWater) {
      return;
    }
    const neighbours = getNeighbours(tile); 
    const blueNeighbours = neighbours.some(tile => tile.isOff());
    if(!blueNeighbours) return;
    await highlight();
    this.hasTouchedWater = true;
    
    const board = Board.getInstance();
    const tileFactory = TileFactory.getInstance();
    
    // Get all free spots on the board
    const allTiles = board.getAllTiles();
    const freeTiles = allTiles.filter(tile => tile.isFreeAndFreeSpot());
    
    if (freeTiles.length < 2) return; 
    const shuffled = [...freeTiles].sort(() => 0.5 - Math.random());
    const selectedSpots = shuffled.slice(0, 2);
    const doubleTile = tileFactory.createDoubleTile();
    await handleStartPlacement(doubleTile, selectedSpots[0].pos);
    const coinTile = tileFactory.createCoinTile();
    await handleStartPlacement(coinTile, selectedSpots[1].pos); 
  }
}
