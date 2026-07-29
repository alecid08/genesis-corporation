import { defineMiddleware } from 'astro:middleware';
import { env } from 'cloudflare:workers';
import { getTenantBySlug } from './lib/db';
import { DEFAULT_TENANT } from './lib/tenant';

const DEMOS_SUFFIX = '.tacocars.com';

function resolveSlugFromHost(hostname: string, searchParams: URLSearchParams): string | null {
  if (hostname.endsWith(DEMOS_SUFFIX)) {
    return hostname.slice(0, -DEMOS_SUFFIX.length);
  }
  // Conveniencia para desarrollo local (localhost, 127.0.0.1, *.localhost):
  // permite simular cualquier tenant con ?tenant=<slug>, si no cae al default.
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost')) {
    return searchParams.get('tenant') ?? DEFAULT_TENANT.slug;
  }
  return null;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Las rutas de admin resuelven su propio tenant por request (no hay uno
  // "actual"); la protección de acceso la hace Cloudflare Access en el borde.
  // /assets tampoco necesita tenant: sirve directo desde R2 por key.
  if (pathname.startsWith('/admin') || pathname.startsWith('/assets')) {
    return next();
  }

  const hostname = context.url.hostname;
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
