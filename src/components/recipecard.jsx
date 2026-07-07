function RecipeCard({ receta }) {
  return (
    <article>
      <img
        src={receta.strMealThumb}
        alt={receta.strMeal}
        width="200"
      />

      <h3>{receta.strMeal}</h3>

      <p>Categoría: {receta.strCategory}</p>

      <p>Origen: {receta.strArea}</p>
    </article>
  );
}

export default RecipeCard;