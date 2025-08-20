import { Hand } from '../directories/Hand';
import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';

export class InitTurnPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running InitTurnPhase');
    // Initialize turn state, draw cards, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work

    await Hand.getInstance().drawFull();
    StateMachine.getInstance().setPhase('CheckWinPhase');
  }
}
