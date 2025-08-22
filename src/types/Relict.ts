import { Tile } from './Tile';

export interface Relict {
  // Required properties
  name: string;
  description: string;
  icon: string;
  counter?: number; // Optional score
  sellValue: number; // Value when selling the relict

  // Optional methods - all return void and are async
  // Each method receives a highlight callback as the first parameter that can be invoked to make the relict light up
  // The highlight callback returns a Promise that resolves after 500ms
  onChoose?(highlight: () => Promise<void>,relict: Relict): Promise<void>;
  onRoundStart?(highlight: () => Promise<void>): Promise<void>;
  onDrawTile?(highlight: () => Promise<void>, tile: Tile): Promise<void>;
  onPlaceTile?(highlight: () => Promise<void>, tile: Tile): Promise<void>;
  onScoreTile?(highlight: () => Promise<void>, tile: Tile): Promise<void>;
  onDiscard?(highlight: () => Promise<void>, tiles: Tile[]): Promise<void>;
  onSell?(highlight: () => Promise<void>): Promise<void>;
  onSellOther?(highlight: () => Promise<void>, soldRelict: Relict): Promise<void>;
}
