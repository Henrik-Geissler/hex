import { Hand } from '../directories/Hand';
import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';
import { RelictManager } from '../managers/RelictManager';
import { GameState } from '../machines/GameState';

export class InitTurnPhase implements PhaseInterface {
  async run(): Promise<void> { 
    // Initialize turn state, draw cards, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work

    await Hand.getInstance().drawFull();
    
    // Increment turn counter
    const gameState = GameState.getInstance();
    gameState.incrementTurn();
    
    // Only trigger onRoundStart for relicts on the first turn of the round
    if (gameState.getTurn() === 1) {
      await RelictManager.getInstance().onRoundStart();
    }
    
    StateMachine.getInstance().setPhase('CheckLoosePhase');
  }
}
