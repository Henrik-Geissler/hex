// Union type for Locations
export const Location = {
    Deck: 'Deck',
    Hand: 'Hand',
    Board: 'Board',
    DiscardPile: 'DiscardPile',
    Air: 'Air',
} as const
export type Location = keyof typeof Location;
