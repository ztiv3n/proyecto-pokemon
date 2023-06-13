const seccion_seleccionar_mascota = document.getElementById(
  "seccion-seleccionar-mascota"
);
const contenedor_de_tarjetas = document.getElementById(
  "contenedor-de-tarjetas"
);
const boton_seleccionar_mascota = document.getElementById(
  "boton-seleccionar-mascota"
);

const seccion_seleccionar_ataques = document.getElementById(
  "seccion-seleccionar-ataques"
);

const parrafo_mascota_jugador = document.getElementById(
  "parrafo-mascota-jugador"
);
const parrafo_mascota_enemigo = document.getElementById(
  "parrafo-mascota-enemigo"
);

const contenedor_ataques_jugador = document.getElementById(
  "contenedor-ataques-jugador"
);

const parrafo_victorias_jugador = document.getElementById(
  "parrafo-victorias-jugador"
);

const contenedor_ataques_enemigo = document.getElementById(
  "contenedor-ataques-enemigo"
);
const parrafo_victorias_enemigo = document.getElementById(
  "parrafo-victorias-enemigo"
);

const contenedor_de_todos_los_ataques_jugador = document.getElementById(
  "contenedor-de-todos-los-ataques-jugador"
);

const imagen_mascota_jugador = document.getElementById(
  "imagen-mascota-jugador"
);

const contenedor_de_todos_los_ataques_enemigo = document.getElementById(
  "contenedor-de-todos-los-ataques-enemigo"
);

const imagen_mascota_enemigo = document.getElementById(
  "imagen-mascota-enemigo"
);

const parrafo_de_resultados = document.getElementById("parrafo-de-resultados");
const boton_reinicio = document.getElementById("boton-reinicio");

const seccion_mostrar_mapa = document.getElementById("mostrar-mapa");
const mapa = document.getElementById("mapa");

let listado_de_pokemones = [];
let pokemon_elegido_x_jugador = {};
let lista_de_botones_de_ataque_jugador = [];
let pokemon_elegido_x_enemigo = {};
let lista_de_botones_de_ataque_enemigo = [];

let ataque_del_jugador = "";
let ataque_del_enemigo = "";
let icono_jugador = "";
let icono_enemigo = "";
let victorias_jugador = 0;
let victorias_enemigo = 0;
let contador_de_ataques = 0;

class Pokemon {
  constructor(nombre, imagen, ataques) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.victorias = 0;
    this.ataques = ataques;
  }
}

let Squirtle = new Pokemon(
  "Squirtle",
  "./imagenes/mokepons_mokepon_hipodoge_attack.png",
  [
    ["Agua", "💧"],
    ["Agua", "💧"],
    ["Agua", "💧"],
    ["Fuego", "🔥"],
    ["Tierra", "🌱"],
  ]
);

let Charmander = new Pokemon(
  "Charmander",
  "./imagenes/mokepons_mokepon_ratigueya_attack.png",
  [
    ["Agua", "💧"],
    ["Fuego", "🔥"],
    ["Fuego", "🔥"],
    ["Fuego", "🔥"],
    ["Tierra", "🌱"],
  ]
);

let Bulbasaur = new Pokemon(
  "Bulbasaur",
  "./imagenes/mokepons_mokepon_capipepo_attack.png",
  [
    ["Agua", "💧"],
    ["Fuego", "🔥"],
    ["Tierra", "🌱"],
    ["Tierra", "🌱"],
    ["Tierra", "🌱"],
  ]
);

listado_de_pokemones.push(Squirtle, Charmander, Bulbasaur);

function iniciar_juego() {
  seccion_mostrar_mapa.style.display = "none";
  seccion_seleccionar_ataques.style.display = "none";
  mostrar_listado_de_pokemones();
}

function mostrar_listado_de_pokemones() {
  listado_de_pokemones.forEach((pokemon) => {
    let nuevo_input_del_pokemon = `<input type="radio" name="mascota-pokemon" id=${pokemon.nombre} >
      <label class="tarjeta-pokemon" for=${pokemon.nombre}>
          <p>${pokemon.nombre}</p>
          <img src=${pokemon.imagen} alt=${pokemon.nombre}>
      </label>`;
    contenedor_de_tarjetas.innerHTML += nuevo_input_del_pokemon;
  });
}

function validar_eleccion_del_jugador() {
  let pokemon_seleccionado = document.querySelector(
    'input[name="mascota-pokemon"]:checked'
  ); // o ('input[type="radio"]:checked')

  if (pokemon_seleccionado == null || pokemon_seleccionado == undefined) {
    alert("No has elegido un pokemon");
    return; // este return evita que se siga ejecutando el código de esta función
  }

  boton_seleccionar_mascota.disabled = true;
  seccion_seleccionar_mascota.style.display = "none";
  seccion_seleccionar_ataques.style.display = "flex";
  boton_reinicio.style.display = "none";

  extraer_ataques(pokemon_seleccionado.id);
}

function extraer_ataques(pokemon_seleccionado) {
  listado_de_pokemones.find((pokemon) => {
    if (pokemon.nombre == pokemon_seleccionado) {
      pokemon_elegido_x_jugador = pokemon;
    }
  });

  parrafo_mascota_jugador.innerHTML = `<p>Tu <br> Pokemon</p> 
  <p>${pokemon_elegido_x_jugador.nombre}</p>`;

  parrafo_mascota_jugador.style.color = "blue"

  parrafo_victorias_jugador.textContent = victorias_jugador;

  imagen_mascota_jugador.innerHTML = `<img src=${pokemon_elegido_x_jugador.imagen} 
  alt=${pokemon_elegido_x_jugador.nombre}>`;

  pokemon_elegido_x_jugador.ataques.forEach((ataque) => {
    let ataque_del_pokemon_jugador = `<button class="boton-ataque-jugador"
    id=${`"boton-${ataque[0]}"`}>${ataque[1]}</button>`;

    contenedor_de_todos_los_ataques_jugador.innerHTML +=
      ataque_del_pokemon_jugador;
  });

  lista_de_botones_de_ataque_jugador = document.querySelectorAll(
    ".boton-ataque-jugador"
  );

  seleccionar_aleatoriamente_el_pokemon_enemigo();
}

function seleccionar_aleatoriamente_el_pokemon_enemigo() {
  let numero_aleatorio = numero_random(0, listado_de_pokemones.length - 1);
  pokemon_elegido_x_enemigo = listado_de_pokemones[numero_aleatorio];

  parrafo_mascota_enemigo.innerHTML = `<p>Pokemon <br> Enemigo</p> 
  <p>${pokemon_elegido_x_enemigo.nombre}</p>`;

  parrafo_mascota_enemigo.style.color = "red"

  parrafo_victorias_enemigo.textContent = victorias_enemigo;

  imagen_mascota_enemigo.innerHTML = `<img src=${pokemon_elegido_x_enemigo.imagen} 
  alt=${pokemon_elegido_x_enemigo.nombre}>`;

  pokemon_elegido_x_enemigo.ataques.forEach((ataque) => {
    let ataque_del_pokemon_enemigo = `<button class="boton-ataque-enemigo" 
    id=${`"boton-${ataque[0]}"`}>${ataque[1]}</button>`;

    contenedor_de_todos_los_ataques_enemigo.innerHTML +=
      ataque_del_pokemon_enemigo;
  });

  let lista_de_botones = document.querySelectorAll(".boton-ataque-enemigo");

  lista_de_botones_de_ataque_enemigo = Array.from(lista_de_botones);

  agregar_escuchador_eventos();
}

function numero_random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function agregar_escuchador_eventos() {
  lista_de_botones_de_ataque_jugador.forEach((boton_de_ataque) => {
    boton_de_ataque.addEventListener("click", () => {
      boton_de_ataque.disabled = true;
      boton_de_ataque.style.background = "rgb(0, 60, 255)";
      ataque_del_jugador = boton_de_ataque.textContent;
      ataque_aleatorio_enemigo();
    });
  });
}

function ataque_aleatorio_enemigo() {
  let numero_aleatorio = numero_random(
    0,
    lista_de_botones_de_ataque_enemigo.length - 1
  );

  lista_de_botones_de_ataque_enemigo[numero_aleatorio].style.backgroundColor =
    "red";

  ataque_del_enemigo =
    lista_de_botones_de_ataque_enemigo[numero_aleatorio].textContent;

  lista_de_botones_de_ataque_enemigo.splice(numero_aleatorio, 1);

  combate();
}

function combate() {
  if (ataque_del_jugador == ataque_del_enemigo) {
    parrafo_de_resultados.textContent = '"Empate"';
    icono_jugador = "🟡";
    icono_enemigo = "🟡";
    contador_de_ataques = contador_de_ataques + 1;
    crear_mensajes();
  } else if ((ataque_del_jugador == "💧") & (ataque_del_enemigo == "🔥")) {
    parrafo_de_resultados.textContent = '"Ganaste"';
    icono_jugador = "✅";
    icono_enemigo = "❌";
    victorias_jugador = victorias_jugador + 1;
    contador_de_ataques = contador_de_ataques + 1;
    crear_mensajes();
  } else if ((ataque_del_jugador == "🔥") & (ataque_del_enemigo == "🌱")) {
    parrafo_de_resultados.textContent = '"Ganaste"';
    icono_jugador = "✅";
    icono_enemigo = "❌";
    victorias_jugador = victorias_jugador + 1;
    contador_de_ataques = contador_de_ataques + 1;
    crear_mensajes();
  } else if ((ataque_del_jugador == "🌱") & (ataque_del_enemigo == "💧")) {
    parrafo_de_resultados.textContent = '"Ganaste"';
    icono_jugador = "✅";
    icono_enemigo = "❌";
    victorias_jugador = victorias_jugador + 1;
    contador_de_ataques = contador_de_ataques + 1;
    crear_mensajes();
  } else {
    parrafo_de_resultados.textContent = '"Perdiste"';
    icono_jugador = "❌";
    icono_enemigo = "✅";
    victorias_enemigo = victorias_enemigo + 1;
    contador_de_ataques = contador_de_ataques + 1;
    crear_mensajes();
  }
}

function crear_mensajes() {
  let nuevo_parrafo_jugador = document.createElement("p");
  nuevo_parrafo_jugador.innerHTML = `<span class="nuevo_ataque">${ataque_del_jugador} ${icono_jugador}</span>`;
  contenedor_ataques_jugador.appendChild(nuevo_parrafo_jugador);
  parrafo_victorias_jugador.textContent = victorias_jugador;

  let nuevo_parrafo_enemigo = document.createElement("p");
  nuevo_parrafo_enemigo.innerHTML = `<span class="nuevo_ataque">${icono_enemigo} ${ataque_del_enemigo}</span>`;
  contenedor_ataques_enemigo.appendChild(nuevo_parrafo_enemigo);
  parrafo_victorias_enemigo.textContent = victorias_enemigo;
  crear_mensaje_final();
}

function crear_mensaje_final() {
  if (contador_de_ataques == 5) {
    if (victorias_jugador == victorias_enemigo) {
      parrafo_de_resultados.textContent = '"FUE UN EMPATE"';
      parrafo_de_resultados.style.color = "yellow";
    } else if (victorias_jugador > victorias_enemigo) {
      parrafo_de_resultados.textContent = '"HAS GANADO"';
      parrafo_de_resultados.style.color = "#02ff00";
    } else {
      parrafo_de_resultados.textContent = '"HAS PERDIDO"';
      parrafo_de_resultados.style.color = "red";
    }
    boton_reinicio.style.display = "block";
  }
}

function reiniciar_juego() {
  location.reload();
}

window.addEventListener("load", iniciar_juego);
