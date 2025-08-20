import { Relict, Triggering } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Empty } from '../relicts/Empty';
import { GameState } from '../machines/GameState';

export class RelictManager {
  private static instance: RelictManager;
  private relicts: Relict[] = [];
  private readonly MAX_RELICTS = 5;
  private listeners: Array<() => void> = [];
  private highlightListeners: Array<(index: number) => void> = [];

  private constructor() {
    this.reset();
  }

  public static getInstance(): RelictManager {
    if (!RelictManager.instance) {
      RelictManager.instance = new RelictManager();
    }
    return RelictManager.instance;
  }

  public reset(): void {
    this.relicts = Array(this.MAX_RELICTS).fill(null).map(() => new Empty());
    this.notifyListeners();
  }

  public getRelicts(): Relict[] {
    return [...this.relicts];
  }

  public setRelict(index: number, relict: Relict): void {
    if (index >= 0 && index < this.MAX_RELICTS) {
      this.relicts[index] = relict;
      this.notifyListeners();
    }
  }

  public getRelict(index: number): Relict | null {
    if (index >= 0 && index < this.MAX_RELICTS) {
      return this.relicts[index];
    }
    return null;
  }

  public insertRelict(fromIndex: number, toIndex: number): void {
    if (fromIndex >= 0 && fromIndex < this.MAX_RELICTS && 
        toIndex >= 0 && toIndex < this.MAX_RELICTS && 
        fromIndex !== toIndex) {
      
      const relictToMove = this.relicts[fromIndex];
      
      if (fromIndex < toIndex) {
        // Moving forward: shift elements left
        for (let i = fromIndex; i < toIndex; i++) {
          this.relicts[i] = this.relicts[i + 1];
        }
      } else {
        // Moving backward: shift elements right
        for (let i = fromIndex; i > toIndex; i--) {
          this.relicts[i] = this.relicts[i - 1];
        }
      }
      
      this.relicts[toIndex] = relictToMove;
      this.notifyListeners();
    }
  }

  // Add listener for relict changes
  addListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  // Remove listener
  removeListener(listener: () => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Add listener for relict highlights
  addHighlightListener(listener: (index: number) => void): void {
    this.highlightListeners.push(listener);
  }

  // Remove highlight listener
  removeHighlightListener(listener: (index: number) => void): void {
    this.highlightListeners = this.highlightListeners.filter(l => l !== listener);
  }

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // Notify highlight listeners
  private notifyHighlightListeners(index: number): void {
    this.highlightListeners.forEach(listener => listener(index));
  }

  // Create a highlight function for a specific relict index
  private createHighlightFunction(index: number): () => Promise<void> {
    return async () => {
      // Notify highlight listeners immediately
      this.notifyHighlightListeners(index);
      
      // Return after 500ms (half a second) as specified
      await new Promise(resolve => setTimeout(resolve, 500));
    };
  }

  // Lifecycle methods that iterate through all relicts
  onChoose = async () => Promise.all(
    this.relicts
      .filter(relict => relict.onChoose)
      .map(async (relict, index) => relict.onChoose!(this.createHighlightFunction(index)))
  );
  
  onRoundStart = async () => Promise.all(
    this.relicts
      .filter(relict => relict.onRoundStart)
      .map(async (relict, index) => relict.onRoundStart!(this.createHighlightFunction(index)))
  );

  onDrawTile = async (tile: Tile) => Promise.all(
    this.relicts
      .filter(relict => relict.onDrawTile)
      .map(async (relict, index) => relict.onDrawTile!(this.createHighlightFunction(index), tile))
  );

  onPlaceTile = async (tile: Tile) => Promise.all(
    this.relicts
      .filter(relict => relict.onPlaceTile)
      .map(async (relict, index) => relict.onPlaceTile!(this.createHighlightFunction(index), tile))
  );

  onScoreTile = async (tile: Tile) => Promise.all(
    this.relicts
      .filter(relict => relict.onScoreTile)
      .map(async (relict, index) => relict.onScoreTile!(this.createHighlightFunction(index), tile))
  );

  onAfterPlaceTile = async (tile: Tile) => Promise.all(
    this.relicts
      .filter(relict => relict.onAfterPlaceTile)
      .map(async (relict, index) => relict.onAfterPlaceTile!(this.createHighlightFunction(index), tile))
  );

  onDiscard = async (tiles: Tile[]) => Promise.all(
    this.relicts
      .filter(relict => relict.onDiscard)
      .map(async (relict, index) => relict.onDiscard!(this.createHighlightFunction(index), tiles))
  );

  onSell = async (relict: Relict) => Promise.all(
    this.relicts
      .filter(r => r.onSell)
      .map(async (r, index) => r.onSell!(this.createHighlightFunction(index)))
  );

  onSellOther = async (soldRelict: Relict) => Promise.all(
    this.relicts
      .filter(r => r.onSellOther)
      .map(async (r, index) => r.onSellOther!(this.createHighlightFunction(index), soldRelict))
  );

  public async sellRelict(index: number): Promise<boolean> {
    if (index >= 0 && index < this.MAX_RELICTS) {
      const relictToSell = this.relicts[index];
      
      if (relictToSell instanceof Empty) {
        return false; // Can't sell empty relicts
      }

      // Trigger onSell on the relict being sold
      if (relictToSell.onSell) {
        await relictToSell.onSell(this.createHighlightFunction(index));
      }

      // Trigger onSellOther on all other relicts
      await this.onSellOther(relictToSell);

      // Replace with empty relict
      this.relicts[index] = new Empty();
      GameState.getInstance().addGold(relictToSell.sellValue);
      
      // Notify listeners of the change
      this.notifyListeners();
      
      return true;
    }
    return false;
  }
}
