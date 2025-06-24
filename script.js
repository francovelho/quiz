document.addEventListener("DOMContentLoaded", () => {
  // 5 perguntas
  const questions = [
    {
      question: "Qual a capital do Brasil?",
      answers: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
    },
    {
      question: "Quanto é 5 x 3?",
      answers: ["15", "8", "10", "5"],
    },
    {
      question: "Quem escreveu 'Dom Casmurro'?",
      answers: ["Machado de Assis", "Clarice Lispector", "Monteiro Lobato", "Carlos Drummond"],
    },
    {
      question: "Qual é a cor do céu em um dia claro?",
      answers: ["Azul", "Verde", "Vermelho", "Amarelo"],
    },
    {
      question: "Qual é o maior planeta do sistema solar?",
      answers: ["Terra", "Júpiter", "Saturno", "Marte"],
    }
  ];

  const pointsPerAnswer = 3; // pontos fixos por resposta

  let currentQuestion = 0;
  let totalPoints = 0;

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const resultEl = document.getElementById("result");
  const progressFill = document.getElementById("progress-fill");
  const quizEl = document.getElementById("quiz");
  const coinCounter = document.getElementById("coin-count");
  const scoreSound = document.getElementById("score-sound");

  function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    // Atualiza barra de progresso
    const progress = (currentQuestion / questions.length) * 100;
    progressFill.style.width = `${progress}%`;

    q.answers.forEach((answer) => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.addEventListener("click", () => handleAnswer(btn));
      answersEl.appendChild(btn);
    });
  }

  function handleAnswer(buttonElement) {
    // Desativa todos os botões para evitar múltiplos cliques
    const allButtons = document.querySelectorAll("#answers button");
    allButtons.forEach(btn => btn.disabled = true);

    // Marca botão clicado
    buttonElement.classList.add("selected");

    // Adiciona pontos fixos
    totalPoints += pointsPerAnswer;
    updateScore();

    // Toca som de pontuação com volume reduzido
    scoreSound.volume = 0.1; // volume de 0 (mudo) a 1 (máximo)
    scoreSound.currentTime = 0;
    scoreSound.play();

    // Avança para próxima pergunta após 1s
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        quizEl.style.display = "none";
        resultEl.textContent = `Quiz finalizado! Você fez ${totalPoints} pontos! Redirecionando...`;
        setTimeout(() => {
          window.location.href = "https://go.hotmart.com/F100314635L";
        }, 3000);
      }
    }, 1000);
  }

  function updateScore() {
    coinCounter.textContent = totalPoints;
  }

  // Inicia quiz
  showQuestion();
});
