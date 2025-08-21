import { PhaseInterface } from '../types/PhaseInterface';
import { Tile } from '../types/Tile'; 
import { Board   } from '../directories/Board';
import { RemoveATileFromCurrentLocation } from '../utils/RemoveATileFromCurrentLocation';
import { StateMachine } from '../machines/StateMachine';
import { getNeighbours } from '../directories/utils/getNeighbours';
import { TileFactory } from '../factories/TileFactory';
import { PlacingQueue } from '../directories/utils/PlacingQueue';

interface PlayPhaseParams {
  draggedTile?: Tile;
  droppedOnTile?: Tile;
}

export class PlayPhase implements PhaseInterface {
  async run(params?: PlayPhaseParams): Promise<void> { 
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
    
    if (!params?.draggedTile || !params?.droppedOnTile) return;
    PlacingQueue.getInstance().add(params.draggedTile, params.droppedOnTile.pos);
    PlacingQueue.getInstance().Play();
    StateMachine.getInstance().setPhase('TurnEndPhase');
    
  }
}
