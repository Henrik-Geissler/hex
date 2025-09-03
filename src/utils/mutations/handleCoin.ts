import { Tile } from '../../types/Tile';
import { mutateTile } from './mutateTile';
import { GameState } from '../../machines/GameState';

export async function handleCoin(tile: Tile): Promise<void> { 
  console.log('handleCoin', tile.toString());
  await mutateTile(tile, async (tile) => {
    GameState.getInstance().addGold(1);
    return tile;
  }, 'coin');
}
