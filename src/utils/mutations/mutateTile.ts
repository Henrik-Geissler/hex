import { Tile } from '../../types/Tile';
import { handleScore } from '../handleScore';
import { Board } from '../../directories/Board';
import { Hand } from '../../directories/Hand';
import { BadgeManager } from '../BadgeManager';
import { BadgeType } from '../../types/BadgeType';

// Type for functions that mutate a tile and return a Promise<Tile>
export type TileMutationFunction = (tile: Tile) => Promise<Tile>;

/**
 * Higher-Order Function that handles common tile mutation logic
 * @param tile - The tile to mutate
 * @param mutationFn - Function that performs the actual mutation
 * @param animationType - The type of animation to show during the mutation
 * @returns Promise<void>
 */
export async function mutateTile(
  tile: Tile, 
  mutationFn: TileMutationFunction, 
  animationType?: BadgeType
): Promise<void> {
  // Create a copy of the tile
  const tileCopy = tile.Clone();
  
  // Trigger the score badge before applying the mutation
  if(animationType){
    const badgeManager = BadgeManager.getInstance();
    badgeManager.requestBadge(tile, animationType);
  }
  
  // Apply the mutation function
  const mutatedTile = await mutationFn(tile);
  
  // Trigger UI update to show score change immediately
      if (tile.isBoard()) {
    const board = Board.getInstance();
    board.triggerUpdate();
      } else if (tile.isHand()) {
    const hand = Hand.getInstance();
    hand.triggerUpdate();
  }
   
    await handleScore(tileCopy, mutatedTile); 
}
