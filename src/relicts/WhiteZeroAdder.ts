import { Relict } from '../types/Relict';
import { Rarity } from '../types/Rarity';
import { TileFactory } from '../factories/TileFactory';
import { Deck } from '../directories/Deck';
import { Color } from '../types/Color';
import { TimeManager } from '../managers/TimeManager';

export class WhiteZeroAdder implements Relict {
  name: string = 'White Zero Adder';
  description: string = 'On round end, add a white 0 to your deck';
  icon: string = '⚪'; // White circle emoji
  rarity: Rarity = Rarity.Starter;
  sellValue: number = 2;

  /**
   * Called at the end of each round
   * Adds a white 0 tile to the deck
   */
  async onRoundEnd(highlight: () => Promise<void>): Promise<void> {
    const tileFactory = TileFactory.getInstance();
    const deck = Deck.getInstance();
    
    // Create a white 0 tile
    const whiteZeroTile = tileFactory.createTile(0, Color.White, 0);
    
    // Add it to the deck
    await highlight();
    await deck.add(whiteZeroTile); 
    await TimeManager.Wait(500);
  }
}
