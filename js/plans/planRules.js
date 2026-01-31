// ==============================
// 📦 PLANES Y REGLAS
// ==============================

// free    → solo 2 cifras
// basic   → 2 y 3 cifras
// premium → 2, 3 y 4 cifras

export function validarCifrasPorPlan(cifras, plan) {
  if (plan === "free" && cifras > 2) return false;
  if (plan === "basic" && cifras > 3) return false;
  return true;
}

// 👉 En el futuro aquí:
// - límites de rifas
// - límites de números
// - acceso a colores
