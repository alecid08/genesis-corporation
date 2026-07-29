-- Tenant "default": el contenido actual de Genesis Electrical, usado como
-- fallback de template y como demo de referencia (slug para pruebas locales).
INSERT INTO tenants (
  slug, status, business_name, phone, email, address,
  palette_preset, social_links, locale_default
) VALUES (
  'genesis-electrical',
  'live',
  'Genesis Electrical Corporation',
  '+17867202328',
  'info@genesiselectrical.com',
  '185 NW 13th Ave Suite 736, Miami, FL 33125',
  'electric-blue',
  '{"facebook":"https://facebook.com","instagram":"https://instagram.com"}',
  'es'
);

INSERT INTO testimonials (tenant_id, author, location, rating, quote_es, sort_order)
VALUES
  (1, 'Ricardo L.', 'Coral Gables, FL', 5, 'Excelente servicio. Llegaron a tiempo para una emergencia eléctrica en mi negocio y resolvieron todo rápidamente. Muy profesionales y amables.', 1),
  (1, 'Maria C.', 'Doral, FL', 5, 'Instalaron toda la iluminación nueva en mi casa. El trabajo fue impecable y el precio muy justo. Definitivamente los recomiendo para cualquier trabajo residencial.', 2),
  (1, 'John H.', 'Miami Beach, FL', 5, 'Genesis Electrical es mi opción de confianza. Son honestos, directos y saben exactamente lo que hacen. La garantía que ofrecen da mucha tranquilidad.', 3);
