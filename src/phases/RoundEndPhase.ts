import { PhaseInterface } from '../types/PhaseInterface';
import { RelictManager } from '../managers/RelictManager';
import { Board } from '../directories/Board'; 
import { boardTileIntoDeck } from '../utils/boardTileIntoDeck';
import { handTileIntoDeck } from '../utils/handTileIntoDeck';
import { Hand } from '../directories/Hand';
import { StateMachine } from '../machines/StateMachine';
import { GameState } from '../machines/GameState';
import { TimeManager } from '../managers/TimeManager';
import { PlacingQueue } from '../directories/utils/PlacingQueue';

export class RoundEndPhase implements PhaseInterface {
  async run(): Promise<void> { 
    await RelictManager.getInstance().onRoundEnd();
    TimeManager.resetCounter();

    for (const tile of Hand.getInstance().getAllTiles())
      await handTileIntoDeck(tile);
    
    for (const tile of Board.getInstance().getAllPlayedTiles()) 
      await boardTileIntoDeck(tile);
    await PlacingQueue.getInstance().Play(); 
    TimeManager.resetCounter();

    GameState.getInstance().addGold(5);

    await TimeManager.Wait(500); // Simulate async work
    StateMachine.getInstance().setPhase('ShopPhase');
  } 
}
