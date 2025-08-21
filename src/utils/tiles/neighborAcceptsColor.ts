import { Tile } from '../../types/Tile';
import { Color } from '../../types/Color';

/**
 * Check if a neighbor accepts a tile based on color compatibility
 * @param neighbor - The neighbor tile to check
 * @param draggedTile - The tile being dragged
 * @returns true if the neighbor accepts the tile based on color rules
 */
export function neighborAcceptsColor(neighbor: Tile, draggedTile: Tile): boolean {
  // If neighbor is free or off, it always accepts
  if (neighbor.color === Color.Free || neighbor.color === Color.Off || neighbor.color === Color.White) {
    return true;
  }
  if (draggedTile.color === Color.Free || draggedTile.color === Color.Off || draggedTile.color === Color.White) {
    return true;
  }
  
  // If neighbor has the same color as dragged tile, it accepts
  if (neighbor.color === draggedTile.color) {
    return true;
  }
  
  // Otherwise, color is not compatible
  return false;
}
