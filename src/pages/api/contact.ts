import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { insertLead } from '../../lib/db';

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  'service-type'?: string;
  address?: string;
  message?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = (await request.json()) as ContactPayload;

    if (!data.name || !data.phone || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos obligatorios (*) son requeridos.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const tenant = locals.tenant;
    if (!tenant) {
      return new Response(
        JSON.stringify({ error: 'No se pudo identificar el destinatario del mensaje.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (env.DB) {
      await insertLead(env.DB, tenant.id, {
        name: data.name,
        phone: data.phone,
        email: data.email,
        serviceType: data['service-type'],
        address: data.address,
        message: data.message,
      });
    } else {
      // Sin binding D1 disponible (ej. `astro dev` sin `wrangler`): no se persiste.
      console.log('Nuevo mensaje de contacto (sin D1 disponible):', data);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error procesando formulario:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
