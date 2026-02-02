import { supabase } from "../dashboard.js";

let seleccionados = [];
let rifaActual = null;

export function initAccionesNumeros(rifa) {
  rifaActual = rifa;
  seleccionados = [];

  const panel = document.getElementById("accionesNumeros");
  const contador = document.getElementById("contadorSeleccion");
  const btnGuardar = document.getElementById("guardarCambios");
  const btnCancelar = document.getElementById("cancelarSeleccion");

  panel.classList.add("hidden");
  contador.textContent = "0 seleccionados";

  document.querySelectorAll(".numero-box").forEach((box) => {
    box.addEventListener("click", () => {
      const id = box.dataset.id;

      box.classList.toggle("seleccionado");

      if (seleccionados.includes(id)) {
        seleccionados = seleccionados.filter(n => n !== id);
      } else {
        seleccionados.push(id);
      }

      if (seleccionados.length > 0) {
        panel.classList.remove("hidden");
        contador.textContent = `${seleccionados.length} seleccionados`;
      } else {
        panel.classList.add("hidden");
      }
    });
  });

  btnCancelar.addEventListener("click", () => {
    seleccionados = [];
    document.querySelectorAll(".numero-box")
      .forEach(b => b.classList.remove("seleccionado"));
    panel.classList.add("hidden");
  });

  btnGuardar.addEventListener("click", async () => {
    if (seleccionados.length === 0) return;

    const estado = document.querySelector(
      'input[name="estadoNumero"]:checked'
    ).value;

    const nombre = document.getElementById("nombreCliente").value || null;
    const telefono = document.getElementById("telefonoCliente").value || null;

    for (const id of seleccionados) {
      await supabase
        .from("rifa_numeros")
        .update({ estado, nombre, telefono })
        .eq("id", id);
    }

    // Reset
    seleccionados = [];
    panel.classList.add("hidden");
    cargarVistaNumeros(rifaActual);
  });
}
