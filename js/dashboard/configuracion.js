const btnConfiguracion = document.getElementById("btnConfiguracion");
const dynamicSection = document.getElementById("dynamicSection");

if (btnConfiguracion && dynamicSection) {
  btnConfiguracion.addEventListener("click", () => {
    dynamicSection.innerHTML = `
      <h3>⚙️ Configuración</h3>

      <div class="config-section">
        <h4>👤 Perfil</h4>
        <p>Nombre visible: <strong>Próximamente</strong></p>
        <p>WhatsApp: <strong>No configurado</strong></p>
      </div>

      <div class="config-section">
        <h4>📦 Plan</h4>
        <p>Plan actual: <strong>Free</strong></p>
        <button class="primary-btn" disabled>
          Actualizar plan (próximamente)
        </button>
      </div>

      <div class="config-section">
        <h4>🎨 Apariencia</h4>
        <p class="disabled-text">
          Personalización de colores disponible en planes superiores
        </p>
      </div>

      <div class="config-section">
        <h4>ℹ️ Información</h4>
        <p>Versión: 1.0</p>
        <p>Estado: En desarrollo</p>
      </div>
    `;
  });
}
