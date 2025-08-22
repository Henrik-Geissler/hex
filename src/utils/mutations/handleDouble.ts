import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';

export async function handleDouble(tile: Tile): Promise<void> {
  await mutateTile(tile, async (tile) => {
    tile.score = (tile.score || 0) * 2;
    return tile;
  }, 'double');
}
