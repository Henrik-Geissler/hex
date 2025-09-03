import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';

export async function handleUpgrade(tile: Tile): Promise<void> {
  console.log('handleUpgrade', tile.toString());
  await mutateTile(tile, async (tile) => {
    tile.setScore(tile.score+10);
    return tile;

 
    // Upgrade the score by incrementing the first digit
    const currentScore = tile.score || 0;
    const scoreString = currentScore.toString();
      const firstDigit = parseInt(scoreString[0]);
      const newFirstDigit = firstDigit + 1;
      const remainingDigits = scoreString.slice(1);
      tile.setScore(+(newFirstDigit + remainingDigits));

    
    return tile;
  }, 'upgrade');
}
