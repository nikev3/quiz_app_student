const quizName = "1700s History"; // Example quiz name
const quizTitle = document.getElementById("quizname");
quizTitle.innerHTML = quizName; // Set the content of the h1 element to the quiz name


let questions = [
  {
    question: "What was the name of the British naval officer who defeated the Spanish Armada in 1588?",
    answers: [
      { text: "Francis Drake", correct: true },
      { text: "Horatio Nelson", correct: false },
      { text: "Walter Raleigh", correct: false },
      { text: "Robert Clive", correct: false },
    ],
  },
  {
    question: "Which country controlled the Philippines during the 1700s?",
    answers: [
      { text: "Spain", correct: true },
      { text: "Portugal", correct: false },
      { text: "France", correct: false },
      { text: "Netherlands", correct: false },
    ],
  },
  {
    question: "Which American colony was founded by William Penn in 1682?",
    answers: [
      { text: "Virginia", correct: false },
      { text: "Pennsylvania", correct: true },
      { text: "Maryland", correct: false },
      { text: "New York", correct: false },
    ],
  },
  {
    question: "Who wrote the influential book 'The Wealth of Nations' in 1776?",
    answers: [
      { text: "Adam Smith", correct: true },
      { text: "Karl Marx", correct: false },
      { text: "John Locke", correct: false },
      { text: "Thomas Paine", correct: false },
    ],
  },
  {
    question: "What was the name of the famous composer who lived from 1756 to 1791?",
    answers: [
      { text: "Ludwig van Beethoven", correct: false },
      { text: "Johann Sebastian Bach", correct: false },
      { text: "Wolfgang Amadeus Mozart", correct: true },
      { text: "Franz Joseph Haydn", correct: false },
    ],
  },
  {
    question: "What was the name of the French military leader who conquered much of Europe in the late 1700s?",
    answers: [
      { text: "Napoleon Bonaparte", correct: true },
      { text: "Louis XIV", correct: false },
      { text: "William III", correct: false },
      { text: "Frederick the Great", correct: false },
    ],
  },
  {
    question: "Which American founding father invented bifocal glasses and the lightning rod?",
    answers: [
      { text: "Benjamin Franklin", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "George Washington", correct: false },
      { text: "John Adams", correct: false },
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

