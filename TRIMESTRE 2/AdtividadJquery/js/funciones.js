// CAMBIAR DE PRINCIPAL A CUENTA
$("#iniciar").on("click", function () {
  setTimeout(function () {
    $(".contenedor").fadeOut(10);
    var replaced = jQuery("#titulo").html().replace("Acceso", "Cuenta"); // Obtenemos el texto a cambiar
    jQuery("#titulo").html(replaced);
  }, 500);

  setTimeout(function () {
    $(".contenedor2").fadeIn(20);
  }, 500);
});

// EN CUENTA PONER O QUITAR BTN DISABLED
$(document).ready(function () {
  function comprobacion() {
    if ($("#email").val() == "" || $("#pass").val() == "") {
      $(".btn2").attr("disabled", "disabled");
    } else {
      $(".btn2").removeAttr("disabled");
    }
  }
  setInterval(comprobacion, 10);
});

// DE ACCESO A CREAR CUENTA
$("#crear").on("click", function () {
  setTimeout(function () {
    $(".contenedor").fadeOut(10);
    var replaced = jQuery("#titulo").html().replace("Acceso", "Cuenta"); // Obtenemos el texto a cambiar
    jQuery("#titulo").html(replaced);
  }, 500);

  setTimeout(function () {
    $(".contenedor3").fadeIn(20);
  }, 200);
});

// IR AL FORM DE PROVEEDOR
$("#uno").on("click", function () {
  setTimeout(function () {
    $(".contenedor3").fadeOut(10);
    var replaced = jQuery("#titulo")
      .html()
      .replace("Cuenta", "Crear una cuenta Proveedor"); // Obtenemos el texto a cambiar
    jQuery("#titulo").html(replaced);
  }, 500);

  setTimeout(function () {
    $(".proveedor").fadeIn(20);
  }, 500);
});

//en form proveedor el calendario
$(document).ready(function () {
  for (let i = 2024; i >= 1900; i--) {
    $("#year").append(`<option value="${i}">${i}</option>`);
  }
  for (let i = 1; i <= 12; i++) {
    $("#month").append(`<option value="${i}">${i}</option>`);
  }
  for (let i = 1; i <= 31; i++) {
    $("#day").append(`<option value="${i}">${i}</option>`);
  }
});

//IR AL FORM CLIENTE
$("#dos").on("click", function () {
  setTimeout(function () {
    $(".contenedor3").fadeOut(10);
    var replaced = jQuery("#titulo")
      .html()
      .replace("Cuenta", "Crear una cuenta Cliente"); // Obtenemos el texto a cambiar
    jQuery("#titulo").html(replaced);
  }, 500);

  setTimeout(function () {
    $(".cliente").fadeIn(20);
  }, 500);
});

// PONER LOS INPUT ROJOS Y MENSAJE EN PROVEEDOR
$(function () {
  $(".proveedor :input").on("blur", function () {
    var $input = $(this);
    var $inputType = $input.prop("type");
    $input.next(".msg-error").remove(); //primero quito el error
    if ($input.val().trim() === "") {
      if ($inputType !== "password" && !$input.is("select")) {
        //compruebo si esta
        $input.css({
          "background-color": "#ffe4e4",
          border: "2px solid red",
        });
        $input.after(
          '<span class="msg-error">No se puede dejar en blanco</span>'
        );
      } else if ($inputType === "password") {
        //si es tipo password cojo el div anterior y le coloco los estilos
        let $div = $input.closest("div.pass");
        $div.css({
          "background-color": "#ffe4e4",
          border: "2px solid red",
        });
        $input.css({
          "background-color": "#ffe4e4",
        });
        // coloco el mensaje despues del div
        $div.after(
          '<span class="msg-error">No se puede dejar en blanco</span>'
        );
      } else {
        $input.css({
          "background-color": "#ffe4e4",
          border: "2px solid red",
        });
        //comprobar que los select estan en rojo para sacar el mensaje
        if (
          $("#year").css("border-color") === "red" ||
          $("#day").css("border-color") === "red" ||
          $("#month").css("border-color") === "red"
        ) {
          let $div = $input.closest("div");
          $div.after(
            '<span class="msg-error">No se puede dejar en blanco</span>'
          );
        }
      }
    } else {
      $input.next(".msg-error").remove();
      // Restaurar estilos si el campo ya no está vacío
      $input.css({
        "background-color": "white",
        border: "none",
      });
    }
  });
});

//QUE LA CONTRASEÑA SE VEA SI SE PINCHA EN EL OJO Y QUE CAMBIE EL ICONO
$(document).ready(function () {
  $(".pass #icon").on("click", function () {
    let $icon = $(this).find("i"); // Encuentra el ícono dentro del span
    let $input = $(this).siblings("input"); // Encuentra el input asociado

    if ($input.attr("type") === "password") {
      $input.attr("type", "text"); // Muestra la contraseña
      $icon.removeClass("fa-eye-slash").addClass("fa-eye"); // Cambia el ícono
    } else {
      $input.attr("type", "password"); // Oculta la contraseña
      $icon.removeClass("fa-eye").addClass("fa-eye-slash"); // Cambia el ícono
    }
  });
});

//PONER LOS INPUT EN ROJO Y MENSAJE EN CLIENTE
$(function () {
  $(".cliente :input").on("blur", function () {
    var $input = $(this);
    var $inputType = $input.prop("type");
    $input.next(".msg-error").remove(); //primero quito el error

    if ($input.val().trim() === "") {
      if ($inputType !== "password") {
        //compruebo si esta

        $input.css({
          "background-color": "#ffe4e4",
          border: "2px solid red",
        });
        $input.after(
          '<span class="msg-error">No se puede dejar en blanco</span>'
        );
      } else if ($inputType === "password") {
        //si es tipo password cojo el div cercano y le coloco los estilos
        let $div = $input.closest("div.pass");
        $div.css({
          "background-color": "#ffe4e4",
          border: "2px solid red",
        });
        $input.css({
          "background-color": "#ffe4e4",
        });
        // coloco el mensaje despues del div
        $div.after(
          '<span class="msg-error">No se puede dejar en blanco</span>'
        );
      }
    } else {
      $input.next(".msg-error").remove();
      // Restaurar estilos si el campo ya no está vacío
      $input.css({
        "background-color": "white",
        border: "none",
      });
    }
  });
});

//HABILITAR EL BOTON CUANDO TODO ESTE RELLENO en proveedor

$(document).ready(function () {
  function validarFormulario() {
    //vemos si esta todo relleno
    let formularioLleno = true;

    $(".proveedor :input[required], .proveedor input, .proveedor select").each(
      function () {
        //vemos si los valores estan vacios
        if ($(this).val().trim() === "") {
          formularioLleno = false;
        }
        if (!$("#terminos").prop("checked")) {
          //o si el checkbox no esta marcado
          formularioLleno = false;
        }
      }
    );

    // si estan llenos lo habilitamos
    $("#submit-btn").prop("disabled", !formularioLleno);
  }

  // revisamos cada vez que cambia un input o salimos de el
  $(".proveedor :input, .proveedor select").on("change", function () {
    validarFormulario();
  });
});

// HABILITAR EL BOTON CUANDO TODO ESTE RELLENO EN CLIENTE

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

// Al hacer clic en el botón "Crear cuenta" para el usuario cliente
$(".cliente").on("submit", function (e) {
  e.preventDefault(); // Prevenir el envío del formulario por defecto

  // Aquí puedes hacer alguna validación o enviar datos a un servidor si es necesario
  // Después de eso, mostramos el mensaje de éxito y ocultamos el formulario
  $(".cliente").fadeOut(500, function () {
    $(".mensaje-exito").fadeIn(500); // Mostrar el mensaje de éxito
  });
});