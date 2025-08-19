import { Tile } from './Tile';

// Generic return type for relict methods
export type Triggering<T = {}> = { triggers: boolean } & T;

export interface Relict {
  // Required properties
  name: string;
  description: string;
  icon: string;
  counter?: number; // Optional score

  // Optional methods - all return Triggering<T> and are async
  onChoose?(): Promise<Triggering>;
  onRoundStart?(): Promise<Triggering>;
  onDrawTile?(tile: Tile): Promise<Triggering>;
  onPlaceTile?(tile: Tile): Promise<Triggering>;
  onScoreTile?(tile: Tile): Promise<Triggering>;
  onAfterPlaceTile?(tile: Tile): Promise<Triggering>;
  onDiscard?(tiles: Tile[]): Promise<Triggering>;
}
