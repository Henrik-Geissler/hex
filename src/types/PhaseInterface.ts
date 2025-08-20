// Interface for Phase classes
export interface PhaseInterface {
  run(params?: any): Promise<void>;
}
