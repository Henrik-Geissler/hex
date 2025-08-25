// Union type for Locations
export const Rarety = {
    Starter: 'Starter',
    Filler: 'Filler',
    Rare: 'Rare'
} as const
export type Location = keyof typeof Rarety;
