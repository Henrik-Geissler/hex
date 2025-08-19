export class GameState {
  private static instance: GameState;
  private round: number = 1;
  private discards: number = 0;
  private gold: number = 0;
  private listeners: Array<() => void> = [];

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public method to get the singleton instance
  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
  }

  // Get current values
  getRound(): number {
    return this.round;
  }

  getDiscards(): number {
    return this.discards;
  }

  getGold(): number {
    return this.gold;
  }

  // Set values
  setRound(round: number): void {
    this.round = round;
    this.notifyListeners();
  }

  setDiscards(discards: number): void {
    this.discards = discards;
    this.notifyListeners();
  }

  setGold(gold: number): void {
    this.gold = gold;
    this.notifyListeners();
  }

  // Increment values
  incrementRound(): void {
    this.round++;
    this.notifyListeners();
  }

  incrementDiscards(): void {
    this.discards++;
    this.notifyListeners();
  }

  addGold(amount: number): void {
    this.gold += amount;
    this.notifyListeners();
  }

  spendGold(amount: number): boolean {
    if (this.gold >= amount) {
      this.gold -= amount;
      this.notifyListeners();
      return true;
    }
    return false;
  }

  // Add listener for state changes
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

  // Reset game state
  reset(): void {
    this.round = 1;
    this.discards = 0;
    this.gold = 0;
    this.notifyListeners();
  }
}
