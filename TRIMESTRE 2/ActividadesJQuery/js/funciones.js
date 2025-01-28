$(document).ready(function() {
    // Cambiar de secciones
    $('#boton-iniciar-sesion').click(function() {
      $('#seccion-acceso').fadeOut(function() {
        $('#formulario-iniciar-sesion').fadeIn();
      });
    });
  
    $('#boton-crear-cuenta').click(function() {
      $('#seccion-acceso').fadeOut(function() {
        $('#opciones-registro').fadeIn();
      });
    });
  
    $('#boton-proveedor').click(function() {
      $('#opciones-registro').fadeOut(function() {
        $('#formulario-proveedor').fadeIn();
      });
    });
  
    $('#boton-cliente').click(function() {
      $('#opciones-registro').fadeOut(function() {
        $('#formulario-cliente').fadeIn();
      });
    });
  
    // Validar campos y habilitar botón
    $('input').on('change', function() {
      let formulario = $(this).closest('.formulario');
      let habilitar = true;
  
      formulario.find('input').each(function() {
        if ($(this).val().trim() === '' || ($(this).attr('type') === 'checkbox' && !$(this).is(':checked'))) {
          habilitar = false;
        }
      });
  
      formulario.find('button').prop('disabled', !habilitar);
    });
  
    // Mostrar mensaje de error si un campo está vacío
    $('input').blur(function() {
      if ($(this).val().trim() === '') {
        $(this).addClass('error');
        if (!$(this).next('.mensaje-error').length) {
          $(this).after('<div class="mensaje-error">No se puede dejar en blanco</div>');
        }
      } else {
        $(this).removeClass('error');
        $(this).next('.mensaje-error').remove();
      }
    });
  
    // Mostrar u ocultar contraseñas
    $('.icono-ojo').click(function() {
      let input = $(this).siblings('input');
      if (input.attr('type') === 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });
  
    // Cambiar colores en mouseenter
    $('.boton').mouseenter(function() {
      $(this).css('background-color', '#1b74e4');
    }).mouseleave(function() {
      $(this).css('background-color', '');
    });
  
    // Mostrar mensaje al enviar formularios
    $('#enviar-proveedor, #enviar-cliente').click(function() {
      $(this).closest('.formulario').fadeOut(function() {
        $('.contenedor').html('<div class="titulo">Gracias por crear tu cuenta</div>');
      });
    });
  });
  