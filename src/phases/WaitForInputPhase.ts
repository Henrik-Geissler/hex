import { PhaseInterface } from '../types/PhaseInterface';

export class WaitForInputPhase implements PhaseInterface {
  async run(): Promise<void> {
    //nothing to do here
    //Buttons handle Phasetransistions
  }
}
