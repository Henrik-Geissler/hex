import { Tile } from '../../types/Tile';
import { Board } from '../Board'; 
import { cubeToIndex, DIRS, indexToCube } from './boardSpace';
import { CubeCoordinates } from '../../types/CubeCoordinates';

export function getPlayedNeighbours(tile: Tile): Tile[] { 
  return getNeighbours(tile).filter(t => !t.isFree() && !t.isOff());
}

/**
 * Get the Northeast neighbor tile (DIRS[4] - results[0])
 * @param tile - The tile to find the NE neighbor for
 * @returns The NE neighbor tile or undefined if position is empty
 */
export function getNE(tile: Tile): Tile  {
  const board = Board.getInstance();
  const cube = indexToCube(tile.pos);
  const [dx, dy, dz] = DIRS[4];
  const neighborPos = cubeToIndex([cube[0] + dx, cube[1] + dy, cube[2] + dz]);
  return board.getTileAtPos(neighborPos);
}

/**
 * Get the East neighbor tile (DIRS[5] - results[1])
 * @param tile - The tile to find the E neighbor for
 * @returns The E neighbor tile or undefined if position is empty
 */
export function getE(tile: Tile): Tile  {
  const board = Board.getInstance();
  const cube = indexToCube(tile.pos);
  const [dx, dy, dz] = DIRS[5];
  const neighborPos = cubeToIndex([cube[0] + dx, cube[1] + dy, cube[2] + dz]);
  return board.getTileAtPos(neighborPos);
}

/**
 * Get the Southeast neighbor tile (DIRS[0] - results[2])
 * @param tile - The tile to find the SE neighbor for
 * @returns The SE neighbor tile or undefined if position is empty
 */
export function getSE(tile: Tile): Tile  {
  const board = Board.getInstance();
  const cube = indexToCube(tile.pos);
  const [dx, dy, dz] = DIRS[0];
  const neighborPos = cubeToIndex([cube[0] + dx, cube[1] + dy, cube[2] + dz]);
  return board.getTileAtPos(neighborPos);
}

/**
 * Get the Southwest neighbor tile (DIRS[1] - results[3])
 * @param tile - The tile to find the SW neighbor for
 * @returns The SW neighbor tile or undefined if position is empty
 */
export function getSW(tile: Tile): Tile  {
  const board = Board.getInstance();
  const cube = indexToCube(tile.pos);
  const [dx, dy, dz] = DIRS[1];
  const neighborPos = cubeToIndex([cube[0] + dx, cube[1] + dy, cube[2] + dz]);
  return board.getTileAtPos(neighborPos);
}

/**
 * Get the West neighbor tile (DIRS[2] - results[4])
 * @param tile - The tile to find the W neighbor for
 * @returns The W neighbor tile or undefined if position is empty
 */
export function getW(tile: Tile): Tile  {
  const board = Board.getInstance();
  const cube = indexToCube(tile.pos);
  const [dx, dy, dz] = DIRS[2];
  const neighborPos = cubeToIndex([cube[0] + dx, cube[1] + dy, cube[2] + dz]);
  return board.getTileAtPos(neighborPos);
}

/**
 * Get the Northwest neighbor tile (DIRS[3] - results[5])
 * @param tile - The tile to find the NW neighbor for
 * @returns The NW neighbor tile or undefined if position is empty
 */
export function getNW(tile: Tile): Tile  {
  const board = Board.getInstance();
  const cube = indexToCube(tile.pos);
  const [dx, dy, dz] = DIRS[3];
  const neighborPos = cubeToIndex([cube[0] + dx, cube[1] + dy, cube[2] + dz]);
  return board.getTileAtPos(neighborPos);
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
      const neighbor: CubeCoordinates = [
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
  const mirroredCube: CubeCoordinates = [
    2 * cubeMirror[0] - cubeToMirror[0],
    2 * cubeMirror[1] - cubeToMirror[1],
    2 * cubeMirror[2] - cubeToMirror[2]
  ];
  
  // Convert back to index
  return cubeToIndex(mirroredCube);
}