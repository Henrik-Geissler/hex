import { PhaseInterface } from '../types/PhaseInterface';
import { GameState } from '../machines/GameState';

export class WaitForInputPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running WaitForInputPhase');
    
    // Check board emptiness at the beginning of the phase
    const gameState = GameState.getInstance();
    gameState.checkBoardEmptiness();
    
    // Wait for player input
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
  }
}
