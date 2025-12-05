function adicionar() {

    const carro = {
        modelo: document.getElementById("modelo").value,
        ano: document.getElementById("ano").value,
        porte: document.getElementById("porte").value,
        descricao: document.getElementById("descricao").value,
        capaUrl: document.getElementById("capaUrl").value,
        id: document.getElementById("paisOrigem").value

    }
};

fetch("http://localhost:8080/api/carros", {
    method: "POST",
    headers {content}
})