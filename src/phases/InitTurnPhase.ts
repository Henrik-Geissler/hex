import { Hand } from '../directories/Hand';
import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';
import { RelictManager } from '../managers/RelictManager';
import { GameState } from '../machines/GameState';
import { Phase } from '../types/Phase'; 
import { executeStep } from './utils/executeStep';

export class InitTurnPhase implements PhaseInterface {
  async run(): Promise<void> { 
     
        await executeStep(async () => await Hand.getInstance().drawFull());  

    GameState.getInstance().incrementTurn();

    if (GameState.getInstance().getTurn() === 1) 
      await executeStep(async () => await RelictManager.getInstance().onRoundStart()); 
     
    await executeStep(async () => await RelictManager.getInstance().onTurnStart()); 
    
    StateMachine.getInstance().setPhase('CheckWinPhase', { nextPhaseOnNoWin: Phase.CheckLoosePhase });
  } 
}
