import { Tile } from '../../types/Tile';
import { RelictManager } from '../../managers/RelictManager';
import { handleScore } from '../handleScore';
import { Board } from '../../directories/Board';

export async function handleProcessPlacement(tile: Tile): Promise<void> {
    if (tile.isBeeingPlaced == undefined) {
        console.log('Tile is not being placed', tile);
        throw new Error('Tile is not being placed');
    }
    if(tile.isBeeingPlaced.isBeeingPlaced != undefined) {
        await handleProcessPlacement(tile.isBeeingPlaced);
    }
    await handleScore(tile.isBeeingPlaced, tile);
    
    await RelictManager.getInstance().onPlaceTile(tile);

    if(tile.isFree() &&!tile.isBeeingPlaced.isFree()) {
        await new Promise(resolve => setTimeout(resolve, 25));
    }
    if(tile.isOff() &&!tile.isBeeingPlaced.isOff()) {
        await new Promise(resolve => setTimeout(resolve, 25));
    }
    tile.isBeeingPlaced = undefined;
    Board.getInstance().triggerUpdate();
} 
