const SQRT3 = Math.sqrt(3);

// Cube direction vectors, clockwise from NE
export const DIRS = [
  [ 0, -1,  1],  // NW
  [-1,  0,  1], // W
  [-1,  1,  0], // SW
  [ 0,  1, -1], // SE
  [ 1,  0, -1], // E
  [ 1, -1,  0], // NE
];

// Find ring k for index n (max index on ring k is 3k(k+1))
export function ringOf(n: number) {
  if (n <= 0) return 0;
  return Math.ceil((-3 + Math.sqrt(9 + 12 * n)) / 6);
}

// n → cube coordinates (x,y,z) with x+y+z=0
export function indexToCube(n: number): [number, number, number] {
  if (n === 0) return [0, 0, 0];

  const k = ringOf(n);                  // ring number
  const b = 3 * (k - 1) * k;            // last index of previous ring
  const s = n - b - 1;                  // 0..(6k-1), position in this ring

  const side = Math.floor(s / k);       // 0..5
  const offset = s % k;

  // starting corner for this side:
  // begin at "north-west corner" of the ring and step clockwise
  let x = DIRS[4][0] * k;
  let y = DIRS[4][1] * k;
  let z = DIRS[4][2] * k;

  // walk around the ring up to chosen side
  for (let i = 0; i < side; i++) {
    x += DIRS[i][0] * k;
    y += DIRS[i][1] * k;
    z += DIRS[i][2] * k;
  }

  // now step along this side
  x += DIRS[side][0] * offset;
  y += DIRS[side][1] * offset;
  z += DIRS[side][2] * offset;

  return [x, y, z];
}

// Cube → index
export function cubeToIndex([x, y, z]: [number, number, number]): number {
  if (x === 0 && y === 0 && z === 0) return 0;

  const k = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
  const b = 3 * (k - 1) * k;            // last index of previous ring

  // Find which side of the ring this cube is on
  let side = 0;
  if (x === k && y === -k) side = 0;      // NW
  else if (x === -k && y === 0) side = 1; // W
  else if (x === -k && y === k) side = 2; // SW
  else if (x === 0 && y === k) side = 3;  // SE
  else if (x === k && y === 0) side = 4;  // E
  else if (x === k && y === -k) side = 5; // NE

  const offset = Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) - k;
  const s = side * k + offset;

  return b + s + 1;
}

// Cube → axial (q,r). We use q=x, r=z.
function cubeToAxial([x, _y, z]: number[]) {
  return [x, z];
}

// Axial → pixel for pointy-topped hexes
function axialToPixelPointy(q: number, r: number, R: number = 50) {
  const px = SQRT3 * R * (q + r / 2);
  const py = 1.5 * R * r;
  return { x: px, y: py };
}

// Main: n → pixel center
export function indexToPixel(n: number, R: number = 50) {
  const cube = indexToCube(n);
  const [q, r] = cubeToAxial(cube);
  return axialToPixelPointy(q, r, R);
}

