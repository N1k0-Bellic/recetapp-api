/**
 FAVORITESPANEL - Panel lateral derecho que muestra las recetas que el usuario ha marcado como favoritas.

 Props que recibe:
 - recetasFavoritas: array de objetos receta que estan en favoritos
 - (no son solo IDs, son las recetas completas con nombre, imagen, etc.)
 -toggleFavorito: funcion para quitar una receta de favoritos al hacer clic en "X"
 */
function FavoritesPanel({ recetasFavoritas, toggleFavorito }) {
  return (
    //<aside> como etiqueta para contenido lateral/complementario
    <aside className="favorites-panel">
      {/* Titulo del panel con el conteo de favoritos */}
      <h2>⭐ Favoritos ⭐({recetasFavoritas.length})</h2>

      {/* Si no hay favoritos mostramos un mensaje informativo */}
      {recetasFavoritas.length === 0 && (
        <p className="favorites-empty">No tienes favoritos aún.</p>
      )}

      {/* Lista de recetas favoritas */}
      <ul className="favorites-list">
        {recetasFavoritas.map((receta) => (
          <li key={receta.idMeal} className="favorite-item">
            {/* Imagen miniatura de la receta favorita */}
            <img
              src={receta.strMealThumb}
              alt={receta.strMeal}
            />

            {/* Nombre de la receta */}
            <span>{receta.strMeal}</span>

            {/* Boton para quitar de favoritos */}
            <button
              onClick={() => toggleFavorito(receta.idMeal)}
              className="btn-quitar"
              title="Quitar de favoritos"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default FavoritesPanel;
