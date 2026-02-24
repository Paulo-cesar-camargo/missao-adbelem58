// ===============================
// MENU HAMBURGUER PROFISSIONAL
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    // Criar overlay dinamicamente
    const overlay = document.createElement("div");
    overlay.classList.add("menu-overlay");
    document.body.appendChild(overlay);

    // Abrir / fechar menu
    function toggleMenu() {
        menu.classList.toggle("ativo");
        overlay.classList.toggle("ativo");
    }

    // Clique no botão hamburguer
    toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Clique no overlay fecha
    overlay.addEventListener("click", function () {
        toggleMenu();
    });

    // Clique fora do menu fecha
    document.addEventListener("click", function (e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove("ativo");
            overlay.classList.remove("ativo");
        }
    });

    // Fecha ao clicar em qualquer link
    const links = menu.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", function () {
            menu.classList.remove("ativo");
            overlay.classList.remove("ativo");
        });
    });

});

/*CARROSSEL */

let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}, 4000);

