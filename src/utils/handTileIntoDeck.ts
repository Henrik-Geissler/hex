 
import { Tile } from '../types/Tile';
import { Deck } from '../directories/Deck';
import { Hand } from '../directories/Hand';
import { TimeManager } from '../managers/TimeManager';

/**
 * Handle discarding a single tile from hand to discard pile
 * @param tile - The tile to discard
 */
export async function handTileIntoDeck(tile: Tile): Promise<void> {  
  
  const deck = Deck.getInstance();
  const hand = Hand.getInstance();
  await hand.remove(tile);
  // Don't add ghost tiles to the deck
  if (tile.isGhost) {
    return;
  }
  tile.location = 'Deck';
  await deck.add(tile);
  await TimeManager.Wait(100); 
}
