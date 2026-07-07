import { useEffect, useState } from "react";

// Importamos todos los componentes que usa la aplicacion
import Header from "./components/Header";
import SearchBar from "./components/SearchBar"; // NUEVO: componente de barra de busqueda
import RecipeList from "./components/RecipeList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

// Importamos la funcion que consulta la API de recetas
import { obtenerRecetas } from "./services/api";

// Importamos los estilos de la aplicacion
import "./App.css";

function App() {
  // Estado para guardar todas las recetas obtenidas de la API
  const [recetas, setRecetas] = useState([]);
  // Estado para controlar si los datos estan cargando (muestra spinner/texto)
  const [cargando, setCargando] = useState(true);
  // Estado para controlar si hubo un error al consultar la API
  const [error, setError] = useState(false);
  // NUEVO: Estado para almacenar el texto que el usuario escribe en la barra de busqueda
  const [busqueda, setBusqueda] = useState("");

  // useEffect se ejecuta una sola vez al montar el componente (array vacio [])
  // Aqui cargamos las recetas desde la API
  useEffect(() => {
    async function cargarRecetas() {
      try {
        // Llamamos a la funcion del servicio que hace el fetch a la API
        const datos = await obtenerRecetas();
        setRecetas(datos);
      } catch {
        // Si hay un error, activamos el estado de error
        setError(true);
      } finally {
        // Siempre desactivamos el estado de carga al terminar
        setCargando(false);
      }
    }

    cargarRecetas();
  }, []);

  // NUEVO: Filtramos las recetas segun lo que el usuario escriba en la barra de busqueda
  // Convertimos ambos textos a minusculas con .toLowerCase() para que la busqueda
  // no distinga entre mayusculas y minusculas (busqueda case-insensitive)
  // Ejemplo: si busqueda = "chick", mostrara "Chicken Handi", "Chicken Marengo", etc.
  const recetasFiltradas = recetas.filter((receta) =>
    receta.strMeal.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main>
      {/* Header con el titulo de la app y los nombres de los integrantes */}
      <Header />

      {/* NUEVO: Barra de busqueda - solo se muestra cuando los datos ya cargaron sin error */}
      {!cargando && !error && (
        <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
      )}

      {/* Indicador de carga mientras se consulta la API */}
      {cargando && <Loading />}

      {/* Mensaje de error si la peticion a la API fallo */}
      {error && <ErrorMessage />}

      {/* Listado de recetas: pasamos recetasFiltradas en vez de recetas */}
      {/* Asi el listado solo muestra las recetas que coinciden con la busqueda */}
      {!cargando && !error && (
        <RecipeList recetas={recetasFiltradas} />
      )}
    </main>
  );
}

export default App;