//querySelectorAll para permitir o uso do forEach
const botoesGerar = document.querySelectorAll(".btn-acao-gerar");
const botoesCopiar = document.querySelectorAll(".btn-acao-copiar");
const botoesSalvar = document.querySelectorAll(".btn-acao-salvar");
const inputSenha = document.querySelector(".input-senha");
const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
const listaHistoricos = JSON.parse(localStorage.getItem('listaHistorico')) || [];
const listaFavoritos = JSON.parse(localStorage.getItem('listaFavorito')) || [];

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
// Gera a senha aleatória
function gerarSenha(tamanho) {
    let senha = ""; 
    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres.charAt(indice);
    }
    return senha; 
}
// Copia a senha gerada
function copiarSenha(textoCopiado) {
    textoCopiado = navigator.clipboard.writeText(inputSenha.value);
}

//funcionalidade da aba de histórico
adicionarAoHistorico = (senha, salvar = true) => {
    const classeIcone = listaFavoritos.includes(senha) ? "fa-solid" : "fa-regular";
    const elementoListaHistorico = document.querySelector(".history-item"); 
    const novoItem = document.createElement("li");
    
    novoItem.innerHTML = `
        <input class="input-history" type="text" value="${senha}">
        <button class="btn-primary btn-acao-copiar-historico">Copiar</button>
        <button class="btn-primary btn-primary--icon btn-acao-salvar">
            <i class="${classeIcone} fa-bookmark"></i>
        </button>
    `;
    
    elementoListaHistorico.prepend(novoItem); 

    // Evento de Copiar
    const botaoCopiarHistorico = novoItem.querySelector(".btn-acao-copiar-historico");
    botaoCopiarHistorico.addEventListener("click", () => {
        navigator.clipboard.writeText(senha);
        popUp();
    });

    // Evento de Salvar/Favoritar
    const botaoSalvarHistorico = novoItem.querySelector(".btn-acao-salvar");
    botaoSalvarHistorico.addEventListener("click", () => {
        const icone = novoItem.querySelector("i");
        if (icone.classList.contains("fa-regular")) {
            icone.classList.replace("fa-regular", "fa-solid");
            senhasSalvas(senha);


            if (!listaFavoritos.includes(senha)) {
                listaFavoritos.push(senha);
                localStorage.setItem('listaFavorito', JSON.stringify(listaFavoritos));
            }
        } else {
            icone.classList.replace("fa-solid", "fa-regular");
            const itemNaTela = document.querySelector(".saved-item").querySelector(`[data-senha="${senha}"]`);
            if (itemNaTela) itemNaTela.remove();
            
            const index = listaFavoritos.indexOf(senha);
            if (index > -1) {
                listaFavoritos.splice(index, 1);
                localStorage.setItem('listaFavorito', JSON.stringify(listaFavoritos));
            }
        }
    });

    // 2. Agora o .push() vai funcionar na array global corretamente!
    if(salvar){
        listaHistoricos.push(senha);
        localStorage.setItem('listaHistorico', JSON.stringify(listaHistoricos)); 
    }
}
//Funcionalidade das senhas salvas
senhasSalvas = (senha,salvar) =>{
    const listaSalva = document.querySelector(".saved-item");

    // Validação: Se já existe esse data-senha na tela, não adiciona de novo
    if (listaSalva.querySelector(`[data-senha="${senha}"]`)) return;

    const senhaSalva = document.createElement("li");
    senhaSalva.setAttribute("data-senha", senha);
    senhaSalva.innerHTML = `
        <input class="input-history" type="text" value="${senha}">
        <button class="btn-primary btn-acao-copiar">Copiar</button>
    `;
    listaSalva.append(senhaSalva);

  const botaoCopiarSalvo = senhaSalva.querySelector(".btn-acao-copiar");
    botaoCopiarSalvo.addEventListener("click", () => {
        navigator.clipboard.writeText(senha);
        popUp();
    });

    if(salvar){
        listaFavoritos.push(senha);
        localStorage.setItem('listaFavorrito', JSON.stringify(listaFavoritos)); 
    }
    
}

//evento dos botões Copiar,Gerar
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

botoesSalvar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const senha = inputSenha.value; 
        const icone = botao.querySelector("i");
        
        if (senha.trim() === "") return; 

        
        
    });
});

listaHistoricos.forEach(senha => {
    adicionarAoHistorico(senha,false);
});

listaFavoritos.forEach(senha =>{
    senhasSalvas(senha,false);
})












