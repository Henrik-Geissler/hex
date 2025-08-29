import { PhaseInterface } from '../types/PhaseInterface';
import { RelictDeck } from '../directories/RelictDeck';
import { RelictManager } from '../managers/RelictManager';
import { TimeManager } from '../managers/TimeManager';

export class ShopPhase implements PhaseInterface {
  async run(): Promise<void> {
    
    // Reset reroll cost to 1 when entering shop
    RelictManager.getInstance().resetRerollCost();
    
    // Draw relicts for the shop based on player's gold and rarity requirements
    const relictManager = RelictManager.getInstance();
    const shopRelicts = relictManager.drawInitialShopRelicts();
    
    // Set the drawn relicts in the RelictManager so the Shop component can display them
    relictManager.setShopRelicts(shopRelicts);
    
    // Wait for player to make decisions
    await TimeManager.Wait(100);
  }
}
