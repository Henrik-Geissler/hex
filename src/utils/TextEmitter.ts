import { EmitterEffect } from '../types/EmitterEffect';

/**
 * Text Emitter utility for displaying floating text effects
 * Emits text at given coordinates with specified effects
 */
export class TextEmitter {
  private static instance: TextEmitter;
  private listeners: Array<{
    x: number;
    y: number;
    text: string;
    effect: EmitterEffect;
    id: string;
  }> = [];

  private constructor() {}

  public static getInstance(): TextEmitter {
    if (!TextEmitter.instance) {
      TextEmitter.instance = new TextEmitter();
    }
    return TextEmitter.instance;
  }

  /**
   * Emit text at specified coordinates with given effect
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param text - Text to display
   * @param effect - Effect type to apply
   */
  public emit(x: number, y: number, text: string, effect: EmitterEffect): void {
    const id = `text-${Date.now()}-${Math.random()}`;
    
    this.listeners.push({
      x,
      y,
      text,
      effect,
      id
    });

    // Remove the text after 1 second
    setTimeout(() => {
      this.listeners = this.listeners.filter(listener => listener.id !== id);
    }, 1000);

    // Notify any UI components that need to render the text
    this.notifyListeners();
  }

  /**
   * Get all active text emissions
   */
  public getActiveEmissions(): Array<{
    x: number;
    y: number;
    text: string;
    effect: EmitterEffect;
    id: string;
  }> {
    return [...this.listeners];
  }

  /**
   * Add a listener for text emission updates
   */
  public addListener(listener: () => void): void {
    // This will be used by React components to listen for updates
    // For now, we'll use a simple callback approach
  }

  private notifyListeners(): void {
    // This will be used to notify React components of updates
    // For now, we'll rely on React's state management
  }
}
