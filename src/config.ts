// Cambia estos valores por los datos reales de tu amigo.
export const siteConfig = {
  nombre: "Aromé",
  tagline: "Fragancias de nicho, elegidas una por una",
  whatsappNumero: import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? "56900000000",
};

export function linkWhatsapp(nombrePerfume: string) {
  const mensaje = encodeURIComponent(
    `Hola, me interesa el perfume ${nombrePerfume}`
  );
  return `https://wa.me/${siteConfig.whatsappNumero}?text=${mensaje}`;
}
