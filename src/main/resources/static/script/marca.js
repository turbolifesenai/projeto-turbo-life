const API_URL = "http://localhost:8080/api/marcas";

let idEdicao = null;
let listaCompletaMarcas = [];

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
    
    carregarMarcas();
});

async function carregarMarcas() {
    try {
        const resp = await fetch(API_URL);
        listaCompletaMarcas = await resp.json();
        exibirMarcas(listaCompletaMarcas);
    } catch (e) {
        console.error("Erro ao carregar marcas:", e);
    }
}

function exibirMarcas(marcas) {
    const lista = document.getElementById("listaMarcas"); // Certifique-se que esse ID existe no HTML de marcas
    if (!lista) return;
    lista.innerHTML = "";

    marcas.forEach((marca) => {
        lista.innerHTML += `
            <div class="card-carro">
                <img src="${marca.logoUrl || 'https://via.placeholder.com/150'}" class="img-carro">
                <h3>${marca.nome}</h3>
                <p>${marca.paisDeOrigem || 'País não informado'}</p>
                <div class="card-btns">
                    <button class="btn editar" onclick="editarMarca(${marca.id})">Editar</button>
                    <button class="btn excluir" onclick="removerMarca(${marca.id})">Excluir</button>
                </div>
            </div>`;
    });
}

async function salvarMarca(event) {
    event.preventDefault();

    const marca = {
        nome: document.getElementById("nome").value,
        paisDeOrigem: document.getElementById("paisDeOrigem").value,
        logoUrl: document.getElementById("capaUrl").value // Nota: O ID no HTML é capaUrl, mas na API é logoUrl
    };

    const method = idEdicao ? "PUT" : "POST";
    const url = idEdicao ? `${API_URL}/${idEdicao}` : API_URL;

    await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(marca)
    });

    fecharModal();
    carregarMarcas();
}

async function editarMarca(id) {
    const resp = await fetch(`${API_URL}/${id}`);
    const marca = await resp.json();

    document.getElementById("nome").value = marca.nome;
    document.getElementById("paisDeOrigem").value = marca.paisDeOrigem;
    document.getElementById("capaUrl").value = marca.logoUrl;

    idEdicao = id;
    abrirModal();
}

async function removerMarca(id) {
    if (confirm("Excluir marca?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        carregarMarcas();
    }
}

// Funções de Modal
function abrirModal() { 
    document.getElementById("modal").style.display = "flex"; 
    document.getElementById("tituloModal").innerText = idEdicao ? "Editar Marca" : "Cadastrar Marca";
}
function fecharModal() { 
    document.getElementById("modal").style.display = "none"; 
    document.getElementById("formCadastro").reset();
    idEdicao = null;
}