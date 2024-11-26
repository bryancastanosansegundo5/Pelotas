import { Bola } from "./bola.class.js";

const arrayBolas = [];
let intervaloMover;
let intervaloDiamtero;

function ajustarAlturaContenedor() {
  const contenedor = document.getElementById("contenedor");
  const boton = document.getElementById("boton-nueva-bola");
  const alturaVentana = window.innerHeight;
  const alturaBoton = boton.offsetHeight;
  contenedor.style.height = alturaVentana - alturaBoton - 20 + "px";
}

function crearNuevaBola() {
  let color1 = "#" + Math.floor(Math.random() * 16777215).toString(16);
  let color2 = "#" + Math.floor(Math.random() * 16777215).toString(16);
  let angulo = Math.floor(Math.random() * 360);
  const nuevaBola = new Bola({
    linearGradient: `linear-gradient(${angulo}deg, ${color1}, ${color2})`,
  });
  arrayBolas.push(nuevaBola);
  console.log(arrayBolas);
  document.getElementById("contenedor").appendChild(nuevaBola.elementoDiv);
}

document
  .getElementById("boton-nueva-bola")
  .addEventListener("click", crearNuevaBola);

arrayBolas.forEach((bola) => {
  const contenedor = document.getElementById("contenedor");
  contenedor.appendChild(bola.elementoDiv);
});

function eliminarUltimaBola() {
  try {
    const ultimaBola = arrayBolas.pop();
    ultimaBola.elementoDiv.remove();
  } catch (error) {
    console.log("no hay más bolas");
  }
}
alert(`Tecla Inicio -> Iniciar movimiento.
Tecla Supr -> Eliminar última bola.
Tecla Inicio -> Iniciar movimiento.
Tecla F9 -> Aumentar diámetro de todas las bolas.
Tecla Fin -> Detener movimiento.`);

document.addEventListener("keydown", (evennto) => {
  console.log(evennto.key);
  switch (evennto.key) {
    case "Delete": // elimar ult bola
      eliminarUltimaBola();
      break;
    case "Home": // Iniciar el mov
      intervaloMover = setInterval(() => {
        arrayBolas.forEach((bola) => {
          bola.desplazar();
          bola.rebotarBordes();
          bola.chocarOtrasBolas(arrayBolas);
        });
      }, 20);
      break;
    case "F9": //Aumentar Diametro
      intervaloDiamtero = setInterval(() => {
        arrayBolas.forEach((bola) => {
          bola.aumentarDiametro();
        });
      }, 20);
      break;
    case "End": // parar todas las bolas
      clearInterval(intervaloMover);
      clearInterval(intervaloDiamtero);
      break;
  }
});

ajustarAlturaContenedor();
