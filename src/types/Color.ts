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

export const ColorMap: Record<keyof typeof Color, string>
= {
    'Off': '#222222',
    'Free': '#cccccc',
    'Red': '#ff4444',
    'Orange': '#ff8844',
    'Yellow': '#ffcc44',
    'Lime': '#88ff44',
    'Green': '#44ff44',
    'Cyan': '#44ffcc',
    'Blue': '#4488ff',
    'Purple': '#8844ff',
    'Brown': "#884444",
    'White': "#ffffff"
};

/**
 * Returns a random color different from the input color
 * @param currentColor - The current color to avoid
 * @returns A random color that is different from the current color
 */
export function randomNextColorFunction(currentColor: Color): Color {
    const availableColors = Object.values(Color).filter(color => 
        color !== currentColor && 
        color !== Color.Off && 
        color !== Color.Free && 
        color !== Color.White
    );
    
    if (availableColors.length === 0) {
        return currentColor; // Fallback to current color if no alternatives
    }
    
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
}