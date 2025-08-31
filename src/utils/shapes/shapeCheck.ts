import { Board } from '../../directories/Board';
import { cubeToIndex, indexToCube } from '../../directories/utils/boardSpace';
import { TileFactory } from '../../factories/TileFactory';
import { TimeManager } from '../../managers/TimeManager';
import { Tile } from '../../types/Tile';
import { getRealTileCubeCoordinates } from '../getRealTileCubeCoordinates';
import { handleScore } from '../handleScore';
import { handleStartPlacement } from '../mutations/handleStartPlacement';
import { checkNewCircle } from './circle';

export async function shapeCheck(newTile: Tile, beforeTile: Tile): Promise<void> {
    if(!newTile.isReal()) 
        return; 
    if(beforeTile.isReal()) 
        return;
    await shapeCheckForPosition(newTile);
}
async function shapeCheckForPosition(newTile: Tile): Promise<void> {
    const realTileCoordinates = getRealTileCubeCoordinates();
    const newTileCoordinates = indexToCube(newTile.pos);
    const circle = checkNewCircle(realTileCoordinates, newTileCoordinates);
    if(circle==undefined)return;
    const board = Board.getInstance();
    const tiles = circle.map(coords => board.getTileAtPos(cubeToIndex(coords)));
    const noTile = TileFactory.getInstance().createFreeTile();
    for(const tile of tiles)
        if(tile.isBeeingPlaced == undefined)
            tile.isBeeingPlaced = noTile;
    board.triggerUpdate();
    await TimeManager.Wait(400);
    for(const tile of tiles) {
        for(let i = 0; i < circle.length; i++)
        await handleScore(noTile,tile);
        await TimeManager.Wait(50);
        await handleStartPlacement(TileFactory.getInstance().createOffTile(), tile.pos);
        await TimeManager.Wait(100);
    }
}
