const criptosSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

const objBusqueda = {
  moneda: "",
  criptomoneda: "",
};

//Promise

const obtenerCriptos = (criptomonedas) =>
  new Promise((resolve) => {
    resolve(criptomonedas);
  });

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptomonedas();

  formulario.addEventListener("submit", envioDeFormulario);

  criptosSelect.addEventListener("change", leerValor);
  monedaSelect.addEventListener("change", leerValor);
});

function consultarCriptomonedas() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";


  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => obtenerCriptos(resultado.Data))
    .then((criptomonedas) => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;

    const opciones = document.createElement("option");
    opciones.value = Name;
    opciones.textContent = FullName;
    criptosSelect.appendChild(opciones);
  });
}

function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
}

function envioDeFormulario(e) {
  e.preventDefault();

  const { moneda, criptomoneda } = objBusqueda;

  if (moneda === "" || criptomoneda === "") {
    imprimirAlerta("Ambos campos son obligatorios");
    return;
  }

  consultarAPI();
}

function imprimirAlerta(mensaje) {
  const hayError = document.querySelector(".error");

  if (!hayError) {
    const alerta = document.createElement("div");
    alerta.classList.add("error");

    alerta.textContent = mensaje;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 4000);
  }
}

function consultarAPI() {
  const { moneda, criptomoneda } = objBusqueda;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((cotizacion) => {
      mostrarCotizacion(cotizacion.DISPLAY[criptomoneda][moneda]);
    });
}

function mostrarCotizacion(cotizacion) {
  limpiarHTML();

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.innerHTML = `Precio: <span>${PRICE}</span>`;

  const precioMasAlto = document.createElement("p");
  precioMasAlto.innerHTML = `Máximo en el dia: <span>${HIGHDAY}</span>`;

  const precioMasBajo = document.createElement("p");
  precioMasBajo.innerHTML = `Mínimo en el dia: <span>${LOWDAY}</span>`;

  const ultimasHoras = document.createElement("p");
  ultimasHoras.innerHTML = `Ultimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

  const ultimaActualizacion = document.createElement("p");
  ultimaActualizacion.innerHTML = `Ultima actualización: <span>${LASTUPDATE}</span>`;

  resultado.appendChild(precio);
  resultado.appendChild(precioMasAlto);
  resultado.appendChild(precioMasBajo);
  resultado.appendChild(ultimasHoras);
  resultado.appendChild(ultimaActualizacion);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Particulas


particlesJS(
    {
        "particles": {
          "number": {
            "value": 149,
            "density": {
              "enable": false,
              "value_area": 1282.7296486924183
            }
          },
          "color": {
            "value": "#1672c3"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 4,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#e8e8e8",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "bottom-right",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      }
);

