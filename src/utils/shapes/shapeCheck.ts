import { Board } from '../../directories/Board';
import { cubeToIndex, indexToCube } from '../../directories/utils/boardSpace';
import { TileFactory } from '../../factories/TileFactory';
import { TimeManager } from '../../managers/TimeManager';
import { Tile } from '../../types/Tile';
import { CubeCoordinates } from '../../types/CubeCoordinates';
import { getRealTileCubeCoordinates } from '../getRealTileCubeCoordinates';
import { handleScore } from '../handleScore';
import { handleStartPlacement } from '../mutations/handleStartPlacement';
import { checkCircle } from './circle';
import { ShapeFunction } from './types';
import { checkTriangle } from './triangle';

// List of all shape functions to check
const shapeFunctions: ShapeFunction[] = [
    checkTriangle,
    checkCircle,
    // Add more shape functions here as they are created
];

export async function shapeCheck(newTile: Tile, beforeTile: Tile): Promise<void> {
    return; //TODO
    if(!newTile.isReal()) 
        return; 
    if(beforeTile.isReal()) 
        return;
    await shapeCheckForPosition(newTile);
}
async function shapeCheckForPosition(newTile: Tile): Promise<void> {
    const realTileCoordinates = getRealTileCubeCoordinates();
    const newTileCoordinates = indexToCube(newTile.pos);
    let shapes: CubeCoordinates[] | undefined = undefined;
    // Run through all shape functions
    for (const shapeFunction of shapeFunctions) {
        const shape = shapeFunction(realTileCoordinates, newTileCoordinates);
        if (shape !== undefined) {
            shapes = [...shapes??[],...shape]; 
        }
    }
    if(shapes == undefined)
        return;
    await handleShapeFound(shapes);
}

async function handleShapeFound(shape: CubeCoordinates[]): Promise<void> {
    const board = Board.getInstance();
    const tiles = shape.map(coords => board.getTileAtPos(cubeToIndex(coords)));
    const noTile = TileFactory.getInstance().createFreeTile();
    
    for(const tile of tiles)
        if(tile.isBeeingPlaced == undefined)
            tile.isBeeingPlaced = noTile;
    
    board.triggerUpdate();
    await TimeManager.Wait(400);
    
    for(let i = 0; i < shape.length; i++)
    for(const tile of tiles) {
        await TimeManager.Wait(50);
        await handleScore(noTile,tile);
    }
    
    await TimeManager.Wait(400);
    
    for(const tile of tiles) {
        await handleStartPlacement(TileFactory.getInstance().createOffTile(), tile.pos);
        await TimeManager.Wait(300);
    }
}
