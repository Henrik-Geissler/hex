import { Tile } from '../../types/Tile';
import { RelictManager } from '../../managers/RelictManager';
import { handleScore } from '../handleScore';
import { Board } from '../../directories/Board';
import { TimeManager } from '../../managers/TimeManager';
import { SpotType } from '../../types/SpotType';
import { handleUpgrade } from './handleUpgrade';
import { handleDouble } from './handleDouble';
import { handleCoin } from './handleCoin';

export async function handleProcessPlacement(tile: Tile): Promise<void> {
    if (tile.isBeeingPlaced == undefined) {
        console.log('Tile is not being placed', tile);
        throw new Error('Tile is not being placed');
    }
    if(tile.isBeeingPlaced.isBeeingPlaced != undefined) {
        await handleProcessPlacement(tile.isBeeingPlaced);
    }
    await handleScore(tile.isBeeingPlaced, tile);
    
    // Check for special SpotTypes on the tile being placed on and handle them
    if (tile.isBeeingPlaced.isFree() && !tile.isFree() && !tile.isOff()) {
        switch (tile.isBeeingPlaced.score) {
            case SpotType.Upgrade:
                await handleUpgrade(tile);
                break;
            case SpotType.Double:
                await handleDouble(tile);
                break;
            case SpotType.Coin:
                await handleCoin(tile);
                break;
        }
    }
    
    await RelictManager.getInstance().onPlaceTile(tile);

    if(tile.isFree() &&!tile.isBeeingPlaced.isFree()) {
        await TimeManager.Wait(25);
    }
    if(tile.isOff() &&!tile.isBeeingPlaced.isOff()) {
        await TimeManager.Wait(25);
    }
    tile.isBeeingPlaced = undefined;
    Board.getInstance().triggerUpdate();
} 
