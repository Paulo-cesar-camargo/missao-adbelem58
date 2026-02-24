/* =========================
   CARREGAR NOTÍCIAS
========================= */
function carregarNoticias() {

    const lista = document.getElementById("listaNoticias");
    if (!lista) return;

    lista.innerHTML = "";

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];
    const adminLogado = localStorage.getItem("adminLogado");

    if (noticias.length === 0) {
        lista.innerHTML = "<p>Nenhuma notícia cadastrada ainda.</p>";
        return;
    }

    noticias.forEach((noticia, index) => {

        const resumo = noticia.conteudo.length > 120 
            ? noticia.conteudo.substring(0, 120) + "..." 
            : noticia.conteudo;

        let botoesAdmin = "";

        // 👇 SÓ MOSTRA SE FOR ADMIN
        if (adminLogado === "true") {
            botoesAdmin = `
                <div class="card-buttons">
                    <button 
                        class="btn-editar" 
                        onclick="event.stopPropagation(); editarNoticia(${index})">
                        Editar
                    </button>

                    <button 
                        class="btn-excluir" 
                        onclick="event.stopPropagation(); excluirNoticia(${index})">
                        Excluir
                    </button>
                </div>
            `;
        }

        const card = `
            <div class="card-noticia" onclick="abrirNoticia(${index})">
                
                ${noticia.imagem ? 
                    `<img src="${noticia.imagem}" alt="Imagem da notícia">` 
                    : ""}

                <div class="card-content">
                    <h3>${noticia.titulo}</h3>
                    <p>${resumo}</p>
                    ${botoesAdmin}
                </div>
            </div>
        `;

        lista.innerHTML += card;
    });
}

function abrirNoticia(index) {
    window.location.href = `noticia.html?id=${index}`;
}


/* =========================
   SALVAR NOTÍCIAS
========================= */

function salvarNoticia() {

    // 🔐 Impede salvar se não for admin
    if (localStorage.getItem("adminLogado") !== "true") {
        alert("Acesso restrito!");
        return;
    }

    const titulo = document.getElementById("titulo").value;
    const conteudo = document.getElementById("conteudo").value;
    const file = document.getElementById("imagemUpload").files[0];
    const editIndex = document.getElementById("editIndex").value;

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            salvarComImagem(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        salvarComImagem("");
    }

    function salvarComImagem(imagemBase64) {
        if (editIndex === "") {
            noticias.push({ titulo, conteudo, imagem: imagemBase64 });
        } else {
            noticias[editIndex] = { titulo, conteudo, imagem: imagemBase64 };
        }

        localStorage.setItem("noticias", JSON.stringify(noticias));
        carregarNoticias();
    }
}


function editarNoticia(index) {

    if (localStorage.getItem("adminLogado") !== "true") return;

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];
    const noticia = noticias[index];

    document.getElementById("titulo").value = noticia.titulo;
    document.getElementById("conteudo").value = noticia.conteudo;
    document.getElementById("editIndex").value = index;
}


function excluirNoticia(index) {

    if (localStorage.getItem("adminLogado") !== "true") return;

    let noticias = JSON.parse(localStorage.getItem("noticias")) || [];
    noticias.splice(index, 1);
    localStorage.setItem("noticias", JSON.stringify(noticias));
    carregarNoticias();
}

window.onload = carregarNoticias;


/* =========================
   LOGIN ADMIN
========================= */

const senhaCorreta = "1234";

function verificarSenha() {

    const senha = document.getElementById("senhaAdmin").value;

    if (senha === senhaCorreta) {

        localStorage.setItem("adminLogado", "true");

        document.getElementById("adminLogin").style.display = "none";
        document.getElementById("adminBox").style.display = "block";

        carregarNoticias();

    } else {
        alert("Senha incorreta!");
    }
}

function logoutAdmin() {
    localStorage.removeItem("adminLogado");
    location.reload();
}