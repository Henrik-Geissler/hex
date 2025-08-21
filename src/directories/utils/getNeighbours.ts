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
// Return 6 neighboring indices of hex n
function getAdjacentPositions(n: number): [number,number,number,number,number,number] {
    const cube = indexToCube(n);
    const results: [number,number,number,number,number,number] = [-1,-1,-1,-1,-1,-1];
    const shiftedDirs = [DIRS[4],DIRS[5],DIRS[0],DIRS[1],DIRS[2],DIRS[3]];
    let i = 0;
    for (const [dx, dy, dz] of shiftedDirs) {
      const neighbor: [number, number, number] = [
        cube[0] + dx,
        cube[1] + dy,
        cube[2] + dz,
      ];
      results[i++] = cubeToIndex(neighbor);
    }
  
    return results;
  }