import { Hand } from '../directories/Hand';
import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';
import { RelictManager } from '../managers/RelictManager';
import { GameState } from '../machines/GameState';
import { Phase } from '../types/Phase';
import { TimeManager } from '../managers/TimeManager';
import { PlacingQueue } from '../directories/utils/PlacingQueue';

export class InitTurnPhase implements PhaseInterface {
  async run(): Promise<void> { 
    TimeManager.resetCounter();
    // Initialize turn state, draw cards, etc.
    await TimeManager.Wait(100); // Simulate async work

    await Hand.getInstance().drawFull();
    
    // Increment turn counter
    const gameState = GameState.getInstance();
    gameState.incrementTurn();
    
    // Only trigger onRoundStart for relicts on the first turn of the round
    if (gameState.getTurn() === 1) {
      TimeManager.resetCounter();
      await RelictManager.getInstance().onRoundStart();
      await PlacingQueue.getInstance().Play(); 
    }
    TimeManager.resetCounter();
    
    StateMachine.getInstance().setPhase('CheckWinPhase', { nextPhaseOnNoWin: Phase.CheckLoosePhase });
  }
}
