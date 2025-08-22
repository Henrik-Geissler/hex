import { PhaseInterface } from '../types/PhaseInterface';
import { RelictDeck } from '../directories/RelictDeck';
import { RelictManager } from '../managers/RelictManager';

export class ShopPhase implements PhaseInterface {
  async run(): Promise<void> {
    console.log('Running ShopPhase');
    
    // Draw 3 relicts from the deck for the shop
    const relictDeck = RelictDeck.getInstance();
    console.log('ShopPhase: RelictDeck count before draw:', relictDeck.getCount());
    const shopRelicts = relictDeck.draw(3);
    console.log('ShopPhase: Drawn relicts:', shopRelicts);
    console.log('ShopPhase: RelictDeck count after draw:', relictDeck.getCount());
    
    // Set the drawn relicts in the RelictManager so the Shop component can display them
    RelictManager.getInstance().setShopRelicts(shopRelicts);
    
    // Wait for player to make decisions
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
