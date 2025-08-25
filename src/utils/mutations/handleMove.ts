import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';
import { handleStartPlacement } from './handleStartPlacement';
import { TimeManager } from '../../managers/TimeManager';
import { TileFactory } from '../../factories/TileFactory';

export async function handleMove(tile: Tile, target: Tile): Promise<void> { 
    // Trigger the mirror effect on the original tile
    await mutateTile(tile, async (tile) => {
      //await TimeManager.Wait(200);
      return tile;
    }, 'move');
    
    const emptyTile = TileFactory.getInstance().createFreeTile();
    await handleStartPlacement(emptyTile,tile.pos);
    const clonedTile = tile.Clone();
    await handleStartPlacement(clonedTile,target.pos);
}
