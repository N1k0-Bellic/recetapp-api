import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import FavoritesPanel from "./components/FavoritesPanel";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import { obtenerRecetas } from "./services/api";
import "./App.css";

function App() {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  // Array de IDs de recetas favoritas
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    async function cargarRecetas() {
      try {
        const datos = await obtenerRecetas();
        setRecetas(datos);
      } catch {
        setError(true);
      } finally {
        setCargando(false);
      }
    }
    cargarRecetas();
  }, []);

  // Filtra por nombre de forma case-insensitive (sin dinstinguir mayus).
  const recetasFiltradas = recetas.filter((receta) =>
    receta.strMeal.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 0Obtiene los objetos completos de las recetas favoritas
  const recetasFavoritas = recetas.filter((receta) =>
    favoritos.includes(receta.idMeal)
  );

  //--Agrega o quita un ID del array de favoritos
  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <main>
      <Header />

      {!cargando && !error && (
        <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
      )}

      {cargando && <Loading />}
      {error && <ErrorMessage />}

      {/* Layout de dos columnas: listado a la izquierda, panel a la derecha ,.*/}
      {!cargando && !error && (
        <div className="app-layout">
          <RecipeList
            recetas={recetasFiltradas}
            favoritos={favoritos}
            toggleFavorito={toggleFavorito}
          />
          <FavoritesPanel
            recetasFavoritas={recetasFavoritas}
            toggleFavorito={toggleFavorito}
          />
        </div>
      )}
    </main>
  );
}

export default App;