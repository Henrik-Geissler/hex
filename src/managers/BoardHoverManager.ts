import { Tile } from '../types/Tile';
import { Board as BoardDirectory } from '../directories/Board';
import { Hand as HandDirectory } from '../directories/Hand';
import { isValidDropTarget } from '../utils/dropZoneValidation';

export class BoardHoverManager {
  private static instance: BoardHoverManager;
  private hoveredTile: Tile | null = null;
  private draggedTile: Tile | null = null;
  private hoveredHandTile: Tile | null = null;
  private listeners: Array<() => void> = [];
  private dragListeners: Array<() => void> = [];
  private handHoverListeners: Array<() => void> = [];

  private constructor() {}

  public static getInstance(): BoardHoverManager {
    if (!BoardHoverManager.instance) {
      BoardHoverManager.instance = new BoardHoverManager();
    }
    return BoardHoverManager.instance;
  }

  /**
   * Set the currently hovered board tile
   * @param tile - The board tile being hovered, or null if not hovering any tile
   */
  public setHoveredTile(tile: Tile | null): void {
    this.hoveredTile = tile;
    this.notifyListeners();
  }

  /**
   * Get the currently hovered board tile
   * @returns The board tile being hovered, or null if not hovering any tile
   */
  public getHoveredTile(): Tile | null {
    return this.hoveredTile;
  }

  /**
   * Set the currently dragged tile
   * @param tile - The tile being dragged, or null if not dragging
   */
  public setDraggedTile(tile: Tile | null): void {
    this.draggedTile = tile;
    this.notifyDragListeners();
  }

  /**
   * Get the currently dragged tile
   * @returns The tile being dragged, or null if not dragging
   */
  public getDraggedTile(): Tile | null {
    return this.draggedTile;
  }

  /**
   * Set the currently hovered hand tile
   * @param tile - The hand tile being hovered, or null if not hovering any hand tile
   */
  public setHoveredHandTile(tile: Tile | null): void {
    this.hoveredHandTile = tile;
    this.notifyHandHoverListeners();
  }

  /**
   * Get the currently hovered hand tile
   * @returns The hand tile being hovered, or null if not hovering any hand tile
   */
  public getHoveredHandTile(): Tile | null {
    return this.hoveredHandTile;
  }

  /**
   * Check if a hand tile is playable at the currently hovered board location
   * @param handTile - The hand tile to check
   * @returns true if the hand tile can be played at the hovered location, false otherwise
   */
  public isHandTilePlayableAtHoveredLocation(handTile: Tile): boolean {
    if (!this.hoveredTile) {
      // If not hovering any board tile, show all playable tiles
      return this.isHandTilePlayableAnywhere(handTile);
    }
    
    // Check if this hand tile can be played at the specific hovered location
    return isValidDropTarget(handTile, this.hoveredTile);
  }

  /**
   * Check if a board tile is a valid drop zone for the currently dragged tile
   * @param boardTile - The board tile to check
   * @returns true if the dragged tile can be dropped on this board tile, false otherwise
   */
  public isBoardTileValidDropZone(boardTile: Tile): boolean {
    if (!this.draggedTile) {
      return false;
    }
    
    return isValidDropTarget(this.draggedTile, boardTile);
  }

  /**
   * Check if a board tile should be highlighted (has playable hand tiles or is valid drop zone)
   * @param boardTile - The board tile to check
   * @returns true if the board tile should be highlighted, false otherwise
   */
  public shouldHighlightBoardTile(boardTile: Tile): boolean {
    // Check if this board tile is being hovered and has playable hand tiles
    if (this.hoveredTile === boardTile) {
      const hand = HandDirectory.getInstance();
      const handTiles = hand.getAllTiles();
      const hasPlayableTiles = handTiles.some(handTile => isValidDropTarget(handTile, boardTile));
      
      // Only highlight if there are actually playable hand tiles
      if (!hasPlayableTiles) {
        return false;
      }
    }
    
    // Check if this board tile is a valid drop zone for the dragged tile
    if (this.draggedTile) {
      return isValidDropTarget(this.draggedTile, boardTile);
    }
    
    // Check if this board tile is a valid drop zone for the hovered hand tile
    if (this.hoveredHandTile) {
      return isValidDropTarget(this.hoveredHandTile, boardTile);
    }
    
    // Only highlight if we're hovering over this specific tile and it has playable hand tiles
    return this.hoveredTile === boardTile;
  }

  /**
   * Check if a hand tile is playable anywhere on the board
   * @param handTile - The hand tile to check
   * @returns true if the hand tile can be played anywhere on the board, false otherwise
   */
  private isHandTilePlayableAnywhere(handTile: Tile): boolean {
    const board = BoardDirectory.getInstance();
    const allBoardTiles = board.getAllTiles();
    
    return allBoardTiles.some(boardTile => 
      isValidDropTarget(handTile, boardTile)
    );
  }

  /**
   * Add a listener for hover state changes
   * @param listener - Function to call when hover state changes
   */
  public addListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  /**
   * Remove a listener
   * @param listener - Function to remove from listeners
   */
  public removeListener(listener: () => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Add a listener for drag state changes
   * @param listener - Function to call when drag state changes
   */
  public addDragListener(listener: () => void): void {
    this.dragListeners.push(listener);
  }

  /**
   * Remove a drag listener
   * @param listener - Function to remove from drag listeners
   */
  public removeDragListener(listener: () => void): void {
    this.dragListeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Add a listener for hand hover state changes
   * @param listener - Function to call when hand hover state changes
   */
  public addHandHoverListener(listener: () => void): void {
    this.handHoverListeners.push(listener);
  }

  /**
   * Remove a hand hover listener
   * @param listener - Function to remove from hand hover listeners
   */
  public removeHandHoverListener(listener: () => void): void {
    this.handHoverListeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Notify all listeners of state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Notify all drag listeners of state changes
   */
  private notifyDragListeners(): void {
    this.dragListeners.forEach(listener => listener());
  }

  /**
   * Notify all hand hover listeners of state changes
   */
  private notifyHandHoverListeners(): void {
    this.handHoverListeners.forEach(listener => listener());
  }
}
