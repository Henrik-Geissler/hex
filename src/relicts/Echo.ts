import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Rarity } from '../types/Rarity';
import { TileFactory } from '../factories/TileFactory';
import { handleStartPlacement } from '../utils/mutations/handleStartPlacement';

export class Echo implements Relict {
  name: string = 'Echo';
  description: string = 'Tiles trigger one more time';
  icon: string = '🔊'; // Speaker emoji
  sellValue: number = 2;
  rarity: Rarity = Rarity.Rare;

  // Track placements per turn: Map<position, Set<tileId>>
  private placementRegister: Map<number, Set<number>> = new Map();

  async onTurnStart(highlight: () => Promise<void>): Promise<void> {
    // Reset the placement register at the start of each turn
    this.placementRegister.clear();
  }

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const position = tile.pos;
    const tileId = tile.id;

    // Check if this placement is already registered
    if (this.placementRegister.has(position) && this.placementRegister.get(position)!.has(tileId)) return;
    
    // Register this placement
    if (!this.placementRegister.has(position)) {
      this.placementRegister.set(position, new Set());
    } 
    this.placementRegister.get(position)!.add(tileId);

    // Create a free tile at the same position
    await highlight();
    const freeTile = TileFactory.getInstance().createFreeTile();
    await handleStartPlacement(freeTile, position);

    // Place the same tile again at that position
    await highlight();
    const duplicateTile = TileFactory.getInstance().cloneTile(tile);
    this.placementRegister.get(position)!.add(duplicateTile.id);
    await handleStartPlacement(duplicateTile, position); 
  }
}
