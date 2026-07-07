// Muestra las estadísticas de la app: total de recetas, favoritos y bloqueados
function Stats({ total, favoritos, bloqueados }) {
  return (
    <div className="stats">
      <span>📋 Total: {total}</span>
      <span>⭐ Favoritos: {favoritos}</span>
      <span>🔒 Bloqueados: {bloqueados}</span>
    </div>
  );
}

export default Stats;