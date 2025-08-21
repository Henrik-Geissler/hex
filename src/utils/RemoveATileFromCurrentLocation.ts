import { Tile } from '../types/Tile';
import { Hand as HandDirectory } from '../directories/Hand';
import { Board as BoardDirectory } from '../directories/Board';
import { Deck as DeckDirectory } from '../directories/Deck';
import { DiscardPile as DiscardPileDirectory } from '../directories/DiscardPile';

export async function RemoveATileFromCurrentLocation(tile: Tile): Promise<void> {
  switch (tile.location) {
    case 'Deck':
      const deck = DeckDirectory.getInstance();
      await deck.remove(tile);
      break;
    case 'Hand':
      const hand = HandDirectory.getInstance();
      await hand.remove(tile);
      break;
    case 'Board':
      const board = BoardDirectory.getInstance();
      await board.remove(tile);
      break;
    case 'DiscardPile':
      const discardPile = DiscardPileDirectory.getInstance();
      await discardPile.remove(tile);
      break;
    case 'Air':
      break;
    default:
      throw new Error(`Unknown tile location: ${tile.location}`);
  }
}
