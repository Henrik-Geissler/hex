import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';

export class CheckLoosePhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running CheckLoosePhase');
    // Check lose conditions
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    StateMachine.getInstance().setPhase('WaitForInputPhase');
  }
}
