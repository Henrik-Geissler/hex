import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';

export async function handleDouble(tile: Tile): Promise<void> {
  console.log('handleDouble', tile.toString());
  await mutateTile(tile, async (tile) => {
    tile.setScore((tile.score || 0) * 2);
    return tile;
  }, 'double');
}
