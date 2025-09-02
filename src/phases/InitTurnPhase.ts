import { Hand } from '../directories/Hand';
import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';
import { RelictManager } from '../managers/RelictManager';
import { GameState } from '../machines/GameState';
import { Phase } from '../types/Phase';
import { TimeManager } from '../managers/TimeManager';
import { PlacingQueue } from '../directories/utils/PlacingQueue';

export class InitTurnPhase implements PhaseInterface {
  async run(): Promise<void> { 
    await Hand.getInstance().drawFull(); 

    GameState.getInstance().incrementTurn();

    await this.onRoundStart(); 
     
    await this.onTurnStart();
    
    StateMachine.getInstance().setPhase('CheckWinPhase', { nextPhaseOnNoWin: Phase.CheckLoosePhase });
  }
  
  private async onRoundStart(): Promise<void> {  
    const gameState = GameState.getInstance();
    // Only trigger onRoundStart for relicts on the first turn of the round
    if (gameState.getTurn() !== 1) return;
      TimeManager.resetCounter();
      await RelictManager.getInstance().onRoundStart();
      await PlacingQueue.getInstance().Play();   
      TimeManager.resetCounter();
  }


  private async onTurnStart(): Promise<void> { 
    TimeManager.resetCounter();
    await RelictManager.getInstance().onTurnStart();
    await PlacingQueue.getInstance().Play(); 
    TimeManager.resetCounter();
  } 
}
