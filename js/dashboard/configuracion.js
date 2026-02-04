import { supabase, session } from "./dashboard.js";

const btnConfiguracion = document.getElementById("btnConfiguracion");
const dynamicSection = document.getElementById("dynamicSection");

if (btnConfiguracion) {
  btnConfiguracion.addEventListener("click", async () => {
    dynamicSection.innerHTML = "<p>Cargando perfil...</p>";

    // ==============================
    // 👤 PERFIL
    // ==============================
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("name, email, referral_code, plan, plan_expires_at")
      .eq("id", session.user.id)
      .single();

    if (error || !profile) {
      console.error(error);
      dynamicSection.innerHTML = "<p>Error cargando perfil</p>";
      return;
    }

    const linkReferido =
      `${window.location.origin}/register.html?ref=${profile.referral_code}`;

    // ==============================
    // 🧱 HTML
    // ==============================
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

        <button class="secondary-btn" id="toggleReferidos">
          Ver referidos
        </button>

        <div id="listaReferidos" class="lista-referidos hidden"></div>
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

    // ==============================
    // 📋 COPIAR LINK
    // ==============================
    document.getElementById("copiarLink").onclick = () => {
      navigator.clipboard.writeText(linkReferido);
      alert("Link copiado");
    };

    // ==============================
    // 👥 VER REFERIDOS (CON PROGRESO POR USUARIO)
    // ==============================
    const btnToggle = document.getElementById("toggleReferidos");
    const lista = document.getElementById("listaReferidos");

    btnToggle.onclick = async () => {
      if (!lista.classList.contains("hidden")) {
        lista.classList.add("hidden");
        btnToggle.textContent = "Ver referidos";
        return;
      }

      btnToggle.textContent = "Ocultar referidos";
      lista.classList.remove("hidden");
      lista.innerHTML = "<p>Cargando referidos...</p>";

      // 1️⃣ Relaciones
      const { data: relaciones, error } = await supabase
        .from("referrals")
        .select("referred_id, created_at")
        .eq("referrer_id", session.user.id)
        .order("created_at", { ascending: true });

      if (error || !relaciones.length) {
        lista.innerHTML = "<p>No has invitado a nadie todavía.</p>";
        return;
      }

      // 2️⃣ Perfiles
      const ids = relaciones.map(r => r.referred_id);

      const { data: perfiles } = await supabase
        .from("profiles")
        .select("id, name, email")
        .in("id", ids);

      // 3️⃣ Render (PROGRESO REAL POR REFERIDO)
lista.innerHTML = "";

for (const p of perfiles) {

  // 🔍 buscar rifas de ESTE referido
  const { data: rifas } = await supabase
    .from("rifas")
    .select("created_at")
    .eq("user_id", p.id);

  // 📅 días únicos con rifas
  const diasUnicos = new Set(
    (rifas || []).map(r =>
      new Date(r.created_at).toISOString().slice(0, 10)
    )
  );

  const dias = diasUnicos.size;
  const totalRifas = rifas ? rifas.length : 0;
  const porcentaje = Math.min((dias / 3) * 100, 100);

  lista.innerHTML += `
    <div class="referido-item">
      <strong>${p.name || p.email}</strong>

      <small>
        ${dias} / 3 días — ${totalRifas} rifa(s)
      </small>

      <div class="mini-barra">
        <div class="mini-fill" style="width:${porcentaje}%"></div>
      </div>

      <span class="estado-referral">
        ${dias >= 3 ? "✅ Completado" : "⏳ En progreso"}
      </span>
    </div>
  `;
}
    };
  });
}
