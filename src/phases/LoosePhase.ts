import { PhaseInterface } from '../types/PhaseInterface';
import { TimeManager } from '../managers/TimeManager';
import { StateMachine } from '../machines/StateMachine';
import { Phase } from '../types/Phase';

export class LoosePhase implements PhaseInterface {
  async run(): Promise<void> {
   await TimeManager.Wait(5000);
    StateMachine.getInstance().setPhase(Phase.InitPhase);
  }
}
