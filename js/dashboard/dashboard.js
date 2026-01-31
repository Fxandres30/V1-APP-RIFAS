import { supabase } from "../supabase.js";

console.log("dashboard.js cargado");

// 🔒 PROTEGER DASHBOARD
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
// Luego esto vendrá de la base de datos
const isPremium = false;

const adFooter = document.getElementById("adFooter");

if (adFooter) {
  if (isPremium) {
    adFooter.style.display = "none";
  } else {
    adFooter.style.display = "flex";
  }
}

// ==============================
// 🧠 USUARIO DISPONIBLE PARA FUTURO
// ==============================
// Aquí ya tienes todo el usuario
// session.user.id → para rifas
// session.user.email → mostrar
// session.user.user_metadata → nombre, plan, etc.

console.log("Usuario activo:", session.user);

const btnCrearRifa = document.getElementById("btnCrearRifa");
const crearRifaBox = document.getElementById("crearRifaBox");

if (btnCrearRifa && crearRifaBox) {
  btnCrearRifa.addEventListener("click", () => {
    crearRifaBox.style.display =
      crearRifaBox.style.display === "none" ? "block" : "none";
  });
}
