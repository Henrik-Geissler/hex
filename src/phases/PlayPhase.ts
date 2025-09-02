import { PhaseInterface } from '../types/PhaseInterface';
import { Tile } from '../types/Tile'; 
import { StateMachine } from '../machines/StateMachine';
import { Phase } from '../types/Phase';
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { TimeManager } from '../managers/TimeManager';
import { executeStep } from './utils/executeStep';

interface PlayPhaseParams {
  draggedTile?: Tile;
  droppedOnTile?: Tile;
}

export class PlayPhase implements PhaseInterface {
  async run(params?: PlayPhaseParams): Promise<void> { 
    if (!params?.draggedTile || !params?.droppedOnTile) return;

    await TimeManager.Wait(100); 
    await executeStep(async () => await handleStartPlacement(params.draggedTile!, params.droppedOnTile!.pos)); 
    await TimeManager.Wait(100);  

    StateMachine.getInstance().setPhase(Phase.TurnEndPhase);
  }
}
