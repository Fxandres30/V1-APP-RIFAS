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

if (modalRifa) {
  modalRifa.addEventListener("click", (e) => {
    if (e.target === modalRifa) {
      modalRifa.classList.remove("active");
    }
  });
}
