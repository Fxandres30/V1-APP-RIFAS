const dynamicSection = document.getElementById("dynamicSection");

document.getElementById("btnHorarios").addEventListener("click", () => {
  dynamicSection.innerHTML = `
    <h3>⏰ Horarios de juegos</h3>

    <div class="horarios-box">

      <h4>CHANCES</h4>

      ${juego("Antioqueñita Día", `
        Lunes a Sábado 10:00 AM<br>
        Domingos y Festivos 12:00 PM
      `)}

      ${juego("Antioqueñita Tarde", `
        Todos los días 4:00 PM
      `)}

      ${juego("Dorado Mañana", `
        Lunes a Sábado 10:58 AM
      `)}

      ${juego("Dorado Tarde", `
        Lunes a Sábado 3:28 PM
      `)}

      ${juego("Dorado Noche", `
        Sábado 10:15 PM<br>
        Domingos y Festivos 7:25 PM
      `)}

      ${juego("Fantástica Día", `
        Lunes a Sábado 12:57 PM
      `)}

      ${juego("Fantástica Noche", `
        Lunes a Sábado 8:30 PM
      `)}

      ${juego("El Samán de la Suerte", `
        Lunes a Sábado 1:00 PM<br>
        Domingos y Festivos 7:00 PM
      `)}

      ${juego("Paisita Día", `
        Lunes a Sábado 1:00 PM<br>
        Domingos y Festivos 2:00 PM
      `)}

      ${juego("Paisita Noche", `
        Lunes a Sábado 6:00 PM<br>
        Domingos y Festivos 8:00 PM
      `)}

      ${juego("Chontico Día", `
        Todos los días 1:00 PM
      `)}

      ${juego("Chontico Noche", `
        Lunes a Viernes 7:00 PM<br>
        Sábado 10:00 PM<br>
        Domingos y Festivos 8:00 PM
      `)}

      ${juego("Pijao de Oro", `
        Lunes a Viernes 2:00 PM<br>
        Sábado 9:00 PM<br>
        Domingo 10:00 PM<br>
        Festivos 8:00 PM
      `)}

      ${juego("Super Astro Sol", `
        Lunes a Sábado 2:30 PM
      `)}

      ${juego("Super Astro Luna", `
        Lunes a Sábado 10:30 PM<br>
        Domingos y Festivos 8:30 PM
      `)}

      ${juego("Sinuano Día", `
        Lunes a Sábado 2:30 PM<br>
        Domingos y Festivos 1:00 PM
      `)}

      ${juego("Sinuano Noche", `
        Lunes a Sábado 10:30 PM<br>
        Domingos y Festivos 8:30 PM
      `)}

      ${juego("La Caribeña Día", `
        Todos los días 2:30 PM
      `)}

      ${juego("La Caribeña Noche", `
        Lunes a Sábado 10:30 PM<br>
        Domingos y Festivos 8:30 PM
      `)}

      ${juego("Motilón Tarde", `
        Todos los días 3:00 PM
      `)}

      ${juego("Motilón Noche", `
        Todos los días 9:00 PM
      `)}

      ${juego("Cafeterito Tarde", `
        Lunes a Sábado 12:00 PM
      `)}

      ${juego("Cafeterito Noche", `
        Lunes a Viernes 10:00 PM<br>
        Sábado 11:00 PM<br>
        Domingos y Festivos 9:00 PM
      `)}

      ${juego("Paisa Lotto", `
        Sábado 10:00 PM
      `)}

      ${juego("La Culona Día", `
        Todos los días 2:30 PM
      `)}

      ${juego("La Culona Noche", `
        Lunes a Sábado 9:30 PM<br>
        Domingos y Festivos 8:00 PM
      `)}

      ${juego("SuperMillonaria", `
        Viernes 11:00 PM
      `)}

      <h4>SORTEOS TRADICIONALES</h4>

      ${simple("Lotería de Cundinamarca", "Lunes 10:30 PM")}
      ${simple("Lotería de Tolima", "Lunes 11:00 PM")}
      ${simple("Lotería Cruz Roja", "Martes 10:30 PM")}
      ${simple("Lotería de Huila", "Martes 10:30 PM")}
      ${simple("Lotería de Manizales", "Miércoles 10:30 PM")}
      ${simple("Lotería del Meta", "Miércoles 10:30 PM")}
      ${simple("Lotería del Valle", "Miércoles 10:30 PM")}
      ${simple("Lotería del Quindío", "Jueves 10:30 PM")}
      ${simple("Lotería de Bogotá", "Jueves 10:30 PM")}
      ${simple("Lotería de Santander", "Viernes 11:00 PM")}
      ${simple("Lotería de Medellín", "Viernes 11:00 PM")}
      ${simple("Lotería de Risaralda", "Viernes 11:00 PM")}
      ${simple("Lotería de Boyacá", "Sábado 10:40 PM")}
      ${simple("Lotería del Cauca", "Sábado 9:40 PM")}
      ${simple("Extra de Colombia (Mensual)", "Sábado 11:00 PM")}

    </div>
  `;
});

// Helpers (NO TOCAR)
function juego(nombre, horarios) {
  return `
    <div class="juego-item">
      <div class="juego-nombre">
        <span class="dot"></span>${nombre}
      </div>
      <div class="juego-horario">${horarios}</div>
    </div>
  `;
}

function simple(nombre, horario) {
  return `
    <div class="juego-item">
      <div class="juego-nombre">
        <span class="dot"></span>${nombre}
      </div>
      <div class="juego-horario">${horario}</div>
    </div>
  `;
}
