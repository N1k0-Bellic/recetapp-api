// Input controlado para filtrar recetas por nombre
// Props: busqueda (valor actual), setBusqueda (actualiza el estado en App)
function SearchBar({ busqueda, setBusqueda }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Buscar platos por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
