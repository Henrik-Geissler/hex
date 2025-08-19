// Union type for Locations
export const Location = {
    Deck: 'Deck',
    Hand: 'Hand',
    Board: 'Board',
    Discard: 'Discard',
} as const
export type Location = keyof typeof Location;
