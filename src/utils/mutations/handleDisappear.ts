import { DiscardPile } from '../../directories/DiscardPile';
import { Tile } from '../../types/Tile'; 
import { RemoveATileFromCurrentLocation } from '../RemoveATileFromCurrentLocation';
import { mutateTile } from './mutateTile';

export async function handleDisappear(tile: Tile): Promise<void> {
  await mutateTile(tile, async (tile) => {
    RemoveATileFromCurrentLocation(tile);
    DiscardPile.getInstance().add(tile);
    return tile;
  }, 'disappear');
}
