import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import FavoritesPanel from "./components/FavoritesPanel";
import BlockedPanel from "./components/BlockedPanel";
import Stats from "./components/Stats";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import { obtenerRecetas } from "./services/api";
import "./App.css";

function App() {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  // Array de IDs de recetas favoritas (persistido en localStorage)
  const [favoritos, setFavoritos] = useLocalStorage("recetapp-favoritos", []);
  // Array de IDs de recetas bloqueadas (persistido en localStorage)
  const [bloqueados, setBloqueados] = useLocalStorage("recetapp-bloqueados", []);

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

  // Filtra por nombre Y excluye las recetas bloqueadas
  const recetasFiltradas = recetas.filter(
    (receta) =>
      receta.strMeal.toLowerCase().includes(busqueda.toLowerCase()) &&
      !bloqueados.includes(receta.idMeal)
  );

  // Obtiene los objetos completos de las recetas favoritas
  const recetasFavoritas = recetas.filter((receta) =>
    favoritos.includes(receta.idMeal)
  );

  // Obtiene los objetos completos de las recetas bloqueadas
  const recetasBloqueadas = recetas.filter((receta) =>
    bloqueados.includes(receta.idMeal)
  );

  //--Agrega o quita un ID del array de favoritos
  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  //--Agrega o quita un ID del array de bloqueados
  const toggleBloqueo = (id) => {
    setBloqueados((prev) => {
      const yaBloqueado = prev.includes(id);
      return yaBloqueado ? prev.filter((b) => b !== id) : [...prev, id];
    });

    // Si se está bloqueando (no estaba bloqueado antes), se saca de favoritos
    setFavoritos((prev) => prev.filter((fav) => fav !== id));
  };

  return (
    <main>
      <Header />

      {!cargando && !error && (
        <>
          <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
          <Stats
            total={recetas.length}
            favoritos={favoritos.length}
            bloqueados={bloqueados.length}
          />
        </>
      )}

      {cargando && <Loading />}
      {error && <ErrorMessage />}

      {/* Layout de dos columnas: listado a la izquierda, panel a la derecha */}
      {!cargando && !error && (
        <div className="app-layout">
          <RecipeList
            recetas={recetasFiltradas}
            favoritos={favoritos}
            toggleFavorito={toggleFavorito}
            toggleBloqueo={toggleBloqueo}
          />
          <div className="sidebar">
            <FavoritesPanel
              recetasFavoritas={recetasFavoritas}
              toggleFavorito={toggleFavorito}
            />
            <BlockedPanel
              recetasBloqueadas={recetasBloqueadas}
              toggleBloqueo={toggleBloqueo}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default App;