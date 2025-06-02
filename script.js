const fundo = document.getElementById("fundo");
const addTarefa = document.getElementById("addTarefa");
const inputTarefa = document.getElementById("tarefa");
const idverCard = document.getElementById("idverCard");
const fecharTarefa = document.getElementById("fecharTarefa");
const spanTarefa = document.getElementById("spanTarefa");
const priore = document.getElementById("priore")

let colunaAtual = null;

// Fecha o modal
document.querySelectorAll(".fechar-modal").forEach(item => {
    item.addEventListener("click", () => {
        fundo.style.display = "none";
        inputTarefa.value = "";
        removeEscolhas();
    });
});

fecharTarefa.addEventListener("click", ()=>{
    idverCard.style.display = "none"
})

// Seleção de prioridade
document.querySelectorAll(".escolha").forEach(escolhas => {
    escolhas.classList.remove("alta", "media", "baixa");

    escolhas.addEventListener("click", (event) => {
        removeEscolhas();

        if (event.target.classList.contains("escolha-baixa")) {
            event.target.classList.add("baixa");
        } else if (event.target.classList.contains("escolha-media")) {
            event.target.classList.add("media");
        } else if (event.target.classList.contains("escolha-alta")) {
            event.target.classList.add("alta");
        }

        event.target.style.color = "#fff";
    });
});

//remove quais opcoes cliquei no modal
function removeEscolhas() {
    document.querySelectorAll(".escolha").forEach(escolhas => {
        escolhas.classList.remove("alta", "media", "baixa");
        escolhas.style.color = "#000";
    });
}

//atualiza os drags
function aplicarEventos(card) {
    card.addEventListener("dragstart", event => {
        event.currentTarget.classList.add("dragging");
    });

    card.addEventListener("dragend", event => {
        event.currentTarget.classList.remove("dragging");
    });

    card.addEventListener("click", event=>{
        if(event.target.closest(".card")){
            verCard(event.target.closest(".card"))
        }
    })
}

function verCard(card){
    idverCard.style.display = "flex"
    var prioridade = card.querySelector(".prioridade")
    var conteudo = card.querySelector(".textoCard")
    spanTarefa.innerHTML = conteudo.textContent
    console.log(prioridade.textContent)
    priore.innerHTML = `
    <div class="${prioridade.textContent.to}">prioridade</div>
    `
    
}

document.querySelectorAll(".card").forEach(card => {
    aplicarEventos(card)
});


//qnd clica no botao + para adicionar um nova tarefa
addTarefa.addEventListener("click", () => {
    if (!colunaAtual) return;//se coluna for null ou undefined cai aqui


    const nomeTarefa = inputTarefa.value.trim();
    if (!nomeTarefa) return alert("Digite o nome da tarefa!");//se tarefa for vazia cai aqui

    let prioridade = "baixa"; // padrão

    document.querySelectorAll(".escolha").forEach(item => { //anda sobre as escolhas la no escolha
        if (item.classList.contains("baixa")) prioridade = "baixa"; //vai perguntando qual class ta acompanhado de escolha
        else if (item.classList.contains("media")) prioridade = "media";
        else if (item.classList.contains("alta")) prioridade = "alta";
    });

    const cardNovo = document.createElement("li");
    //crio o li, coloco as class, coloco atributo draggable true
    cardNovo.classList.add("card");
    cardNovo.setAttribute("draggable", "true");
    //adiciono os dados abaixos dentro do meu li, divs, p, img
    cardNovo.innerHTML = `
        <div class="prioridade ${prioridade}">${prioridade.charAt(0).toUpperCase() + prioridade.slice(1)} prioridade</div>
        <p class="textoCard">${nomeTarefa}</p>
        <footer class="footer-card">
            <div class="icones">
                <i class="fa-regular fa-comment"><span>0</span></i>
                <i class="fa-solid fa-paperclip"><span>0</span></i>
            </div>
            <img class="img-card" src="img/persona.png" alt="persona">
        </footer>
    `;
    
    //coloco meu li atualizado na minha ul, coluna atual
    aplicarEventos(cardNovo);
    colunaAtual.appendChild(cardNovo);

    fundo.style.display = "none";
    inputTarefa.value = "";
    removeEscolhas();
});

function abrirModal(nomeColuna) {
    fundo.style.display = "flex";
    colunaAtual = document.getElementById(nomeColuna);
}

document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", event => {
        const nomeColuna = event.currentTarget.getAttribute("nome-coluna");
        abrirModal(nomeColuna);
    });
});

document.querySelectorAll(".lista-cards").forEach(lista => {
    lista.addEventListener("dragover", event => {
        event.preventDefault();
        lista.classList.add("lista-hover");
    });

    lista.addEventListener("dragleave", () => {
        lista.classList.remove("lista-hover");
    });

    lista.addEventListener("drop", event => {
        lista.classList.remove("lista-hover");
        const dragcard = document.querySelector(".dragging");
        if (dragcard) lista.appendChild(dragcard);
    });
});


