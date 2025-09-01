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
import { GreenGrowth } from '../relicts/GreenGrowth';
import { OddDisappearance } from '../relicts/OddDisappearance';
import { The13thTile } from '../relicts/13thTile';
import { SingleNeighborClone } from '../relicts/SingleNeighborClone';
import { Digit5Expander } from '../relicts/Digit5Expander';
import { NeighborDevourer } from '../relicts/NeighborDevourer';
import { WaterMirror } from '../relicts/WaterMirror';
import { UpgradePlacer } from '../relicts/UpgradePlacer';
import { WaterToucher } from '../relicts/WaterToucher';
import { CoinField } from '../relicts/CoinField';
import { Gravity } from '../relicts/Gravity';
import { UpgradeAllFitters } from '../relicts/UpgradeAllFitters';
import { Insurance } from '../relicts/Insurance';
import { ColorMaster } from '../relicts/ColorMaster';
import { Echo } from '../relicts/Echo';
import { LeftColorChanger } from '../relicts/LeftColorChanger';
import { Rotator } from '../relicts/Rotator';
import { LittleRedRaptor } from '../relicts/LittleRedRaptor';
import { DigitGoldRewarder } from '../relicts/DigitGoldRewarder';
import { WhiteZeroAdder } from '../relicts/WhiteZeroAdder';
import { ColorMasterTile } from '../relicts/ColorMasterTile';

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
    //Upgrade
    this.relicts.push(new BlueUpgrader());
    this.relicts.push(new ColorUpgrader());
    this.relicts.push(new GreenGrowth());
    this.relicts.push(new UpgradePlacer());
    this.relicts.push(new UpgradeAllFitters());
    //  this.relicts.push(new BoardUpgrader());
    //  this.relicts.push(new Incrementer()); //boring

    //Gold
    this.relicts.push(new DigitGoldRewarder());
    this.relicts.push(new CoinField());
    // this.relicts.push(new GoldMiner());
   //  this.relicts.push(new PiggyBank());
   //    this.relicts.push(new DiscardRewarder());

    //Double
    this.relicts.push(new GreenDoubler());
    this.relicts.push(new WaterToucher());
    //this.relicts.push(new Pioneer()); //boring
    
    //Consume
    this.relicts.push(new NeighborDevourer());
    this.relicts.push(new LittleRedRaptor());

         //Clone
     this.relicts.push(new SingleNeighborClone());
     this.relicts.push(new WaterMirror());
     //this.relicts.push(new ColorMasterTile());
     //this.relicts.push(new BlueMirror());
      // this.relicts.push(new NeighborMirror()); //weird
     //   this.relicts.push(new The13thTile()); //boring

     //Permanent
     this.relicts.push(new WhiteZeroAdder());

    //Rescore
    this.relicts.push(new Echo());
    this.relicts.push(new Gravity());
    this.relicts.push(new Rotator());

    //Space
    this.relicts.push(new Insurance());
    this.relicts.push(new Digit5Expander());
    //this.relicts.push(new OddDisappearance());


      this.relicts.push(new EdgeChaos());
       //      this.relicts.push(new ColorConsumer()); //boring 
     this.relicts.push(new LeftColorChanger());
    
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
   * @param filter - Optional filter function to apply before drawing
   * @returns Array of drawn relicts
   */
  public draw(count: number, filter?: (relict: Relict) => boolean): Relict[] {
    const drawn: Relict[] = [];
    let availableRelicts = [...this.relicts];
    
    // Apply filter if provided
    if (filter) {
      availableRelicts = availableRelicts.filter(filter);
    }
    
    const actualCount = Math.min(count, availableRelicts.length);
    
    for (let i = 0; i < actualCount; i++) {
      // Find the first relict that matches the filter in the original array
      const relictToDraw = availableRelicts[i];
      const index = this.relicts.indexOf(relictToDraw);
      
      if (index !== -1) {
        const relict = this.relicts.splice(index, 1)[0];
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
    this.shuffle();
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

  /**
   * Remove a specific relict from the deck
   * @param relict - The relict to remove
   * @returns true if the relict was found and removed, false otherwise
   */
  public removeRelict(relict: Relict): boolean {
    const index = this.relicts.indexOf(relict);
    if (index !== -1) {
      this.relicts.splice(index, 1);
      return true;
    }
    return false;
  }
}
