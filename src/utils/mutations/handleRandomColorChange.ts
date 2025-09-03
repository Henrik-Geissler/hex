import { Tile } from '../../types/Tile';
import { handleColorChange } from './handleColorChange';
import { randomNextColorFunction } from '../../types/Color';

export async function handleRandomColorChange(tile: Tile): Promise<void> {
  console.log('handleRandomColorChange', tile.toString());
  const newColor = randomNextColorFunction(tile.color);
  await handleColorChange(tile, newColor);
}
