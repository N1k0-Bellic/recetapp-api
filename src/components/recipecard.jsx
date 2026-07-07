/**
 Componente RecipeCard - Muestra una tarjeta individual con los datos de una receta
 *
 Props que recibe:
 - receta: objeto con los datos de la receta obtenidos de la API
 *------(strMeal, strMealThumb, strCategory, strArea, idMeal)------
 */
function RecipeCard({ receta }) {
  return (
    // article con clase 'recipe-card' para los estilos de tarjeta definidos en App.css---
    <article className="recipe-card">
      {/* Imagen de la receta: ocupa todo el ancho de la tarjeta --*/}
      <img
        src={receta.strMealThumb}
        alt={receta.strMeal}
      />

      {/* Contenido de texto dentro de la tarjeta */}
      <div className="recipe-card-body">
        {/*-- Nombre de la receta --*/}
        <h3>{receta.strMeal}</h3>

        {/* --Categoria de la receta --*/}
        <p>Categoría: {receta.strCategory}</p>

        {/* --Pais de origen de la receta --*/}
        <p>Origen: {receta.strArea}</p>
      </div>
    </article>
  );
}

export default RecipeCard;