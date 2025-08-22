import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';

export async function handleMirror(tile: Tile): Promise<void> {
  await mutateTile(tile, async (tile) => {
    // For now, just return the tile unchanged
    // The mirror effect will be handled by the badge system
    return tile;
  }, 'mirror'); // Passes mirror badge type
}
