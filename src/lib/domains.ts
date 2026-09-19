/**
 * Dominios de la plataforma, en un solo sitio.
 *
 * Los demos de cada tenant se sirven en `<slug>-demo.nitza.dev` y el panel de
 * administración en `<vertical>-admin.nitza.dev`, un hostname por rubro.
 *
 * Los sufijos son deliberadamente estrechos, no un comodín `*.nitza.dev`: la
 * raíz y `www.nitza.dev` sirven el sitio propio de Nitza y un comodín los
 * interceptaría. Las rutas de `wrangler.jsonc` reflejan estos dos patrones.
 */

export const ROOT_DOMAIN = 'nitza.dev';

/** Sufijo del subdominio de demo: `<slug>` + esto = host público del tenant. */
export const DEMOS_SUFFIX = `-demo.${ROOT_DOMAIN}`;

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
 * Slugs que no se dan de alta. Con los sufijos actuales ningún slug puede
 * chocar con un host de admin (`-demo` y `-admin` son disjuntos), así que esto
 * es defensa en profundidad: si el esquema de subdominios vuelve a cambiar, el
 * choque no aparece en silencio.
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

// ---------------------------------------------------------------------------
// Dominios anteriores
// ---------------------------------------------------------------------------

/**
 * Los demos vivían en `<slug>.tacocars.com` y el panel en `admin.ladetec.com`.
 * Sus rutas siguen apuntando a este Worker y no se pueden borrar con el token
 * actual, que solo alcanza la zona `nitza.dev`. Mientras sigan ahí, el tráfico
 * llega igual, así que se redirige en vez de contestar 404.
 */
const LEGACY_DEMOS_SUFFIX = '.tacocars.com';
const LEGACY_ADMIN_HOST = 'admin.ladetec.com';

/** Panel al que apunta el hostname de admin anterior, que no indicaba vertical. */
export const DEFAULT_ADMIN_HOST = `electro-admin.${ROOT_DOMAIN}`;

/**
 * Destino al que redirigir una petición a un dominio anterior, conservando
 * ruta y query. Devuelve null si el host no es uno de los antiguos.
 */
export function legacyRedirectTarget(url: URL): string | null {
  const { hostname, pathname, search } = url;

  if (hostname === LEGACY_ADMIN_HOST) {
    return `https://${DEFAULT_ADMIN_HOST}${pathname}${search}`;
  }

  if (hostname.endsWith(LEGACY_DEMOS_SUFFIX)) {
    const slug = hostname.slice(0, -LEGACY_DEMOS_SUFFIX.length);
    // Un host sin slug (o con punto, como `a.b.tacocars.com`) no mapea a
    // ningún demo: mejor 404 que inventar un destino.
    if (!slug || slug.includes('.')) return null;
    return `https://${slug}${DEMOS_SUFFIX}${pathname}${search}`;
  }

  return null;
}
