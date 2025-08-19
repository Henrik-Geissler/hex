import { PhaseInterface } from '../types/PhaseInterface';

export class LoosePhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running LoosePhase');
    // Handle game over, show results, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
  }
}
