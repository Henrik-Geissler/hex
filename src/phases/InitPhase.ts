import { Deck } from '../directories/Deck';
import { DiscardPile } from '../directories/DiscardPile';
import { Hand } from '../directories/Hand';
import { TileFactory } from '../factories/TileFactory';
import { StateMachine } from '../machines/StateMachine';
import { GameState } from '../machines/GameState';
import { PhaseInterface } from '../types/PhaseInterface';
import { Board } from '../directories/Board';
import { RelictDeck } from '../directories/RelictDeck';
import { RelictManager } from '../managers/RelictManager';

export class InitPhase implements PhaseInterface {
  async run(): Promise<void> { 
    RelictManager.getInstance().reset();
     GameState.getInstance().setRound(0);
    GameState.getInstance().setGold(0);
    GameState.getInstance().setTargetScore(20); 
    
    Board.getInstance().clear();
    Hand.getInstance().clear();
    Deck.getInstance().clear();  
    DiscardPile.getInstance().clear();
    TileFactory.getInstance().createStandardDeck();

    RelictDeck.getInstance().reset();
    
    // Draw a random relict and add it to the relictbar
    const relictDeck = RelictDeck.getInstance();
    const drawnRelicts = relictDeck.draw(1);
    if (drawnRelicts.length > 0) {
      const relictManager = RelictManager.getInstance();
      // Find the first empty slot (index 0 should be empty after reset)
      relictManager.setRelict(0, drawnRelicts[0]);
    }
    
    StateMachine.getInstance().setPhase('InitRoundPhase');
  }
}
