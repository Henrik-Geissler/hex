import { Relict } from '../types/Relict';
import { Rarety } from '../types/Rarety';

export class Empty implements Relict {
  name: string = 'Empty';
  description: string = 'An empty relict slot';
  icon: string = ' '; // Empty circle emoji
  rarity: Rarety = Rarety.Rare; // Empty slots are starter rarity
  counter?: number = undefined;
  sellValue: number = 0; // Empty slots have no sell value

}
