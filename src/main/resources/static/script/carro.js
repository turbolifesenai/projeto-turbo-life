const API_URL = "http://localhost:8080/api/carros";
const API_MARCAS = "http://localhost:8080/api/marcas";

let listaCompleta = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarMarcasNoSelect(); // Carrega o dropdown
    listarCarros();           // Carrega os cards
    
    // Garante modal fechado ao iniciar
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
});

// --- 1. CARREGAR SELECT DE MARCAS ---
async function carregarMarcasNoSelect() {
    const select = document.getElementById("marcaId");
    if (!select) return;

    try {
        const resp = await fetch(API_MARCAS);
        const marcas = await resp.json();
        
        // Limpa e popula
        select.innerHTML = '<option value="">Selecione uma marca...</option>';
        marcas.forEach(marca => {
            select.innerHTML += `<option value="${marca.id}">${marca.nome}</option>`;
        });
    } catch (e) {
        console.error("Erro ao buscar marcas:", e);
        select.innerHTML = '<option value="">Erro ao carregar marcas</option>';
    }
}

// --- 2. LISTAR CARROS (AQUI ESTAVA FALTANDO A DESCRIÇÃO) ---
async function listarCarros() {
    try {
        const resp = await fetch(API_URL);
        listaCompleta = await resp.json();
        exibirCarros(listaCompleta);
    } catch (e) {
        console.error("Erro ao listar:", e);
    }
}

function exibirCarros(carros) {
    const container = document.getElementById("listaCarros");
    if (!container) return;
    container.innerHTML = "";

    if (carros.length === 0) {
        container.innerHTML = "<p style='color:white; text-align:center; width:100%'>Nenhum carro encontrado.</p>";
        return;
    }

    carros.forEach(carro => {
        // Tratamento de segurança para dados nulos
        const nomeMarca = carro.marca ? carro.marca.nome : "Marca removida";
        const imagem = carro.capaUrl ? carro.capaUrl : "https://via.placeholder.com/300?text=Sem+Imagem";
        const descricao = carro.descricao ? carro.descricao : "Sem descrição.";

        // CORREÇÃO: Adicionei a linha da descrição abaixo do Ano
        container.innerHTML += `
            <div class="card-carro">
                <img src="${imagem}" class="img-carro" onerror="this.src='https://via.placeholder.com/300?text=Erro+Imagem'">
                
                <h3>${carro.modelo}</h3>
                <p><strong>Marca:</strong> ${nomeMarca}</p>
                <p><strong>Porte:</strong> ${carro.porte}</p>
                <p><strong>Ano:</strong> ${carro.anoLancamento}</p>
                <p style="font-size: 0.9em; color: #ccc; margin-top:5px;"><strong>Desc:</strong> ${descricao}</p>
                
                <div class="card-btns">
                    <button class="btn editar" onclick="prepararEdicao(${carro.id})">Editar</button>
                    <button class="btn excluir" onclick="excluirCarro(${carro.id})">Excluir</button>
                </div>
            </div>
        `;
    });
}

// --- 3. SALVAR (CRIAR OU ATUALIZAR) ---
async function salvarCarro(event) {
    event.preventDefault();

    const id = document.getElementById("carroId").value;
    const marcaId = document.getElementById("marcaId").value;
    
    // Captura os valores do formulário
    const modelo = document.getElementById("modelo").value;
    const porte = document.getElementById("porte").value;
    const ano = document.getElementById("ano").value;
    const descricao = document.getElementById("descricao").value;
    const capaUrl = document.getElementById("capaUrl").value;

    // Validação
    if (!marcaId || !porte) {
        alert("Preencha a Marca e o Porte corretamente.");
        return;
    }

    // Objeto Payload
    const carro = {
        modelo: modelo,
        porte: porte, 
        anoLancamento: parseInt(ano), // Força número
        descricao: descricao,
        capaUrl: capaUrl,
        marca: { id: parseInt(marcaId) } // Objeto obrigatório para o Java
    };

    // DEBUG: Veja no console o que está sendo enviado
    console.log("Enviando carro:", carro);

    try {
        const method = id ? "PUT" : "POST";
        const url = id ? `${API_URL}/${id}` : API_URL;

        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carro)
        });

        if (response.ok) {
            fecharModal();
            listarCarros(); // Atualiza a tela com os dados novos
        } else {
            console.error("Erro no backend:", await response.text());
            alert("Erro ao salvar. Verifique o console (F12) para detalhes.");
        }
    } catch (e) {
        console.error("Erro de conexão:", e);
    }
}

// --- 4. PREPARAR EDIÇÃO (POPULAR O FORMULÁRIO) ---
async function prepararEdicao(id) {
    try {
        // Busca os dados ATUAIS do servidor
        const resp = await fetch(`${API_URL}/${id}`);
        const carro = await resp.json();

        // Preenche inputs
        document.getElementById("carroId").value = carro.id;
        document.getElementById("modelo").value = carro.modelo;
        document.getElementById("ano").value = carro.anoLancamento;
        document.getElementById("descricao").value = carro.descricao; // Preenche descrição
        document.getElementById("capaUrl").value = carro.capaUrl;     // Preenche URL

        // Seleciona a Marca no Dropdown
        if (carro.marca) {
            document.getElementById("marcaId").value = carro.marca.id;
        }

        // Seleciona o Porte (com a correção de maiúsculas)
        const selPorte = document.getElementById("porte");
        selPorte.value = carro.porte; 
        if (!selPorte.value && carro.porte) {
            selPorte.value = carro.porte.toUpperCase();
        }

        document.getElementById("tituloModal").innerText = "Editar Carro";
        abrirModal();

    } catch (e) {
        console.error("Erro ao editar:", e);
    }
}

// --- 5. EXCLUIR ---
async function excluirCarro(id) {
    if (confirm("Remover este carro?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        listarCarros();
    }
}

// --- UTILS ---
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("formCadastro").reset();
    document.getElementById("carroId").value = "";
    document.getElementById("tituloModal").innerText = "Cadastrar Carro";
}

function filtrarCarros() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();
    const filtrados = listaCompleta.filter(c => c.modelo.toLowerCase().includes(termo));
    exibirCarros(filtrados);
}