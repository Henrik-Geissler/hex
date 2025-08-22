import { Relict } from '../types/Relict';
import { Tile } from '../types/Tile';

export class Empty implements Relict {
  name: string = 'Empty';
  description: string = 'An empty relict slot';
  icon: string = ' '; // Empty circle emoji
  counter?: number = undefined;
  sellValue: number = 0; // Empty slots have no sell value

}
