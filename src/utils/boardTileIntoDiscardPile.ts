import { Tile } from '../types/Tile';
import { DiscardPile } from '../directories/DiscardPile';
import { Board } from '../directories/Board';

/**
 * Handle moving a single tile from board to discard pile
 * @param tile - The tile to move to discard pile
 */
export async function boardTileIntoDiscardPile(tile: Tile): Promise<void> {  
  const discardPile = DiscardPile.getInstance();
  const board = Board.getInstance();
  await board.remove(tile);
  tile.location = 'DiscardPile';
  await discardPile.add(tile);
}
