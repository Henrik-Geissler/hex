import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { getNeighbours } from '../directories/utils/getNeighbours'; 
import { handleMove } from '../utils/mutations/handleMove';
import { getRow } from '../directories/utils/getRow';
import { Rarity } from '../types/Rarity';

export class Gravity implements Relict {
  name: string = 'Gravity';
  description: string = 'Tiles Fall Down';
  icon: string = '🌍'; // Earth globe emoji - alternatives: ⬇️ (down arrow), 🪨 (rock), 💧 (droplet), 🌊 (wave)
  rarity: Rarity = Rarity.Filler;
  sellValue: number = 1;

  async onPlaceTile(highlight: () => Promise<void>, tile: Tile): Promise<void> { 
    await this.UpdateGravity(highlight,tile);
 }
 async onPlaceFreeOrOffTile(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    if(!tile.isFree()) return;
    const neighbors = getNeighbours(tile);
    const gravityNeighbors = [neighbors[5],neighbors[0]].filter(neighbor => neighbor.isReal());
    for (const neighbor of gravityNeighbors)
    await this.UpdateGravity(highlight,neighbor);
 }
  async UpdateGravity(highlight: () => Promise<void>, tile: Tile): Promise<void> {
    const [,,rightTile,leftTile,..._] = getNeighbours(tile);
    const isLeftFree = leftTile.isFree();
    const isRightFree = rightTile.isFree();
    if(!isLeftFree && !isRightFree) {
      return;
    }
    await highlight();
    if(!isRightFree) {
      await handleMove(tile,leftTile);
      return;
    }
    if(!isLeftFree ) {
      await handleMove(tile,rightTile);
      return;
    }
    const isEveryOtherRow = getRow(tile.pos) % 2 === 0;
    await handleMove(tile,isEveryOtherRow ? leftTile : rightTile);

  }
}
