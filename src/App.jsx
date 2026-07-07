import { useEffect, useState } from "react";

import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import { obtenerRecetas } from "./services/api";

function App() {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <main>
      <Header />

      {cargando && <Loading />}

      {error && <ErrorMessage />}

      {!cargando && !error && (
        <RecipeList recetas={recetas} />
      )}
    </main>
  );
}

export default App;