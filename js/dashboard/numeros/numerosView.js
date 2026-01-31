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

  let html = `
    <h3>Números rifa ${String(rifa.numero_rifa).padStart(9, "0")}</h3>
    <div id="accionesContainer"></div>
    <div class="numeros-grid">
  `;

  numeros.forEach((n) => {
    html += `
      <div class="numero-box estado-${n.estado}" data-id="${n.id}">
        ${n.numero}
      </div>
    `;
  });

  html += "</div>";
  dynamicSection.innerHTML = html;

  initAccionesNumeros(rifa);
}
