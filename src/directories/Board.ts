import { indexToPixel } from "./utils/boardSpace";

export class Board {
  private static instance: Board;
  private hexWidth: number = 100;
  private hexHeight: number = 100;

  private constructor() {}

  public static getInstance(): Board {
    if (!Board.instance) {
      Board.instance = new Board();
    }
    return Board.instance;
  }

  /**
   * Convert position number to screen coordinates (x, y) relative to center
   * @param position - The position number (0 = center)
   * @returns [x, y] pixel coordinates relative to center
   */
  public positionToCoordinates(position: number): [number, number] { 
    const {x, y} = indexToPixel(position);
    return [x, y];
  }

  /**
   * Get the 6 adjacent position numbers for a given position
   * @param position - The position number
   * @returns Array of 6 adjacent position numbers
   */
  public getAdjacentPositions(position: number): number[] {
    if (position === 0) {
      // Center tile has 6 adjacent tiles
      return [1, 2, 3, 4, 5, 6];
    }

    // Convert position to axial coordinates
    const [q, r] = this.positionToAxial(position);
    
    // Get adjacent axial coordinates (6 directions)
    const adjacentAxial = [
      [q + 1, r], [q + 1, r - 1], [q, r - 1],
      [q - 1, r], [q - 1, r + 1], [q, r + 1]
    ];
    
    // Convert back to position numbers
    return adjacentAxial.map(([adjQ, adjR]) => this.axialToPosition(adjQ, adjR));
  }

  /**
   * Get which ring a position number belongs to
   * @param position - The position number
   * @returns Ring number (0 = center, 1 = first ring around center, etc.)
   */
  private getRing(position: number): number {
    if (position === 0) return 0;
    
    // Ring n has 6n positions
    // Total positions up to ring n: 1 + 6 + 12 + 18 + ... + 6n = 1 + 3n(n+1)
    // Solve: 3n² + 3n + 1 > position
    const n = Math.ceil((-3 + Math.sqrt(9 + 12 * (position - 1))) / 6);
    return n;
  }

  /**
   * Get position within a ring (0-based)
   * @param position - The position number
   * @param ring - The ring number
   * @returns Position within the ring (0 to 6*ring-1)
   */
  private getPositionInRing(position: number, ring: number): number {
    if (ring === 0) return 0;
    
    // Calculate total positions in previous rings
    const previousPositions = 1 + 3 * (ring - 1) * ring;
    return position - previousPositions;
  }

  /**
   * Get total number of positions in a ring
   * @param ring - The ring number
   * @returns Number of positions in the ring
   */
  private getPositionsInRing(ring: number): number {
    if (ring === 0) return 1;
    return 6 * ring;
  }

  /**
   * Convert ring and position within ring to position number
   * @param ring - The ring number
   * @param positionInRing - Position within the ring
   * @returns Position number
   */
  private getPositionInRingNumber(ring: number, positionInRing: number): number {
    if (ring === 0) return 0;
    
    const previousPositions = 1 + 3 * (ring - 1) * ring;
    return previousPositions + positionInRing;
  }

  /**
   * Convert position number to axial coordinates (q, r)
   * @param position - The position number
   * @returns [q, r] axial coordinates
   */
  private positionToAxial(position: number): [number, number] {
    if (position === 0) return [0, 0];
    
    // Find which ring this position is in
    const ring = this.getRing(position);
    
    // Find position within the ring
    const positionInRing = this.getPositionInRing(position, ring);
    
    // Convert ring position to axial coordinates
    return this.ringPositionToAxial(ring, positionInRing);
  }

  /**
   * Convert axial coordinates to position number
   * @param q - Axial coordinate q
   * @param r - Axial coordinate r
   * @returns Position number
   */
  private axialToPosition(q: number, r: number): number {
    if (q === 0 && r === 0) return 0;
    
    // Convert axial to ring and position in ring
    const ring = Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r));
    const positionInRing = this.axialToRingPosition(q, r, ring);
    
    return this.getPositionInRingNumber(ring, positionInRing);
  }

  /**
   * Convert ring and position within ring to axial coordinates
   * @param ring - The ring number
   * @param positionInRing - Position within the ring
   * @returns [q, r] axial coordinates
   */
  private ringPositionToAxial(ring: number, positionInRing: number): [number, number] {
    if (ring === 0) return [0, 0];
    
    const positionsInRing = this.getPositionsInRing(ring);
    const angle = (2 * Math.PI * positionInRing) / positionsInRing;
    
    // Convert polar to axial coordinates
    const q = ring * Math.cos(angle);
    const r = ring * Math.sin(angle);
    
    return [q, r];
  }

  /**
   * Convert axial coordinates to ring position
   * @param q - Axial coordinate q
   * @param r - Axial coordinate r
   * @param ring - The ring number
   * @returns Position within the ring
   */
  private axialToRingPosition(q: number, r: number, ring: number): number {
    if (ring === 0) return 0;
    
    const angle = Math.atan2(r, q);
    const positionsInRing = this.getPositionsInRing(ring);
    
    let positionInRing = Math.round((angle / (2 * Math.PI)) * positionsInRing);
    if (positionInRing < 0) positionInRing += positionsInRing;
    
    return positionInRing;
  }

  /**
   * Get hexagon size
   * @returns [width, height] of hexagon
   */
  public getHexSize(): [number, number] {
    return [this.hexWidth, this.hexHeight];
  }

  /**
   * Set hexagon size
   * @param width - New width
   * @param height - New height
   */
  public setHexSize(width: number, height: number): void {
    this.hexWidth = width;
    this.hexHeight = height;
  }
}
