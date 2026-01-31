import { supabase } from "../supabase.js";

console.log("dashboard.js cargado");

// ==============================
// 🔒 PROTEGER DASHBOARD
// ==============================
const {
  data: { session },
  error
} = await supabase.auth.getSession();

if (error || !session) {
  window.location.href = "index.html";
  throw new Error("No hay sesión activa");
}

// ==============================
// 👤 MOSTRAR USUARIO
// ==============================
const welcomeText = document.getElementById("welcomeText");
if (welcomeText) {
  welcomeText.textContent = `Bienvenido, ${session.user.email}`;
}

// ==============================
// 🚪 CERRAR SESIÓN
// ==============================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
}

// ==============================
// 📣 FOOTER DE ANUNCIOS (FREE / PREMIUM)
// ==============================
// ⚠️ Por ahora todos son FREE
// Luego esto vendrá de la base de datos (profiles.plan)
const isPremium = false;

const adFooter = document.getElementById("adFooter");
if (adFooter) {
  adFooter.style.display = isPremium ? "none" : "flex";
}

// ==============================
// 🪟 MODAL CREAR RIFA (USANDO CLASE .active)
// ==============================
const btnCrearRifa = document.getElementById("btnCrearRifa");
const modalRifa = document.getElementById("modalRifa");
const cerrarModal = document.getElementById("cerrarModal");

if (btnCrearRifa && modalRifa) {
  btnCrearRifa.addEventListener("click", () => {
    modalRifa.classList.add("active");
  });
}

if (cerrarModal && modalRifa) {
  cerrarModal.addEventListener("click", () => {
    modalRifa.classList.remove("active");
  });
}

// Cerrar modal al hacer clic fuera del contenido
if (modalRifa) {
  modalRifa.addEventListener("click", (e) => {
    if (e.target === modalRifa) {
      modalRifa.classList.remove("active");
    }
  });
}

// ==============================
// 📋 NAVEGACIÓN INTERNA (FUTURO)
// ==============================
const btnMisRifas = document.getElementById("btnMisRifas");
const btnConfiguracion = document.getElementById("btnConfiguracion");
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
      dynamicSection.innerHTML =
        "<p>Error al cargar las rifas</p>";
      console.error(error);
      return;
    }

    if (!rifas || rifas.length === 0) {
      dynamicSection.innerHTML =
        "<p>No has creado rifas todavía.</p>";
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
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
    `;

    rifas.forEach((rifa) => {
      const numeroVisible = String(rifa.numero_rifa).padStart(9, "0");
      const fecha = rifa.created_at
        ? new Date(rifa.created_at).toLocaleDateString()
        : "-";

      html += `
        <tr>
          <td class="rifa-id">${numeroVisible}</td>
          <td>${rifa.titulo}</td>
          <td>${rifa.cifras}</td>
          <td>${rifa.total_numeros}</td>
          <td>${fecha}</td>
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
  });
}


if (btnConfiguracion && dynamicSection) {
  btnConfiguracion.addEventListener("click", () => {
    dynamicSection.innerHTML = `
      <h3>Configuración</h3>
      <p>Plan actual: <strong>Free</strong></p>
      <p>Desde aquí luego se podrá actualizar a Básico o Premium.</p>
    `;
  });
}

// ==============================
// 🧠 USUARIO DISPONIBLE PARA FUTURO
// ==============================
console.log("Usuario activo:", session.user);
// session.user.id → para rifas
// session.user.email → mostrar
// session.user.user_metadata → nombre, plan, etc.
