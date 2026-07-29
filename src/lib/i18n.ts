// Diccionario de textos de interfaz (no el contenido personalizable por tenant,
// que vive en content_overrides). Cada key tiene su par es/en; t() resuelve
// según Astro.locals.locale con fallback a español.
export const dict = {
  nav: {
    home: { es: 'Inicio', en: 'Home' },
    services: { es: 'Servicios', en: 'Services' },
    about: { es: 'Sobre Nosotros', en: 'About Us' },
    contact: { es: 'Contacto', en: 'Contact' },
    emergency: { es: 'Emergencia 24/7', en: '24/7 Emergency' },
    faq: { es: 'FAQ', en: 'FAQ' },
    call: { es: 'Llamar', en: 'Call' },
  },
  common: {
    callNow: { es: 'Llamar Ahora', en: 'Call Now' },
    sendMessage: { es: 'Enviar Mensaje', en: 'Send Message' },
    requestQuote: { es: 'Pedir Cotización', en: 'Request a Quote' },
    ourServices: { es: 'Nuestros Servicios', en: 'Our Services' },
  },
  footer: {
    tagline: {
      es: 'Líderes en servicios eléctricos industriales, comerciales y residenciales en el área de Miami-Dade.',
      en: 'Leaders in industrial, commercial, and residential electrical services in the Miami-Dade area.',
    },
    navHeading: { es: 'Navegación', en: 'Navigation' },
    servicesHeading: { es: 'Nuestros Servicios', en: 'Our Services' },
    contactHeading: { es: 'Contacto', en: 'Contact' },
    residential: { es: 'Residencial', en: 'Residential' },
    commercial: { es: 'Comercial', en: 'Commercial' },
    emergencies: { es: 'Emergencias', en: 'Emergencies' },
    maintenance: { es: 'Mantenimiento', en: 'Maintenance' },
    rightsReserved: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
  },
} as const;

type Dict = typeof dict;
type SectionKey = keyof Dict;

export function t<S extends SectionKey>(locale: 'es' | 'en', section: S, key: keyof Dict[S]): string {
  const entry = dict[section][key] as { es: string; en: string };
  return locale === 'en' ? entry.en : entry.es;
}
