import { Tile } from '../types/Tile';
import { mutateTile } from './mutateTile';

export async function handleUpgrade(tile: Tile): Promise<void> {
  await mutateTile(tile, async (tile) => {
    // Upgrade the score by incrementing the first digit
    const currentScore = tile.score || 0;
    const scoreString = currentScore.toString();
    
    if (scoreString.length > 0) {
      const firstDigit = parseInt(scoreString[0]);
      const newFirstDigit = firstDigit + 1;
      const remainingDigits = scoreString.slice(1);
      tile.score = parseInt(newFirstDigit + remainingDigits);
    } else {
      // If score is 0 or undefined, set to 1
      tile.score = 1;
    }
    
    return tile;
  });
}
