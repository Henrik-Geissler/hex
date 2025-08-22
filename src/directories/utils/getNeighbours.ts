import { Tile } from '../../types/Tile';
import { Board } from '../Board'; 
import { cubeToIndex, DIRS, indexToCube } from './boardSpace';

export function getPlayedNeighbours(tile: Tile): Tile[] { 
  return getNeighbours(tile).filter(t => !t.isFree() && !t.isOff());
}
/**
 * Get all 6 neighboring tiles for a given tile
 * @param tile - The tile to find neighbors for
 * @returns Array of 6 neighboring tiles (may include undefined if position is empty)
 */
export function getNeighbours(tile: Tile):  [Tile,Tile,Tile,Tile,Tile,Tile] {
  const board = Board.getInstance(); 
  
  // Get the 6 adjacent position numbers for this tile
  const adjacentPositions = getAdjacentPositions(tile.pos);
  
  // Find tiles at those positions
  const neighbours = adjacentPositions.map((pos: number) => {
    return board.getTileAtPos(pos);
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

/**
 * Calculate the mirrored position of a tile across another tile
 * @param tileToMirror - The tile whose position we want to mirror
 * @param mirror - The tile that serves as the mirror point
 * @returns The position number of the mirrored tile
 */
export function mirrorPosition(tileToMirror: Tile, mirror: Tile): number {
  return mirrorPositionByNumbers(tileToMirror.pos, mirror.pos);
}

/**
 * Calculate the mirrored position of a position number across another position number
 * @param positionToMirror - The position number to mirror
 * @param mirrorPosition - The position number that serves as the mirror point
 * @returns The position number of the mirrored position
 */
export function mirrorPositionByNumbers(positionToMirror: number, mirrorPosition: number): number {
  // Convert both positions to cube coordinates
  const cubeToMirror = indexToCube(positionToMirror);
  const cubeMirror = indexToCube(mirrorPosition);
  
  // Calculate the mirrored cube coordinates
  // Mirroring across a point: mirrored = 2 * mirror - original
  const mirroredCube: [number, number, number] = [
    2 * cubeMirror[0] - cubeToMirror[0],
    2 * cubeMirror[1] - cubeToMirror[1],
    2 * cubeMirror[2] - cubeToMirror[2]
  ];
  
  // Convert back to index
  return cubeToIndex(mirroredCube);
}