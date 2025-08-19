import { Deck } from '../directories/Deck';
import { DiscardPile } from '../directories/DiscardPile';
import { TileFactory } from '../factories/TileFactory';
import { StateMachine } from '../machines/StateMachine';
import { GameState } from '../machines/GameState';
import { PhaseInterface } from '../types/PhaseInterface';
import { Board } from '../directories/Board';

export class InitRoundPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running InitRoundPhase');
    
    // Increment round, set discards to 3, and multiply target score by 1.5
    const gameState = GameState.getInstance();
    gameState.incrementRound();
    gameState.setDiscards(3);
    gameState.setTargetScore(Math.floor(gameState.getTargetScore() * 1.5));
    gameState.setScore(0); 
    gameState.reset();
    
    await Board.getInstance().clear();
    for (let i = 0; i < 37+4*6+5*6+6*6+7*6; i++) {
      await TileFactory.getInstance().createOffTile(i);
    }
    for (let i = 0; i < 37; i++) {
      await TileFactory.getInstance().createFreeTile(i); 
    await new Promise(resolve => setTimeout(resolve, 25));
    }
    await DiscardPile.getInstance().getAllTiles().forEach(async tile  =>     {
      await DiscardPile.getInstance().remove(tile);
      await Deck.getInstance().add(tile);
    });
    await Deck.getInstance().shuffle();
    StateMachine.getInstance().setPhase('InitTurnPhase');
  }
}
