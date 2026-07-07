// Select con los origenes/paises predefinidos que existen en la API
// Props: origenes (array de strings), origenSeleccionado, setOrigenSeleccionado
function OriginFilter({ origenes, origenSeleccionado, setOrigenSeleccionado }) {
  return (
    <div className="origin-filter">
      <select
        value={origenSeleccionado}
        onChange={(e) => setOrigenSeleccionado(e.target.value)}
      >
        <option value="">🌎 Todos los origenes</option>
        {origenes.map((origen) => (
          <option key={origen} value={origen}>
            {origen}
          </option>
        ))}
      </select>
    </div>
  );
}

export default OriginFilter;