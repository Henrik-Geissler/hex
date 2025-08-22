import { Tile } from '../../types/Tile';
import { RemoveATileFromCurrentLocation } from '../../utils/RemoveATileFromCurrentLocation';
import { Board } from '../Board';
import { RelictManager } from '../../managers/RelictManager';
import { handleScore } from '../../utils/handleScore';

/**
 * Handle the placement of a tile on the board
 * @param tileOrPosition - Either a Tile to be placed or a position number
 */
export async function handleTilePlacement(tile: Tile, tileOrPosition: Tile | number): Promise<void> {
    // Get the tile that was at this position before (if any)
    const board = Board.getInstance(); 
    const position = typeof tileOrPosition === "number" ? tileOrPosition : tileOrPosition.pos;
    
    // Find the tile that was at this position before
    const beforeTile = board.getTileAtPos(position);
    
    await RemoveATileFromCurrentLocation(tile);
    tile.pos = position;
    tile.location = 'Board';
    await Board.getInstance().add(tile);
    
    await handleScore(beforeTile, tile);
    // Notify relicts that a tile was placed
    await RelictManager.getInstance().onPlaceTile(tile);
} 
