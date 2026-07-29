// Paletas curadas (no color picker libre): cada preset fija los 3 tokens de
// marca que los componentes ya usan (--color-electric-blue, --color-deep-navy,
// --color-safety-yellow, definidos en src/styles/global.css @theme). El resto
// de los tokens (surfaces, success-green, emergency-red, etc.) son neutrales/
// semánticos y se mantienen fijos para no romper contraste.
interface Palette {
  electricBlue: string;
  deepNavy: string;
  safetyYellow: string;
}

const PALETTES: Record<string, Palette> = {
  'electric-blue': { electricBlue: '#0055AA', deepNavy: '#003366', safetyYellow: '#FFCC00' },
  'industrial-green': { electricBlue: '#0F7B45', deepNavy: '#0B3B2E', safetyYellow: '#F2C94C' },
  'corporate-gray': { electricBlue: '#37474F', deepNavy: '#1C2529', safetyYellow: '#FFB300' },
  'sunset-orange': { electricBlue: '#C65D22', deepNavy: '#4A2410', safetyYellow: '#FFD166' },
  'royal-purple': { electricBlue: '#5B3A9E', deepNavy: '#2C1B4D', safetyYellow: '#FFCF56' },
};

export const PALETTE_PRESETS = Object.keys(PALETTES);

export function getPalette(preset: string): { css: string; deepNavy: string } {
  const palette = PALETTES[preset] ?? PALETTES['electric-blue'];
  const css = `:root{--color-electric-blue:${palette.electricBlue};--color-deep-navy:${palette.deepNavy};--color-safety-yellow:${palette.safetyYellow};}`;
  return { css, deepNavy: palette.deepNavy };
}
