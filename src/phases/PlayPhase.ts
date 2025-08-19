import { PhaseInterface } from '../types/PhaseInterface';

export class PlayPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running PlayPhase');
    // Execute player actions
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
  }
}
