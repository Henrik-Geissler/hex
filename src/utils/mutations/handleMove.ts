import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';
import { handleStartPlacement } from './handleStartPlacement';

export async function handleMove(tile: Tile, target: Tile): Promise<void> { 
    // Trigger the mirror effect on the original tile
    await mutateTile(tile, async (tile) => {
      //await TimeManager.Wait(200);
      return tile;
    }, 'move');
    await handleStartPlacement(tile,target.pos);
}
