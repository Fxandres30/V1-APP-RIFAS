import { supabase } from "../dashboard.js";
import { cargarVistaNumeros } from "./numerosView.js";

let seleccionados = [];
let rifaActual = null;

export function initAccionesNumeros(rifa) {
  rifaActual = rifa;
  seleccionados = [];

  const panel = document.getElementById("accionesNumeros");
  const contador = document.getElementById("contadorSeleccion");
  const btnGuardar = document.getElementById("guardarCambios");
  const btnCancelar = document.getElementById("cancelarSeleccion");

  const inputNombre = document.getElementById("nombreCliente");
  const inputTelefono = document.getElementById("telefonoCliente");

  panel.classList.add("hidden");
  contador.textContent = "0 seleccionados";

  // ==============================
  // 🔘 SELECCIÓN DE NÚMEROS
  // ==============================
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

  // ==============================
  // ❌ CANCELAR
  // ==============================
  btnCancelar.addEventListener("click", () => {
    seleccionados = [];
    document
      .querySelectorAll(".numero-box")
      .forEach(b => b.classList.remove("seleccionado"));

    inputNombre.value = "";
    inputTelefono.value = "";

    panel.classList.add("hidden");
  });

  // ==============================
  // 💾 GUARDAR (LÓGICA PRO)
  // ==============================
  btnGuardar.addEventListener("click", async () => {
    if (seleccionados.length === 0) return;

    const nuevoEstado = document.querySelector(
      'input[name="estadoNumero"]:checked'
    ).value;

    const nombre = inputNombre.value.trim();
    const telefono = inputTelefono.value.trim();

    for (const id of seleccionados) {

      // Datos base
      const updateData = {
        estado: nuevoEstado,
        updated_at: new Date()
      };

      // 🔓 Liberar → borrar datos
      if (nuevoEstado === "libre") {
        updateData.nombre = null;
        updateData.telefono = null;
      }

      // ✏️ Solo si el usuario escribió algo
      if (nombre !== "") updateData.nombre = nombre;
      if (telefono !== "") updateData.telefono = telefono;

      await supabase
        .from("rifa_numeros")
        .update(updateData)
        .eq("id", id);
    }

    // 🧹 Reset UI
    seleccionados = [];
    inputNombre.value = "";
    inputTelefono.value = "";
    panel.classList.add("hidden");

    // 🔄 Recargar vista completa
    cargarVistaNumeros(rifaActual);
  });
}
