//querySelectorAll para permitir o uso do forEach
const botoesGerar = document.querySelectorAll(".btn-acao-gerar");
const botoesCopiar = document.querySelectorAll(".btn-acao-copiar");
const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
const botoesSalvar = document.querySelectorAll(".btn-acao-salvar");
const inputSenha = document.querySelector(".input-senha");
const listaAntiga = JSON.parse(localStorage.getItem('listaHistorico')) || [];

// Biblioteca SweetAlert2 para exibir um alerta de sucesso
function popUp(){
    Swal.fire({
        title: "Senha Copiada!",
        icon: "success",
        theme: "dark",
        timerProgressBar: true,
        timer: 1500,
        confirmButtonColor: "#33A8CC"
        });
}

function gerarSenha(tamanho) {
    let senha = ""; 
    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres.charAt(indice);
    }
    return senha; 
}

function copiarSenha(textoCopiado) {
    textoCopiado = navigator.clipboard.writeText(inputSenha.value);
}

adicionarAoHistorico = (senha,salvar = true) => {
    
    const listaHistorico = document.querySelector(".history-item");
    const novoItem = document.createElement ("li"); 
    novoItem.innerHTML = `
        <input class="input-history" type="text" value="${senha}">
        <button class="btn-primary btn-acao-copiar-historico">Copiar</button>
        <button class="btn-primary btn-primary--icon btn-acao-salvar">
        <i class="fa-regular fa-bookmark"></i>
        </button>
    `;
    
    listaHistorico.prepend(novoItem); //exibe a lista e coloca para o ultimo elemento aparecer em primeiro

    const botaoCopiarHistorico = novoItem.querySelector(".btn-acao-copiar-historico");
        botaoCopiarHistorico.addEventListener("click", () => {
        navigator.clipboard.writeText(senha); // Copia a senha específica deste item
        
        popUp();
    });

    
    const botaoSalvarHistorico = novoItem.querySelector(".btn-acao-salvar");
    
    botaoSalvarHistorico.addEventListener("click",() =>{
        
        const icone = novoItem.querySelector("i");
        if (icone.classList.contains("fa-regular")) {
            icone.classList.replace("fa-regular", "fa-solid");
            senhasSalvas(senha);
        } else {
            icone.classList.replace("fa-solid", "fa-regular");
            document.querySelector(".saved-item").querySelector(`[data-senha="${senha}"]`).remove(); 
            // utilizando o setAttribute da linha 75
        }})

    if(salvar){
        listaAntiga.push(senha);
        localStorage.setItem('listaHistorico', JSON.stringify(listaAntiga)); 
    }
    
}

senhasSalvas = (senha) =>{
    const listaSalva = document.querySelector(".saved-item");
    const senhaSalva = document.createElement("li");
    senhaSalva.setAttribute("data-senha", senha);
    senhaSalva.innerHTML = `
        <input class="input-history" type="text" value="${senha}">
        <button class="btn-primary btn-acao-copiar">Copiar</button>
        <button class="btn-primary btn-primary--icon btn-acao-salvar">
        <i class="fa-regular fa-bookmark"></i>
        </button>
    `
    listaSalva.prepend(senhaSalva);

    const botaoCopiarSalvo = senhaSalva.querySelector(".btn-acao-copiar");
        botaoCopiarSalvo.addEventListener("click", () => {
        navigator.clipboard.writeText(senha); // Copia a senha específica deste item
        
        popUp();
    });
    
}

botoesCopiar.forEach((botao) => {
    botao.addEventListener("click", () => {
        copiarSenha();
        
        
        popUp();

    });
});

botoesGerar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const senha = gerarSenha(8);
        inputSenha.value = senha;
        adicionarAoHistorico(senha);
    });
});

listaAntiga.forEach(senha => {
    adicionarAoHistorico(senha,false);
});







