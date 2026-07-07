import RecipeCard from "./RecipeCard";

// Muestra el listado de recetas en formato grilla
// Props: recetas (filtradas), favoritos (array de IDs), toggleFavorito
function RecipeList({ recetas, favoritos, toggleFavorito }) {
  return (
    <section className="recipe-list-section">
      <h2>Listado de recetas ({recetas.length})</h2>

      <div className="recipe-list">
        {recetas.map((receta) => (
          <RecipeCard
            key={receta.idMeal}
            receta={receta}
            esFavorito={favoritos.includes(receta.idMeal)}
            toggleFavorito={toggleFavorito}
          />
        ))}
      </div>
    </section>
  );
}

export default RecipeList;