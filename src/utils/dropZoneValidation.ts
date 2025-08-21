import { Tile } from '../types/Tile';
import { Color } from '../types/Color';
import { getNeighbours } from '../directories/utils/getNeighbours';
import { GameState } from '../machines/GameState';
import { neighborAccepts } from './tiles/neighborAccepts';

// Step 1: Check if tile is free
function isTileFree(targetTile: Tile): boolean {
  return targetTile.isFree();
}

// Step 2: Check if tile is on board
function isTileOnBoard(targetTile: Tile): boolean {
  return targetTile.location === 'Board';
}

// Step 3: Check if there are valid neighbors or it's Turn 1
function hasValidNeighborsOrTurn1(neighbors: Tile[]): boolean { 
  const turn = GameState.getInstance().getTurn();
  
  // If it's Turn 1, always allow
  if (turn === 1) return true;
  
  // Otherwise, need at least one neighbor that is neither free nor off
  return neighbors.some(neighbor => 
    !neighbor.isFree() && !neighbor.isOff()
  );
}

// Step 4: Check if all neighbors accept the dragged tile
function allNeighborsAccept(neighbors: Tile[], draggedTile: Tile): boolean {
  
  for (const neighbor of neighbors) {
    if (!neighborAccepts(neighbor, draggedTile))
      return false;
  }
  
  return true;
}

export function isValidDropTarget(draggedTile: Tile, targetTile: Tile): boolean {
  // Step 1: The Tile Has To Be Free
  if (!isTileFree(targetTile)) return false;

  // Step 2: The Tile Has To Be On The Board
  if (!isTileOnBoard(targetTile)) return false;

  
  const neighbors = getNeighbours(targetTile);

  // Step 3: Check if there is at least one neighbor that is neither free nor off OR it is Turn 1
  if (!hasValidNeighborsOrTurn1(neighbors)) return false;
  
  // Step 4: Check each neighbor: if it is neither free nor off and neither the same color nor shares a digit with the draggedTile, return false
  if (!allNeighborsAccept(neighbors, draggedTile)) return false;
  
  return true;
}
