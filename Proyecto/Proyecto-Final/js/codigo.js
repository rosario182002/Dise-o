document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-hamburguesa");
    const navegacion = document.getElementById("navegacion");

    menuBtn.addEventListener("click", () => {
        navegacion.classList.toggle("activo");
    });
});