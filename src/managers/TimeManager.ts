/**
 * Singleton TimeManager for consistent timing across the application
 */
export class TimeManager {
  private static instance: TimeManager;
  private counter: number = 0;

  private constructor() {}

  /**
   * Get the singleton instance of TimeManager
   * @returns The singleton instance
   */
  public static getInstance(): TimeManager {
    if (!TimeManager.instance) {
      TimeManager.instance = new TimeManager();
    }
    return TimeManager.instance;
  }

  /**
   * Wait for a specified number of milliseconds
   * @param milliseconds - Number of milliseconds to wait
   * @returns Promise that resolves after the specified time
   */
  public static async Wait(milliseconds: number): Promise<void> {
    TimeManager.getInstance().incrementCounter();
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Instance method version of Wait
   * @param milliseconds - Number of milliseconds to wait
   * @returns Promise that resolves after the specified time
   */
  public async wait(milliseconds: number): Promise<void> {
    return TimeManager.Wait(milliseconds);
  }

  /**
   * Get the current counter value
   * @returns The current counter value
   */
  public getCounter(): number {
    return this.counter;
  }

  /**
   * Increment the counter by 1
   */
  public incrementCounter(): void {
    this.counter++;
  }

  /**
   * Reset the counter to 0
   */
  public resetCounter(): void {
    this.counter = 0;
  }

  /**
   * Static method to get the counter value
   * @returns The current counter value
   */
  public static getCounter(): number {
    return TimeManager.getInstance().getCounter();
  }

  /**
   * Static method to increment the counter
   */
  public static incrementCounter(): void {
    TimeManager.getInstance().incrementCounter();
  }

  /**
   * Static method to reset the counter
   */
  public static resetCounter(): void {
    TimeManager.getInstance().resetCounter();
  }
}
