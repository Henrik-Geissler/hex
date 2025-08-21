import { Tile } from '../../types/Tile';
import { Board } from '../Board'; 
import { cubeToIndex, DIRS, indexToCube } from './boardSpace';

/**
 * Get all 6 neighboring tiles for a given tile
 * @param tile - The tile to find neighbors for
 * @returns Array of 6 neighboring tiles (may include undefined if position is empty)
 */
export function getNeighbours(tile: Tile):  [Tile,Tile,Tile,Tile,Tile,Tile] {
  const board = Board.getInstance();
  const allTiles = board.getAllTiles();
  
  // Get the 6 adjacent position numbers for this tile
  const adjacentPositions = getAdjacentPositions(tile.pos);
  
  // Find tiles at those positions
  const neighbours = adjacentPositions.map((pos: number) => {
    return allTiles.find(t => t.pos === pos);
  });
  
  return neighbours as [Tile,Tile,Tile,Tile,Tile,Tile];
}

/**
 * Get all 6 adjacent position numbers for a given position
 * @param position - The position number
 * @returns Array of 6 adjacent position numbers
 */
function getAdjacentPositions(position: number): number[] {
    if (position === 0) {
      // Center tile has 6 adjacent tiles
      return [1, 2, 3, 4, 5, 6];
    }
  
    // Convert position to cube coordinates
    const [x, y, z] = indexToCube(position);
    
    // Get adjacent cube coordinates (6 directions)
    const adjacentCubes: [number, number, number][] = DIRS.map(([dx, dy, dz]) => [
      x + dx,
      y + dy,
      z + dz
    ]);
    
    // Convert back to position numbers
    return adjacentCubes.map(cube => cubeToIndex(cube));
  }