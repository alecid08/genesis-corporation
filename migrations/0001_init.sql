-- Esquema inicial multi-tenant.
-- tenants: identidad y config de cada demo/cliente.
CREATE TABLE tenants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'live')),
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,               -- E.164, ej. +17867202328
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  google_place_id TEXT,
  palette_preset TEXT NOT NULL DEFAULT 'electric-blue',
  logo_r2_key TEXT,
  hero_r2_key TEXT,
  social_links TEXT NOT NULL DEFAULT '{}',  -- JSON: {facebook, instagram, ...}
  locale_default TEXT NOT NULL DEFAULT 'es' CHECK (locale_default IN ('es', 'en')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- content_overrides: textos personalizables por tenant, bilingües.
-- Si no hay fila para una key, la página usa el copy default embebido en el template.
CREATE TABLE content_overrides (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value_es TEXT,
  value_en TEXT,
  UNIQUE (tenant_id, key)
);

-- testimonials: reseñas cargadas a mano (copiadas de Google Places) por tenant.
CREATE TABLE testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  quote_es TEXT NOT NULL,
  quote_en TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- leads: envíos del formulario de contacto por tenant.
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service_type TEXT,
  address TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_content_overrides_tenant ON content_overrides(tenant_id);
CREATE INDEX idx_testimonials_tenant ON testimonials(tenant_id, sort_order);
CREATE INDEX idx_leads_tenant ON leads(tenant_id, created_at);
