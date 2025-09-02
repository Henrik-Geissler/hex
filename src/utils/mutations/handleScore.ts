import { Tile } from '../../types/Tile';
import { GameState } from '../../machines/GameState';
import { TextEmitter } from '../TextEmitter';
import { indexToPixel } from '../../directories/utils/boardSpace';
import { TimeManager } from '../../managers/TimeManager';


/**
 * Handle scoring when a tile is placed
 * Calculates the difference between the before and after tile scores
 * and adds that difference to the game state score
 * Only scores actual gameplay placements, not initialization or cleanup
 * @param beforeTile - The tile that was there before (could be free/off tile)
 * @param afterTile - The tile that was placed
 */
export async function handleScore(beforeTile: Tile, afterTile: Tile): Promise<void> {
  const gameState = GameState.getInstance();
  
  // Only score if this is an actual gameplay tile placement
  // Skip scoring for initialization (off tiles, free tiles) and cleanup
  if (afterTile.isFree() || afterTile.isOff()) {
    return; // Don't score initialization or cleanup
  }
  
  // Early return if the tile is not on the board
  if (!afterTile.isBoard()) {
    return; // Don't score tiles that aren't on the board
  }
  
  await TimeManager.Wait(200); 
  
  // Calculate score difference
  const beforeScore = beforeTile.score || 0;
  const afterScore = afterTile.score || 0;
  const scoreDifference = afterScore - beforeScore;
  
  // Add the score difference to the game state
  if (scoreDifference !== 0) {
    gameState.addScore(scoreDifference);
    
    // Emit text at the tile position
    const textEmitter = TextEmitter.getInstance();
    const scoreText = scoreDifference > 0 ? `+${scoreDifference}` : `${scoreDifference}`;
    
    // Check if the tile has a valid position
    if (typeof afterTile.pos === 'number' && afterTile.pos >= 0) {
      try {
        // Get the pixel coordinates for the tile position
        const { x, y } = indexToPixel(afterTile.pos);
        
        // Pass the relative coordinates to the emitter
        // The FloatingText component will handle the actual positioning
        textEmitter.emit(x, y, scoreText, 'Score');
      } catch (error) {
        console.warn('Could not calculate pixel coordinates for tile position:', afterTile.pos, error);
        // Fallback to center if position calculation fails
        textEmitter.emit(0, 0, scoreText, 'Score');
      }
    } else {
      // Fallback to center if no valid position
      textEmitter.emit(0, 0, scoreText, 'Score');
    }
  }
}
