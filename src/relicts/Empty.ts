import { Relict } from '../types/Relict';
import { Rarity } from '../types/Rarity';

export class Empty implements Relict {
  name: string = 'Empty';
  description: string = 'An empty relict slot';
  icon: string = ' '; // Empty circle emoji
  rarity: Rarity = Rarity.Rare; // Empty slots are starter rarity
  counter?: number = undefined;
  sellValue: number = 0; // Empty slots have no sell value

}
