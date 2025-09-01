import { Hand } from '../directories/Hand';
import { DiscardPile } from '../directories/DiscardPile';
import { Tile } from '../types/Tile';

/**
 * Handle discarding a single tile from hand to discard pile
 * @param tile - The tile to discard
 */
export async function handleDiscard(tile: Tile): Promise<void> {

  
  const hand = Hand.getInstance();
  const discardPile = DiscardPile.getInstance();
  
  // Remove the tile from hand and add it to discard pile
  await hand.remove(tile);  // Don't add ghost tiles to the discard pile
  if (tile.isGhost) {
    return;
  }
  await discardPile.add(tile);
}
