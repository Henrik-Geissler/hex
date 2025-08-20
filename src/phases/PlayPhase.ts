import { PhaseInterface } from '../types/PhaseInterface';
import { Tile } from '../types/Tile'; 
import { Board   } from '../directories/Board';
import { RemoveATileFromCurrentLocation } from '../utils/RemoveATileFromCurrentLocation';
import { StateMachine } from '../machines/StateMachine';

interface PlayPhaseParams {
  draggedTile?: Tile;
  droppedOnTile?: Tile;
}

export class PlayPhase implements PhaseInterface {
  async run(params?: PlayPhaseParams): Promise<void> { 
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    
    if (params?.draggedTile && params?.droppedOnTile) {
      console.log(`Tile ${params.draggedTile.id} was dropped on tile ${params.droppedOnTile.id}`);
      await RemoveATileFromCurrentLocation(params.draggedTile);

      params.draggedTile.pos = params.droppedOnTile.pos; 
      params.draggedTile.location = 'Board';
      await Board.getInstance().add(params.draggedTile);
      StateMachine.getInstance().setPhase('TurnEndPhase');
    } 
  }
}
