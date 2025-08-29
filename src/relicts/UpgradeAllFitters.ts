import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Hand } from '../directories/Hand'; 
import { Rarity } from '../types/Rarity';
import { isValidDropTarget } from '../utils/dropZoneValidation';
import { handleUpgrade } from '../utils/mutations/handleUpgrade';

export class UpgradeAllFitters implements Relict {
  name: string = 'Upgrade All Fitters';
  description: string = 'When you place a tile, upgrade all cards in hand that would fit in the same spot';
  icon: string = '👠'; // Wrench emoji - alternatives: ⚡ (lightning), ⬆️ (up arrow), 📈 (chart), 🎯 (target)
  rarity: Rarity = Rarity.Starter;
  sellValue: number = 2;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const hand = Hand.getInstance(); 
    // Get all tiles in hand
    const handTiles = hand.getAllTiles();
    
    // Check each hand tile to see if it would fit in the same spot
    for (const handTile of handTiles) {
      
      // Check if this hand tile would fit in the same position using existing validation logic
      if (isValidDropTarget(handTile, tile.isBeeingPlaced!)) {
        await highlight();
        await handleUpgrade(handTile);
      }
    }
  } 
}
