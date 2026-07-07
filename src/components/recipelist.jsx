import RecipeCard from "./RecipeCard";

/**
 Componente RecipeList - Muestra el listado de recetas en formato grilla (grid)
 Props que recibe:
 - recetas: array de objetos receta a mostrar (ya viene filtrado desde App)
 */
function RecipeList({ recetas }) {
  return (
    <section>
      {/* Titulo con el numero de recetas visibles entre parentesis */}
      <h2>Listado de recetas ({recetas.length})</h2>

      {/* Contenedor con clase 'recipe-list' que activa el CSS Grid */}
      {/* Cada receta se renderiza como un RecipeCard dentro del grid */}
      <div className="recipe-list">
        {recetas.map((receta) => (
          <RecipeCard
            key={receta.idMeal}
            receta={receta}
          />
        ))}
      </div>
    </section>
  );
}

export default RecipeList;