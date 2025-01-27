$(document).ready(function(){
    //Ocultamos todos los h2 al cargar la página 

   // $("h2").hide();
    
    //Mostramos los h2 y ocultarlos al pasar el ratón

   /* $("h2").hover(function (){
        $(this).hide();
    });
*/
    //Mostramos los h2 para hacer la función click
    
   // $("h2").show();

    //Ocultamos al hacer el click sobre los h2
    $("h2").on("click", function(){
        $(this).hide();
    })


});