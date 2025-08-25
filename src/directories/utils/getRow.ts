import { indexToCube } from './boardSpace';

/**
 * Converts a tile position to its row number in the honeycomb
 * @param position - The position number of the tile
 * @returns The row number (center is 0, above is positive, below is negative)
 */
export function getRow(position: number): number {
  
  const [_x, _y, z] = indexToCube(position);
  // In the honeycomb, the z coordinate represents the row
  // Center is at (0,0,0), so z gives us the row number
  return z;
}
