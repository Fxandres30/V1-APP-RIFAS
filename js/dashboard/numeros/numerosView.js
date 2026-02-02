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

  // ==============================
  // 🧱 VISTA COMPLETA
  // ==============================
  dynamicSection.innerHTML = `
    <h3>Números rifa ${String(rifa.numero_rifa).padStart(9, "0")}</h3>

    <!-- PANEL DE ACCIONES -->
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

    <!-- BOTÓN SUPERIOR (PREMIUM) -->
    <div class="top-filtro">
      <button class="premium-btn" disabled>
        Solo disponibles ⭐
      </button>
    </div>

    <!-- TABLERO -->
    <div class="numeros-wrapper">
      <div class="numeros-grid"></div>
    </div>

    <!-- LEYENDA -->
    <div class="leyenda-estados">
      <div class="leyenda-item"><span class="dot libre"></span> Disponible</div>
      <div class="leyenda-item"><span class="dot reservado"></span> Reservado</div>
      <div class="leyenda-item"><span class="dot pagado"></span> Pagado</div>
    </div>

    <!-- FILTROS SOLO PARA LISTA -->
    <div class="filtros-lista">
      <button class="lista-btn activo" data-estado="todos">Todos</button>
      <button class="lista-btn" data-estado="libre">Disponibles</button>
      <button class="lista-btn" data-estado="reservado">Reservados</button>
      <button class="lista-btn" data-estado="pagado">Pagados</button>
    </div>

    <!-- LISTA TIPO SUPABASE -->
    <div class="lista-numeros">
      <table class="detalle-table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Estado</th>
            <th>Nombre</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody id="detalleNumeros"></tbody>
      </table>
    </div>
  `;

  // ==============================
  // 🔢 RENDER TABLERO (NO SE FILTRA)
  // ==============================
  const grid = document.querySelector(".numeros-grid");

  numeros.forEach(n => {
    const div = document.createElement("div");
    div.className = `numero-box estado-${n.estado}`;
    div.dataset.id = n.id;
    div.textContent = n.numero;
    grid.appendChild(div);
  });

  // ==============================
  // 📋 LISTA (FILTRABLE)
  // ==============================
  const tbody = document.getElementById("detalleNumeros");

  function renderLista(filtro = "todos") {
    tbody.innerHTML = "";

    numeros.forEach(n => {
      if (filtro !== "todos" && n.estado !== filtro) return;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${n.numero}</td>
        <td class="estado ${n.estado}">${n.estado}</td>
        <td>${n.nombre || "-"}</td>
        <td>${n.telefono || "-"}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderLista();

  // ==============================
  // 🎛️ BOTONES DE LISTA
  // ==============================
  document.querySelectorAll(".lista-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".lista-btn")
        .forEach(b => b.classList.remove("activo"));

      btn.classList.add("activo");
      renderLista(btn.dataset.estado);
    });
  });

  // ==============================
  // 🔗 LÓGICA DE SELECCIÓN
  // ==============================
  initAccionesNumeros(rifa);
}
