import { Tile } from '../../types/Tile';
import { neighborAcceptsColor } from './neighborAcceptsColor';
import { neighborAcceptsDigit } from './neighborAcceptsDigit';

/**
 * Check if a neighbor accepts a tile based on color OR digit compatibility
 * @param neighbor - The neighbor tile to check
 * @param draggedTile - The tile being dragged
 * @returns true if the neighbor accepts the tile based on either color or digit rules
 */
export function neighborAccepts(neighbor: Tile, draggedTile: Tile): boolean {
  // A neighbor accepts if either color OR digit validation passes
  return neighborAcceptsColor(neighbor, draggedTile) || 
         neighborAcceptsDigit(neighbor, draggedTile);
}
