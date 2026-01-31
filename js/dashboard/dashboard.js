import { supabase } from "../supabase.js";

console.log("dashboard.js cargado");

// ==============================
// 🔒 SESIÓN
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
// 👤 USUARIO
// ==============================
const welcomeText = document.getElementById("welcomeText");
if (welcomeText) {
  welcomeText.textContent = `Bienvenido, ${session.user.email}`;
}

// ==============================
// 🚪 LOGOUT
// ==============================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
}

// ==============================
// 📣 FOOTER (FREE / PREMIUM)
// ==============================
const isPremium = false;
const adFooter = document.getElementById("adFooter");
if (adFooter) {
  adFooter.style.display = isPremium ? "none" : "flex";
}

// ==============================
// 🔗 EXPORTAR PARA OTROS ARCHIVOS
// ==============================
export { supabase, session };
