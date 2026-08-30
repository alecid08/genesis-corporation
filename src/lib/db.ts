import type { Tenant, Testimonial } from './tenant';

interface TenantRow {
  id: number;
  slug: string;
  status: 'draft' | 'live';
  business_name: string;
  phone: string;
  email: string;
  address: string;
  palette_preset: string;
  style_preset: string;
  logo_r2_key: string | null;
  hero_r2_key: string | null;
  social_links: string;
  locale_default: 'es' | 'en';
}

interface TestimonialRow {
  author: string;
  location: string;
  rating: number;
  quote_es: string;
  quote_en: string | null;
}

function mapTenant(row: TenantRow, testimonials: Testimonial[]): Tenant {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    businessName: row.business_name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    palettePreset: row.palette_preset,
    stylePreset: row.style_preset,
    logoR2Key: row.logo_r2_key,
    heroR2Key: row.hero_r2_key,
    socialLinks: JSON.parse(row.social_links || '{}'),
    localeDefault: row.locale_default,
    testimonials,
  };
}

export async function getTenantBySlug(db: D1Database, slug: string): Promise<Tenant | null> {
  const tenantRow = await db
    .prepare('SELECT * FROM tenants WHERE slug = ?1')
    .bind(slug)
    .first<TenantRow>();

  if (!tenantRow) return null;

  const { results: testimonialRows } = await db
    .prepare('SELECT author, location, rating, quote_es, quote_en FROM testimonials WHERE tenant_id = ?1 ORDER BY sort_order ASC')
    .bind(tenantRow.id)
    .all<TestimonialRow>();

  const testimonials: Testimonial[] = testimonialRows.map((t) => ({
    author: t.author,
    location: t.location,
    rating: t.rating,
    quoteEs: t.quote_es,
    quoteEn: t.quote_en,
  }));

  return mapTenant(tenantRow, testimonials);
}

export interface AdminTestimonial {
  id: number;
  author: string;
  location: string;
  rating: number;
  quoteEs: string;
  quoteEn: string | null;
}

export interface AdminTenant extends Tenant {
  adminTestimonials: AdminTestimonial[];
}

/** Igual que getTenantBySlug pero con el id de cada testimonio, para poder editarlos/borrarlos. */
export async function getTenantForAdmin(db: D1Database, slug: string): Promise<AdminTenant | null> {
  const tenantRow = await db.prepare('SELECT * FROM tenants WHERE slug = ?1').bind(slug).first<TenantRow>();
  if (!tenantRow) return null;

  const { results: testimonialRows } = await db
    .prepare('SELECT id, author, location, rating, quote_es, quote_en FROM testimonials WHERE tenant_id = ?1 ORDER BY sort_order ASC')
    .bind(tenantRow.id)
    .all<{ id: number } & TestimonialRow>();

  const adminTestimonials: AdminTestimonial[] = testimonialRows.map((t) => ({
    id: t.id,
    author: t.author,
    location: t.location,
    rating: t.rating,
    quoteEs: t.quote_es,
    quoteEn: t.quote_en,
  }));

  const tenant = mapTenant(tenantRow, adminTestimonials.map(({ id, ...rest }) => rest));
  return { ...tenant, adminTestimonials };
}

export async function listTenants(db: D1Database): Promise<Tenant[]> {
  const { results } = await db.prepare('SELECT * FROM tenants ORDER BY created_at DESC').all<TenantRow>();
  return Promise.all(results.map(async (row) => {
    const tenant = await getTenantBySlug(db, row.slug);
    return tenant as Tenant;
  }));
}

export interface TenantInput {
  slug: string;
  businessName: string;
  phone: string;
  email: string;
  address: string;
  googlePlaceId?: string;
  palettePreset: string;
  stylePreset: string;
  socialLinks: Record<string, string>;
  localeDefault: 'es' | 'en';
  status: 'draft' | 'live';
}

export async function createTenant(db: D1Database, input: TenantInput): Promise<void> {
  await db
    .prepare(
      `INSERT INTO tenants (slug, status, business_name, phone, email, address, google_place_id, palette_preset, style_preset, social_links, locale_default)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`
    )
    .bind(
      input.slug,
      input.status,
      input.businessName,
      input.phone,
      input.email,
      input.address,
      input.googlePlaceId ?? null,
      input.palettePreset,
      input.stylePreset,
      JSON.stringify(input.socialLinks),
      input.localeDefault
    )
    .run();
}

export async function updateTenant(db: D1Database, tenantId: number, input: TenantInput): Promise<void> {
  await db
    .prepare(
      `UPDATE tenants SET slug = ?1, status = ?2, business_name = ?3, phone = ?4, email = ?5,
       address = ?6, google_place_id = ?7, palette_preset = ?8, style_preset = ?9, social_links = ?10,
       locale_default = ?11
       WHERE id = ?12`
    )
    .bind(
      input.slug,
      input.status,
      input.businessName,
      input.phone,
      input.email,
      input.address,
      input.googlePlaceId ?? null,
      input.palettePreset,
      input.stylePreset,
      JSON.stringify(input.socialLinks),
      input.localeDefault,
      tenantId
    )
    .run();
}

export async function setTenantAssetKey(
  db: D1Database,
  tenantId: number,
  field: 'logo_r2_key' | 'hero_r2_key',
  key: string
): Promise<void> {
  await db.prepare(`UPDATE tenants SET ${field} = ?1 WHERE id = ?2`).bind(key, tenantId).run();
}

export async function addTestimonial(db: D1Database, tenantId: number, t: {
  author: string;
  location: string;
  rating: number;
  quoteEs: string;
  quoteEn?: string;
  sortOrder: number;
}): Promise<void> {
  await db
    .prepare(
      'INSERT INTO testimonials (tenant_id, author, location, rating, quote_es, quote_en, sort_order) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)'
    )
    .bind(tenantId, t.author, t.location, t.rating, t.quoteEs, t.quoteEn ?? null, t.sortOrder)
    .run();
}

export async function deleteTestimonial(db: D1Database, testimonialId: number, tenantId: number): Promise<void> {
  await db.prepare('DELETE FROM testimonials WHERE id = ?1 AND tenant_id = ?2').bind(testimonialId, tenantId).run();
}

export async function insertLead(db: D1Database, tenantId: number, lead: {
  name: string;
  phone: string;
  email: string;
  serviceType?: string;
  address?: string;
  message: string;
}): Promise<void> {
  await db
    .prepare(
      'INSERT INTO leads (tenant_id, name, phone, email, service_type, address, message) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)'
    )
    .bind(tenantId, lead.name, lead.phone, lead.email, lead.serviceType ?? null, lead.address ?? null, lead.message)
    .run();
}
