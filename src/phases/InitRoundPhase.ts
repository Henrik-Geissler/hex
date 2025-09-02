import { Deck } from '../directories/Deck';
import { TileFactory } from '../factories/TileFactory';
import { StateMachine } from '../machines/StateMachine';
import { GameState } from '../machines/GameState';
import { PhaseInterface } from '../types/PhaseInterface';
import { Board } from '../directories/Board'; 
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';  
import { executeStep } from './utils/executeStep';
import { Phase } from '../types/Phase';
import { moveTilesToDeck } from '../utils/moveTilesToDeck';

export class InitRoundPhase implements PhaseInterface {
  async run(): Promise<void> {
    const gameState = GameState.getInstance();
    gameState.incrementRound();
    gameState.setTurn(0); // Reset turn counter to 0 at start of new round
    gameState.setDiscards(3);
    gameState.setTargetScore(
      Math.floor(gameState.getTargetScore() *
     (gameState.getRound()%3==0?5:1.5)));
    gameState.setScore(0);  
    await Board.getInstance().clear(); 
    await executeStep(async () => { 
      for (let i = 0; i < 37; i++) {
        if(Math.random()<.8)
        await handleStartPlacement(TileFactory.getInstance().createFreeTile(), i);
      }    
      await moveTilesToDeck();
    });
    await Deck.getInstance().shuffle();  
    StateMachine.getInstance().setPhase(Phase.CheckWinPhase, { nextPhaseOnNoWin: Phase.InitTurnPhase });
  }
}
