import { PhaseInterface } from '../types/PhaseInterface';
import { Tile } from '../types/Tile'; 
import { StateMachine } from '../machines/StateMachine';
import { PlacingQueue } from '../directories/utils/PlacingQueue';
import { Phase } from '../types/Phase';
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';

interface PlayPhaseParams {
  draggedTile?: Tile;
  droppedOnTile?: Tile;
}

export class PlayPhase implements PhaseInterface {
  async run(params?: PlayPhaseParams): Promise<void> { 
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    
    if (!params?.draggedTile || !params?.droppedOnTile) return;
    await handleStartPlacement(params.draggedTile, params.droppedOnTile.pos);
    await PlacingQueue.getInstance().Play();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
    StateMachine.getInstance().setPhase('CheckWinPhase', { nextPhaseOnNoWin: Phase.InitTurnPhase });
    
  }
}
