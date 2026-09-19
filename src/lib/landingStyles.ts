/**
 * Presets estéticos de la landing.
 *
 * Un preset combina dos cosas ortogonales a la paleta del tenant
 * (`src/lib/palettes.ts`, que sigue viviendo en `:root`):
 *
 *  - `tokens`: overrides de variables CSS que se emiten **scopeados** a
 *    `[data-landing-style="<id>"]`, el wrapper que pone `src/pages/index.astro`.
 *    Al estar scopeados, Header y Footer — que quedan fuera del wrapper — no
 *    cambian. Ese es el alcance acordado: solo la landing.
 *  - `sections`: qué variante de maquetación usa cada slot. Todas las variantes
 *    de un slot comparten props (ver `src/components/landing/types.ts`), así que
 *    el contenido es el mismo en los cinco estilos.
 */

export type HeroVariant = 'overlay' | 'split' | 'centered';
export type FeaturesVariant = 'grid' | 'bento' | 'list';
export type ServicesVariant = 'cards' | 'flat' | 'stacked';
export type TestimonialsVariant = 'carousel' | 'grid' | 'quotes';
export type ServiceAreaVariant = 'split' | 'overlay' | 'stack';
export type FinalCtaVariant = 'gradient' | 'solid' | 'card';

export interface LandingSections {
  hero: HeroVariant;
  features: FeaturesVariant;
  services: ServicesVariant;
  testimonials: TestimonialsVariant;
  serviceArea: ServiceAreaVariant;
  finalCta: FinalCtaVariant;
}

export interface LandingStyle {
  label: string;
  /** Hoja de Google Fonts extra, si el estilo no usa Montserrat/Open Sans. */
  fontHref?: string;
  tokens: Record<string, string>;
  sections: LandingSections;
}

const LANDING_STYLES: Record<string, LandingStyle> = {
  'classic-corporate': {
    label: 'Classic Corporate',
    tokens: {},
    sections: {
      hero: 'overlay',
      features: 'grid',
      services: 'cards',
      testimonials: 'carousel',
      serviceArea: 'split',
      finalCta: 'gradient',
    },
  },

  'bold-industrial': {
    label: 'Bold Industrial',
    fontHref: 'https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap',
    tokens: {
      '--font-display': '"Oswald", sans-serif',
      '--display-transform': 'uppercase',
      '--radius-card': '0px',
      '--radius-button': '0px',
      '--shadow-card': '8px 8px 0 var(--color-deep-navy)',
      '--color-card-border': 'var(--color-deep-navy)',
      '--color-surface-subtle': '#EDEFF2',
      '--color-card-surface': '#FFFFFF',
      '--spacing-section-y': '5rem',
    },
    sections: {
      hero: 'split',
      features: 'list',
      services: 'flat',
      testimonials: 'grid',
      serviceArea: 'overlay',
      finalCta: 'solid',
    },
  },

  'soft-editorial': {
    label: 'Soft Editorial',
    fontHref: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap',
    tokens: {
      '--font-display': '"Fraunces", Georgia, serif',
      '--radius-card': '1.5rem',
      '--radius-button': '9999px',
      '--shadow-card': 'none',
      '--color-card-border': '#E4DCCE',
      '--color-surface-subtle': '#FAF6EF',
      '--color-card-surface': '#FFFDF9',
      '--color-heading': '#26221D',
      '--color-on-surface': '#26221D',
      '--color-on-surface-variant': '#5C544A',
      '--spacing-section-y': '8rem',
    },
    sections: {
      hero: 'centered',
      features: 'list',
      services: 'stacked',
      testimonials: 'quotes',
      serviceArea: 'split',
      finalCta: 'card',
    },
  },

  'dark-neon': {
    label: 'Dark Neon',
    fontHref: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap',
    tokens: {
      '--font-display': '"Space Grotesk", sans-serif',
      '--radius-card': '1rem',
      '--radius-button': '0.75rem',
      '--shadow-card': '0 0 0 1px var(--color-card-border), 0 24px 60px -30px var(--color-electric-blue)',
      '--color-card-border': '#22303F',
      '--color-surface-subtle': '#0A0E14',
      '--color-card-surface': '#111823',
      '--color-scrim': '#060A10',
      '--color-accent': 'color-mix(in oklab, var(--color-electric-blue) 45%, #CFE6FF)',
      '--color-heading': '#E8EFF7',
      '--color-on-surface': '#E8EFF7',
      '--color-on-surface-variant': '#9DB0C4',
      '--spacing-section-y': '7rem',
    },
    sections: {
      hero: 'overlay',
      features: 'bento',
      services: 'flat',
      testimonials: 'grid',
      serviceArea: 'overlay',
      finalCta: 'solid',
    },
  },

  'friendly-rounded': {
    label: 'Friendly Rounded',
    fontHref: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap',
    tokens: {
      '--font-display': '"Nunito", sans-serif',
      '--font-body': '"Nunito", sans-serif',
      '--radius-card': '1.75rem',
      '--radius-button': '9999px',
      '--shadow-card': '0 16px 34px -18px rgb(23 15 10 / 0.28)',
      '--color-card-border': '#FBE0D0',
      '--color-surface-subtle': '#FFF7F2',
      '--color-card-surface': '#FFFFFF',
      '--color-heading': '#2C221D',
      '--color-on-surface': '#2C221D',
      '--color-on-surface-variant': '#6B5A50',
      '--spacing-section-y': '6rem',
    },
    sections: {
      hero: 'split',
      features: 'grid',
      services: 'stacked',
      testimonials: 'grid',
      serviceArea: 'stack',
      finalCta: 'card',
    },
  },
};

export const DEFAULT_LANDING_STYLE = 'classic-corporate';

export const LANDING_STYLE_IDS = Object.keys(LANDING_STYLES);

export const LANDING_STYLE_OPTIONS = LANDING_STYLE_IDS.map((id) => ({
  id,
  label: LANDING_STYLES[id].label,
}));

/**
 * Resuelve el estilo a renderizar. `candidate` viene del query string
 * (`?style=`), así que solo se acepta si está en el registro; si no, cae al
 * preset guardado del tenant y, en último caso, al default.
 */
export function resolveStyleId(candidate: string | null | undefined, tenantPreset: string): string {
  if (candidate && candidate in LANDING_STYLES) return candidate;
  if (tenantPreset in LANDING_STYLES) return tenantPreset;
  return DEFAULT_LANDING_STYLE;
}

export interface ResolvedLandingStyle {
  id: string;
  label: string;
  /** Bloque CSS ya scopeado, listo para `<style set:html>`. Vacío si no hay overrides. */
  css: string;
  fontHref?: string;
  sections: LandingSections;
}

export function getLandingStyle(id: string): ResolvedLandingStyle {
  const styleId = id in LANDING_STYLES ? id : DEFAULT_LANDING_STYLE;
  const style = LANDING_STYLES[styleId];
  const declarations = Object.entries(style.tokens)
    .map(([prop, value]) => `${prop}:${value};`)
    .join('');

  return {
    id: styleId,
    label: style.label,
    css: declarations ? `[data-landing-style="${styleId}"]{${declarations}}` : '',
    fontHref: style.fontHref,
    sections: style.sections,
  };
}
