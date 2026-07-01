import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Server-side validation
    if (!data.name || !data.phone || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos obligatorios (*) son requeridos.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Log the contact message (this would connect to Resend, Formspree, etc.)
    console.log('Nuevo mensaje de contacto recibido en el servidor:', data);
    
    // Return success response
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
