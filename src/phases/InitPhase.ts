import { Deck } from '../directories/Deck';
import { DiscardPile } from '../directories/DiscardPile';
import { Hand } from '../directories/Hand';
import { TileFactory } from '../factories/TileFactory';
import { StateMachine } from '../machines/StateMachine';
import { GameState } from '../machines/GameState';
import { PhaseInterface } from '../types/PhaseInterface';
import { Board } from '../directories/Board';
import { RelictDeck } from '../directories/RelictDeck';

export class InitPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running InitPhase');
    // Initialize game state, load resources, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    GameState.getInstance().setRound(0);
    GameState.getInstance().setGold(0);
    GameState.getInstance().setTargetScore(2); 
    
    Board.getInstance().clear();
    Hand.getInstance().clear();
    Deck.getInstance().clear();  
    DiscardPile.getInstance().clear();
    TileFactory.getInstance().createStandardDeck();
    
    // Reset the relict deck
    RelictDeck.getInstance().reset();
    
    StateMachine.getInstance().setPhase('InitRoundPhase');
  }
}
