import { PhaseInterface } from '../types/PhaseInterface';
import { Tile } from '../types/Tile'; 
import { StateMachine } from '../machines/StateMachine';
import { PlacingQueue } from '../directories/utils/PlacingQueue';
import { Phase } from '../types/Phase';
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { TimeManager } from '../managers/TimeManager';

interface PlayPhaseParams {
  draggedTile?: Tile;
  droppedOnTile?: Tile;
}

export class PlayPhase implements PhaseInterface {
  async run(params?: PlayPhaseParams): Promise<void> { 
    await TimeManager.Wait(100); // Simulate async work
    
    if (!params?.draggedTile || !params?.droppedOnTile) return;
    await handleStartPlacement(params.draggedTile, params.droppedOnTile.pos);
    await PlacingQueue.getInstance().Play();
    await TimeManager.Wait(100); // Simulate async work
    StateMachine.getInstance().setPhase('CheckWinPhase', { nextPhaseOnNoWin: Phase.InitTurnPhase });
    
  }
}
