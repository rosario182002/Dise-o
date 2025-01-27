$(document).ready(function(){
    //Al hacer click al primer botón
    $("#boton2").hide(); //esto lo ponemos al principio por que queremos que lo oculte 
    $("#contenido").hide();//esto lo ponemos al principio por que queremos que lo oculte 
    $("#boton1").on("click", function(){
        $("#contenido").show();//muestra contenido
        $("#boton2").show(); //muestra el segundo botón
        $(this).hide(); //Ocultar el boton
    });

    // Al hacer clic en el segundo botón
    $("#boton2").on("click", function () {
        $("#contenido").hide(); // Ocultar contenido
        $("#boton1").show(); // Mostrar primer botón
        $(this).hide(); // Ocultar este botón
    });
});