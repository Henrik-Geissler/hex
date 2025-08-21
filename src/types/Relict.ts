import { Tile } from './Tile';

// Generic return type for relict methods
export type Triggering<T = {}> = { triggers: boolean } & T;

export interface Relict {
  // Required properties
  name: string;
  description: string;
  icon: string;
  counter?: number; // Optional score
  sellValue: number; // Value when selling the relict

  // Optional methods - all return Triggering<T> and are async
  // Each method receives a highlight callback as the first parameter that can be invoked to make the relict light up
  // The highlight callback returns a Promise that resolves after 500ms
  onChoose?(highlight: () => Promise<void>): Promise<Triggering>;
  onRoundStart?(highlight: () => Promise<void>): Promise<Triggering>;
  onDrawTile?(highlight: () => Promise<void>, tile: Tile): Promise<Triggering>;
  onPlaceTile?(highlight: () => Promise<void>, tile: Tile): Promise<Triggering>;
  onScoreTile?(highlight: () => Promise<void>, tile: Tile): Promise<Triggering>;
  onDiscard?(highlight: () => Promise<void>, tiles: Tile[]): Promise<Triggering>;
  onSell?(highlight: () => Promise<void>): Promise<Triggering>;
  onSellOther?(highlight: () => Promise<void>, soldRelict: Relict): Promise<Triggering>;
}
