import { Tile } from '../../types/Tile';
import { handleTilePlacement } from './handleTilePlacement';

/**
 * Represents a tile with its target position for placement
 */
export interface TilePlacement {
  tile: Tile;
  position: number;
}

/**
 * FIFO Queue for managing tiles that need to be placed on the board
 * Implements the Singleton pattern
 */
export class PlacingQueue {
  private static instance: PlacingQueue;
  private queue: TilePlacement[] = [];

  private constructor() {}

  /**
   * Get the singleton instance of PlacingQueue
   * @returns The singleton instance
   */
  public static getInstance(): PlacingQueue {
    if (!PlacingQueue.instance) {
      PlacingQueue.instance = new PlacingQueue();
    }
    return PlacingQueue.instance;
  }

  /**
   * Add a tile with its position to the end of the queue (FIFO)
   * @param tile - The tile to add to the queue
   * @param position - The position where the tile should be placed
   */
  public add(tile: Tile, position: number): void {
    this.queue.push({ tile, position });
  }

  /**
   * Get the next tile placement from the front of the queue (FIFO)
   * @returns The next tile placement or undefined if queue is empty
   */
    getNext(): TilePlacement | undefined {
    return this.queue.shift();
  }

  public async Play(): Promise<void> {
    while(true) {
      const next = this.getNext();
      if (!next) return;
      await new Promise(resolve => setTimeout(resolve, 25));
      await handleTilePlacement(next.tile, next.position);
    }
      
  }
}
