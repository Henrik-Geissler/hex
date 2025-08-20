import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';

export class CheckWinPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running CheckWinPhase');
    // Check win conditions
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    StateMachine.getInstance().setPhase('CheckLoosePhase');
  }
}
