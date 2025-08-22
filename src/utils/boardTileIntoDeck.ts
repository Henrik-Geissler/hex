 
import { Tile } from '../types/Tile';
import { Deck } from '../directories/Deck';
import { Board } from '../directories/Board';

/**
 * Handle discarding a single tile from hand to discard pile
 * @param tile - The tile to discard
 */
export async function boardTileIntoDeck(tile: Tile): Promise<void> {  
  const deck = Deck.getInstance();
  const board = Board.getInstance();
  await board.remove(tile);
  tile.location = 'Deck';
  await deck.add(tile);
}
