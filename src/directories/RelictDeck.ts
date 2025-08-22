import { Relict } from '../types/Relict';
import { GoldMiner } from '../relicts/GoldMiner';
import { PiggyBank } from '../relicts/PiggyBank';
import { Pioneer } from '../relicts/Pioneer';
import { GreenDoubler } from '../relicts/GreenDoubler';
import { BlueUpgrader } from '../relicts/BlueUpgrader';
import { BlueMirror } from '../relicts/BlueMirror';
import { ColorUpgrader } from '../relicts/ColorUpgrader';
import { Incrementer } from '../relicts/Incrementer';
import { NeighborMirror } from '../relicts/NeighborMirror';
import { BoardUpgrader } from '../relicts/BoardUpgrader';
import { EdgeChaos } from '../relicts/EdgeChaos';
import { ColorConsumer } from '../relicts/ColorConsumer';
import { DiscardRewarder } from '../relicts/DiscardRewarder';

export class RelictDeck {
  private static instance: RelictDeck;
  private relicts: Relict[] = [];

  private constructor() {}

  public static getInstance(): RelictDeck {
    if (!RelictDeck.instance) {
      RelictDeck.instance = new RelictDeck();
    }
    return RelictDeck.instance;
  }

  /**
   * Initialize the relict deck with all available relicts
   */
  public reset(): void {
    this.relicts = [];
     // this.relicts.push(new GoldMiner());
    //  this.relicts.push(new PiggyBank());
     // this.relicts.push(new Pioneer());
      // this.relicts.push(new GreenDoubler());
      this.relicts.push(new BlueUpgrader());
      this.relicts.push(new BlueMirror());
      // this.relicts.push(new ColorUpgrader());
      this.relicts.push(new Incrementer());
      this.relicts.push(new NeighborMirror());
      this.relicts.push(new BoardUpgrader());
      //this.relicts.push(new EdgeChaos());
      this.relicts.push(new ColorConsumer());
      this.relicts.push(new DiscardRewarder());
    
    this.shuffle();
  }

  /**
   * Shuffle the relict deck
   */
  public shuffle(): void {
    for (let i = this.relicts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.relicts[i], this.relicts[j]] = [this.relicts[j], this.relicts[i]];
    }
  }

  /**
   * Draw a specified number of relicts from the deck
   * @param count - Number of relicts to draw
   * @returns Array of drawn relicts
   */
  public draw(count: number): Relict[] {
    const drawn: Relict[] = [];
    const actualCount = Math.min(count, this.relicts.length);
    
    for (let i = 0; i < actualCount; i++) {
      const relict = this.relicts.pop();
      if (relict) {
        drawn.push(relict);
      }
    }
    
    return drawn;
  }

  /**
   * Add relicts back to the deck
   * @param relicts - Array of relicts to add back
   */
  public addBack(relicts: Relict[]): void {
    this.relicts.push(...relicts);
  }

  /**
   * Get the current number of relicts in the deck
   */
  public getCount(): number {
    return this.relicts.length;
  }

  /**
   * Get all relicts in the deck (for debugging)
   */
  public getAllRelicts(): Relict[] {
    return [...this.relicts];
  }
}
