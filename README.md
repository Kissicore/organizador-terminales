# Organizador de terminales

Acomoda tus ventanas de Terminal (Mac) en un tablero fijo para trabajar con varias sesiones de Claude Code a la vez sin perderte:

```
┌──────────┬─────────────────────┐
│          │      ARRIBA         │
│PRINCIPAL ├──────────┬──────────┤
│          │  chica 1 │  chica 2 │
│          ├──────────┼──────────┤
│          │  chica 3 │  chica 4 │
└──────────┴──────────┴──────────┘
```

- **Principal** (izquierda, verde azulado): tu sesión de trabajo de ahora.
- **Arriba** (azul noche): la segunda tarea importante.
- **4 chicas** (azul noche): las tareas que corren solas y solo vigilas.

Claude Code le pone nombre a cada ventana según su tarea (por ejemplo «✳ Plan de ventas»), así que de un vistazo sabes qué hace cada una.

Se adapta a cualquier pantalla y respeta la barra de menú y el Dock.

## Cómo se usa

1. Descarga esta carpeta (botón verde **Code → Download ZIP**) y descomprímela, por ejemplo en tu Escritorio.
2. Abre Terminal y entra a la carpeta:
   ```
   cd ~/Desktop/organizador-terminales
   ```
3. Elige:
   - **Abrir el tablero completo** (abre las ventanas que falten hasta 6 y arranca Claude Code en cada una nueva):
     ```
     ./abrir.sh
     ```
     También puedes pedir otro número: `./abrir.sh 4`. Si no quieres que arranque Claude, usa `./abrir.sh 6 no`.
   - **Solo ordenar las ventanas que ya tienes abiertas:**
     ```
     osascript -l JavaScript organizar.js
     ```

La ventana desde la que lo corres queda como **principal**. Si tienes más de 6 ventanas, las que sobran se apilan sobre las chicas.

La primera vez, la Mac te pide permiso para que Terminal controle Terminal: dale **Aceptar**.

## Atajos (opcional)

Para no tener que entrar a la carpeta cada vez, abre el archivo `~/.zshrc` y pega al final estas dos líneas (cambia la ruta si guardaste la carpeta en otro lado):

```
alias ordenar='osascript -l JavaScript ~/Desktop/organizador-terminales/organizar.js'
alias terminales='~/Desktop/organizador-terminales/abrir.sh'
```

Cierra y vuelve a abrir Terminal. Desde ahí, con escribir `terminales` o `ordenar` basta.

## Cambiar el tablero

Arriba de todo en `organizar.js` están los números que puedes mover:

| Qué | Dónde | Por defecto |
|---|---|---|
| Ancho de la principal | `ANCHO_PRINCIPAL` | 0.40 (40 % de la pantalla) |
| Alto de la ventana de arriba | `ALTO_ARRIBA` | 0.50 (mitad de la derecha) |
| Separación entre ventanas | `ESPACIO` | 4 |
| Colores | `COLOR_PRINCIPAL`, `COLOR_RESTO` | verde azulado y azul noche |
