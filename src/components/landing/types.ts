import type { LandingCopy } from '../../lib/landingCopy';
import type { Tenant } from '../../lib/tenant';

/**
 * Contratos de props de los slots de la landing.
 *
 * Todas las variantes de un mismo slot aceptan exactamente estas props. Ese
 * contrato es lo que impide que el contenido se bifurque entre estilos: una
 * variante solo decide cómo se ve lo que recibe, nunca qué recibe.
 */

export interface HeroProps {
  tenant: Tenant;
  copy: LandingCopy;
  image: ImageMetadata;
}

export interface FeaturesProps {
  copy: LandingCopy;
}

export interface ServicesProps {
  copy: LandingCopy;
}

export interface TestimonialsProps {
  tenant: Tenant;
  copy: LandingCopy;
  locale: 'es' | 'en';
}

export interface ServiceAreaProps {
  tenant: Tenant;
  copy: LandingCopy;
  image: ImageMetadata;
}

export interface FinalCtaProps {
  tenant: Tenant;
  copy: LandingCopy;
}
