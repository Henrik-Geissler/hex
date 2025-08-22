import { Tile } from '../../types/Tile';
import { RemoveATileFromCurrentLocation } from '../RemoveATileFromCurrentLocation';
import { mutateTile } from './mutateTile';

export async function handleConsume(consumer: Tile, meal: Tile): Promise<void> {
  await mutateTile(consumer, async (tile) => {
    RemoveATileFromCurrentLocation(meal);
    tile.score = tile.score  + meal.score;
    return tile;
  }, 'consume');
}
