// Acomoda las ventanas de Terminal en el tablero:
//
//   ┌──────────┬─────────────────────┐
//   │          │      ARRIBA         │
//   │PRINCIPAL ├──────────┬──────────┤
//   │          │  chica 1 │  chica 2 │
//   │          ├──────────┼──────────┤
//   │          │  chica 3 │  chica 4 │
//   └──────────┴──────────┴──────────┘
//
// La ventana que está al frente cuando lo corres queda como PRINCIPAL.
// Si hay más de 6 ventanas, las que sobran se apilan sobre las chicas.
//
// Uso: osascript -l JavaScript organizar.js

ObjC.import("AppKit");

const ANCHO_PRINCIPAL = 0.40; // parte de la pantalla para la ventana principal
const ALTO_ARRIBA = 0.50;     // parte de la derecha para la ventana de arriba
const ESPACIO = 4;            // separación entre ventanas, en puntos

// Colores en RGB de 0 a 65535 (el formato de Terminal)
const COLOR_PRINCIPAL = [7124, 15615, 14967]; // verde azulado
const COLOR_RESTO = [6445, 7460, 9998];       // azul noche
const COLOR_TEXTO = [57514, 57514, 57514];

function areaVisible() {
  // Pantalla sin la barra de menú ni el Dock, con el origen arriba a la izquierda
  const pantalla = $.NSScreen.mainScreen;
  const total = pantalla.frame.size.height;
  const v = pantalla.visibleFrame;
  return {
    x: v.origin.x,
    y: total - v.origin.y - v.size.height,
    ancho: v.size.width,
    alto: v.size.height,
  };
}

function casillas(a) {
  const e = ESPACIO;
  const anchoIzq = Math.round(a.ancho * ANCHO_PRINCIPAL);
  const xDer = a.x + anchoIzq + e;
  const anchoDer = a.x + a.ancho - xDer;
  const altoArriba = Math.round(a.alto * ALTO_ARRIBA);
  const yAbajo = a.y + altoArriba + e;
  const altoAbajo = a.y + a.alto - yAbajo;
  const anchoChica = Math.floor((anchoDer - e) / 2);
  const altoChica = Math.floor((altoAbajo - e) / 2);

  // [izquierda, arriba, derecha, abajo], como pide Terminal
  const caja = (x, y, w, h) => [x, y, x + w, y + h];
  return [
    caja(a.x, a.y, anchoIzq, a.alto),
    caja(xDer, a.y, anchoDer, altoArriba),
    caja(xDer, yAbajo, anchoChica, altoChica),
    caja(xDer + anchoChica + e, yAbajo, anchoChica, altoChica),
    caja(xDer, yAbajo + altoChica + e, anchoChica, altoChica),
    caja(xDer + anchoChica + e, yAbajo + altoChica + e, anchoChica, altoChica),
  ];
}

function run() {
  const terminal = Application("Terminal");
  const ventanas = terminal.windows().filter((w) => {
    try { return w.visible() && !w.miniaturized(); } catch (_) { return false; }
  });
  if (ventanas.length === 0) return "No hay ventanas de Terminal abiertas.";

  const lugares = casillas(areaVisible());
  ventanas.forEach((w, i) => {
    // De la 7.ª en adelante se reparten otra vez entre las 4 chicas
    const lugar = i < lugares.length ? lugares[i] : lugares[2 + ((i - lugares.length) % 4)];
    w.bounds = { x: lugar[0], y: lugar[1], width: lugar[2] - lugar[0], height: lugar[3] - lugar[1] };
    const pestana = w.selectedTab();
    pestana.backgroundColor = i === 0 ? COLOR_PRINCIPAL : COLOR_RESTO;
    pestana.normalTextColor = COLOR_TEXTO;
  });
  return `Listo: ${ventanas.length} ventana(s) en orden.`;
}
