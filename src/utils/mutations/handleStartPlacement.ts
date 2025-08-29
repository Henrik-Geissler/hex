import { Tile } from '../../types/Tile';
import { RemoveATileFromCurrentLocation } from '../RemoveATileFromCurrentLocation';
import { Board } from '../../directories/Board';
import { PlacingQueue } from '../../directories/utils/PlacingQueue';
import { TimeManager } from '../../managers/TimeManager';

/**
 * Handle the placement of a tile on the board
 * @param tileOrPosition - Either a Tile to be placed or a position number
 */
export async function handleStartPlacement(tile: Tile, tileOrPosition: Tile | number): Promise<void> {
    // Get the tile that was at this position before (if any)
    const board = Board.getInstance(); 
    const position = typeof tileOrPosition === "number" ? tileOrPosition : tileOrPosition.pos;
    
    // Find the tile that was at this position before
    const beforeTile = board.getTileAtPos(position);
    
    await RemoveATileFromCurrentLocation(tile);
    tile.pos = position;
    tile.location = 'Board';
    tile.isBeeingPlaced = beforeTile;
    await Board.getInstance().add(tile);
    PlacingQueue.getInstance().add(tile);
    if(tile.isFree() && !tile.isBeeingPlaced.isFree()) {
        await TimeManager.Wait(25);
    }
    if(tile.isOff() &&!tile.isBeeingPlaced.isOff()) {
        await TimeManager.Wait(25);
    }
    if(!tile.isFreeAndFreeSpot() && !tile.isOff()  )  {await TimeManager.Wait(150)};
} 
