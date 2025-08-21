import { Tile } from '../../types/Tile';
import { RemoveATileFromCurrentLocation } from '../../utils/RemoveATileFromCurrentLocation';
import { Board } from '../Board';
import { RelictManager } from '../../managers/RelictManager';

/**
 * Handle the placement of a tile on the board
 * @param tileOrPosition - Either a Tile to be placed or a position number
 */
export async function handleTilePlacement(tile: Tile, tileOrPosition: Tile | number): Promise<void> {
    await RemoveATileFromCurrentLocation(tile);
    tile.pos = typeof tileOrPosition === "number"? tileOrPosition: tileOrPosition.pos; 
    tile.location = 'Board';
    await Board.getInstance().add(tile);
    
    // Notify relicts that a tile was placed
    await RelictManager.getInstance().onPlaceTile(tile);
} 
