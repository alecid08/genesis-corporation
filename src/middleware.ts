import { defineMiddleware } from 'astro:middleware';
import { env } from 'cloudflare:workers';
import { getTenantBySlug } from './lib/db';
import { DEFAULT_TENANT } from './lib/tenant';
import { DEMOS_SUFFIX, isAdminHost, isLocalHost } from './lib/domains';

function resolveSlugFromHost(hostname: string, searchParams: URLSearchParams): string | null {
  // Un host de admin nunca es un tenant, aunque encaje con el sufijo.
  if (isAdminHost(hostname)) {
    return null;
  }
  if (hostname.endsWith(DEMOS_SUFFIX)) {
    return hostname.slice(0, -DEMOS_SUFFIX.length);
  }
  // Conveniencia para desarrollo local (localhost, 127.0.0.1, *.localhost):
  // permite simular cualquier tenant con ?tenant=<slug>, si no cae al default.
  if (isLocalHost(hostname)) {
    return searchParams.get('tenant') ?? DEFAULT_TENANT.slug;
  }
  return null;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const hostname = context.url.hostname;

  // /assets no necesita tenant: sirve directo desde R2 por key.
  if (pathname.startsWith('/assets')) {
    return next();
  }

  // Las rutas de admin resuelven su propio tenant por request (no hay uno
  // "actual"). La autenticación la hace Cloudflare Access en el borde, pero
  // Access está atado a los hostnames de admin: si no se comprueba el host
  // aquí, el panel quedaría servido también en cada subdominio de demo, donde
  // Access no aplica. El gate no sustituye a Access, lo complementa.
  if (pathname.startsWith('/admin')) {
    if (isAdminHost(hostname) || isLocalHost(hostname)) {
      return next();
    }
    return new Response('Not found', { status: 404 });
  }

  const slug = resolveSlugFromHost(hostname, context.url.searchParams);

  if (!slug) {
    return new Response('Not found', { status: 404 });
  }

  const tenant = env.DB
    ? await getTenantBySlug(env.DB, slug)
    : slug === DEFAULT_TENANT.slug
      ? DEFAULT_TENANT
      : null;

  if (!tenant || tenant.status !== 'live') {
    return new Response('Not found', { status: 404 });
  }

  context.locals.tenant = tenant;

  const langParam = context.url.searchParams.get('lang');
  context.locals.locale = langParam === 'en' || langParam === 'es' ? langParam : tenant.localeDefault;

  return next();
});
