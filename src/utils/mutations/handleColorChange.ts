import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';
import { Color } from '../../types/Color';

export async function handleColorChange(tile: Tile, newColor: Color): Promise<void> {
  await mutateTile(tile, async (tile) => {
    tile.color = newColor;
    return tile;
  }, 'color'); // Passes color badge type
}
