// ---------- 1. QUESTIONS ----------
// Each question has: the question text, 4 options, and the correct answer's index (0 to 3)
const allQuestions = {
  html: [
    { question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "Home Tool Markup Language"],
      answer: 0 },
    { question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: 1 },
    { question: "Which tag is used for the biggest heading?",
      options: ["<h6>", "<head>", "<h1>", "<heading>"],
      answer: 2 },
    { question: "Which tag is used to insert an image?",
      options: ["<image>", "<pic>", "<src>", "<img>"],
      answer: 3 },
    { question: "Which language is used to style a web page?",
      options: ["CSS", "Python", "C", "SQL"],
      answer: 0 }
  ],

  python: [
    { question: "Which function prints output in Python?",
      options: ["echo()", "print()", "write()", "show()"],
      answer: 1 },
    { question: "Which symbol is used for comments in Python?",
      options: ["//", "/*", "#", "--"],
      answer: 2 },
    { question: "Which of these is a list in Python?",
      options: ["(1, 2, 3)", "{1, 2, 3}", "<1, 2, 3>", "[1, 2, 3]"],
      answer: 3 },
    { question: "What is the output of 2 ** 3 ?",
      options: ["8", "6", "5", "9"],
      answer: 0 },
    { question: "Which keyword is used to define a function?",
      options: ["function", "def", "fun", "define"],
      answer: 1 }
  ],

  general: [
    { question: "What is the capital of India?",
      options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
      answer: 2 },
    { question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: 1 },
    { question: "How many days are there in a week?",
      options: ["5", "6", "8", "7"],
      answer: 3 },
    { question: "Which is the largest ocean on Earth?",
      options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      answer: 0 },
    { question: "What does CPU stand for?",
      options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Core Program Unit"],
      answer: 1 }
  ]
};

// ---------- 2. VARIABLES TO REMEMBER THINGS ----------
let questions = [];        // questions of the chosen topic
let currentIndex = 0;      // which question we are on
let score = 0;             // user's score
let timeLeft = 15;         // seconds left for the question
let timerId = null;        // stores the timer so we can stop it
let currentTopic = "";     // html / python / general
let answered = false;      // has the user already answered?

// ---------- 3. GET HTML ELEMENTS ----------
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionNumber = document.getElementById("question-number");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");
const progress = document.getElementById("progress");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const finalScore = document.getElementById("final-score");
const message = document.getElementById("message");
const bestScoreText = document.getElementById("best-score");

// ---------- 4. SHOW BEST SCORES (saved in the browser) ----------
function showBestScores() {
  const html = localStorage.getItem("best_html") || 0;
  const python = localStorage.getItem("best_python") || 0;
  const general = localStorage.getItem("best_general") || 0;
  bestScoreText.textContent =
    "🏆 Best scores → HTML: " + html + " | Python: " + python + " | General: " + general;
}

// ---------- 5. START THE QUIZ ----------
function startQuiz(topic) {
  currentTopic = topic;
  questions = allQuestions[topic];
  currentIndex = 0;
  score = 0;

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  showQuestion();
}

// ---------- 6. SHOW ONE QUESTION ----------
function showQuestion() {
  answered = false;
  feedback.textContent = "";
  nextBtn.classList.add("hidden");
  optionsBox.innerHTML = "";   // clear old options

  const q = questions[currentIndex];

  questionNumber.textContent = "Question " + (currentIndex + 1) + "/" + questions.length;
  scoreText.textContent = "Score: " + score;
  questionText.textContent = q.question;

  // update the progress bar
  progress.style.width = (currentIndex / questions.length) * 100 + "%";

  // create a button for every option
  for (let i = 0; i < q.options.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = q.options[i];
    btn.onclick = function () {
      checkAnswer(i);
    };
    optionsBox.appendChild(btn);
  }

  startTimer();
}

// ---------- 7. TIMER ----------
function startTimer() {
  clearInterval(timerId);   // stop any old timer
  timeLeft = 15;
  timerText.textContent = "⏱ " + timeLeft;

  timerId = setInterval(function () {
    timeLeft--;
    timerText.textContent = "⏱ " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerId);
      timeUp();
    }
  }, 1000);
}

// ---------- 8. WHEN TIME IS OVER ----------
function timeUp() {
  answered = true;
  feedback.textContent = "⏰ Time's up!";
  showCorrectAnswer();
  nextBtn.classList.remove("hidden");
}

// ---------- 9. CHECK THE ANSWER ----------
function checkAnswer(selected) {
  if (answered) return;      // don't allow clicking twice
  answered = true;
  clearInterval(timerId);

  const correct = questions[currentIndex].answer;
  const buttons = optionsBox.children;

  if (selected === correct) {
    score++;
    buttons[selected].classList.add("correct");
    feedback.textContent = "✅ Correct!";
  } else {
    buttons[selected].classList.add("wrong");
    buttons[correct].classList.add("correct");
    feedback.textContent = "❌ Wrong answer!";
  }

  scoreText.textContent = "Score: " + score;
  nextBtn.classList.remove("hidden");
}

// Highlight the right answer (used when time is up)
function showCorrectAnswer() {
  const correct = questions[currentIndex].answer;
  optionsBox.children[correct].classList.add("correct");
}

// ---------- 10. GO TO NEXT QUESTION ----------
function nextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ---------- 11. SHOW FINAL RESULT ----------
function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScore.textContent = "You scored " + score + " out of " + questions.length;

  // a message based on the score
  if (score === questions.length) {
    message.textContent = "🌟 Perfect! You are a genius!";
  } else if (score >= 3) {
    message.textContent = "👍 Good job! Keep practicing.";
  } else {
    message.textContent = "📚 Don't worry, try again and improve!";
  }

  // save the best score
  const oldBest = localStorage.getItem("best_" + currentTopic) || 0;
  if (score > oldBest) {
    localStorage.setItem("best_" + currentTopic, score);
  }
}

// ---------- 12. PLAY AGAIN ----------
function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  showBestScores();
}

// Show best scores when the page first loads
showBestScores();
