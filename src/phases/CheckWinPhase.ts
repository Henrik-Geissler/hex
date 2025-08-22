import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';
import { GameState } from '../machines/GameState';
import { Phase } from '../types/Phase';

export class CheckWinPhase implements PhaseInterface {
  private nextPhaseOnNoWin: Phase;

  constructor(nextPhaseOnNoWin: Phase = Phase.InitTurnPhase) {
    this.nextPhaseOnNoWin = nextPhaseOnNoWin;
  }

  async run(): Promise<void> {
    const gameState = GameState.getInstance();
    const currentScore = gameState.getScore();
    const targetScore = gameState.getTargetScore();
    
    if (currentScore < targetScore) {
      StateMachine.getInstance().setPhase(this.nextPhaseOnNoWin);
      return;
    }
    StateMachine.getInstance().setPhase('RoundEndPhase'); 
  }
}
