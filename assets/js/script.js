let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    let percentage = Math.floor((currentQuestion / questions.length) * 100);
    document.querySelector(".progress--bar").style.width = `${percentage}%`;

    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";
    document.querySelector(".question").innerHTML = q.question;

    let optionsHtml = "";
    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`;
    }
    document.querySelector(".options").innerHTML = optionsHtml;

    // Adicionando evento de click no elemento dinâmico
    document.querySelectorAll(".options .option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute("data-op"));
  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }
  currentQuestion++;
  showQuestion();
}
function finishQuiz() {
  let point = Math.floor((correctAnswers / questions.length) * 100);
  if (point < 30) {
    document.querySelector(
      ".scoreText1"
    ).innerHTML = `Você não foi muito bem! <i class="fa-regular fa-face-sad-tear"></i>`;
    document.querySelector('.scoreArea img').src = "assets/img/ruim.png";
    document.querySelector('.scorePct').style.color = '#ff0000';
  }else if(point >= 30 && point < 70){
   document.querySelector(
      ".scoreText1"
    ).innerHTML = `Você foi muito bem! <i class="fa-regular fa-face-smile-beam"></i>`;
    document.querySelector('.scoreArea img').src = "assets/img/w.svg";
    document.querySelector('.scorePct').style.color = '#e46f0a';
  }else if(point >= 70){
   document.querySelector('.scoreArea img').src = "assets/img/grades.svg";
   document.querySelector(
      ".scoreText1"
    ).innerHTML = `Parabéns! <i class="fa-regular fa-face-grin-stars"></i>`;
    document.querySelector('.scorePct').style.color = '#0d630d';
  }

  document.querySelector(".scorePct").innerHTML = `Acertou ${point}%`;
  document.querySelector(
    ".scoreText2"
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".progress--bar").style.width = `100%`;
}

function resetEvent(){
   currentQuestion = 0;
   correctAnswers =0;
   showQuestion();
}