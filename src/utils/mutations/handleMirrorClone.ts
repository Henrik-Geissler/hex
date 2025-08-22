import { Tile } from '../../types/Tile';
import { Board } from '../../directories/Board';
import { mirrorPosition } from '../../directories/utils/getNeighbours';
import { mutateTile } from './mutateTile';
import { PlacingQueue } from '../../directories/utils/PlacingQueue';

export async function handleMirrorClone(tileToMirror: Tile, mirrorTile: Tile): Promise<boolean> {
  // Calculate the mirrored position
  const mirroredPos = mirrorPosition(tileToMirror, mirrorTile);
  
  // Get all tiles on the board to check if the mirrored position is free
  const tileAtMirroredPos = Board.getInstance().getTileAtPos(mirroredPos); 
  
  // Check if the mirrored position is valid and empty (free or off)
  if (!tileAtMirroredPos.isFree())  return false;
    // Trigger the mirror effect on the original tile
    await mutateTile(mirrorTile, async (tile) => {
      return tile;
    }, 'mirror');
    
    const clonedTile = tileToMirror.Clone();
    PlacingQueue.getInstance().add(clonedTile,mirroredPos);
    return true;
}
