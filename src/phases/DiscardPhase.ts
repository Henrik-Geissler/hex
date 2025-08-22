import { PhaseInterface } from '../types/PhaseInterface';
import { StateMachine } from '../machines/StateMachine';
import { GameState } from '../machines/GameState';
import { RelictManager } from '../managers/RelictManager';
import { handleDiscard } from '../utils/handleDiscard';
import { Hand } from '../directories/Hand';
import { Tile } from '../types/Tile';

interface DiscardPhaseParams {
  selectedCardIds?: number[];
}

export class DiscardPhase implements PhaseInterface {
  async run(params?: DiscardPhaseParams): Promise<void> {
    
    // Get the selected cards to discard from params
    const selectedCardIds = params?.selectedCardIds;
    
    // Get the hand instance to pass tiles to onDiscard
    const hand = Hand.getInstance();
    const handTiles = hand.getAllTiles();
    
    // Determine which tiles to discard
    let tilesToDiscard: Tile[];
    if (selectedCardIds && selectedCardIds.length > 0) {
      tilesToDiscard = handTiles.filter((tile: Tile) => selectedCardIds.includes(tile.id));
    } else {
      tilesToDiscard = handTiles;
    }
    
    // Call the relict manager's onDiscard method with the tiles being discarded
    await RelictManager.getInstance().onDiscard(tilesToDiscard);
    
    // Handle the actual discarding of cards - now one tile at a time
    for (const tile of tilesToDiscard) {
      await handleDiscard(tile);
    }
    
    // Reduce discards by 1
    const gameState = GameState.getInstance();
    const currentDiscards = gameState.getDiscards();
    gameState.setDiscards(currentDiscards - 1);
    
    // Transition to CheckWinPhase
    StateMachine.getInstance().setPhase('CheckWinPhase');
  }
}
