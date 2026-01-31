import { supabase, session } from "./dashboard.js";

const btnMisRifas = document.getElementById("btnMisRifas");
const dynamicSection = document.getElementById("dynamicSection");

// ==============================
// 📋 MIS RIFAS
// ==============================
if (btnMisRifas && dynamicSection) {
  btnMisRifas.addEventListener("click", async () => {
    dynamicSection.innerHTML = "<p>Cargando rifas...</p>";

    const { data: rifas, error } = await supabase
      .from("rifas")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      dynamicSection.innerHTML = "<p>Error al cargar rifas</p>";
      console.error(error);
      return;
    }

    if (!rifas || rifas.length === 0) {
      dynamicSection.innerHTML = "<p>No has creado rifas todavía.</p>";
      return;
    }

    let html = `
      <h3>Mis rifas</h3>
      <div class="table-wrapper">
        <table class="rifas-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Cifras</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
    `;

    rifas.forEach((rifa) => {
      html += `
        <tr>
          <td class="rifa-id">${String(rifa.numero_rifa).padStart(9, "0")}</td>
          <td>${rifa.titulo}</td>
          <td>${rifa.cifras}</td>
          <td>${rifa.total_numeros}</td>
          <td>
            <button class="btn-ver" data-id="${rifa.id}">
              Ver números
            </button>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    dynamicSection.innerHTML = html;

    activarBotonesVer(rifas);
  });
}

// ==============================
// 🔢 VER NÚMEROS (100)
// ==============================
function activarBotonesVer(rifas) {
  document.querySelectorAll(".btn-ver").forEach((btn) => {
    btn.addEventListener("click", () => {
      const rifa = rifas.find(r => r.id === btn.dataset.id);
      if (rifa) mostrarNumeros(rifa);
    });
  });
}

function mostrarNumeros(rifa) {
  const limite = Math.min(100, rifa.total_numeros);

  let html = `
    <h3>Números rifa ${String(rifa.numero_rifa).padStart(9, "0")}</h3>
    <div class="numeros-grid">
  `;

  for (let i = 0; i < limite; i++) {
    html += `<div class="numero-box">${String(i).padStart(rifa.cifras, "0")}</div>`;
  }

  html += `</div>`;

  dynamicSection.innerHTML = html;
}
