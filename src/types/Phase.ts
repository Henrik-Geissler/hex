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
    DiscardPhase: 'DiscardPhase',
    LoosePhase: 'LoosePhase',
    RoundEndPhase: 'RoundEndPhase',
} as const;
export type Phase = keyof typeof Phase;
