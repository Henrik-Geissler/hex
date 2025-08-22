import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';
import { GameState } from '../machines/GameState';
import { Board } from '../directories/Board';
import { Deck } from '../directories/Deck';
import { boardTileIntoDeck } from '../utils/boardTileIntoDeck';

export class CheckWinPhase implements PhaseInterface {
  async run(): Promise<void> {
    const gameState = GameState.getInstance();
    const currentScore = gameState.getScore();
    const targetScore = gameState.getTargetScore();
    
    if (currentScore < targetScore) {
      StateMachine.getInstance().setPhase('InitTurnPhase');
      return;}
      // Win condition: collect all non-free/non-off tiles from board and add to deck
      await this.collectWinningTiles();
      StateMachine.getInstance().setPhase('ShopPhase'); 
  }

  private async collectWinningTiles(): Promise<void> {
    const board = Board.getInstance();
    const deck = Deck.getInstance();
    const boardTiles = board.getAllTiles();
    
    // Filter tiles that are neither 'Free' nor 'Off' and add them to the deck
    const winningTiles = boardTiles.filter(tile => 
      tile.color !== 'Free' && tile.color !== 'Off'
    );
    
    // Add each winning tile to the deck
      for (const tile of winningTiles) {
        await boardTileIntoDeck(tile);
    }
    
    console.log(`Collected ${winningTiles.length} winning tiles and added them to the deck`);
  }
}
