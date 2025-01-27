
 $(document).on('keydown', function(event) {
    let direccion = ''; 


    if (event.key === 'ArrowUp') {
        direccion = 'Arriba';
    } else if (event.key === 'ArrowDown') {
        direccion = 'Abajo';
    } else if (event.key === 'ArrowLeft') {
        direccion = 'Izquierda';
    } else if (event.key === 'ArrowRight') {
        direccion = 'Derecha';
    }

    if (direccion) {
        console.log(`Dirección: ${direccion}`);
    }
});