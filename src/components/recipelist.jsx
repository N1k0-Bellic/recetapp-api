import RecipeCard from "./RecipeCard";

function RecipeList({ recetas }) {
  return (
    <section>
      <h2>Listado de recetas</h2>

      {recetas.map((receta) => (
        <RecipeCard
          key={receta.idMeal}
          receta={receta}
        />
      ))}
    </section>
  );
}

export default RecipeList;