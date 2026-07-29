/** Sube un asset de un tenant (logo/hero) a R2 bajo tenants/<slug>/<field>.<ext>. Devuelve la key guardada. */
export async function uploadTenantAsset(
  bucket: R2Bucket,
  slug: string,
  field: 'logo' | 'hero',
  file: File
): Promise<string> {
  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
  const key = `tenants/${slug}/${field}.${ext}`;
  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type || 'application/octet-stream' },
  });
  return key;
}
