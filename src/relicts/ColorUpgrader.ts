import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';
import { handleUpgrade } from '../utils/mutations/handleUpgrade';

export class ColorUpgrader implements Relict {
  name: string = 'Color Upgrader';
  description: string = 'When a Relict changes its color, upgrade it';
  icon: string = '🎨'; // Paint palette emoji
  sellValue: number = 2;

  async onColorChange(highlight: () => Promise<void>, tileAfterColorChange: Tile): Promise<void> {
    await highlight();
    await handleUpgrade(tileAfterColorChange);
  }
}
