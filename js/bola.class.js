import { misFunciones } from "./mis-funciones.js";

let rect;
export class Bola {
  constructor({
    elemento = null,
    diametro = misFunciones.aleatorio(15, 90),
    posX = misFunciones.aleatorio(rect.x, rect.x + rect.width - diametro),
    posY = misFunciones.aleatorio(rect.y, rect.y + rect.height - diametro),
    color = "#" + Math.floor(Math.random() * 16777215).toString(16),
    linearGradient = null,
    vx = misFunciones.aleatorio(-15, 15),
    vy = misFunciones.aleatorio(-15, 15),
  } = {}) {
    this.elementoDiv = elemento || document.createElement("div");
    this.diametro = diametro;
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.check = true;

    /* css para pelotas */
    this.elementoDiv.style.position = "absolute";
    this.elementoDiv.style.borderRadius = "50%";

    this.elementoDiv.style.width = `${this.diametro}px`;
    this.elementoDiv.style.height = `${this.diametro}px`;
    this.elementoDiv.style.left = `${this.posX}px`;
    this.elementoDiv.style.top = `${this.posY}px`;
    this.elementoDiv.style.background = this.color;

    if (linearGradient) {
      this.elementoDiv.style.background = linearGradient;
    }
  }
  /******  fin constructor */
  desplazar() {
    this.posX += this.vx;
    this.posY += this.vy;
    this.elementoDiv.style.left = `${this.posX}px`;
    this.elementoDiv.style.top = `${this.posY}px`;
    // this.repintar();
  }

  aumentarDiametro() {
    if (this.check === true) {
      this.diametro += 5;
      this.elementoDiv.style.width = `${this.diametro}px`;
      this.elementoDiv.style.height = `${this.diametro}px`;

      if (this.diametro >= 90) {
        this.check = false;
      }
    } else if (this.check === false) {
      this.diametro -= 5;
      this.elementoDiv.style.width = `${this.diametro}px`;
      this.elementoDiv.style.height = `${this.diametro}px`;

      if (this.diametro <= 15) {
        this.check = true;
      }
    }
  }

  repintar() {
    this.elementoDiv.parentElement.appendChild(this.elementoDiv);
  }

  rebotarBordes() {
    switch (true) {
      case this.posX >= rect.right - this.diametro:
        this.vx = -this.vx;
        break;

      case this.posX <= rect.left:
        this.vx = -this.vx;
        break;

      case this.posY >= rect.bottom - this.diametro:
        this.vy = -this.vy;
        break;

      case this.posY <= rect.top:
        this.vy = -this.vy;
        break;
    }
  }
  chocarOtrasBolas(arrayB) {
    arrayB.forEach((bola) => {
      if (this != bola) {
        let separacionHorizontal = this.posX - bola.posX;
        let separacionVertical = this.posY - bola.posY;
        let cuadrado1 = separacionHorizontal * separacionHorizontal;
        let cuadrado2 = separacionVertical * separacionVertical;
        let separacionReal = Math.sqrt(cuadrado1 + cuadrado2);

        if (separacionReal < this.diametro / 2 + bola.diametro / 2) {
          console.log("choque");
          this.vx = -this.vx;
          this.vy = -this.vy;
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "hidden";
  const contenedor = document.getElementById("contenedor");
  rect = contenedor.getBoundingClientRect();
  console.log(rect);
});
