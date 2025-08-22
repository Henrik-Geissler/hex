import { StateMachine } from '../machines/StateMachine';
import { PhaseInterface } from '../types/PhaseInterface';
import { GameState } from '../machines/GameState';
import { Board } from '../directories/Board'; 
import { boardTileIntoDeck } from '../utils/boardTileIntoDeck';
import { handTileIntoDeck } from '../utils/handTileIntoDeck';
import { Hand } from '../directories/Hand';

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
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
      StateMachine.getInstance().setPhase('ShopPhase'); 
  }

  private async collectWinningTiles(): Promise<void> {
    // First, return all hand cards to the deck
    await this.returnHandCardsToDeck();
    
    // Then collect board tiles
    const board = Board.getInstance();
    const boardTiles = board.getAllTiles();
    
    // Filter tiles that are neither 'Free' nor 'Off' and add them to the deck
    const winningTiles = boardTiles.filter(tile => 
      tile.color !== 'Free' && tile.color !== 'Off'
    );
    
    // Add each winning tile to the deck
    for (const tile of winningTiles) {
      await boardTileIntoDeck(tile);
    }
    
    // Give the player 5 gold for winning
    const gameState = GameState.getInstance();
    gameState.addGold(5);
    
  }

  private async returnHandCardsToDeck(): Promise<void> {
    const hand = Hand.getInstance();
    const handTiles = hand.getAllTiles();
    
    // Return each hand tile to the deck
    for (const tile of handTiles) {
      await handTileIntoDeck(tile);
    } 
  }
}
