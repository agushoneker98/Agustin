// ============================================================
// CONFIGURÁ ACÁ TU NEGOCIO Y TUS PRODUCTOS
// No hace falta tocar ningún otro archivo del proyecto.
// ============================================================

// Nombre de tu negocio (se muestra en todo el video)
export const BUSINESS_NAME = "Tu Negocio de Decoración";

// Texto final del video (llamado a la acción)
export const CALL_TO_ACTION = "Visitanos y decorá tu espacio";
export const INSTAGRAM_HANDLE = "@tu_negocio"; // opcional, poné el tuyo

// Colores de marca (podés cambiarlos por los tuyos)
export const ACCENT_COLOR = "#C97B4A"; // color principal (textos, detalles)
export const DARK_COLOR = "#2B2A33"; // color de la pantalla final

// Cuántos segundos se muestra cada producto en pantalla
export const SECONDS_PER_SLIDE = 3;

// Música de fondo (opcional).
// 1) Poné un archivo .mp3 en la carpeta "public/" (ej: public/musica.mp3)
// 2) Escribí acá el nombre del archivo, ej: "musica.mp3"
// 3) Si lo dejás vacío (""), el video no lleva música.
export const BACKGROUND_MUSIC = "";

export type Product = {
  // Nombre del archivo de imagen dentro de "public/products/"
  image: string;
  // Título del producto que se muestra en pantalla
  title: string;
  // Subtítulo opcional (precio, promo, etc.)
  subtitle?: string;
};

// ============================================================
// TUS PRODUCTOS
// Para agregar uno nuevo: subí la foto a "public/products/"
// y agregá una línea acá abajo con su nombre de archivo.
// Estas son imágenes de EJEMPLO, reemplazalas por tus fotos reales
// (mismo nombre de archivo, o cambiá el nombre acá).
// ============================================================
export const PRODUCTS: Product[] = [
  {
    image: "producto-1.svg",
    title: "Cuadro Decorativo",
    subtitle: "Minimalista",
  },
  {
    image: "producto-2.svg",
    title: "Set de Velas",
    subtitle: "Aromáticas",
  },
  {
    image: "producto-3.svg",
    title: "Espejo Redondo",
    subtitle: "Decorativo",
  },
  {
    image: "producto-4.svg",
    title: "Guirnalda de Luces",
    subtitle: "LED",
  },
  {
    image: "producto-5.svg",
    title: "Florero",
    subtitle: "Decorativo",
  },
];
