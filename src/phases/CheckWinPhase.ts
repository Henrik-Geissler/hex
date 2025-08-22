import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';
import { GameState } from '../machines/GameState';

export class CheckWinPhase implements PhaseInterface {
  async run(): Promise<void> {
    const gameState = GameState.getInstance();
    const currentScore = gameState.getScore();
    const targetScore = gameState.getTargetScore();
    
    if (currentScore < targetScore) {
      StateMachine.getInstance().setPhase('InitTurnPhase');
      return;}
      StateMachine.getInstance().setPhase('RoundEndPhase'); 
  }

}
