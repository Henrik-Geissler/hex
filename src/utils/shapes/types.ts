import { CubeCoordinates, CubeCoordinatesString } from '../../types/CubeCoordinates';

/**
 * A function that checks if a new hex placement creates a specific shape
 * @param board - Set of existing hex positions as strings
 * @param newHex - The newly placed hex coordinates
 * @returns Array of coordinates forming the shape, or undefined if no shape is found
 */
export type ShapeFunction = (board: Set<CubeCoordinatesString>, newHex: CubeCoordinates) => CubeCoordinates[] | undefined;
