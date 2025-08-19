// Union type for Colors 
export const Color = {
    Off: 'Off',
    Free: 'Free',
    Red: 'Red',
    Orange: 'Orange',
    Yellow: 'Yellow',
    Lime: 'Lime',
    Green: 'Green',
    Cyan: 'Cyan',
    Blue: 'Blue',
    Purple: 'Purple',
    Brown: 'Brown',
    White: 'White',
} as const
export type Color = keyof typeof Color;

export const BaseColors = [Color.Red, Color.Yellow, Color.Green, Color.Blue];