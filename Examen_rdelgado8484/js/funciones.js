$(document).ready(function () {
    function validarFormulario() {
      let formularioLleno = true;
  
      $(".cliente :input[required], .cliente input, .cliente select").each(function () {
        if ($(this).val().trim() === "") {
          formularioLleno = false;
        }
        if (!$("#terminos2").prop("checked")) {
          formularioLleno = false;
        }
      });
  
      $("#submit-btn2").prop("disabled", !formularioLleno);
    }
  
    $(".cliente :input, .cliente select").on("change", function () {
      validarFormulario();
    });
  });
  

  $(".cliente").on("submit", function (e) {
    e.preventDefault(); 
  
    
    $(".cliente").fadeOut(500, function () {
      $(".mensaje-exito").fadeIn(500); 
    });

});

const btnCookie = document.getElementById("btnCookie");
btnCookie.addEventListener("click", (e) => {
    btnCookie.parentElement.remove();
});