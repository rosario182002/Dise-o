$(document).ready(function () {
  console.log("entra");
  //comprobar si existe la variable de sesion
  if (sessionStorage.getItem("cookie") != 1) {
    //si la cookie no existe muestrame el mensaje
    $(".cookies").show();
  }

  $(".aceptar").on("click", function () {
    //si damos al boton aceptar guardame la cookie
    $(".cookies").hide();
    sessionStorage.setItem("cookie", 1); // Guarda el valor
    //sessionStorage.clear()  // limpia de cookies este realmente no lo usamos porque queremos que se queden guardadas para comodidad del  usuario

    //BOOTSTRAP
    let myModal = new bootstrap.Modal($("#exampleModal")[0]);
    myModal.show();
    $("#exampleModal button").on("click", function () {
      //si damos al boton aceptar guardame la cookie
      myModal.hide();
      sessionStorage.setItem("modal", 1);
    });
  });
});
