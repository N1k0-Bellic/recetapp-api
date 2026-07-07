// URL base de la API de TheMealDB para buscar recetas por primera letra
const API_BASE = "https://www.themealdb.com/api/json/v1/1/search.php?f=";

// Letras a consultar para tener un listado amplio de recetas
const LETRAS = ["a", "b", "c", "d", "e", "g", "l", "m", "p", "s", "t"];

// Consulta la API para varias letras en paralelo y devuelve todas las recetas combinadas
export async function obtenerRecetas() {
  const promesas = LETRAS.map((letra) =>
    fetch(`${API_BASE}${letra}`).then((res) => {
      if (!res.ok) throw new Error("Error al cargar recetas");
      return res.json();
    })
  );

  const resultados = await Promise.all(promesas);
  return resultados.flatMap((datos) => datos.meals || []);
}