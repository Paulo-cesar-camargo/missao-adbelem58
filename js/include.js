function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            // Depois que o header carregar, ativar menu
            iniciarMenu();
        });
}

function iniciarMenu() {

    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    if (!toggle || !menu) return;

    // Criar overlay (uma vez só)
    let overlay = document.querySelector(".menu-overlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.classList.add("menu-overlay");
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        menu.classList.toggle("ativo");
        overlay.classList.toggle("ativo");
    }

    // Abrir/fechar ao clicar no hamburguer
    toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Fechar ao clicar no overlay
    overlay.addEventListener("click", function () {
        menu.classList.remove("ativo");
        overlay.classList.remove("ativo");
    });

    // Fechar ao clicar fora
    document.addEventListener("click", function (e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove("ativo");
            overlay.classList.remove("ativo");
        }
    });

    // Fechar ao clicar em link
    const links = menu.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", function () {
            menu.classList.remove("ativo");
            overlay.classList.remove("ativo");
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header", "components/header.html");
});