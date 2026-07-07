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
  const [mostrarTodas, setMostrarTodas] = useState(false);

  const [favoritos, setFavoritos] = useLocalStorage("recetapp-favoritos", []);
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

  const recetasFiltradas = recetas.filter(
    (receta) =>
      receta.strMeal.toLowerCase().includes(busqueda.toLowerCase()) &&
      !bloqueados.includes(receta.idMeal)
  );

  const recetasParaMostrar = mostrarTodas
    ? recetasFiltradas
    : recetasFiltradas.slice(0, 6);

  const recetasFavoritas = recetas.filter((receta) =>
    favoritos.includes(receta.idMeal)
  );

  const recetasBloqueadas = recetas.filter((receta) =>
    bloqueados.includes(receta.idMeal)
  );

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const toggleBloqueo = (id) => {
    setBloqueados((prev) => {
      const yaBloqueado = prev.includes(id);
      return yaBloqueado ? prev.filter((b) => b !== id) : [...prev, id];
    });

    setFavoritos((prev) => prev.filter((fav) => fav !== id));
  };

  return (
    <main>
      <Header />

      {!cargando && !error && (
        <>
          <section className="hero-section">
            <h2>Encuentra tus platos favoritos</h2>
            <p>
              Busca platos, guárdalas como favoritas o bloquea las que no
              quieres volver a ver.
            </p>
          </section>

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

      {!cargando && !error && (
        <div className="app-layout">
          <section className="main-content">
            <div className="section-header">
              <div>
                <h2>
                  {mostrarTodas ? "Todas los platos" : "Platos recomendadas"}
                </h2>

                <p>
                  Mostrando {recetasParaMostrar.length} de{" "}
                  {recetasFiltradas.length} platos disponibles.
                </p>
              </div>

              <button
                className="btn-ver-todas"
                onClick={() => setMostrarTodas(!mostrarTodas)}
              >
                {mostrarTodas ? "Ver recomendadas" : "Ver todos los platos"}
              </button>
            </div>

            <RecipeList
              recetas={recetasParaMostrar}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
              toggleBloqueo={toggleBloqueo}
            />
          </section>

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