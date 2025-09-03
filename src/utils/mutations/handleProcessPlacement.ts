import { Tile } from '../../types/Tile';
import { RelictManager } from '../../managers/RelictManager';
import { handleScore } from './handleScore';
import { Board } from '../../directories/Board';
import { TimeManager } from '../../managers/TimeManager';
import { FreeTileType } from '../../types/FreeTileType';
import { handleUpgrade } from './handleUpgrade';
import { handleDouble } from './handleDouble';
import { handleCoin } from './handleCoin';
import { shapeCheck } from '../shapes/shapeCheck';

export async function handleProcessPlacement(tile: Tile): Promise<void> {
    console.log('handleProcessPlacement', tile.toString());
    if (tile.isBeeingPlaced == undefined) {
        console.log('Tile is not being placed', tile.toString());
        throw new Error('Tile is not being placed');
    }
    await shapeCheck(tile, tile.isBeeingPlaced);
    await handleScore(tile.isBeeingPlaced, tile);
    
    // Check for special FreeTileTypes on the tile being placed on and handle them
    if (tile.isBeeingPlaced.isFree() && !tile.isFree() && !tile.isOff()) {
        switch (tile.isBeeingPlaced.freeTileType) {
            case FreeTileType.Upgrade:
                await handleUpgrade(tile);
                break;
            case FreeTileType.Double:
                await handleDouble(tile);
                break;
            case FreeTileType.Coin:
                await handleCoin(tile);
                break;
        }
    }
    const wasBeeingPlaced = tile.isBeeingPlaced; // we want to avoid removing other beeingPLaceds from Relicts (aka Moved Tiles)
    await RelictManager.getInstance().onPlaceTile(tile);


    if(tile.isFree() &&!tile.isBeeingPlaced.isFree()) {
        await TimeManager.Wait(25);
    }
    if(tile.isOff() &&!tile.isBeeingPlaced.isOff()) {
        await TimeManager.Wait(25);
    }
    if(!tile.isFreeAndFreeSpot() && !tile.isOff()  )  {await TimeManager.Wait(150)};
    if(wasBeeingPlaced == tile.isBeeingPlaced) 
    tile.isBeeingPlaced = undefined;
    Board.getInstance().triggerUpdate();
} 
