import { Tile } from '../../types/Tile';
import { getNeighbours } from './getNeighbours';

/**
 * Get all tiles in a connected area starting from a given tile
 * @param startTile - The tile to start the area search from
 * @param compareFunction - Function that determines if two tiles are part of the same area
 * @returns Array of tiles that form the connected area
 */
export function getArea(startTile: Tile, isInArea: (tile: Tile) => boolean): Tile[] {
  // Set to track visited tile positions
  const visitedTiles = new Set<number>();
  
  // Array to store tiles in the area
  const areaTiles: Tile[] = [];
  
  // Recursive function to explore the area
  function exploreArea(currentTile: Tile): void {
    if (visitedTiles.has(currentTile.pos)) return; 
    visitedTiles.add(currentTile.pos);
    if(!isInArea(currentTile)) return; 
    areaTiles.push(currentTile); 
    const neighbors = getNeighbours(currentTile); 
    for (const neighbor of neighbors) { 
          exploreArea(neighbor); 
    }
  } 
  exploreArea(startTile);
  
  return areaTiles.sort((a, b) => a.pos - b.pos);
}

export function isAreasSame(area1: Tile[], area2: Tile[]): boolean {
    if(area1.length ==0) return area2.length ===0;
    if(area2.length ==0) return false;
    return area1[0].pos === area2[0].pos;
}