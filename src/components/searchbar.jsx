/**
 Componente SearchBar - Barra de busqueda para filtrar recetas por nombre
 Este componente es un input controlado: su valor viene del estado del componente padre (App) y se actualiza mediante la funcion setBusqueda.
Props que recibe:
busqueda: string con el texto actual que el usuario ha escrito
- setBusqueda: funcion para actualizar el texto de busqueda en el estado de App
 */
function SearchBar({ busqueda, setBusqueda }) {
  return (
    // --Contenedor con clase CSS para aplicar estilos desde App.css--
    <div className="search-bar">
      {/*
        Input controlado:
        value={busqueda} -> el valor mostrado viene del estado del padre
        onChange -> cada vez que el usuario escribe, actualizamos el estado
        e.target.value contiene el nuevo texto del input
      */}
      <input
        type="text"
        placeholder=" Buscar receta por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
