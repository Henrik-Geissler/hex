import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Color } from '../types/Color';
import { handleMirror } from '../utils/mutations/handleMirror';
import { getNeighbours, mirrorPosition } from '../directories/utils/getNeighbours'; 
import { Board } from '../directories/Board';
import { PlacingQueue } from '../directories/utils/PlacingQueue';
import { Location } from '../types/Location';

export class BlueMirror implements Relict {
  name: string = 'Blue Mirror';
  description: string = 'Placed Tiles are mirrored at blue neighbors';
  icon: string = '🪞'; // Mirror emoji
  sellValue: number = 2;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    // Get all neighbors of the placed tile
    const neighbors = getNeighbours(tile);
    
    // Find blue neighbors
    const blueNeighbors = neighbors.filter(neighbor => 
      neighbor && neighbor.matchesColor(Color.Blue)
    );
    
    if (blueNeighbors.length === 0) return;
    
    // Check if any mirrored positions are free
    let hasFreeMirroredPosition = false;
    const board = Board.getInstance();
    const allBoardTiles = board.getAllTiles();
    
    for (const blueNeighbor of blueNeighbors) {
      const mirroredPos = mirrorPosition(tile, blueNeighbor);
      const tileAtMirroredPos = allBoardTiles.find(t => t.pos === mirroredPos);
      
      if (tileAtMirroredPos && (tileAtMirroredPos.isFree())) {
        hasFreeMirroredPosition = true;
        break;
      }
    }
    
    if (!hasFreeMirroredPosition) return;
    
    await highlight();
    
    // For each blue neighbor, mirror the tile if the mirrored position is free
    for (const blueNeighbor of blueNeighbors) {
      const mirroredPos = mirrorPosition(tile, blueNeighbor);
      const tileAtMirroredPos = allBoardTiles.find(t => t.pos === mirroredPos);
      
      if (tileAtMirroredPos && (tileAtMirroredPos.isFree())) {
        // Call handleMirror on the blue neighbor
        await handleMirror(blueNeighbor);
        
        // Create a copy of the current tile for the mirrored position
        const mirroredTile = { ...tile, location:Location.Air }; 
        
        // Place the mirrored tile
        PlacingQueue.getInstance().add(mirroredTile, mirroredPos);
      }
    }
  }
}
