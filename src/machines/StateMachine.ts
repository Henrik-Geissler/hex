import { Phase } from '../types/Phase';
import { PhaseInterface } from '../types/PhaseInterface';
import { InitPhase } from '../phases/InitPhase';
import { InitRoundPhase } from '../phases/InitRoundPhase';
import { InitTurnPhase } from '../phases/InitTurnPhase';
import { CheckWinPhase } from '../phases/CheckWinPhase';
import { CheckLoosePhase } from '../phases/CheckLoosePhase';
import { WaitForInputPhase } from '../phases/WaitForInputPhase';
import { PlayPhase } from '../phases/PlayPhase';
import { ShopPhase } from '../phases/ShopPhase';
import { DiscardPhase } from '../phases/DiscardPhase';
import { LoosePhase } from '../phases/LoosePhase';
import { RoundEndPhase } from '../phases/RoundEndPhase';

export class StateMachine {
  private static instance: StateMachine;
  private currentPhase: Phase = Phase.InitPhase;
  private listeners: Array<(phase: Phase) => void> = [];

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): StateMachine {
    if (!StateMachine.instance) {
      StateMachine.instance = new StateMachine();
      StateMachine.instance.setPhase(StateMachine.instance.currentPhase);
    }
    return StateMachine.instance;
  }

  // Get current phase
  getPhase(): Phase {
    return this.currentPhase;
  }

  // Set current phase and run the phase
  async setPhase(phase: Phase, params?: any): Promise<void> {
    this.currentPhase = phase;
    let phaseClass: PhaseInterface;
    
    switch (phase) {
      case 'InitPhase':
        phaseClass = new InitPhase();
        break;
      case 'InitRoundPhase':
        phaseClass = new InitRoundPhase();
        break;
      case 'InitTurnPhase':
        phaseClass = new InitTurnPhase();
        break;
      case 'CheckWinPhase':
        phaseClass = new CheckWinPhase(params?.nextPhaseOnNoWin);
        break;
      case 'CheckLoosePhase':
        phaseClass = new CheckLoosePhase();
        break;
      case 'WaitForInputPhase':
        phaseClass = new WaitForInputPhase();
        break;
      case 'PlayPhase':
        phaseClass = new PlayPhase();
        break;
      case 'ShopPhase':
        phaseClass = new ShopPhase();
        break;
      case 'DiscardPhase':
        phaseClass = new DiscardPhase();
        break;
      case 'LoosePhase':
        phaseClass = new LoosePhase();
        break;
      case 'RoundEndPhase':
        phaseClass = new RoundEndPhase();
        break;
      default:
        throw new Error(`Unknown phase: ${phase}`);
    }
    
    // Notify listeners of phase change
    this.notifyListeners(phase);
    
    // Run the phase with parameters
    await phaseClass.run(params);
  }

  // Add listener for phase changes
  addListener(listener: (phase: Phase) => void): void {
    this.listeners.push(listener);
  }

  // Remove listener
  removeListener(listener: (phase: Phase) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Notify all listeners
  private notifyListeners(phase: Phase): void {
    this.listeners.forEach(listener => listener(phase));
  }

}
