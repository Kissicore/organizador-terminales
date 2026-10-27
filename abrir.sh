#!/bin/bash
# Abre las ventanas que falten para llegar a N (6 por defecto),
# arranca Claude Code en cada una nueva y acomoda todo en el tablero.
#
# Uso: ./abrir.sh        → 6 ventanas
#      ./abrir.sh 4      → 4 ventanas
#      ./abrir.sh 6 no   → 6 ventanas sin arrancar Claude

set -e
AQUI="$(cd "$(dirname "$0")" && pwd)"
TOTAL="${1:-6}"
COMANDO="claude"
[ "$2" = "no" ] && COMANDO=""

ABIERTAS=$(osascript -e 'tell application "Terminal" to count (windows whose visible is true)')
FALTAN=$((TOTAL - ABIERTAS))
PRINCIPAL=$(osascript -e 'tell application "Terminal" to id of front window' 2>/dev/null || echo "")

for ((i = 0; i < FALTAN; i++)); do
  osascript -e "tell application \"Terminal\" to do script \"$COMANDO\"" >/dev/null
done

# La ventana desde la que corriste esto vuelve al frente para quedar como principal
[ -n "$PRINCIPAL" ] && osascript -e "tell application \"Terminal\" to set index of window id $PRINCIPAL to 1" >/dev/null 2>&1 || true
osascript -l JavaScript "$AQUI/organizar.js"
