import { useState, useEffect } from "react";

// Hook reutilizable que sincroniza un estado con localStorage.
// Funciona igual que useState, pero además:
// - Al iniciar, lee el valor guardado en localStorage (si existe)
// - Cada vez que el valor cambia, lo vuelve a guardar en localStorage
export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave);
      // Si hay algo guardado, lo parseamos de JSON a objeto/array/etc.
      // Si no hay nada, usamos el valor inicial que nos pasaron
      return guardado !== null ? JSON.parse(guardado) : valorInicial;
    } catch {
      // Si localStorage falla o el JSON está corrupto, usamos el valor inicial
      return valorInicial;
    }
  });

  // Cada vez que "valor" cambia, lo guardamos en localStorage como string JSON
  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // Si localStorage no está disponible (modo privado, etc.), no rompemos la app
    }
  }, [clave, valor]);

  // Devolvemos el mismo par [valor, setValor] que useState, para que se use igual
  return [valor, setValor];
}