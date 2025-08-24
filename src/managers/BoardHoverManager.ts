import { Tile } from '../types/Tile';
import { Board as BoardDirectory } from '../directories/Board';
import { isValidDropTarget } from '../utils/dropZoneValidation';

export class BoardHoverManager {
  private static instance: BoardHoverManager;
  private hoveredTile: Tile | null = null;
  private listeners: Array<() => void> = [];

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
   * Notify all listeners of state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}
