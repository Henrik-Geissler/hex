import { Tile } from '../types/Tile';

export type BadgeType = 'increment' | 'double' | 'upgrade';

interface BadgeRequest {
  tileId: number;
  type: BadgeType;
  timestamp: number;
}

export class BadgeManager {
  private static instance: BadgeManager;
  private pendingBadges: BadgeRequest[] = [];
  private listeners: Array<(tileId: number, type: BadgeType) => void> = [];

  private constructor() {}

  public static getInstance(): BadgeManager {
    if (!BadgeManager.instance) {
      BadgeManager.instance = new BadgeManager();
    }
    return BadgeManager.instance;
  }

  /**
   * Request a badge for a specific tile
   * @param tile - The tile to show badge for
   * @param type - The type of badge to show
   */
  public requestBadge(tile: Tile, type: BadgeType): void {
    // Check if there's already a pending badge for this tile
    const existingBadge = this.pendingBadges.find(b => b.tileId === tile.id);
    if (existingBadge) {
      // Don't trigger duplicate badges
      return;
    }

    const badge: BadgeRequest = {
      tileId: tile.id,
      type,
      timestamp: Date.now()
    };

    this.pendingBadges.push(badge);
    this.notifyListeners(tile.id, type);

    // Clean up old badges after 1 second
    setTimeout(() => {
      this.cleanupOldBadges();
    }, 1000);
  }

  /**
   * Add a listener for badge requests
   * @param listener - Function to call when a badge is requested
   */
  public addListener(listener: (tileId: number, type: BadgeType) => void): void {
    this.listeners.push(listener);
  }

  /**
   * Remove a listener
   * @param listener - Function to remove
   */
  public removeListener(listener: (tileId: number, type: BadgeType) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Check if a tile has a pending badge
   * @param tileId - The tile ID to check
   * @returns The badge type if pending, null otherwise
   */
  public getPendingBadge(tileId: number): BadgeType | null {
    const badge = this.pendingBadges.find(b => b.tileId === tileId);
    return badge ? badge.type : null;
  }

  /**
   * Mark a badge as complete for a tile
   * @param tileId - The tile ID to mark as complete
   */
  public markBadgeComplete(tileId: number): void {
    this.pendingBadges = this.pendingBadges.filter(b => b.tileId !== tileId);
  }

  private notifyListeners(tileId: number, type: BadgeType): void {
    this.listeners.forEach(listener => listener(tileId, type));
  }

  private cleanupOldBadges(): void {
    const now = Date.now();
    this.pendingBadges = this.pendingBadges.filter(
      badge => now - badge.timestamp < 1000
    );
  }
}
