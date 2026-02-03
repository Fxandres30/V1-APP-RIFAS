const dynamicSection = document.getElementById("dynamicSection");

document.getElementById("btnMensajes").addEventListener("click", () => {
  dynamicSection.innerHTML = `
    <h3>📩 Mensajes guardados</h3>

    <!-- CREAR MENSAJE -->
    <div class="mensaje-form">
      <input
        id="tituloMensaje"
        placeholder="Título del mensaje (ej: Cobro diario)"
      />

      <textarea
        id="contenidoMensaje"
        placeholder="Escribe aquí el mensaje completo..."
        rows="4"
      ></textarea>

      <button id="guardarMensaje" class="primary-btn">
        Guardar mensaje
      </button>
    </div>

    <!-- LISTA DE MENSAJES -->
    <div class="mensajes-lista" id="mensajesLista">
      <p class="empty">No hay mensajes guardados aún.</p>
    </div>
  `;

  initMensajes();
});
