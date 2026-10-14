
const perguntas = [
    {
        categoria: "Matemática",
        pergunta: "Quanto é 25% de 200?",
        alternativas: ["25", "40", "50", "75"],
        correta: 2,
        explicacao: "25% é a mesma coisa que um quarto. Um quarto de 200 é 50!"
    },
    {
        categoria: "Português",
        pergunta: "Qual palavra é um substantivo?",
        alternativas: ["Correr", "Bonito", "Escola", "Rapidamente"],
        correta: 2,
        explicacao: "Escola é um substantivo, pois nomeia um lugar."
    },
    {
        categoria: "Ciências",
        pergunta: "Qual órgão é responsável por bombear o sangue?",
        alternativas: ["Pulmão", "Coração", "Estômago", "Rim"],
        correta: 1,
        explicacao: "O coração bombeia o sangue para todo o corpo."
    },
    {
        categoria: "Geografia",
        pergunta: "Qual é o maior oceano do planeta?",
        alternativas: ["Atlântico", "Índico", "Ártico", "Pacífico"],
        correta: 3,
        explicacao: "O oceano Pacífico é o maior oceano da Terra."
    },
    {
        categoria: "História",
        pergunta: "Qual povo construiu as pirâmides de Gizé?",
        alternativas: ["Romanos", "Egípcios", "Gregos", "Fenícios"],
        correta: 1,
        explicacao: "As pirâmides de Gizé foram construídas no Egito Antigo."
    },
    {
        categoria: "Matemática",
        pergunta: "Quanto é 8 × 7?",
        alternativas: ["48", "54", "56", "64"],
        correta: 2,
        explicacao: "O resultado de 8 multiplicado por 7 é 56."
    },
    {
        categoria: "Ciências",
        pergunta: "Qual destes animais é um mamífero?",
        alternativas: ["Tartaruga", "Sapo", "Golfinho", "Sardinha"],
        correta: 2,
        explicacao: "O golfinho é um mamífero e precisa respirar ar."
    },
    {
        categoria: "Português",
        pergunta: "Qual é o plural de 'animal'?",
        alternativas: ["Animais", "Animales", "Animalis", "Animal"],
        correta: 0,
        explicacao: "O plural correto de animal é animais."
    },
    {
        categoria: "Geografia",
        pergunta: "Em qual continente fica o Brasil?",
        alternativas: ["Europa", "África", "América do Sul", "Ásia"],
        correta: 2,
        explicacao: "O Brasil está localizado na América do Sul."
    },
    {
        categoria: "Conhecimentos gerais",
        pergunta: "Quantos minutos tem uma hora?",
        alternativas: ["30", "45", "60", "100"],
        correta: 2,
        explicacao: "Uma hora tem 60 minutos."
    }
];

const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const btnIniciar = document.getElementById("btn-iniciar");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");

const contador = document.getElementById("contador");
const pontosElemento = document.getElementById("pontos");
const categoriaElemento = document.getElementById("categoria");
const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const feedbackElemento = document.getElementById("feedback");
const barra = document.getElementById("barra");
const barraContainer = document.getElementById("barra-container");

const pontuacaoFinal = document.getElementById("pontuacao-final");
const acertosFinal = document.getElementById("acertos-final");
const mensagemFinal = document.getElementById("mensagem-final");
const emojiFinal = document.getElementById("emoji-final");

let indiceAtual = 0;
let pontos = 0;
let acertos = 0;
let respondida = false;

function mostrarTela(tela) {
    [telaInicial, telaJogo, telaFinal].forEach(function (elemento) {
        elemento.classList.add("escondido");
    });

    tela.classList.remove("escondido");
}

function iniciarJogo() {
    indiceAtual = 0;
    pontos = 0;
    acertos = 0;
    respondida = false;

    pontosElemento.textContent = pontos;

    mostrarTela(telaJogo);
    mostrarPergunta();
}

function mostrarPergunta() {
    const atual = perguntas[indiceAtual];

    respondida = false;

    contador.textContent =
        `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

    categoriaElemento.textContent = atual.categoria;
    perguntaElemento.textContent = atual.pergunta;

    pontosElemento.textContent = pontos;

    barra.style.width =
        `${(indiceAtual / perguntas.length) * 100}%`;

    barraContainer.setAttribute("aria-valuenow", indiceAtual);

    alternativasElemento.innerHTML = "";
    feedbackElemento.textContent = "";
    feedbackElemento.className = "feedback";

    btnProxima.classList.add("escondido");

    atual.alternativas.forEach(function (alternativa, indice) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa";
        botao.textContent =
            `${String.fromCharCode(65 + indice)}) ${alternativa}`;

        botao.addEventListener("click", function () {
            verificarResposta(indice, botao);
        });

        alternativasElemento.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido, botaoEscolhido) {
    if (respondida) return;

    respondida = true;

    const atual = perguntas[indiceAtual];
    const botoes = alternativasElemento.querySelectorAll("button");

    botoes.forEach(function (botao) {
        botao.disabled = true;
    });

    if (indiceEscolhido === atual.correta) {
        pontos += 10;
        acertos++;

        feedbackElemento.textContent =
            `🎉 Muito bem! +10 pontos. ${atual.explicacao}`;

        feedbackElemento.classList.add("sucesso");
        botaoEscolhido.classList.add("correta");
    } else {
        feedbackElemento.textContent =
            `💡 Quase! A resposta certa é "${atual.alternativas[atual.correta]}". ${atual.explicacao}`;

        feedbackElemento.classList.add("erro");
        botaoEscolhido.classList.add("errada");
        botoes[atual.correta].classList.add("correta");
    }

    pontosElemento.textContent = pontos;

    barra.style.width =
        `${((indiceAtual + 1) / perguntas.length) * 100}%`;

    barraContainer.setAttribute("aria-valuenow", indiceAtual + 1);

    btnProxima.textContent =
        indiceAtual === perguntas.length - 1
            ? "Ver resultado 🏆"
            : "Próxima pergunta →";

    btnProxima.classList.remove("escondido");
}

function proximaPergunta() {
    if (!respondida) return;

    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    mostrarTela(telaFinal);

    pontuacaoFinal.textContent = `${pontos} pontos`;

    acertosFinal.textContent =
        `Você acertou ${acertos} de ${perguntas.length} perguntas.`;

    if (acertos === perguntas.length) {
        emojiFinal.textContent = "🏆";
        mensagemFinal.textContent =
            "Incrível! Você acertou todas as perguntas. Parabéns!";
    } else if (acertos >= 7) {
        emojiFinal.textContent = "🌟";
        mensagemFinal.textContent =
            "Muito bem! Você demonstrou que sabe bastante. Continue assim!";
    } else if (acertos >= 4) {
        emojiFinal.textContent = "👏";
        mensagemFinal.textContent =
            "Bom trabalho! Continue praticando para aprender ainda mais.";
    } else {
        emojiFinal.textContent = "💪";
        mensagemFinal.textContent =
            "Não desista! Cada tentativa é uma oportunidade de aprender.";
    }
}

btnIniciar.addEventListener("click", iniciarJogo);
btnProxima.addEventListener("click", proximaPergunta);
btnReiniciar.addEventListener("click", iniciarJogo);
