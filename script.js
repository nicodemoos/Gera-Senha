const botaoSalvar = document.querySelector(".btn-acao-salvar");
const icone = botaoSalvar.querySelector("i"); 


botaoSalvar.forEach((botao) => {
    botao.addEventListener("click", (evento) => {
        // CORREÇÃO: Buscamos o ícone dentro do botão que recebeu o clique
        const icone = botao.querySelector("i"); 
        
        if (icone.classList.contains("fa-regular")) {
            icone.classList.replace("fa-regular", "fa-solid");
        } else {
            icone.classList.replace("fa-solid", "fa-regular");
        }
    });
});