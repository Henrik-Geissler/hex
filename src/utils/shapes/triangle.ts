import { DIRS } from '../../directories/utils/boardSpace';
import { CubeCoordinates, CubeCoordinatesString, cubeToString } from '../../types/CubeCoordinates';
import { ShapeFunction } from './types';

function triangleAtTip(tip: CubeCoordinates): CubeCoordinates[] {
  const [x,y,z] = tip;
  const result: CubeCoordinates[] = [];

  // edge 1 (tip down right)
  for (let i=0; i<4; i++) {
    result.push([x+i, y-i, z]);
  }

  // edge 2 (tip down left)
  for (let i=0; i<4; i++) {
    result.push([x, y-i, z+i]);
  }

  // edge 3 (base)
  for (let i=0; i<4; i++) {
    result.push([x+3-i, y-3, z+i]);
  }

  return result;
}

export const checkTriangle: ShapeFunction = (
  board: Set<CubeCoordinatesString>,
  newHex: CubeCoordinates
): CubeCoordinates[] | undefined => {
  const candidates: CubeCoordinates[] = [];

  // The new hex could be on the edge of a triangle → try backtracking to possible tips
  // For each of the 3 edges, shift up to 3 steps back to get candidate tip
  const edgeDirs: CubeCoordinates[] = [
    [1,-1,0],   // edge A
    [0,-1,1],   // edge B
    [-1,0,1]    // edge C (we'll handle differently)
  ];

  for (const [dx,dy,dz] of edgeDirs) {
    for (let i=0; i<4; i++) {
      candidates.push([newHex[0]-dx*i, newHex[1]-dy*i, newHex[2]-dz*i]);
    }
  }

  for (const tip of candidates) {
    const tri = triangleAtTip(tip);
    if (tri.every(c => board.has(cubeToString(c)))) {
      return tri;
    }
  }

  return undefined;
};