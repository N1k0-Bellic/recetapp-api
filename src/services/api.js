// URL base de la API de TheMealDB para buscar recetas por primera letra (a,b,c,d,e,g,l,m,p,s,t)
const API_BASE = "https://www.themealdb.com/api/json/v1/1/search.php?f=";

// Letras que consultamos para tener un listado amplio y variado de recetas
// Cada letra genera una peticion separada a la API
const LETRAS = ["a", "b", "c", "d", "e", "g", "l", "m", "p", "s", "t"];

/**
 * obtenerRecetas - Consulta la API de TheMealDB para varias letras y nos devuelve todas las recetas combinadas en un solo array.
 *
 Usamos Promise.all para ejecutar todas las peticiones en paralelo y luego unimos los resultados con flatMap==.
 */
export async function obtenerRecetas() {
  // Creamos una peticion fetch por cada letra y las ejecutamos en paralelo
  const promesas = LETRAS.map((letra) =>
    fetch(`${API_BASE}${letra}`).then((respuesta) => {
      // Si alguna peticion falla, lanzamos un error
      if (!respuesta.ok) {
        throw new Error("Error al cargar recetas");
      }
      // Convertimos la respuesta a JSON
      return respuesta.json();
    })
  );

  // Esperamos a que -TODAS- las peticiones terminen con Promise.all
  const resultados = await Promise.all(promesas);

  // Unimos todos los arrays de recetas en uno solo usando flatMap
  // Si alguna letra no tiene recetas (meals es null), usamos un array vacio [] <====
  const todasLasRecetas = resultados.flatMap((datos) => datos.meals || []);

  return todasLasRecetas;
}