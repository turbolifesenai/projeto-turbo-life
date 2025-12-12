const API = "http://localhost:8080/api/carros";

let listaCompleta = [];

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
    limparFormulario();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("modal").style.display = "none";
    listarCarros();
});

async function listarCarros() {
    try {
        const resp = await fetch(API);
        listaCompleta = await resp.json();

        exibirCarros(listaCompleta);

    } catch (e) {
        console.error("Erro ao listar carros:", e);
    }
}

function exibirCarros(carros) {
    const container = document.getElementById("listaCarros");
    container.innerHTML = "";

    carros.forEach(carro => {
        container.innerHTML += `
            <div class="card-carro">
                <img src="${carro.capaUrl || 'https://via.placeholder.com/300'}" class="img-carro">

                <h3>${carro.modelo}</h3>
                <p><strong>Porte:</strong> ${carro.porte}</p>
                <p><strong>Ano:</strong> ${carro.anoLancamento}</p>
                <p><strong>Descrição:</strong> ${carro.descricao}</p>

                <div class="card-btns">
                    <button class="btn editar" onclick="editarCarro(${carro.id})">Editar</button>
                    <button class="btn excluir" onclick="excluirCarro(${carro.id})">Excluir</button>
                </div>
            </div>
        `;
    });
}

function filtrarCarros() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = listaCompleta.filter(carro =>
        carro.modelo.toLowerCase().includes(termo) ||
        carro.id.toString().includes(termo)
    );

    exibirCarros(filtrados);
}

async function salvarCarro(event) {
    event.preventDefault();

    const id = document.getElementById("carroId").value;
    const modelo = document.getElementById("modelo").value;
    const porte = document.getElementById("porte").value;
    const anoLancamento = document.getElementById("ano").value;
    const descricao = document.getElementById("descricao").value;
    const capaUrl = document.getElementById("capaUrl").value;

    const carro = { modelo, porte, anoLancamento, descricao, capaUrl };

    try {
        if (id) {
            await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(carro)
            });
        } else {
            await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(carro)
            });
        }

        fecharModal();
        listarCarros();

    } catch (e) {
        console.error("Erro ao salvar:", e);
    }
}

async function editarCarro(id) {
    try {
        const resp = await fetch(`${API}/${id}`);
        const carro = await resp.json();

        document.getElementById("carroId").value = carro.id;
        document.getElementById("modelo").value = carro.modelo;
        document.getElementById("porte").value = carro.porte;
        document.getElementById("ano").value = carro.anoLancamento;
        document.getElementById("descricao").value = carro.descricao;
        document.getElementById("capaUrl").value = carro.capaUrl;

        abrirModal();

    } catch (e) {
        console.error("Erro ao carregar carro:", e);
    }
}

async function excluirCarro(id) {
    if (!confirm("Deseja excluir este carro?")) return;

    try {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        listarCarros();
    } catch (e) {
        console.error("Erro ao excluir:", e);
    }
}

function limparFormulario() {
    document.getElementById("carroId").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("porte").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("capaUrl").value = "";
}