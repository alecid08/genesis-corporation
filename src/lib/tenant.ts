export interface Testimonial {
  author: string;
  location: string;
  rating: number;
  quoteEs: string;
  quoteEn: string | null;
}

export interface Tenant {
  id: number;
  slug: string;
  status: 'draft' | 'live';
  businessName: string;
  phone: string; // E.164, ej. +17867202328
  email: string;
  address: string;
  palettePreset: string;
  logoR2Key: string | null;
  heroR2Key: string | null;
  socialLinks: Record<string, string>;
  localeDefault: 'es' | 'en';
  testimonials: Testimonial[];
}

// Fallback usado cuando no hay binding D1 disponible (ej. `astro dev` sin
// `wrangler`/`platformProxy`) o cuando el Host no matchea ningún tenant.
// Coincide con el contenido original de Genesis Electrical.
export const DEFAULT_TENANT: Tenant = {
  id: 1,
  slug: 'genesis-electrical',
  status: 'live',
  businessName: 'Genesis Electrical Corporation',
  phone: '+17867202328',
  email: 'info@genesiselectrical.com',
  address: '185 NW 13th Ave Suite 736, Miami, FL 33125',
  palettePreset: 'electric-blue',
  logoR2Key: null,
  heroR2Key: null,
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  localeDefault: 'es',
  testimonials: [
    { author: 'Ricardo L.', location: 'Coral Gables, FL', rating: 5, quoteEs: 'Excelente servicio. Llegaron a tiempo para una emergencia eléctrica en mi negocio y resolvieron todo rápidamente. Muy profesionales y amables.', quoteEn: null },
    { author: 'Maria C.', location: 'Doral, FL', rating: 5, quoteEs: 'Instalaron toda la iluminación nueva en mi casa. El trabajo fue impecable y el precio muy justo. Definitivamente los recomiendo para cualquier trabajo residencial.', quoteEn: null },
    { author: 'John H.', location: 'Miami Beach, FL', rating: 5, quoteEs: 'Genesis Electrical es mi opción de confianza. Son honestos, directos y saben exactamente lo que hacen. La garantía que ofrecen da mucha tranquilidad.', quoteEn: null },
  ],
};

/** Formatea un E.164 US (+17867202328) como "(786) 720-2328". Si no matchea el patrón, lo devuelve tal cual. */
export function formatPhoneDisplay(e164: string): string {
  const match = e164.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  if (!match) return e164;
  const [, area, prefix, line] = match;
  return `(${area}) ${prefix}-${line}`;
}

/** href para <a href="tel:...">, ej. "tel:+17867202328". */
export function telHref(e164: string): string {
  return `tel:${e164}`;
}

/** Normaliza un teléfono US ingresado en cualquier formato común a E.164 (+1XXXXXXXXXX). */
export function normalizePhoneToE164(input: string): string | null {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}
