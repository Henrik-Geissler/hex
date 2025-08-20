import { Relict, Triggering } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Empty } from '../relicts/Empty';
import { GameState } from '../machines/GameState';

export class RelictManager {
  private static instance: RelictManager;
  private relicts: Relict[] = [];
  private readonly MAX_RELICTS = 5;
  private listeners: Array<() => void> = [];

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

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // Lifecycle methods that iterate through all relicts
  onChoose = async () => Promise.all(this.relicts.filter(relict => relict.onChoose).map(relict => relict.onChoose!()));
  
  onRoundStart = async () => Promise.all(this.relicts.filter(relict => relict.onRoundStart).map(relict => relict.onRoundStart!()));

  onDrawTile = async (tile: Tile) => Promise.all(this.relicts.filter(relict => relict.onDrawTile).map(relict => relict.onDrawTile!(tile)));

  onPlaceTile = async (tile: Tile) => Promise.all(this.relicts.filter(relict => relict.onPlaceTile).map(relict => relict.onPlaceTile!(tile)));

  onScoreTile = async (tile: Tile) => Promise.all(this.relicts.filter(relict => relict.onScoreTile).map(relict => relict.onScoreTile!(tile)));

  onAfterPlaceTile = async (tile: Tile) => Promise.all(this.relicts.filter(relict => relict.onAfterPlaceTile).map(relict => relict.onAfterPlaceTile!(tile)));

  onDiscard = async (tiles: Tile[]) => Promise.all(this.relicts.filter(relict => relict.onDiscard).map(relict => relict.onDiscard!(tiles)));
  onSell = async (relict: Relict) => Promise.all(this.relicts.filter(r => r.onSell).map(r => r.onSell!()));
  onSellOther = async (soldRelict: Relict) => Promise.all(this.relicts.filter(r => r.onSellOther).map(r => r.onSellOther!(soldRelict)));

  public async sellRelict(index: number): Promise<boolean> {
    if (index >= 0 && index < this.MAX_RELICTS) {
      const relictToSell = this.relicts[index];
      
      if (relictToSell instanceof Empty) {
        return false; // Can't sell empty relicts
      }

      // Trigger onSell on the relict being sold
      if (relictToSell.onSell) {
        await relictToSell.onSell();
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
