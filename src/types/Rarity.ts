// Union type for Locations
export const Rarity = {
    Starter: 'Starter',
    Filler: 'Filler',
    Rare: 'Rare'
} as const
export type Rarity = keyof typeof Rarity;
