import { Relict, Triggering } from '../types/Relict';
import { Tile } from '../types/Tile';
import { Empty } from '../relicts/Empty';

export class RelictManager {
  private static instance: RelictManager;
  private relicts: Relict[] = [];
  private readonly MAX_RELICTS = 5;

  private constructor() {
    this.reset();
  }

  public static getInstance(): RelictManager {
    if (!RelictManager.instance) {
      RelictManager.instance = new RelictManager();
    }
    return RelictManager.instance;
  }

  public reset(): void {
    this.relicts = Array(this.MAX_RELICTS).fill(null).map(() => new Empty());
  }

  public getRelicts(): Relict[] {
    return [...this.relicts];
  }

  public setRelict(index: number, relict: Relict): void {
    if (index >= 0 && index < this.MAX_RELICTS) {
      this.relicts[index] = relict;
    }
  }

  public getRelict(index: number): Relict | null {
    if (index >= 0 && index < this.MAX_RELICTS) {
      return this.relicts[index];
    }
    return null;
  }

  // Lifecycle methods that iterate through all relicts
  onChoose = async () => Promise.all(this.relicts.filter(relict => relict.onChoose).map(relict => relict.onChoose!()));
  
  onRoundStart = async () => Promise.all(this.relicts.filter(relict => relict.onRoundStart).map(relict => relict.onRoundStart!()));

  onDrawTile = async (tile: Tile) => Promise.all(this.relicts.filter(relict => relict.onDrawTile).map(relict => relict.onDrawTile!(tile)));

  onPlaceTile = async (tile: Tile) => Promise.all(this.relicts.filter(relict => relict.onPlaceTile).map(relict => relict.onPlaceTile!(tile)));

  onScoreTile = async (tile: Tile) => Promise.all(this.relicts.filter(relict => relict.onScoreTile).map(relict => relict.onScoreTile!(tile)));

  onAfterPlaceTile = async (tile: Tile) => Promise.all(this.relicts.filter(relict => relict.onAfterPlaceTile).map(relict => relict.onAfterPlaceTile!(tile)));

  onDiscard = async (tiles: Tile[]) => Promise.all(this.relicts.filter(relict => relict.onDiscard).map(relict => relict.onDiscard!(tiles)));
}
