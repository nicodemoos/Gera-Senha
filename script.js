//querySelectorAll para permitir o uso do forEach
const botoesGerar = document.querySelectorAll(".btn-acao-gerar");
const botoesCopiar = document.querySelectorAll(".btn-acao-copiar");
const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
const botoesSalvar = document.querySelectorAll(".btn-acao-salvar");
const inputSenha = document.querySelector(".input-senha");


function gerarSenha(tamanho) {
    let senhaMontada = ""; 
    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senhaMontada += caracteres.charAt(indice);
    }
    return senhaMontada; 
}

function copiarSenha(textoCopiado) {
    textoCopiado = navigator.clipboard.writeText(inputSenha.value);
}

botoesCopiar.forEach((botao) => {
    botao.addEventListener("click", () => {
        copiarSenha();
        
        // Biblioteca SweetAlert2 para exibir um alerta de sucesso
    Swal.fire({
        title: "Senha Copiada!",
        icon: "success",
        theme: "dark",
        timerProgressBar: true,
        timer: 1500
        });

    });
});

botoesGerar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const senha = gerarSenha(12);
        document.querySelector(".input-senha").value = senha;
        adicionarAoHistorico(senha);
    });
});

botoesSalvar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const icone = botao.querySelector("i");
        if (icone.classList.contains("fa-regular")) {
            icone.classList.replace("fa-regular", "fa-solid");
        } else {
            icone.classList.replace("fa-solid", "fa-regular");
        }
    });
});

adicionarAoHistorico = (senha) => {
    const listaHistorico = document.querySelector(".history-item");
    const novoItem = document.createElement ("li"); 
    novoItem.innerHTML = `
        <input class="input-history" type="text" value="${senha}">
        <button class="btn-primary btn-acao-copiar-historico">Copiar</button>
        <button class="btn-primary btn-primary--icon btn-acao-salvar-historico">
        <i class="fa-regular fa-bookmark"></i>
        </button>
    `;
    listaHistorico.style.display = "block";
    listaHistorico.prepend(novoItem);

    const botaoCopiarHistorico = novoItem.querySelector(".btn-acao-copiar-historico");
botaoCopiarHistorico.addEventListener("click", () => {
        navigator.clipboard.writeText(senha); // Copia a senha específica deste item
        
        Swal.fire({
           title: "Senha Copiada!",
        icon: "success",
        theme: "dark",
        timerProgressBar: true,
        timer: 1500
        });
    });
}
