import { supabase, session } from "./dashboard.js";

const btnConfiguracion = document.getElementById("btnConfiguracion");
const dynamicSection = document.getElementById("dynamicSection");

if (btnConfiguracion) {
  btnConfiguracion.addEventListener("click", async () => {
    dynamicSection.innerHTML = "<p>Cargando perfil...</p>";

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("name, email, referral_code, plan, plan_expires_at")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error(error);
      dynamicSection.innerHTML =
        "<p>Error cargando perfil</p>";
      return;
    }

    const linkReferido = `${window.location.origin}/register.html?ref=${profile.id}`;

    dynamicSection.innerHTML = `
      <h3>⚙️ Configuración</h3>

      <div class="config-section">
        <h4>👤 Perfil</h4>
        <p><strong>Nombre:</strong> ${profile.name}</p>
        <p><strong>Email:</strong> ${profile.email}</p>
      </div>

      <div class="config-section">
        <h4>🎁 Referidos</h4>
        <p><strong>Código:</strong> ${profile.referral_code}</p>
        <input value="${linkReferido}" readonly />
        <button class="primary-btn" id="copiarLink">
          Copiar link
        </button>
      </div>

      <div class="config-section">
        <h4>📦 Plan</h4>
        <p><strong>Plan actual:</strong> ${profile.plan}</p>
        <p><strong>Vence:</strong> ${
          profile.plan_expires_at
            ? new Date(profile.plan_expires_at).toLocaleDateString()
            : "Sin fecha"
        }</p>
      </div>
    `;

    document
      .getElementById("copiarLink")
      .addEventListener("click", () => {
        navigator.clipboard.writeText(linkReferido);
        alert("Link copiado");
      });
  });
}
