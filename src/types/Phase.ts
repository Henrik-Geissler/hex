// Union type for Game Phases
export const Phase = {
    InitPhase: 'InitPhase',
    InitRoundPhase: 'InitRoundPhase',
    InitTurnPhase: 'InitTurnPhase',
    CheckWinPhase: 'CheckWinPhase',
    CheckLoosePhase: 'CheckLoosePhase',
    WaitForInputPhase: 'WaitForInputPhase',
    PlayPhase: 'PlayPhase',
    TurnEndPhase: 'TurnEndPhase',
    ShopPhase: 'ShopPhase',
    LoosePhase: 'LoosePhase',
} as const;
export type Phase = keyof typeof Phase;
