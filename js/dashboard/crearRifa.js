import { supabase } from "../supabase.js";

// ==============================
// 📄 ELEMENTOS
// ==============================
const form = document.getElementById("crearRifaForm");
const modalRifa = document.getElementById("modalRifa");

// ==============================
// ⚙️ CONFIGURACIÓN FUTURA (PLANES)
// ==============================
// Por ahora todos los usuarios son FREE
// Luego vendrá de la tabla profiles (user.plan)
const userPlan = "free";
// free    → solo 2 cifras
// basic   → 2 y 3 cifras
// premium → 2, 3 y 4 cifras

// ==============================
// 🔢 VALIDAR CIFRAS SEGÚN PLAN
// ==============================
function validarCifrasPorPlan(cifras, plan) {
  if (plan === "free" && cifras > 2) return false;
  if (plan === "basic" && cifras > 3) return false;
  return true;
}

// ==============================
// 🧠 CALCULAR TOTAL DE NÚMEROS
// ==============================
function calcularTotalNumeros(cifras) {
  if (cifras === 2) return 100;
  if (cifras === 3) return 1000;
  if (cifras === 4) return 10000;
  return 0;
}

// ==============================
// 📝 SUBMIT FORM
// ==============================
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 📥 DATOS DEL FORM
    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const fechaCierre =
      document.getElementById("fechaCierre").value || null;
    const cifras = Number(
      document.querySelector('input[name="cifras"]:checked').value
    );

    // ==============================
    // 🛑 VALIDACIONES BÁSICAS
    // ==============================
    if (!titulo || !precio || !cifras) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    if (precio <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }

    // ==============================
    // 🔒 VALIDACIÓN POR PLAN
    // ==============================
    if (!validarCifrasPorPlan(cifras, userPlan)) {
      alert(
        "Tu plan no permite crear rifas con esta cantidad de cifras.\nActualiza tu plan para desbloquear esta opción."
      );
      return;
    }

    // ==============================
    // 🔢 TOTAL DE NÚMEROS
    // ==============================
    const totalNumeros = calcularTotalNumeros(cifras);

    // ==============================
    // 👤 SESIÓN
    // ==============================
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      alert("Sesión no válida. Vuelve a iniciar sesión.");
      return;
    }

    // ==============================
    // 💾 GUARDAR RIFA
    // ==============================
    const { error } = await supabase.from("rifas").insert([
      {
        user_id: session.user.id,
        titulo,
        descripcion,
        precio,
        cifras,
        total_numeros: totalNumeros,
        fecha_cierre: fechaCierre
      }
    ]);

    if (error) {
      alert("Error al crear la rifa: " + error.message);
      return;
    }

    // ==============================
    // ✅ ÉXITO
    // ==============================
    alert("Rifa creada correctamente");

    form.reset();
    modalRifa.classList.remove("active");
  });
}
