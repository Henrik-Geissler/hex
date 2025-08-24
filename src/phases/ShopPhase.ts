import { PhaseInterface } from '../types/PhaseInterface';
import { RelictDeck } from '../directories/RelictDeck';
import { RelictManager } from '../managers/RelictManager';
import { TimeManager } from '../managers/TimeManager';

export class ShopPhase implements PhaseInterface {
  async run(): Promise<void> {
    
    // Reset reroll cost to 1 when entering shop
    RelictManager.getInstance().resetRerollCost();
    
    // Draw 3 relicts from the deck for the shop
    const relictDeck = RelictDeck.getInstance();
    const shopRelicts = relictDeck.draw(3);
    
    // Set the drawn relicts in the RelictManager so the Shop component can display them
    RelictManager.getInstance().setShopRelicts(shopRelicts);
    
    // Wait for player to make decisions
    await TimeManager.Wait(100);
  }
}
