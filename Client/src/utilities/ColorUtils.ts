export function getReadableTextColor(color: string): string {
    // Define a list of potential text colors (black and white)
    const textColors = ['#FFFFFF', '#000000'];

    // Convert color string to RGB array
    function parseColor(color: string): [number, number, number] {
        if (color.startsWith('#')) {
            return hexToRgb(color);
        } else if (color.startsWith('rgb')) {
            return rgbStringToArray(color);
        } else {
            throw new Error('Unsupported color format');
        }
    }

    // Convert hex to RGB array
    function hexToRgb(hex: string): [number, number, number] {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return [r, g, b];
    }

    // Convert RGB string to RGB array
    function rgbStringToArray(rgbString: string): [number, number, number] {
        const rgb = rgbString.match(/\d+/g);
        if (rgb === null || rgb.length !== 3) {
            throw new Error('Invalid RGB string format');
        }
        return rgb.map(Number) as [number, number, number];
    }

    // Calculate luminance of a color
    function luminance(r: number, g: number, b: number): number {
        const a = [r, g, b].map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    // Calculate contrast ratio
    function contrast(
        r1: number,
        g1: number,
        b1: number,
        r2: number,
        g2: number,
        b2: number
    ): number {
        const lum1 = luminance(r1, g1, b1);
        const lum2 = luminance(r2, g2, b2);
        const light = Math.max(lum1, lum2);
        const dark = Math.min(lum1, lum2);
        return (light + 0.05) / (dark + 0.05);
    }

    // Parse the background color to RGB array
    const [bgR, bgG, bgB] = parseColor(color);

    // Find the text color with the highest contrast ratio
    let bestColor = textColors[0];
    let highestContrast = 0;
    for (const textColor of textColors) {
        const [textR, textG, textB] = parseColor(textColor);
        const ratio = contrast(bgR, bgG, bgB, textR, textG, textB);
        if (ratio > highestContrast) {
            highestContrast = ratio;
            bestColor = textColor;
        }
    }

    return bestColor;
}