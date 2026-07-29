export const BUTTON_VARIANT_CLASSES = {
  primary: 'bg-safety-yellow text-deep-navy font-bold hover:brightness-95 transition-all shadow-md active:scale-95 hover:shadow-lg',
  secondary: 'bg-electric-blue text-white font-bold hover:bg-deep-navy transition-all active:scale-95 shadow-md',
  tertiary: 'bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-all active:scale-95',
  emergency: 'bg-emergency-red text-white font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg',
  outline: 'bg-white text-deep-navy font-bold border border-outline-variant hover:bg-surface-container-high transition-all active:scale-95',
} as const;

export const BUTTON_SIZE_CLASSES = {
  small: 'py-2 px-4 text-sm rounded-md',
  medium: 'py-3 px-6 text-base rounded-lg',
  large: 'py-4 px-8 text-lg rounded-xl',
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANT_CLASSES;
export type ButtonSize = keyof typeof BUTTON_SIZE_CLASSES;
