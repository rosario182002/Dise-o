document.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowRight') { // Verifica si se presiona la flecha derecha
      const bloque = document.getElementById('block'); // Obtiene el bloque por su ID
      let contadorMovimientos = 0; // Contador de movimientos realizados
      const maximosMovimientos = 6; // Número máximo de movimientos
      const paso = 10; // Tamaño del desplazamiento en píxeles
  

      const intervalo = setInterval(() => {
        if (contadorMovimientos >= maximosMovimientos) {
          clearInterval(intervalo); // Detiene el intervalo después de 6 movimientos
          return;
        }
        const posicionActualIzquierda = parseInt(window.getComputedStyle(bloque).left, 10);
        bloque.style.left = `${posicionActualIzquierda + paso}px`; // Desplaza el bloque hacia la derecha
        contadorMovimientos++; // Incrementa el contador de movimientos
      }, 250); // 0.25 segundos = 250 ms
    }
  });
  