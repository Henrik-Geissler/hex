import { PhaseInterface } from '../types/PhaseInterface';
import { StateMachine } from '../machines/StateMachine';
import { Phase } from '../types/Phase';
import { RelictManager } from '../managers/RelictManager';
import { TimeManager } from '../managers/TimeManager';
import { Board } from '../directories/Board';
import { TileFactory } from '../factories/TileFactory';
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement'; 
import { executeStep } from './utils/executeStep';

export class TurnEndPhase implements PhaseInterface {
  async run(): Promise<void> { 
    TimeManager.resetCounter();
    
    // Clear ghost tiles and place free tiles
    await executeStep(async () => await this.clearGhosts());
    
    // Trigger onTurnEnd for all relicts
    await executeStep(async () => await RelictManager.getInstance().onTurnEnd()); 

    StateMachine.getInstance().setPhase('CheckWinPhase', { nextPhaseOnNoWin: Phase.InitTurnPhase });
  }
  
  /**
   * Place free tiles on all ghost tiles on the board
   */
  private async clearGhosts(): Promise<void> { 
    const board = Board.getInstance();
    const tileFactory = TileFactory.getInstance();
    
    // Get all tiles on the board
    const boardTiles = board.getAllPlayedTiles();
    
    // Find all ghost tiles
    const ghostTiles = boardTiles.filter(tile => tile.isGhost);
    
    // Place free tiles on each ghost tile position
    for (const ghostTile of ghostTiles) {
      const freeTile = tileFactory.createFreeTile();
      await handleStartPlacement(freeTile, ghostTile.pos);
    } 
  }
}
