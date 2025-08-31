import { DIRS } from '../../directories/utils/boardSpace';
import { CubeCoordinates, CubeCoordinatesString, cubeToString } from '../../types/CubeCoordinates';
import { ShapeFunction } from './types';

/**
 * Checks if adding `newHex` to the board completes a 6-hex "circle".
 * Returns the circle coordinates if found, otherwise undefined.
 */
export const checkCircle: ShapeFunction = (board: Set<CubeCoordinatesString>, newHex: CubeCoordinates): CubeCoordinates[] | undefined => {
  const [x, y, z] = newHex;

  for (const [dx, dy, dz] of DIRS) {
    const cx = x - dx;
    const cy = y - dy;
    const cz = z - dz;

    const circle: CubeCoordinates[] = [];
    let full = true;

    for (const [ndx, ndy, ndz] of DIRS) {
      const nx = cx + ndx;
      const ny = cy + ndy;
      const nz = cz + ndz;

      if (!board.has(cubeToString([nx, ny, nz]))) {
        full = false;
        break;
      }
      circle.push([nx, ny, nz]);
    }

    if (full) {
      return circle;
    }
  }

  return undefined;
}