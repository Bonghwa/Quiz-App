class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

let questions = [
  new Question(
    `What does the name "Singapura" (the original name of Singapore) mean?`,
    ['Jungle City', 'City of Ships', 'Lion City', 'City of Islands'],
    'Lion City'
  ),
  new Question(
    'Which language is the most spoken at home in Singapore?',
    ['Malay', 'Chinese', 'English', 'Tamil'],
    'Chinese'
  ),
  new Question(
    'Which of the brand was not founded by Singaporean?',
    ['Charles & Keith', 'Razer', 'TWG', 'Bata'],
    'Bata'
  ),
  new Question(
    'Which Singlish word is used to describe competitiveness?',
    ['Atas', 'Chope', 'Kiasu', 'Kaypoh'],
    'Kiasu'
  ),
  new Question(
    "At the coffee shop, you're about to order Iced Black Coffee with No Sugar. What should you say?",
    ['Kopi O Kosong Beng', 'Kopi Siew Dai Beng', 'Kopi Gah Dai', 'Kopi C Siew Dai'],
    'Kopi O Kosong Beng'
  ),
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  getQuestionNumber() {
    return this.questions[this.questionIndex];
  }

  guess(choice) {
    if (this.getQuestionNumber().isCorrectAnswer(choice)) {
      this.score++;
    }
    this.questionIndex++;
  }

  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}

let quiz = new Quiz(questions);

function displayQuestion() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    const questionElm = document.querySelector('#question');
    questionElm.innerHTML = quiz.getQuestionNumber().text;

    let choices = quiz.getQuestionNumber().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElm = document.querySelector('#choice' + i);
      choiceElm.innerHTML = choices[i];
      guess('btn' + i, choices[i]);
    }

    showProgress();
  }
}

function guess(id, choice) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(choice);

    displayQuestion();
  };
}

function showProgress() {
  let currQuestionNumber = quiz.questionIndex + 1;
  let progressElm = document.querySelector('#progress');
  progressElm.innerHTML = `Question ${currQuestionNumber} of ${quiz.questions.length}`;
}

function showScores() {
  let quizEndHTML = `
        <h1>Quiz Completed</h1>
        <h2 id="score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="index.html">Take Quiz Again</a>
        </div>
    `;
  const quizElm = document.querySelector('#quiz');
  quizElm.innerHTML = quizEndHTML;
}

const time = 5;
let quizTime = time * 60;

const counting = document.querySelector('#count-down');

function startCountdown() {
  const quizTimer = setInterval(() => {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      showScores();
    } else {
      quizTime--;
      let min = Math.floor(quizTime / 60);
      let sec = quizTime % 60;
      counting.innerHTML = `TIME: ${min} : ${sec}`;
    }
  }, 1000);
}

displayQuestion();
startCountdown();