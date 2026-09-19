-- Estilo estético de la landing por tenant (ver src/lib/landingStyles.ts).
-- Sin CHECK, igual que palette_preset: la lista válida vive en la app y se
-- valida antes de escribir. El DEFAULT deja a los tenants existentes tal como
-- se ven hoy.
ALTER TABLE tenants ADD COLUMN style_preset TEXT NOT NULL DEFAULT 'classic-corporate';
