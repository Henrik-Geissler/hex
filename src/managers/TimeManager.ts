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
    const counter = TimeManager.getInstance().counter;
    const waitTime = Math.max(1, milliseconds - Math.max(0, counter-2000)/30);
    TimeManager.getInstance().counter += waitTime;
    return new Promise(resolve => setTimeout(resolve, waitTime));
  } 

  /**
   * Get the current counter value
   * @returns The current counter value
   */
  public getCounter(): number {
    return this.counter;
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
   * Static method to reset the counter
   */
  public static resetCounter(): void {
    TimeManager.getInstance().resetCounter();
  }
}
