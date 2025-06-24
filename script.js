document.addEventListener("DOMContentLoaded", () => {
  // 5 perguntas
  const questions = [
    {
      question: "Você está pronto(a) para uma verdadeira transformação na sua vida?",
      answers: ["Sim! Eu sinto que é a hora de virar o jogo.", "Talvez. \nTenho pensado nisso, mas não sei por onde começar.","Não tenho certeza. \nMinha vida está boa como está."],
    },
    {
      question: "Quanto é 5 x R$ 30 ?",
      answers: ["R$ 150", "R$ 8", "R$ 10", "R$ 55"],
    },
    {
      question: "R$ 150 entrando todos os dia fariam diferença na sua vida ?",
      answers: ["Sim","Não"],
    },
    {
      question: "Excelente! Para você, qual área da vida mais precisa dessa virada agora?",
      answers: ["Minhas liberdade financeira.", "Minha saúde e bem-estar (físico ou mental)."],
    },
    {
      question: "Entendo perfeitamente! Muitas pessoas se sentem assim. Se você pudesse mudar APENAS uma coisa na sua vida hoje, qual seria?",
      answers: ["Ter mais dinheiro para viver sem preocupações.", "Ter mais tempo livre para o que realmente importa."],
    },
    {
      question: "Imagine sua vida daqui a 1 ano, se nada mudar. Como você se sentiria ao olhar para trás e ver que a oportunidade de transformação passou?",
      answers: ["Mal! Eu estaria frustrado(a) por não ter tentado.", "Indiferente. A vida segue."],
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
