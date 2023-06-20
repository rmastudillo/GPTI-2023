import { BadgeStyle, Categorias } from "@/types/common";

export const API_HOST =
  import.meta.env.VITE_API_HOST_URL ?? "https://gpti-backend.onrender.com";
// Aquí va la url del backend, o del apihost,n este caso por defecto es localhost:8000

export const categorias = {
  despensa: [
    "arroz-y-legumbres",
    "pastas-y-salsas",
    "coctel",
    "conservas",
    "aderezos-y-salsas",
    "reposteria",
    "harina-y-complementos",
    "aceites-sal-y-condimentos",
    "instantaneos-y-sopas",
    "comidas-etnicas",
  ],
  lacteos: [
    "leches",
    "yoghurt",
    "postres",
    "mantequillas-y-margarinas",
    "huevos",
    "leches-cultivadas-y-bebidas-lacteas",
    "probioticos-y-defensas",
  ],
  "frutas-y-verduras": ["frutas", "verduras", "frutos-secos-y-semillas"],
  carniceria: ["vacuno", "cerdo", "pollo", "pavo", "cordero"],
  botilleria: [
    "bebidas-gaseosas",
    "aguas-minerales",
    "jugos",
    "bebidas-energeticas",
    "bebidas-isotonicas",
  ],
  limpieza: [
    "papeles-hogar",
    "limpieza-de-ropa",
    "bano-y-cocina",
    "pisos-y-muebles",
    "aerosoles-y-desinfectantes",
    "accesorios-de-limpieza",
  ],
  mascotas: ["perros", "gatos", "otras-mascotas"],
  supermercado: [
    "bebe",
    "congelados",
    "desayuno-y-dulces",
    "belleza-y-cuidado-personal",
    "vinos-cervezas-y-licores",
    "quesos-y-fiambres",
    "panaderia-y-pasteleria",
    "pescaderia",
    "comidas-preparadas",
    "sabores-del-mundo",
    "mundo-bio-natura",
    "hogar",
    "electro-y-tecno",
    "deportes",
    "jugueteria",
    "escolares-y-libreria",
    "farmacia",
    "automovil-ferreteria-y-jardin",
  ],
} as Categorias;

export const superMarket = ["jumbo", "lider", "santa isabel"];

export const badgeStyle = {
  jumbo: "bg-lime-500",
  lider: "bg-blue-500",
  unimarc: "bg-red-300",
  "santa isabel": "bg-red-500",
} as BadgeStyle;
