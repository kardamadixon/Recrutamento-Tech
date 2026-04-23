// O nosso "Banco de Dados" temporário
let bancoDeCandidatos = [];

// Capturando o evento de envio do formulário
document.getElementById('formCandidato').addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que a página recarregue

    // Coletando os valores do formulário
    const nome = document.getElementById('nome').value;
    const tecnologia = document.getElementById('tecnologia').value;
    const experiencia = Number(document.getElementById('experiencia').value);

    // Criando o objeto do candidato
    const novoCandidato = {
        nome: nome,
        tecnologia: tecnologia,
        experiencia: experiencia
    };

    // 🚀 INSERINDO NO ARRAY COM .push()
    bancoDeCandidatos.push(novoCandidato);

    alert(`${nome} cadastrado com sucesso!`);
    this.reset(); // Limpa o formulário

    console.log('Candidatos cadastrados:', bancoDeCandidatos);
});

function listarTodos() {
    const divResultado = document.getElementById('resultado');
    
    if (bancoDeCandidatos.length === 0) {
        divResultado.innerHTML = "<p>Nenhum candidato cadastrado.</p>";
        return;
    }

    // 🚀 TRANSFORMANDO DADOS EM HTML COM .map()
    const htmlCandidatos = bancoDeCandidatos.map(candidato => {
        return `
            <div class="card">
                <strong>Nome:</strong> ${candidato.nome} <br>
                <strong>Stack:</strong> ${candidato.tecnologia} <br>
                <strong>XP:</strong> ${candidato.experiencia} anos
            </div>
        `;
    });

    // O .join('') tira as vírgulas que separam os itens do array
    divResultado.innerHTML = htmlCandidatos.join('');
}

function filtrarSeniores() {
    // 🚀 FILTRANDO DADOS COM .filter()
    const seniores = bancoDeCandidatos.filter(candidato => candidato.experiencia >= 5);

    const divResultado = document.getElementById('resultado');
    
    if (seniores.length === 0) {
        divResultado.innerHTML = "<p>Nenhum candidato Sênior encontrado.</p>";
        return;
    }

    // Reutilizamos o map para exibir o novo array filtrado
    const htmlSeniores = seniores.map(candidato => {
        return `<div class="card" style="border-color: green;">
                    🌟 <strong>${candidato.nome}</strong> (${candidato.experiencia} anos) - ${candidato.tecnologia}
                </div>`;
    });

    divResultado.innerHTML = htmlSeniores.join('');
}

function calcularMediaXP() {
    const divResultado = document.getElementById('resultado');

    if (bancoDeCandidatos.length === 0) {
        divResultado.innerHTML = "<p>Cadastre candidatos para calcular a média.</p>";
        return;
    }

    // 🚀 REDUZINDO O ARRAY A UM ÚNICO VALOR COM .reduce()
    // O acumulador (total) começa com 0, e vamos somando a XP de cada candidato
    const totalXP = bancoDeCandidatos.reduce((acumulador, candidato) => {
        return acumulador + candidato.experiencia;
    }, 0);

    const media = totalXP / bancoDeCandidatos.length;

    divResultado.innerHTML = `
        <div class="card" style="background-color: #f0f8ff;">
            <strong>Média de Experiência da Base:</strong> ${media.toFixed(1)} anos.
        </div>
    `;
}