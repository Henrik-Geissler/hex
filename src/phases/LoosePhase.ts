import { PhaseInterface } from '../types/PhaseInterface';
import { TimeManager } from '../managers/TimeManager';

export class LoosePhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running LoosePhase');
    // Handle game over, show results, etc.
    await TimeManager.Wait(100); // Simulate async work
  }
}
