import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';

export async function handleIncrement(tile: Tile): Promise<void> {
  await mutateTile(tile, async (tile) => {
    tile.setScore((tile.score || 0) + 1);
    return tile;
  }, 'increment');
}
