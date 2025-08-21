import { Tile } from '../../types/Tile';
import { Color } from '../../types/Color';

/**
 * Check if a neighbor accepts a tile based on digit sharing
 * @param neighbor - The neighbor tile to check
 * @param draggedTile - The tile being dragged
 * @returns true if the neighbor accepts the tile based on digit rules
 */
export function neighborAcceptsDigit(neighbor: Tile, draggedTile: Tile): boolean {
  
  // Check if tiles share any digits
  const score1 = neighbor.score.toString();
  const score2 = draggedTile.score.toString();
  
  for (const digit of score1) {
    if (score2.includes(digit)) {
      return true;
    }
  }
  
  // No shared digits
  return false;
}
