import { supabase } from "../supabase.js";
import { validarCifrasPorPlan } from "../plans/planRules.js";
import { calcularTotalNumeros } from "../utils/numeros.js";

// ==============================
// 📄 ELEMENTOS
// ==============================
const form = document.getElementById("crearRifaForm");
const modalRifa = document.getElementById("modalRifa");

// ==============================
// ⚙️ PLAN DEL USUARIO (FUTURO: profiles)
// ==============================
const userPlan = "free";

// ==============================
// 📝 SUBMIT FORM
// ==============================
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ==============================
    // 📥 DATOS
    // ==============================
    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const fechaCierre =
      document.getElementById("fechaCierre").value || null;
    const cifras = Number(
      document.querySelector('input[name="cifras"]:checked').value
    );

    // ==============================
    // 🛑 VALIDACIONES
    // ==============================
    if (!titulo || !precio || !cifras) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    if (precio <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }

    if (!validarCifrasPorPlan(cifras, userPlan)) {
      alert(
        "Tu plan no permite crear rifas con esta cantidad de cifras.\nActualiza tu plan para desbloquear esta opción."
      );
      return;
    }

    const totalNumeros = calcularTotalNumeros(cifras);

    // ==============================
    // 👤 SESIÓN
    // ==============================
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      alert("Sesión no válida");
      return;
    }

    // ==============================
    // 💾 CREAR RIFA
    // ==============================
    const { data: rifa, error: rifaError } = await supabase
      .from("rifas")
      .insert([{
        user_id: session.user.id,
        titulo,
        descripcion,
        precio,
        cifras,
        total_numeros: totalNumeros,
        fecha_cierre: fechaCierre
      }])
      .select()
      .single();

    if (rifaError || !rifa) {
      alert("Error al crear la rifa: " + rifaError.message);
      return;
    }

    // ==============================
    // 🔢 CREAR NÚMEROS (PRODUCCIÓN)
    // ==============================
    const numeros = [];

    for (let i = 0; i < totalNumeros; i++) {
      numeros.push({
        rifa_id: rifa.id,
        numero: String(i).padStart(cifras, "0"),
        estado: "libre"
      });
    }

    // Insertar en bloques (seguro)
    const BLOQUE = 500;
    for (let i = 0; i < numeros.length; i += BLOQUE) {
      const { error } = await supabase
        .from("rifa_numeros")
        .insert(numeros.slice(i, i + BLOQUE));

      if (error) {
        alert("Error creando números: " + error.message);
        return;
      }
    }

    // ==============================
    // ✅ FINAL
    // ==============================
    alert("Rifa creada con todos sus números");

    form.reset();
    modalRifa.classList.remove("active");
  });
}
