import { PhaseInterface } from '../types/PhaseInterface';

export class WaitForInputPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running WaitForInputPhase');
    // Wait for player input
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
  }
}
