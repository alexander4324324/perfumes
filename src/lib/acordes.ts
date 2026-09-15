// Colores por acorde, inspirados en cómo se ven las notas en sitios
// especializados de perfumería. Si un acorde no está en la lista,
// se usa el color por defecto (gris cálido).

const COLOR_POR_ACORDE: Record<string, string> = {
  amaderado: "#6B4226",
  avainillado: "#F2E6A1",
  aromático: "#4FA89B",
  "especiado suave": "#D98860",
  especiado: "#C6663B",
  afrutado: "#F0653C",
  afrutados: "#F0653C",
  verde: "#3FA34D",
  floral: "#F48FB1",
  florales: "#F48FB1",
  rosas: "#EC1E79",
  pachulí: "#8B8B5A",
  terroso: "#8B8377",
  terrosos: "#8B8377",
  cítrico: "#F2C744",
  ámbar: "#C98A3E",
  ambar: "#C98A3E",
  cuero: "#7A4B32",
  almizcle: "#D9CFC2",
  oud: "#5A3A28",
  dulce: "#E8A6C4",
  acuático: "#5FA9C9",
  polvoriento: "#C9B8C8",
  tabaco: "#8A6A3D",
  vainilla: "#F2E6A1",
  lavanda: "#9A8FC7",
};

const COLOR_DEFECTO = "#9C9186";

export function colorDeAcorde(nombre: string) {
  const clave = nombre.trim().toLowerCase();
  return COLOR_POR_ACORDE[clave] ?? COLOR_DEFECTO;
}
