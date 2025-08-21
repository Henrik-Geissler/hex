import { Tile } from '../types/Tile';

export class DragEventManager {
  private static instance: DragEventManager;
  private listeners: ((draggedTile: Tile | null) => void)[] = [];

  private constructor() {}

  public static getInstance(): DragEventManager {
    if (!DragEventManager.instance) {
      DragEventManager.instance = new DragEventManager();
    }
    return DragEventManager.instance;
  }

  /**
   * Notify all hexagons that a drag has started
   */
  public notifyDragStart(draggedTile: Tile): void {
    this.listeners.forEach(listener => listener(draggedTile));
  }

  /**
   * Notify all hexagons that a drag has ended
   */
  public notifyDragEnd(): void {
    this.listeners.forEach(listener => listener(null));
  }

  /**
   * Add a listener for drag events
   */
  public addListener(listener: (draggedTile: Tile | null) => void): void {
    this.listeners.push(listener);
  }

  /**
   * Remove a listener
   */
  public removeListener(listener: (draggedTile: Tile | null) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }
}
