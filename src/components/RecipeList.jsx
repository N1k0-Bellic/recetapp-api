import RecipeCard from "./RecipeCard";

// Muestra el listado de recetas en formato grilla
// Props: recetas (filtradas), favoritos (array de IDs), toggleFavorito, toggleBloqueo
function RecipeList({ recetas, favoritos, toggleFavorito, toggleBloqueo }) {
  return (
    <section className="recipe-list-section">
      <h2>Listado de menu ({recetas.length})</h2>

      <div className="recipe-list">
        {recetas.map((receta) => (
          <RecipeCard
            key={receta.idMeal}
            receta={receta}
            esFavorito={favoritos.includes(receta.idMeal)}
            toggleFavorito={toggleFavorito}
            toggleBloqueo={toggleBloqueo}
          />
        ))}
      </div>
    </section>
  );
}

export default RecipeList;