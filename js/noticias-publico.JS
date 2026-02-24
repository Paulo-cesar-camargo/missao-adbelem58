function carregarNoticias() {

    const lista = document.getElementById("listaNoticias");
    if (!lista) return;

    lista.innerHTML = "";

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    if (noticias.length === 0) {
        lista.innerHTML = "<p>Nenhuma notícia cadastrada ainda.</p>";
        return;
    }

    noticias.forEach((noticia, index) => {

        const resumo = noticia.conteudo.length > 120 
            ? noticia.conteudo.substring(0, 120) + "..." 
            : noticia.conteudo;

        const card = `
            <div class="card-noticia" onclick="abrirNoticia(${index})">
                
                ${noticia.imagem ? 
                    `<img src="${noticia.imagem}" alt="Imagem da notícia">` 
                    : ""}

                <div class="card-content">
                    <h3>${noticia.titulo}</h3>
                    <p>${resumo}</p>
                </div>
            </div>
        `;

        lista.innerHTML += card;
    });
}

function abrirNoticia(index) {
    window.location.href = `noticia.html?id=${index}`;
}

window.onload = carregarNoticias;