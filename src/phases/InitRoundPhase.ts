import { Deck } from '../directories/Deck';
import { DiscardPile } from '../directories/DiscardPile';
import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';

export class InitRoundPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running InitRoundPhase');
    // Initialize round state, reset round-specific variables, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    await DiscardPile.getInstance().getAllTiles().forEach(async tile  =>     {
      await DiscardPile.getInstance().remove(tile);
      await Deck.getInstance().add(tile);
    });
    await Deck.getInstance().shuffle();
    StateMachine.getInstance().setPhase('InitTurnPhase');
  }
}
