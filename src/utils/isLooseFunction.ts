
import { Hand } from '../directories/Hand';
import { Deck } from '../directories/Deck';
import { Board } from '../directories/Board';
import { isValidDropTarget } from './dropZoneValidation';
import { GameState } from '../machines/GameState';

export function hasPlayableCard(): boolean { 

  const hand = Hand.getInstance();
  const board = Board.getInstance();
  
  // Check if there are any playable cards in hand
  const handTiles = hand.getAllTiles();
  const boardTiles = board.getAllTiles();
  const hasPlayableCard = handTiles.some(handTile => {
    
    // Look for any free tiles on the board that could accept this hand tile
    return boardTiles.some(boardTile => {
      
      // Check if this hand tile can be placed on this board tile
      return isValidDropTarget(handTile, boardTile);
    });
  }); 
  return hasPlayableCard;
  }
/**
 * Checks if the player has lost the game
 * Returns true if the player has lost, false if they can continue
 * 
 * Player loses if:
 * 1. There is a playable card, OR
 * 2. There is at least one card in deck and one discard left
 */
export function isLooseFunction(): boolean {
    const deck = Deck.getInstance();

    const hasDeckAndDiscard = deck.getTileCount() > 0 && GameState.getInstance().getDiscards() > 0;
    if(hasDeckAndDiscard) return false; 
  const hasPlayableCards= hasPlayableCard();
  
  // Check if there are cards in deck and discard pile
  
  // Player loses if they have a playable card OR if they have both deck and discard cards
  return !hasPlayableCards;
}