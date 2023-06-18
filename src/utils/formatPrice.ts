export default function formatearPrecio(precio: number): string {
  const precioNumerico = parseFloat(precio.toString());
  if (isNaN(precioNumerico)) {
    return "";
  }

  const precioFormateado = precioNumerico.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  return precioFormateado;
}
