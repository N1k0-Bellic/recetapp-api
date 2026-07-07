// Panel lateral que muestra las recetas bloqueadas
// Props: recetasBloqueadas (objetos completos), toggleBloqueo
function BlockedPanel({ recetasBloqueadas, toggleBloqueo }) {
  return (
    <aside className="blocked-panel">
      <h2>🔒 Bloqueados ({recetasBloqueadas.length})</h2>

      {recetasBloqueadas.length === 0 && (
        <p className="blocked-empty">No tienes recetas bloqueadas.</p>
      )}

      <ul className="blocked-list">
        {recetasBloqueadas.map((receta) => (
          <li key={receta.idMeal} className="blocked-item">
            <img src={receta.strMealThumb} alt={receta.strMeal} />
            <span>{receta.strMeal}</span>
            {/* Botón para desbloquear */}
            <button
              onClick={() => toggleBloqueo(receta.idMeal)}
              className="btn-desbloquear"
              title="Desbloquear"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default BlockedPanel;