import { Tile } from '../../types/Tile';
import { RemoveATileFromCurrentLocation } from '../RemoveATileFromCurrentLocation';
import { mutateTile } from './mutateTile';

export async function handleConsume(consumer: Tile, meal: Tile): Promise<void> {  
  console.log('handleConsume', consumer.toString(), 'consumes', meal.toString());
  if(consumer.isMaxed())  
    return; 
  await mutateTile(consumer, async (consumer) => {
    RemoveATileFromCurrentLocation(meal);
    consumer.setScore(consumer.score + meal.score);
    return consumer;
  }, 'consume');
}
