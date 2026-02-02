import { supabase, session } from "./dashboard.js";
import { cargarVistaNumeros } from "./numeros/numerosView.js";

const btnMisRifas = document.getElementById("btnMisRifas");
const dynamicSection = document.getElementById("dynamicSection");

if (btnMisRifas && dynamicSection) {
  btnMisRifas.addEventListener("click", async () => {
    dynamicSection.innerHTML = "<p>Cargando rifas...</p>";

    const { data: rifas, error } = await supabase
      .from("rifas")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      dynamicSection.innerHTML = "<p>Error al cargar rifas</p>";
      return;
    }

    if (!rifas || rifas.length === 0) {
      dynamicSection.innerHTML = "<p>No has creado rifas todavía.</p>";
      return;
    }

    let html = `
      <h3>Mis rifas</h3>
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
          <td>${String(rifa.numero_rifa).padStart(9, "0")}</td>
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

    html += "</tbody></table>";
    dynamicSection.innerHTML = html;

    // 🔗 Botones "Ver números"
    document.querySelectorAll(".btn-ver").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rifa = rifas.find(r => r.id === btn.dataset.id);
        if (rifa) {
          cargarVistaNumeros(rifa);
        }
      });
    });
  });
}
