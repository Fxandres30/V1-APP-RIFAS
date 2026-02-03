export function renderMensajesView() {
  const dynamicSection = document.getElementById("dynamicSection");

  dynamicSection.innerHTML = `
    <h3>📩 Mensajes</h3>

    <!-- FORMULARIO -->
    <div class="mensaje-form">
      <input id="msgTitulo" placeholder="Título del mensaje" />
      <textarea id="msgContenido" rows="4"
        placeholder="Escribe el mensaje completo"></textarea>

      <select id="msgCategoria">
        <option value="general">General</option>
        <option value="cobros">Cobros</option>
        <option value="avisos">Avisos</option>
        <option value="resultados">Resultados</option>
      </select>

      <button id="btnGuardarMensaje" class="primary-btn">
        Guardar mensaje
      </button>
    </div>

    <!-- LISTA -->
    <div class="mensajes-lista" id="mensajesLista"></div>
  `;
}
