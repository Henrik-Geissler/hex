/**
 * Singleton TimeManager for consistent timing across the application
 */
export class TimeManager {
  private static instance: TimeManager;

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
}
