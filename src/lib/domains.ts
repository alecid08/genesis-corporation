/**
 * Dominios de la plataforma, en un solo sitio.
 *
 * Los demos de cada tenant se sirven en `<slug>.nitza.dev`. El panel de
 * administración vive en `<vertical>-admin.nitza.dev` (por ejemplo
 * `electro-admin.nitza.dev`), un hostname por rubro.
 *
 * Ambos caen bajo el mismo comodín `*.nitza.dev` de `wrangler.jsonc`, así que
 * la separación entre uno y otro la hace el middleware, no el enrutado.
 */

export const ROOT_DOMAIN = 'nitza.dev';

export const DEMOS_SUFFIX = `.${ROOT_DOMAIN}`;

/** `<vertical>-admin.nitza.dev`. El vertical sigue las mismas reglas que un slug. */
const ADMIN_HOST_RE = /^[a-z0-9-]+-admin\.nitza\.dev$/;

/** Hostnames de desarrollo, donde se simula el tenant con `?tenant=<slug>`. */
export function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost');
}

export function isAdminHost(hostname: string): boolean {
  return ADMIN_HOST_RE.test(hostname);
}

/**
 * Slugs que no se pueden dar de alta porque su subdominio chocaría con un
 * hostname de la plataforma. Sin esto, un tenant `electro-admin` se serviría
 * justo en el host del panel.
 */
const RESERVED_SLUGS = new Set(['www', 'admin', 'api', 'assets', 'app']);

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug) || slug.endsWith('-admin');
}

/** URL pública del demo de un tenant. */
export function tenantUrl(slug: string): string {
  return `https://${slug}${DEMOS_SUFFIX}`;
}

/** Host público del demo de un tenant, para mostrarlo sin el esquema. */
export function tenantHost(slug: string): string {
  return `${slug}${DEMOS_SUFFIX}`;
}
