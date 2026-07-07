// Tarjeta individual de una receta
// Props: receta, esFavorito (booleano), toggleFavorito (función)
function RecipeCard({ receta, esFavorito, toggleFavorito }) {
  return (
    <article className="recipe-card">
      <img src={receta.strMealThumb} alt={receta.strMeal} />

      <div className="recipe-card-body">
        <h3>{receta.strMeal}</h3>
        <p>Categoría: {receta.strCategory}</p>
        <p>Origen: {receta.strArea}</p>

        {/* Botón que cambia de texto y estilo según si ya es favorito o no */}
        <button
          className={`btn-favorito ${esFavorito ? "activo" : ""}`}
          onClick={() => toggleFavorito(receta.idMeal)}
        >
          {esFavorito ? "⭐ Favorito" : "☆ Agregar a favoritos"}
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;