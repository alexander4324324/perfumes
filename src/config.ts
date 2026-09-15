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

export function formatCLP(valor: number | null | undefined) {
  if (valor === null || valor === undefined) return "Consultar precio";
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

interface ItemCarrito {
  nombre: string;
  marca: string;
  precio: number;
}

export function linkWhatsappCarrito(items: ItemCarrito[]) {
  const lineas = items.map(
    (item, i) => `${i + 1}. ${item.nombre} (${item.marca}) - ${formatCLP(item.precio)}`
  );
  const total = items.reduce((sum, item) => sum + item.precio, 0);
  const mensaje = encodeURIComponent(
    `Hola, me interesan estos perfumes:\n${lineas.join("\n")}\n\nTotal: ${formatCLP(total)}`
  );
  return `https://wa.me/${siteConfig.whatsappNumero}?text=${mensaje}`;
}
