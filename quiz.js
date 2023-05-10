const quizName = "UN Quiz"; // Example quiz name
const quizTitle = document.getElementById("quizname");
quizTitle.innerHTML = quizName; // Set the content of the h1 element to the quiz name


let questions = [
  {
    question: "Which year was the United Nations founded?",
    answers: [
      { text: "1945", correct: true },
      { text: "1955", correct: false },
      { text: "1965", correct: false },
      { text: "1975", correct: false },
    ],
  },
  {
    question: "Which is the main organ of the United Nations responsible for maintaining international peace and security?",
    answers: [
      { text: "The Security Council", correct: true },
      { text: "The General Assembly", correct: false },
      { text: "The International Court of Justice", correct: false },
      { text: "The Secretariat", correct: false },
    ],
  },
  {
    question: "Which of the following countries is not a permanent member of the United Nations Security Council?",
    answers: [
      { text: "France", correct: false },
      { text: "Japan", correct: true },
      { text: "China", correct: false },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "What is the name of the United Nations agency responsible for providing humanitarian aid and development assistance to children worldwide?",
    answers: [
      { text: "UNICEF", correct: true },
      { text: "WHO", correct: false },
      { text: "FAO", correct: false },
      { text: "UNHCR", correct: false },
    ],
  },
  {
    question: "Which country was the first to recognize the United Nations as an independent international organization?",
    answers: [
      { text: "United States", correct: false },
      { text: "United Kingdom", correct: true },
      { text: "France", correct: false },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "Which document sets out the fundamental rights and freedoms of all human beings, without distinction of any kind?",
    answers: [
      { text: "The Universal Declaration of Human Rights", correct: true },
      { text: "The United Nations Charter", correct: false },
      { text: "The Rome Statute of the International Criminal Court", correct: false },
      { text: "The Convention on the Rights of the Child", correct: false },
    ],
  },
  {
    question: "Which United Nations agency is responsible for the protection of refugees and stateless persons worldwide?",
    answers: [
      { text: "UNHCR", correct: true },
      { text: "UNESCO", correct: false },
      { text: "UNICEF", correct: false },
      { text: "WFP", correct: false },
    ],
  },
];



const questionText = document.querySelector("#questions");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");
let index = 0;
let score = 0;

function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  questions = shuffleQuestions(questions);
  index = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[index];
  questionText.innerHTML = currentQuestion.question;
  clearQuestions(); // Fix: Clear previous question before showing new question
  for (let i = 0; i < currentQuestion.answers.length; i++) {
    const button = document.createElement("button");
    button.innerHTML = currentQuestion.answers[i].text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (currentQuestion.answers[i].correct) {
      button.dataset.correct = currentQuestion.answers[i].correct;
    }
    button.addEventListener("click", selectAnswer);
  }
}


const compliments = [
  "Great job!",
  "Well done!",
  "Excellent!",
  "Terrific!",
  "Fantastic!",
  "Impressive!",
];

const negativeCompliments = [
  "Oh no!",
  "Not quite!",
  "Keep trying!",
  "Better luck next time!",
  "Oops!",
  "You'll get it next time!",
];

function showTransition(isCorrect) {
  console.log("showTransition called with isCorrect = ", isCorrect);
  const compliment = isCorrect
    ? compliments[Math.floor(Math.random() * compliments.length)]
    : negativeCompliments[Math.floor(Math.random() * negativeCompliments.length)];
  questionText.innerHTML = compliment;
  questionText.classList.add("transition");
  nextButton.style.display = "block";
  nextButton.innerHTML = "Next";
}



function selectAnswer(e) {
  const selected = e.target;
  if (selected.classList.contains("selected")) {
    selected.classList.remove("selected");
    selected.style.backgroundColor = "";
    return;
  }
  const isCorrect = selected.dataset.correct === "true";
  selected.classList.add("selected");
  selected.style.backgroundColor = isCorrect ? "#008000" : "#ff0000";
  const answerButtonsArray = Array.from(answerButtons.children);
  let correctSelected = false;
  answerButtonsArray.forEach((button) => {
    if (button.dataset.correct === "true" && button.classList.contains("selected")) {
      correctSelected = true;
    }
    button.disabled = true;
  });
  if (correctSelected) {
    if (isCorrect) {
      score++;
    }
    showTransition(isCorrect);
  } else {
    showTransition(false);
  }
}
function clearQuestions() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showScore() {
  clearQuestions();
  questionText.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  index++;
  if (index < questions.length) {
    clearQuestions(); // clear the question and answer buttons
    showQuestion();
  } else {
    showScore();
  }
}


nextButton.addEventListener("click", () => {
  if (index < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

