/* =========================
   NOTÍCIA INDIVIDUAL
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    let noticias = JSON.parse(localStorage.getItem("noticias"));

    const container = document.getElementById("noticiaCompleta");

    if (!noticias) {
        container.innerHTML = "<p>Nenhuma notícia salva no navegador.</p>";
        return;
    }

    if (id !== null && noticias[parseInt(id)]) {

        const noticia = noticias[parseInt(id)];

        container.innerHTML = `
            ${noticia.imagem ? 
                `<img src="${noticia.imagem}" style="width:100%;max-height:400px;object-fit:cover;border-radius:10px;">`
                : ""}

            <h1 style="margin-top:20px;">${noticia.titulo}</h1>
            <p style="margin-top:15px;line-height:1.6;">
                ${noticia.conteudo}
            </p>
        `;

    } else {
        container.innerHTML = "<p>Notícia não encontrada.</p>";
    }

});