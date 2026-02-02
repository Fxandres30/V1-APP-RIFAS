import { supabase } from "../dashboard.js";
import { initAccionesNumeros } from "./numerosActions.js";

const dynamicSection = document.getElementById("dynamicSection");

export async function cargarVistaNumeros(rifa) {
  const { data: numeros, error } = await supabase
    .from("rifa_numeros")
    .select("*")
    .eq("rifa_id", rifa.id)
    .order("numero", { ascending: true })
    .limit(100);

  if (error) {
    alert("Error cargando números");
    return;
  }

  // 👉 HTML COMPLETO DE LA VISTA
  dynamicSection.innerHTML = `
    <h3>Números rifa ${String(rifa.numero_rifa).padStart(9, "0")}</h3>

    <!-- PANEL (OCULTO AL INICIO) -->
    <div id="accionesNumeros" class="acciones-panel hidden">
      <p id="contadorSeleccion">0 seleccionados</p>

      <input id="nombreCliente" placeholder="Nombre del cliente" />
      <input id="telefonoCliente" placeholder="Teléfono" />

      <div class="estado-opciones">
        <label><input type="radio" name="estadoNumero" value="reservado" checked /> Reservado</label>
        <label><input type="radio" name="estadoNumero" value="pagado" /> Pagado</label>
        <label><input type="radio" name="estadoNumero" value="libre" /> Libre</label>
      </div>

      <div class="acciones-botones">
        <button id="guardarCambios" class="primary-btn">Guardar cambios</button>
        <button id="cancelarSeleccion" class="secondary-btn">Cancelar</button>
      </div>
    </div>

    <!-- TABLERO -->
    <div class="numeros-grid"></div>
  `;

  const grid = document.querySelector(".numeros-grid");

  numeros.forEach((n) => {
    const div = document.createElement("div");
    div.className = `numero-box estado-${n.estado}`;
    div.dataset.id = n.id;
    div.textContent = n.numero;
    grid.appendChild(div);
  });

  // 👉 SOLO lógica aquí
  initAccionesNumeros(rifa);
}
