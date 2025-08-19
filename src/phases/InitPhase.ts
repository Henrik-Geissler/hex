import { Deck } from '../directories/Deck';
import { DiscardPile } from '../directories/DiscardPile';
import { Hand } from '../directories/Hand';
import { TileFactory } from '../factories/TileFactory';
import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';

export class InitPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running InitPhase');
    // Initialize game state, load resources, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    Hand.getInstance().clear();
    Deck.getInstance().clear();  
    DiscardPile.getInstance().clear();
    TileFactory.getInstance().createStandardDeck();
    StateMachine.getInstance().setPhase('InitRoundPhase');
  }
}
