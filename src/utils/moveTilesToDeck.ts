import { DiscardPile } from '../directories/DiscardPile';
import { Deck } from '../directories/Deck';

/**
 * Moves all non-ghost tiles from the discard pile to the deck
 * Ghost tiles remain in the discard pile
 */
export async function moveTilesToDeck(): Promise<void> {
  const discardPile = DiscardPile.getInstance();
  const deck = Deck.getInstance();
  
  // Get all tiles and filter out ghost tiles
  const Tiles = discardPile.getAllTiles().filter(tile => !tile.isGhost);
  
  // Move non-ghost tiles to deck
  for (const tile of Tiles) {
    await discardPile.remove(tile);
    await deck.add(tile);
  }
 await discardPile.clear();
}
