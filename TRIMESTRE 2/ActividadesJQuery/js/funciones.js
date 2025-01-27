$(document).ready(function () {
    const $btnIniciarSesion = $('#btn-iniciar-sesion');
    const $btnCrearCuenta = $('#btn-crear-cuenta');
    const $formIniciarSesion = $('#form-iniciar-sesion');
    const $formCrearCuenta = $('#form-crear-cuenta');
    const $contenedorPrincipal = $('.contenedorPrincipal');

    // Mostrar el formulario de iniciar sesión
    $btnIniciarSesion.on('click', function () {
        $contenedorPrincipal.hide();
        $formCrearCuenta.hide();
        $formIniciarSesion.fadeIn();
    });

    // Mostrar el formulario de crear cuenta
    $btnCrearCuenta.on('click', function () {
        $contenedorPrincipal.hide();
        $formIniciarSesion.hide();
        $formCrearCuenta.fadeIn();
    });

    // Validar campos vacíos y activar botón
    const $inputsCrearCuenta = $formCrearCuenta.find('input[type="text"], input[type="password"]');
    const $checkboxTerminos = $('#terminos');
    const $botonCrear = $('#btn-crear');

    $inputsCrearCuenta.on('blur', function () {
        const campoVacio = !$(this).val().trim();
        $(this).toggleClass('error', campoVacio);
        $(this).siblings('.mensaje-error').toggle(campoVacio);
        toggleBotonCrear();
    });
    

    $checkboxTerminos.on('change', toggleBotonCrear);

    function toggleBotonCrear() {
        const camposCompletos = $inputsCrearCuenta.toArray().every(input => $(input).val().trim() !== '');
        const terminosAceptados = $checkboxTerminos.is(':checked');
        $botonCrear.prop('disabled', !(camposCompletos && terminosAceptados));
    }

    // Mostrar/ocultar contraseña
    $('.mostrar-contrasena').on('click', function () {
        const $input = $(this).siblings('input');
        const tipo = $input.attr('type') === 'password' ? 'text' : 'password';
        $input.attr('type', tipo);
    });
});
