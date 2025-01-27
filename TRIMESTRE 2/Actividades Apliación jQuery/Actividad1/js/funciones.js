$(document).ready(function(){
        consoleIni();
        let cad = 'test2';
        muestraCadena(cad);

        $('#miBoton').on('click', function(){
            inicio($(this));
        })
});

function consoleIni(){
    console.log("Todo ok");
}

function muestraCadena(cadena){
    console.log(cadena);
    consoleIni();
}

function inicio(boton){
    boton.hide();
}

