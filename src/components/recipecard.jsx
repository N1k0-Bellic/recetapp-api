// Tarjeta individual de una receta
// Props: receta, esFavorito (booleano), toggleFavorito, toggleBloqueo
function RecipeCard({ receta, esFavorito, toggleFavorito, toggleBloqueo }) {
  return (
    <article className="recipe-card">
      <img src={receta.strMealThumb} alt={receta.strMeal} />

      <div className="recipe-card-body">
        <h3>{receta.strMeal}</h3>
        <p>Categoría: {receta.strCategory}</p>
        <p>Origen: {receta.strArea}</p>

        <div className="recipe-card-actions">
          {/* Botón que cambia de texto y estilo según si ya es favorito o no */}
          <button
            className={`btn-favorito ${esFavorito ? "activo" : ""}`}
            onClick={() => toggleFavorito(receta.idMeal)}
          >
            {esFavorito ? "⭐ Favorito" : "☆ Agregar a favoritos"}
          </button>

          {/* Botón para bloquear la receta (la saca del listado) */}
          <button
            className="btn-bloquear"
            onClick={() => toggleBloqueo(receta.idMeal)}
          >
            🔒 Bloquear
          </button>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;