import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { handleUpgrade } from '../utils/mutations/handleUpgrade';
import { Rarity } from '../types/Rarity';
export class ColorUpgrader implements Relict {
  name: string = 'Color Upgrader';
  description: string = 'When a Relict changes its color, upgrade it';
  icon: string = '🌈'; // Artist palette emoji - alternatives: ⬆️ (up arrow), 🔧 (wrench), ⚡ (lightning), 🎨 (rainbow)
  sellValue: number = 1;
  rarity:Rarity =Rarity.Rare;

  async onColorChange(highlight: () => Promise<void>, tileAfterColorChange: Tile): Promise<void> {
    await highlight();
    await handleUpgrade(tileAfterColorChange);
  }
}
