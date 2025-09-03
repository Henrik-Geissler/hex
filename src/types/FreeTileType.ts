// Union type for FreeTileTypes
export const FreeTileType = {
    Free: 'Free',
    Upgrade: 'Upgrade',
    Double: 'Double',
    Coin: 'Coin',
} as const
export type FreeTileType = keyof typeof FreeTileType;   