const API_URL = "http://localhost:8080/api/marca";

let idEdicao = null;
let listaCompletaMarcas = [];

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("tituloModal").innerText = idEdicao ? "Editar Marca" : "Cadastrar Marca";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("formCadastro").reset();
    idEdicao = null;
}

async function carregarMarcas() {
    const resposta = await fetch(API_URL);
    listaCompletaMarcas = await resposta.json();

    exibirMarcas(listaCompletaMarcas);
}

function exibirMarcas(marcas) {
    const lista = document.getElementById("listaMarcas");
    lista.innerHTML = "";

    marcas.forEach((marca) => {
        lista.innerHTML += `
            <div class="card-carro">
                <img src="${marca.logoUrl || 'https://via.placeholder.com/2'}" class="img-carro">

                <h3>${marca.nome}</h3>

                <div class="card-btns">
                    <button class="btn editar" onclick="editarMarca(${marca.id})">Editar</button>
                    <button class="btn excluir" onclick="removerMarca(${marca.id})">Excluir</button>
                </div>
            </div>
        `;
    });
}

function filtrarMarcas() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();

    const filtradas = listaCompletaMarcas.filter(m => 
        m.nome.toLowerCase().includes(termo) ||
        m.id.toString().includes(termo)
    );

    exibirMarcas(filtradas);
}

async function salvarMarca(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const paisDeOrigem = document.getElementById("paisDeOrigem").value;
    const logoUrl = document.getElementById("capaUrl").value;

    const marca = { nome, logoUrl, paisDeOrigem };

    if (idEdicao) {
        await fetch(`${API_URL}/${idEdicao}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(marca)
        });

        idEdicao = null;
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(marca)
        });
    }

    fecharModal();
    carregarMarcas();
}

async function editarMarca(id) {
    const resposta = await fetch(`${API_URL}/${id}`);
    const marca = await resposta.json();

    document.getElementById("nome").value = marca.nome;
    document.getElementById("capaUrl").value = marca.capaUrl;

    idEdicao = id;
    abrirModal();
}

async function removerMarca(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarMarcas();
}

carregarMarcas();