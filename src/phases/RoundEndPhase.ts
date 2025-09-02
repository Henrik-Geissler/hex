import { PhaseInterface } from '../types/PhaseInterface';
import { RelictManager } from '../managers/RelictManager';
import { Board } from '../directories/Board'; 
import { boardTileIntoDeck } from '../utils/boardTileIntoDeck';
import { handTileIntoDeck } from '../utils/handTileIntoDeck';
import { Hand } from '../directories/Hand';
import { StateMachine } from '../machines/StateMachine';
import { GameState } from '../machines/GameState';
import { TimeManager } from '../managers/TimeManager'; 
import { moveTilesToDeck } from '../utils/moveTilesToDeck';
import { executeStep } from './utils/executeStep';

export class RoundEndPhase implements PhaseInterface {
  async run(): Promise<void> { 
    await executeStep(RelictManager.getInstance().onRoundEnd); 
    await executeStep(async () => {
    for (const tile of Hand.getInstance().getAllTiles())
      await handTileIntoDeck(tile); 
    for (const tile of Board.getInstance().getAllPlayedTiles()) 
      await boardTileIntoDeck(tile);
  });

    const gameState = GameState.getInstance();
    gameState.addGold(5);
    gameState.setTurn(0); // Reset turn counter to 0 at start of new round
    gameState.setDiscards(3);
    gameState.setScore(0); 
    
    // Move all tiles from discard pile back to deck
    await moveTilesToDeck();

    await TimeManager.Wait(500); // Simulate async work
    StateMachine.getInstance().setPhase('ShopPhase');
  } 
}
