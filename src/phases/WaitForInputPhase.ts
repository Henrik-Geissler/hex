import { PhaseInterface } from '../types/PhaseInterface';
import { TimeManager } from '../managers/TimeManager'; 

export class WaitForInputPhase implements PhaseInterface {
  async run(): Promise<void> { 
    
    // Wait for player input
    await TimeManager.Wait(100); // Simulate async work
  }
}
