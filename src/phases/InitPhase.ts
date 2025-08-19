import { PhaseInterface } from '../types/PhaseInterface';

export class InitPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running InitPhase');
    // Initialize game state, load resources, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
  }
}
