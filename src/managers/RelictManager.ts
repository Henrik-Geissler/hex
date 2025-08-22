import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Empty } from '../relicts/Empty';
import { GameState } from '../machines/GameState';
import { RelictDeck } from '../directories/RelictDeck';

export class RelictManager {
  private static instance: RelictManager;
  private relicts: Relict[] = [];
  private shopRelicts: Relict[] = [];
  private rerollCost: number = 1;
  private readonly MAX_RELICTS = 5;
  private listeners: Array<() => void> = [];
  private shopListeners: Array<() => void> = [];
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
    this.shopRelicts = [];
    this.rerollCost = 1;
    this.notifyListeners();
    this.notifyShopListeners();
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

  // Generic helper method to execute lifecycle methods sequentially
  private async executeLifecycleMethod<T>(
    methodName: keyof Pick<Relict, 'onChoose' | 'onRoundStart' | 'onDrawTile' | 'onPlaceTile' | 'onScoreTile' | 'onDiscard' | 'onSell' | 'onSellOther'>,
    ...args: any[]
  ): Promise<void> {
    for (let i = 0; i < this.relicts.length; i++) {
      const relict = this.relicts[i];
      const method = relict[methodName];
      if (method && typeof method === 'function') {
        await (method as any).apply(relict, [this.createHighlightFunction(i), ...args]);
      }
    }
  }

  // Lifecycle methods that iterate through all relicts sequentially
  onChoose = async (relict: Relict) => this.executeLifecycleMethod('onChoose');
  
  onRoundStart = async () => this.executeLifecycleMethod('onRoundStart');

  onDrawTile = async (tile: Tile) => this.executeLifecycleMethod('onDrawTile', tile);

  onPlaceTile = async (tile: Tile) => this.executeLifecycleMethod('onPlaceTile', tile);

  onScoreTile = async (tile: Tile) => this.executeLifecycleMethod('onScoreTile', tile);
 
  onDiscard = async (tiles: Tile[]) => this.executeLifecycleMethod('onDiscard', tiles);

  onSell = async (relict: Relict) => this.executeLifecycleMethod('onSell', relict);

  onSellOther = async (soldRelict: Relict) => this.executeLifecycleMethod('onSellOther', soldRelict);

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

  // Shop-related methods
  public setShopRelicts(relicts: Relict[]): void {
    this.shopRelicts = relicts;
    this.notifyShopListeners();
  }

  public getShopRelicts(): Relict[] {
    return [...this.shopRelicts];
  }

  public getRerollCost(): number {
    return this.rerollCost;
  }

  public resetRerollCost(): void {
    this.rerollCost = 1;
  }

  public rerollShop(): boolean {
    const gameState = GameState.getInstance();
    
    if (gameState.getGold() >= this.rerollCost) {
      // Deduct gold
      gameState.addGold(-this.rerollCost);
      
      const relictDeck = RelictDeck.getInstance();
      
      // Add current shop relicts back to the deck
      relictDeck.addBack(this.shopRelicts);
      
      // Draw new relicts
      this.shopRelicts = relictDeck.draw(3);
      
      // Increment reroll cost for next time
      this.rerollCost++;
      
      // Notify listeners
      this.notifyShopListeners();
      
      return true;
    }
    
    return false;
  }

  public buyRelict(shopIndex: number): boolean {
    // Check if the shop index is valid
    if (shopIndex < 0 || shopIndex >= this.shopRelicts.length) {
      return false;
    }

    const relictToBuy = this.shopRelicts[shopIndex];
    const cost = relictToBuy.sellValue * 2;
    const gameState = GameState.getInstance();

    // Check if player has enough gold
    if (gameState.getGold() < cost) {
      return false;
    }

    // Check if there's an empty slot in the relict bar
    const emptySlotIndex = this.relicts.findIndex(relict => relict instanceof Empty);
    if (emptySlotIndex === -1) {
      return false; // No empty slots available
    }

    // Deduct gold
    gameState.addGold(-cost);

    // Add relict to player's relict bar
    this.relicts[emptySlotIndex] = relictToBuy;

    // Remove relict from shop
    this.shopRelicts.splice(shopIndex, 1);

    // Trigger onChoose for the newly purchased relict
    this.onChoose(relictToBuy);

    // Notify listeners
    this.notifyListeners();
    this.notifyShopListeners();

    return true;
  }

  public returnUnsoldRelictsToDeck(): void {
    if (this.shopRelicts.length > 0) {
      const relictDeck = RelictDeck.getInstance();
      const relictsToReturn = [...this.shopRelicts];
      
      // Add all unsold shop relicts back to the deck
      relictDeck.addBack(relictsToReturn);
      
      // Clear the shop relicts
      this.shopRelicts = [];
      
      // Notify shop listeners
      this.notifyShopListeners(); 
    }
  }

  // Add shop listener
  addShopListener(listener: () => void): void {
    this.shopListeners.push(listener);
  }

  // Remove shop listener
  removeShopListener(listener: () => void): void {
    this.shopListeners = this.shopListeners.filter(l => l !== listener);
  }

  // Notify shop listeners
  private notifyShopListeners(): void {
    this.shopListeners.forEach(listener => listener());
  }
}
