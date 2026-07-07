// Panel lateral que muestra las recetas marcadas como favoritas
// Props: recetasFavoritas (objetos completos), toggleFavorito
function FavoritesPanel({ recetasFavoritas, toggleFavorito }) {
  return (
    <aside className="favorites-panel">
      <h2>⭐ Favoritos ({recetasFavoritas.length})</h2>

      {recetasFavoritas.length === 0 && (
        <p className="favorites-empty">No tienes favoritos aún.</p>
      )}

      <ul className="favorites-list">
        {recetasFavoritas.map((receta) => (
          <li key={receta.idMeal} className="favorite-item">
            <img src={receta.strMealThumb} alt={receta.strMeal} />
            <span>{receta.strMeal}</span>
            {/* Botón para quitar de favoritos */}
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
