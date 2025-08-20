import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';

export class TurnEndPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running TurnEndPhase');
    // Clean up turn state, apply end-of-turn effects
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    StateMachine.getInstance().setPhase('InitTurnPhase');
  }
}
