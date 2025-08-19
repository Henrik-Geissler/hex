import { InitRoundPhase } from '../phases/InitRoundPhase';
import { Phase } from '../types/Phase';
import { PhaseInterface } from '../types/PhaseInterface';

export class StateMachine {
  private static instance: StateMachine;
  private currentPhase: Phase = 'InitPhase';

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): StateMachine {
    if (!StateMachine.instance) {
      StateMachine.instance = new StateMachine();
    }
    return StateMachine.instance;
  }

  // Get current phase
  getPhase(): Phase {
    return this.currentPhase;
  }

  // Set current phase
  async setPhase(phase: Phase): void {
    this.currentPhase = phase;
    let phaseClass;switch (phase) {
        case 'InitPhase':
            phaseClass =  new InitPhase();
        case 'InitRoundPhase':
            phaseClass =  new InitRoundPhase();
        case 'InitTurnPhase':
            phaseClass =  new InitTurnPhase();
        case 'CheckWinPhase':
            phaseClass =  new CheckWinPhase();
        case 'CheckLoosePhase':
            phaseClass =  new CheckLoosePhase();
        case 'WaitForInputPhase':
            phaseClass =  new WaitForInputPhase();
        case 'PlayPhase':
            phaseClass =  new PlayPhase();
        case 'TurnEndPhase':
    
        default:
            break;
    }
    await phaseClass.run();
  } 
}
