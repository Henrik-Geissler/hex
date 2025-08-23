import { Tile } from '../../types/Tile'; 
import { handleProcessPlacement } from '../../utils/mutations/handleProcessPlacement';


/**
 * FIFO Queue for managing tiles that need to be placed on the board
 * Implements the Singleton pattern
 */
export class PlacingQueue {
  private static instance: PlacingQueue;
  private queue: Tile[] = [];

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
  public add(tile: Tile): void {
    this.queue.push(tile);
  }

  /**
   * Get the next tile placement from the front of the queue (FIFO)
   * @returns The next tile placement or undefined if queue is empty
   */
    getNext(): Tile | undefined {
    return this.queue.shift();
  }

  public async Play(): Promise<void> {
    while(true) {
      const next = this.getNext();
      if (!next) return;
      await handleProcessPlacement(next);
    }
      
  }
}
