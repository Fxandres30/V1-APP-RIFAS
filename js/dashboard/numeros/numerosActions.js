import { supabase } from "../dashboard.js";

let seleccionados = [];
let rifaActual = null;

export function initAccionesNumeros(rifa) {
  rifaActual = rifa;
  seleccionados = [];

  const panel = document.getElementById("accionesContainer");

  panel.innerHTML = `
  <div class="acciones-panel hidden" id="accionesNumeros">

    <p id="contadorSeleccion">0 seleccionados</p>

    <input
      type="text"
      id="nombreCliente"
      placeholder="Nombre del cliente"
    />

    <input
      type="text"
      id="telefonoCliente"
      placeholder="Teléfono"
    />

    <div class="estado-opciones">
      <label>
        <input type="radio" name="estadoNumero" value="reservado" checked />
        Reservado
      </label>

      <label>
        <input type="radio" name="estadoNumero" value="pagado" />
        Pagado
      </label>

      <label>
        <input type="radio" name="estadoNumero" value="libre" />
        Libre
      </label>
    </div>

    <div class="acciones-botones">
      <button id="guardarCambios" class="primary-btn">
        Guardar cambios
      </button>

      <button id="cancelarSeleccion" class="secondary-btn">
        Cancelar
      </button>
    </div>

  </div>
`;

  activarSeleccion();
}

function activarSeleccion() {
  const panel = document.getElementById("accionesNumeros");
  const contador = document.getElementById("contadorSeleccion");

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
}
