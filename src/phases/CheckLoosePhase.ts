import { GameState } from '../machines/GameState';
import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';
import { isLooseFunction } from '../utils/isLooseFunction';

export class CheckLoosePhase implements PhaseInterface {
  async run(): Promise<void> {
    const gameState = GameState.getInstance();
    gameState.checkBoardEmptiness();
    // Check lose conditions using the isLooseFunction
    const hasLost = isLooseFunction();
    
    if (hasLost) {
      StateMachine.getInstance().setPhase('InitPhase');
    } else {
      StateMachine.getInstance().setPhase('WaitForInputPhase');
    }
  }
}
