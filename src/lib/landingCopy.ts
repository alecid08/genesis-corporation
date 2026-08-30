import type { Tenant } from './tenant';

/**
 * Fuente única del contenido de la landing (`src/pages/index.astro`).
 *
 * Todas las variantes de estilo (ver `landingStyles.ts`) consumen esta misma
 * estructura: cambian la maquetación, nunca el texto. Si una variante necesita
 * un string que no existe aquí, se añade en `es` y en `en` — no en el componente.
 */

export interface LandingFeature {
  /** Nombre del icono de Material Symbols; debe estar en el `icon_names` de BaseLayout. */
  icon: string;
  title: string;
  body: string;
}

export interface LandingService {
  icon: string;
  title: string;
  items: string[];
  tone: 'normal' | 'emergency';
}

export interface LandingCopy {
  title: string;
  description: string;
  hero: { subtitle: string; ctaServices: string; ctaQuote: string };
  whyUs: { heading: string; features: LandingFeature[] };
  services: { heading: string; items: LandingService[] };
  testimonials: { heading: string };
  serviceArea: { heading: string; body: string; hqLabel: string; areas: string[] };
  finalCta: {
    heading: string;
    body: string;
    callNow: string;
    sendMessage: string;
    requestQuote: string;
  };
}

/** Barrios atendidos. No se traducen: son nombres propios. */
const SERVICE_AREAS = [
  'Miami Beach',
  'Coral Gables',
  'Doral',
  'Hialeah',
  'Kendall',
  'Homestead',
  'Aventura',
  'Pinecrest',
];

/** Iconos y tono de cada bloque de servicio, en el orden en que se muestran. */
const SERVICE_META: { icon: string; tone: 'normal' | 'emergency' }[] = [
  { icon: 'home', tone: 'normal' },
  { icon: 'business', tone: 'normal' },
  { icon: 'warning', tone: 'emergency' },
];

/** Iconos de las 6 razones, en orden. */
const FEATURE_ICONS = [
  'verified_user',
  'calendar_today',
  'payments',
  'engineering',
  'workspace_premium',
  'person_search',
];

export function getLandingCopy(tenant: Tenant, locale: 'es' | 'en'): LandingCopy {
  const copy = {
    es: {
      title: `${tenant.businessName} | Electricistas Profesionales en Miami`,
      description: `${tenant.businessName} - Electricistas Profesionales en Miami, Florida. Servicios residenciales, comerciales y emergencias.`,
      heroSubtitle: 'Electricistas Profesionales en Miami, Florida',
      ctaServices: 'Nuestros Servicios',
      ctaQuote: 'Solicitar Presupuesto',
      whyUsHeading: '¿Por Qué Elegirnos?',
      feature1Title: 'Licenciados',
      feature1Body: 'Personal certificado y totalmente asegurado para su total tranquilidad en cada proyecto.',
      feature2Title: '7 Días',
      feature2Body: 'Disponibilidad total los 7 días de la semana para atender cualquier necesidad eléctrica urgente.',
      feature3Title: 'Precios',
      feature3Body: 'Tarifas competitivas y presupuestos transparentes sin cargos ocultos ni sorpresas finales.',
      feature4Title: 'Experiencia',
      feature4Body: 'Años de trayectoria resolviendo los retos eléctricos más complejos en todo Miami-Dade.',
      feature5Title: 'Garantía',
      feature5Body: 'Respaldamos cada trabajo con garantías sólidas que certifican nuestra calidad y compromiso.',
      feature6Title: 'Personalizado',
      feature6Body: 'Soluciones a medida diseñadas específicamente para sus necesidades residenciales o comerciales.',
      servicesHeading: 'Servicios Principales',
      residentialTitle: 'Residencial',
      residentialItems: ['Instalaciones de Iluminación LED', 'Actualización de Paneles Eléctricos', 'Instalación de Ventiladores de Techo', 'Reparación de Cableado Antiguo'],
      commercialTitle: 'Comercial',
      commercialItems: ['Mantenimiento Preventivo Industrial', 'Sistemas Eléctricos Trifásicos', 'Iluminación de Seguridad y Exterior', 'Auditorías de Eficiencia Energética'],
      emergencyTitle: 'Emergencia 24/7',
      emergencyItems: ['Reparación Inmediata de Apagones', 'Cortocircuitos y Fallos de Panel', 'Atención en Menos de 60 Minutos', 'Servicio en Toda el Área de Miami'],
      testimonialsHeading: 'Lo Que Dicen Nuestros Clientes',
      serviceAreaHeading: 'Nuestra Área de Servicio',
      serviceAreaBody: 'Atendemos a toda la comunidad de Miami-Dade con tiempos de respuesta rápidos y equipo local.',
      hqLabel: 'Sede Principal:',
      finalCtaHeading: '¿Listo para solucionar sus problemas eléctricos?',
      finalCtaBody: `No arriesgue su seguridad. Contacte hoy mismo a los expertos licenciados de ${tenant.businessName}.`,
      callNow: 'Llamar Ahora',
      sendMessage: 'Enviar Mensaje',
      requestQuote: 'Pedir Cotización',
    },
    en: {
      title: `${tenant.businessName} | Professional Electricians in Miami`,
      description: `${tenant.businessName} - Professional Electricians in Miami, Florida. Residential, commercial, and emergency services.`,
      heroSubtitle: 'Professional Electricians in Miami, Florida',
      ctaServices: 'Our Services',
      ctaQuote: 'Request a Quote',
      whyUsHeading: 'Why Choose Us?',
      feature1Title: 'Licensed',
      feature1Body: 'Certified and fully insured staff for your total peace of mind on every project.',
      feature2Title: '7 Days',
      feature2Body: 'Full availability 7 days a week to handle any urgent electrical need.',
      feature3Title: 'Pricing',
      feature3Body: 'Competitive rates and transparent quotes with no hidden fees or last-minute surprises.',
      feature4Title: 'Experience',
      feature4Body: 'Years of experience solving the most complex electrical challenges across Miami-Dade.',
      feature5Title: 'Guarantee',
      feature5Body: 'We back every job with solid warranties that certify our quality and commitment.',
      feature6Title: 'Personalized',
      feature6Body: 'Custom-tailored solutions designed specifically for your residential or commercial needs.',
      servicesHeading: 'Main Services',
      residentialTitle: 'Residential',
      residentialItems: ['LED Lighting Installations', 'Electrical Panel Upgrades', 'Ceiling Fan Installation', 'Old Wiring Repair'],
      commercialTitle: 'Commercial',
      commercialItems: ['Industrial Preventive Maintenance', 'Three-Phase Electrical Systems', 'Security & Outdoor Lighting', 'Energy Efficiency Audits'],
      emergencyTitle: '24/7 Emergency',
      emergencyItems: ['Immediate Power Outage Repair', 'Short Circuits & Panel Failures', 'Response in Under 60 Minutes', 'Service Across All of Miami'],
      testimonialsHeading: 'What Our Clients Say',
      serviceAreaHeading: 'Our Service Area',
      serviceAreaBody: 'We serve the entire Miami-Dade community with fast response times and local crews.',
      hqLabel: 'Headquarters:',
      finalCtaHeading: 'Ready to solve your electrical problems?',
      finalCtaBody: `Don't risk your safety. Contact the licensed experts at ${tenant.businessName} today.`,
      callNow: 'Call Now',
      sendMessage: 'Send Message',
      requestQuote: 'Request a Quote',
    },
  }[locale];

  const featureTexts: [string, string][] = [
    [copy.feature1Title, copy.feature1Body],
    [copy.feature2Title, copy.feature2Body],
    [copy.feature3Title, copy.feature3Body],
    [copy.feature4Title, copy.feature4Body],
    [copy.feature5Title, copy.feature5Body],
    [copy.feature6Title, copy.feature6Body],
  ];

  const serviceTexts: [string, string[]][] = [
    [copy.residentialTitle, copy.residentialItems],
    [copy.commercialTitle, copy.commercialItems],
    [copy.emergencyTitle, copy.emergencyItems],
  ];

  return {
    title: copy.title,
    description: copy.description,
    hero: {
      subtitle: copy.heroSubtitle,
      ctaServices: copy.ctaServices,
      ctaQuote: copy.ctaQuote,
    },
    whyUs: {
      heading: copy.whyUsHeading,
      features: featureTexts.map(([title, body], i) => ({ icon: FEATURE_ICONS[i], title, body })),
    },
    services: {
      heading: copy.servicesHeading,
      items: serviceTexts.map(([title, items], i) => ({ ...SERVICE_META[i], title, items })),
    },
    testimonials: {
      heading: copy.testimonialsHeading,
    },
    serviceArea: {
      heading: copy.serviceAreaHeading,
      body: copy.serviceAreaBody,
      hqLabel: copy.hqLabel,
      areas: SERVICE_AREAS,
    },
    finalCta: {
      heading: copy.finalCtaHeading,
      body: copy.finalCtaBody,
      callNow: copy.callNow,
      sendMessage: copy.sendMessage,
      requestQuote: copy.requestQuote,
    },
  };
}
