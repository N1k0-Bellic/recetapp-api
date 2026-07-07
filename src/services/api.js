const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";

export async function obtenerRecetas() {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("Error al cargar recetas");
  }

  const datos = await respuesta.json();

  return datos.meals || [];
}