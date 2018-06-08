let questionNumber = 0;
let score = 0;

function generateQuestion() {
  if (questionNumber < store.length) {
    return `<div class="question-container">
    <h2>${store[questionNumber].question}</h2>
    <form>
    <fieldset role="radiogroup" aria-labelledby="radioHeader"><legend id="radioHeader">Select an answer from the options below:</legend>
    <label class="answer-option">
    <input type="radio" value="${store[questionNumber].answers[0]}" name="answer" required>
    <span>${store[questionNumber].answers[0]}</span>
    </label>
    <label class="answer-option">
    <input type="radio" value="${store[questionNumber].answers[1]}" name="answer" required>
    <span>${store[questionNumber].answers[1]}</span>
    </label>
    <label class="answer-option">
    <input type="radio" value="${store[questionNumber].answers[2]}" name="answer" required>
    <span>${store[questionNumber].answers[2]}</span>
    </label>
    <label class="answer-option">
    <input type="radio" value="${store[questionNumber].answers[3]}" name="answer" required>
    <span>${store[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submit-button">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    handleRestartButton();
    $('.question-number').text(10)
  }
}

function renderResults() {
  $('.col-12').remove();
  if(score >=6) {
    $('#quiz-box').html(`<div class='results correctFeedback'><h2>'Congrats, id say you know your stuff! '</h2><p>'You got ${score} / 10'</p><button class="restart-button">'Restart Quiz'</button></div>`);
    }else if (score < 6) {
      $('#quiz-box').html(`<div class="results correctFeedback"><h2>You didnt pass the test but hopefully you Learned along the way.</h2><p>You got ${score} / 10</p><button class="restart-button">Restart Quiz</button></div>`)
    }
}
//increase score by 1
function changeScore () {
  score ++;
}
//render the question into the dom
function renderNextQuestion() {
  $('#quiz-box').html(generateQuestion());
}
//when user clicks start button
//render the first question into the dom
//set queston number to 1
function startQuiz() {
 $('.quiz-button').on('click', function() {
   renderNextQuestion();
   $('.question-number').text('1');

 });
}
//when user presses submit button stop default action for button type submit
//if user answer is correct return the feedback for being Right
//if user is wrong return the feedback for being wrong
function handleSubmitButton() {
  $('#quiz-box').on('submit',  function (event) {
    event.preventDefault();
    
    const selected = $('input:checked');
    const answer = selected.val();
    ;
    if (answer === store[questionNumber].correctAnswer) {
      ifAnswerIsCorrect();
    } else {
      ifAnswerIsWrong();
    }
  });
}
//update score increments the users score if their answer is correct
function ifAnswerIsCorrect () {
   correctFeedback();
   updateScore();
  
}

function ifAnswerIsWrong () {
    wrongFeedback();
    
}

function correctFeedback() {
  $('#quiz-box').html(`
    <section class="feedback-page">
      <h2>You are right!</h2>
      <img class='correct-img'src="https://media2.giphy.com/media/Yggr0uQUbA79C/giphy.gif" alt='Troy barnes and Abed Nadir'>
      <button class="next-button">Next</button>
    </section>
  
`);
}

function wrongFeedback() {
  //const correctAnswer = `${store[questionNumber].correctAnswer}`;
  $('#quiz-box').html(`
  <section class="feedback-page"><h2>Incorrect it was ${store[questionNumber].correctAnswer}! </h2>
    <img  src="https://media3.giphy.com/media/gQsfOW387X9Hq/giphy.gif" alt='Troy barnes of nbc show Community'>
    <button class='next-button'>Next</button></section>`);
}



//update score text
function updateScore () {
  changeScore();
  $('.score').text(score);
}
//when the user presses the next button
//the quextion number should update and render the correct question
function handleNextButton() {
  $('#quiz-box').on('click', '.next-button', function() {
    iterateQuestionNumber();
    renderNextQuestion();  
  });
}

function iterateQuestionNumber () {
  if(questionNumber < 11) {
    questionNumber ++;
   }
  console.log(questionNumber);
  $('.question-number').text(questionNumber+1);
}

function handleRestartButton() {
  $('#quiz-box').on('click', '.restart-button', function(event) {
    location.reload();
  });
}

function createQuiz () {
  startQuiz();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}
//when  the DOM is loaded run createQuiz function
$(createQuiz);