import { Board } from '../directories/Board';
import { indexToCube } from '../directories/utils/boardSpace';
import { CubeCoordinatesString, cubeToString } from '../types/CubeCoordinates';

/**
 * Gets all real tiles from the board and returns their cube coordinates
 * @returns A Set of cube coordinates as tuples [x, y, z]
 */
export function getRealTileCubeCoordinates(): Set<CubeCoordinatesString> {
    const board = Board.getInstance();
    const allTiles = board.getAllPlayedTiles();
    const realTileCoordinates = new Set<CubeCoordinatesString>();
    
    for (const tile of allTiles) {
        const cubeCoords = cubeToString(indexToCube(tile.pos));
        realTileCoordinates.add(cubeCoords);
    }
    
    return realTileCoordinates;
}
