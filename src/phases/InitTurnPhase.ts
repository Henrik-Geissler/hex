import { Hand } from '../directories/Hand';
import { PhaseInterface } from '../types/PhaseInterface';

export class InitTurnPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running InitTurnPhase');
    // Initialize turn state, draw cards, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work

    Hand.getInstance().drawFull();
  }
}
