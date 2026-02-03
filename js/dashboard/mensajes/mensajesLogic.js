import { guardarMensaje, obtenerMensajes } from "./mensajesDB.js";

export async function initMensajes() {
  const lista = document.getElementById("mensajesLista");
  const btnGuardar = document.getElementById("btnGuardarMensaje");

  btnGuardar.addEventListener("click", async () => {
    const titulo = msgTitulo.value.trim();
    const contenido = msgContenido.value.trim();
    const categoria = msgCategoria.value;

    if (!titulo || !contenido) {
      alert("Completa título y mensaje");
      return;
    }

    await guardarMensaje({ titulo, contenido, categoria });

    msgTitulo.value = "";
    msgContenido.value = "";

    cargarMensajes();
  });

  async function cargarMensajes() {
    const mensajes = await obtenerMensajes();
    lista.innerHTML = "";

    mensajes.forEach(m => {
      const div = document.createElement("div");
      div.className = "mensaje-item";

      div.innerHTML = `
        <div class="mensaje-header">
          <div class="mensaje-textos">
            <div class="mensaje-titulo">${m.titulo}</div>
            <div class="mensaje-preview">
              ${m.contenido.slice(0, 80)}${m.contenido.length > 80 ? "..." : ""}
            </div>
          </div>

          <button class="copiar">Copiar</button>
        </div>

        <div class="mensaje-contenido hidden">
          ${m.contenido.replace(/\n/g, "<br>")}
        </div>
      `;

      // 👉 abrir / cerrar mensaje
      div.querySelector(".mensaje-titulo").onclick = () => {
        div.querySelector(".mensaje-contenido")
          .classList.toggle("hidden");
      };

      // 👉 copiar mensaje
      div.querySelector(".copiar").onclick = () => {
        navigator.clipboard.writeText(m.contenido);

        const btn = div.querySelector(".copiar");
        btn.textContent = "Copiado ✔";
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = "Copiar";
          btn.disabled = false;
        }, 1500);
      };

      lista.appendChild(div);
    });
  }

  // 👉 cargar mensajes al entrar
  cargarMensajes();
}
