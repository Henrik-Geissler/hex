import { PhaseInterface } from '../types/PhaseInterface';

export class InitRoundPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running InitRoundPhase');
    // Initialize round state, reset round-specific variables, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
  }
}
