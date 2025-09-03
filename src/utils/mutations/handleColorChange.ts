import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';
import { Color } from '../../types/Color';
import { RelictManager } from '../../managers/RelictManager';

export async function handleColorChange(tile: Tile, newColor: Color): Promise<void> { 
  console.log('handleColorChange', tile.toString(), newColor);
  if(tile.color === newColor) return;
  await mutateTile(tile, async (tile) => {
    tile.color = newColor;
    return tile;
  }, 'color'); // Passes color badge type
  
  // Call the onColorChange lifecycle method
  await RelictManager.getInstance().onColorChange(tile);
}
