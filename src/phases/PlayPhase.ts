import { PhaseInterface } from '../types/PhaseInterface';
import { Tile } from '../types/Tile';

interface PlayPhaseParams {
  draggedTile?: Tile;
  droppedOnTile?: Tile;
}

export class PlayPhase implements PhaseInterface {
  async run(params?: PlayPhaseParams): Promise<void> {
    console.log('Running PlayPhase', params);
    
    if (params?.draggedTile && params?.droppedOnTile) {
      console.log(`Tile ${params.draggedTile.id} was dropped on tile ${params.droppedOnTile.id}`);
      // Here you can add logic to handle the placed tile
    }
    
    // Execute player actions
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async work
  }
}
