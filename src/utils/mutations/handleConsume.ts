import { Tile } from '../../types/Tile';
import { RemoveATileFromCurrentLocation } from '../RemoveATileFromCurrentLocation';
import { mutateTile } from './mutateTile';

export async function handleConsume(tile: Tile, meal: Tile): Promise<void> {
  await mutateTile(tile, async (tile) => {
    RemoveATileFromCurrentLocation(meal);
    tile.setScore(tile.score + meal.score);
    return tile;
  }, 'consume');
}
