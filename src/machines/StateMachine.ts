import { Phase } from '../types/Phase';
import { PhaseInterface } from '../types/PhaseInterface';
import { InitPhase } from '../phases/InitPhase';
import { InitRoundPhase } from '../phases/InitRoundPhase';
import { InitTurnPhase } from '../phases/InitTurnPhase';
import { CheckWinPhase } from '../phases/CheckWinPhase';
import { CheckLoosePhase } from '../phases/CheckLoosePhase';
import { WaitForInputPhase } from '../phases/WaitForInputPhase';
import { PlayPhase } from '../phases/PlayPhase';
import { TurnEndPhase } from '../phases/TurnEndPhase';
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

  // Phase factory mapping
  private readonly phaseFactory: Record<Phase, (params?: any) => PhaseInterface> = {
    [Phase.InitPhase]: () => new InitPhase(),
    [Phase.InitRoundPhase]: () => new InitRoundPhase(),
    [Phase.InitTurnPhase]: () => new InitTurnPhase(),
    [Phase.CheckWinPhase]: (params?: any) => new CheckWinPhase(params?.nextPhaseOnNoWin),
    [Phase.CheckLoosePhase]: () => new CheckLoosePhase(),
    [Phase.WaitForInputPhase]: () => new WaitForInputPhase(),
    [Phase.PlayPhase]: () => new PlayPhase(),
    [Phase.TurnEndPhase]: () => new TurnEndPhase(),
    [Phase.ShopPhase]: () => new ShopPhase(),
    [Phase.DiscardPhase]: () => new DiscardPhase(),
    [Phase.LoosePhase]: () => new LoosePhase(),
    [Phase.RoundEndPhase]: () => new RoundEndPhase(),
  } as const;

  // Set current phase and run the phase
  async setPhase(phase: Phase, params?: any): Promise<void> {
    this.currentPhase = phase;
    
    // Get the phase factory function and create the phase instance
    const factory = this.phaseFactory[phase];
    if (!factory) {
      throw new Error(`Unknown phase: ${phase}`);
    }
    
    const phaseClass = factory(params);
    
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
