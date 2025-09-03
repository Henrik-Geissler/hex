import { Tile } from '../../types/Tile';
import { Board } from '../../directories/Board';
import { mirrorPosition } from '../../directories/utils/getNeighbours';
import { mutateTile } from './mutateTile';
import { handleStartPlacement } from './handleStartPlacement';
import { TimeManager } from '../../managers/TimeManager';

export async function handleMirrorClone(tileToMirror: Tile, mirrorTile: Tile): Promise<boolean> {
  console.log('handleMirrorClone', tileToMirror.toString(), mirrorTile.toString());
  // Calculate the mirrored position
  const mirroredPos = mirrorPosition(tileToMirror, mirrorTile);
  
  // Get all tiles on the board to check if the mirrored position is free
  const tileAtMirroredPos = Board.getInstance().getTileAtPos(mirroredPos); 
  
  // Check if the mirrored position is valid and empty (free or off)
  if (!tileAtMirroredPos.isFree())  return false;
    // Trigger the mirror effect on the original tile
    await mutateTile(mirrorTile, async (tile) => {
      await TimeManager.Wait(200);
      return tile;
    }, 'mirror');
    
    const clonedTile = tileToMirror.CloneGhost();
    await handleStartPlacement(clonedTile,mirroredPos);
    return true;
}
