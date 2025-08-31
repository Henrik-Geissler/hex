/**
 * Represents cube coordinates in a hexagonal grid
 * x + y + z = 0 for valid cube coordinates
 */
export type CubeCoordinates = [number, number, number];/**
* Represents cube coordinates in a hexagonal grid
* x + y + z = 0 for valid cube coordinates
*/
export type CubeCoordinatesString = string;

/**
 * Converts cube coordinates to a string representation
 * @param coords - The cube coordinates to convert
 * @returns A string representation in format "x,y,z"
 */
export function cubeToString(coords: CubeCoordinates): CubeCoordinatesString {
    const [x, y, z] = coords;
    return `${x},${y},${z}`;
}

/**
 * Converts a string representation back to cube coordinates
 * @param str - The string in format "x,y,z"
 * @returns The cube coordinates as a tuple
 * @throws Error if the string format is invalid
 */
export function stringToCube(str: CubeCoordinatesString): CubeCoordinates {
    const parts = str.split(',');
    if (parts.length !== 3) {
        throw new Error(`Invalid cube coordinate string: ${str}`);
    }
    
    const x = parseInt(parts[0]);
    const y = parseInt(parts[1]);
    const z = parseInt(parts[2]);
    
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
        throw new Error(`Invalid cube coordinate values in string: ${str}`);
    }
    
    return [x, y, z];
}
