import { Deck } from '../directories/Deck';
import { DiscardPile } from '../directories/DiscardPile';
import { TileFactory } from '../factories/TileFactory';
import { StateMachine } from '../machines/StateMachine';
import { GameState } from '../machines/GameState';
import { PhaseInterface } from '../types/PhaseInterface';
import { Board } from '../directories/Board';
import { PlacingQueue } from '../directories/utils/PlacingQueue';
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';
import { TimeManager } from '../managers/TimeManager';

export class InitRoundPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running InitRoundPhase');
    
    // Increment round, set discards to 3, and multiply target score by 1.5
    const gameState = GameState.getInstance();
    gameState.incrementRound();
    gameState.setTurn(0); // Reset turn counter to 0 at start of new round
    gameState.setDiscards(3);
    gameState.setTargetScore(Math.floor(gameState.getTargetScore() *
     (gameState.getRound()%3==0?5:1.5));
    gameState.setScore(0); 
    GameState.getInstance().setTurn(0); 
    await Board.getInstance().clear(); 
    TimeManager.resetCounter();
    for (let i = 0; i < 37; i++) {
      if(Math.random()<.8)
       await handleStartPlacement(TileFactory.getInstance().createFreeTile(), i);
    }
    await DiscardPile.getInstance().getAllTiles().forEach(async tile  =>     {
      await DiscardPile.getInstance().remove(tile);
      await Deck.getInstance().add(tile);
    }); 
    await PlacingQueue.getInstance().Play(); 
    await Deck.getInstance().shuffle();
    TimeManager.resetCounter(); 
    StateMachine.getInstance().setPhase('CheckWinPhase');
  }
}
