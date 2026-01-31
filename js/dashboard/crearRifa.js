import { supabase } from "../supabase.js";

const form = document.getElementById("crearRifaForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const total = Number(document.getElementById("total").value);
    const fechaCierre = document.getElementById("fechaCierre").value || null;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert("No hay sesión activa");
      return;
    }

    const { error } = await supabase.from("rifas").insert([
      {
        user_id: session.user.id,
        titulo,
        descripcion,
        precio,
        total_numeros: total,
        fecha_cierre: fechaCierre,
      },
    ]);

    if (error) {
      alert("Error al crear rifa: " + error.message);
    } else {
      alert("Rifa creada correctamente");
      form.reset();
    }
  });
}
