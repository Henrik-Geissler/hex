import { Tile } from '../types/Tile';
import { handleScore } from './handleScore';

// Type for functions that mutate a tile and return a Promise<Tile>
export type TileMutationFunction = (tile: Tile) => Promise<Tile>;

/**
 * Higher-Order Function that handles common tile mutation logic
 * @param tile - The tile to mutate
 * @param mutationFn - Function that performs the actual mutation
 * @returns Promise<void>
 */
export async function mutateTile(tile: Tile, mutationFn: TileMutationFunction): Promise<void> {
  // Create a copy of the tile
  const tileCopy = { ...tile };
  
  // Apply the mutation function
  const mutatedTile = await mutationFn(tile);
  
  // Call handleScore with the copy and mutated tile
  await handleScore(tileCopy, mutatedTile);
}
