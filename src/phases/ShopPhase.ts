import { PhaseInterface } from '../types/PhaseInterface';

export class ShopPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running ShopPhase');
    // Handle shop interactions, purchases, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
  }
}
