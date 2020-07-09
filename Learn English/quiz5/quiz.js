
const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const correctAnswers = document.querySelector(".correct-answers");
const seeResultBtn = document.querySelector(".see-result-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizHomeBox = document.querySelector(".quiz-home-box");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn");
const goToHome = document.querySelector(".go-to-home-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
let questionIndex=0;
let attempt=0;
let score=0;
let number=0;
let interval;



// questions and options and answer and description
//array of objects
myApp = [
          {
          	questions: " When can you usually see ____ moon, in the morning, or at night?",
          	options: ["a", "an", "the", "no article"],
          	answer: 2, 
          	description: "When can you usually see the moon, in the morning, or at night?"

          },
          {
          	questions:"I saw ____ very bright star in the sky a few nights ago.",
          	options: ["the", "no article", "a", "the"],
          	answer: 1, 
          	description: 'I saw very bright star in the sky a few nights ago.'

          },

          {
          	questions:"I forgot to bring my pen. Do you have ____ pen I could borrow?",
          	options: ["the", "a", "an", "no article"],
          	answer: 1, 
          	description: 'I forgot to bring my pen. Do you have a pen I could borrow?'

          },

          {
          	questions:"I have a new car; ____ car is red.",
          	options: ["a", "the", "no article", "an"],
          	answer: 1, 
          	description: 'I have a new car; the car is red.'

          },

          {
          	questions:"What is ____ capital city of Australia? Is it Sydney or Canberra?",
          	options: ["the", "a", "an", "no article"],
          	answer: 0, 
          	description: 'What is the capital city of Australia? Is it Sydney or Canberra?'

          },

          {
          	questions:"I have ____ two younger brothers and an older sister. ",
          	options: ["the", "no article", "a", "an"],
          	answer: 1, 
          	description: 'I have two younger brothers and an older sister.'

          },

          {
          	questions:"What is ____ first month of the year? Is it January or February?",
          	options: ["no article", "a", "the", "an"],
          	answer: 2, 
          	description: 'What is the first month of the year? Is it January or February?'

          },

          {
          	questions:"Last summer, my friends and I travelled to ____ Spain.",
          	options: ["no article", "a", "an", "the"],
          	answer: 0, 
          	description: 'Last summer, my friends and I travelled to Spain.'

          },

          {
          	questions:"Help! Somebody please call ____ policeman!",
          	options: ["the", "a", "an", "no article"],
          	answer: 1, 
          	description: 'Help! Somebody please call a policeman!'

          },

          {
          	questions:"____ Amazon Rain Forest is located in South America.",
          	options: ["an", "a", "no article", "the"],
          	answer: 3, 
          	description: 'The Amazon Rain Forest is located in South America.'

          }
        ]

function load() {
	number++;
	questionText.innerHTML=myApp[questionIndex].questions;
	createOptions();
	scoreBoard();
	currentQuestionNum.innerHTML=number;
}

function createOptions() {
	optionBox.innerHTML="";
	let animationDelay = 0.2;
	for(let i=0 ; i<myApp[questionIndex].options.length; i++) {
		const option=document.createElement("div");
		option.innerHTML=myApp[questionIndex].options[i];
		option.classList.add("option");
		option.setAttribute("onclick", "check(this)");
		option.id=i;
		option.style.animationDelay = animationDelay + "s";
		animationDelay = animationDelay+0.2;
		option.setAttribute("onclick", "check(this)");
		optionBox.appendChild(option);
	}
}


function check(ele) {
	const id=ele.id;
	if(id==myApp[questionIndex].answer) {
		ele.classList.add("correct");
		score++;
		scoreBoard();
	}
	else {
		ele.classList.add("wrong");

		//show correct answer when clicked answer is wrong
		for(let i=0; i<optionBox.children.length; i++) {
			if(optionBox.children[i].id == myApp[questionIndex].answer) {
				optionBox.children[i].classList.add("show-correct");

			}

		}
	}
    attempt++;
	disabledOptions();
	showAnswerDescription();
	showNextQuestionBtn();
	stopTimer();


	if(number == myApp.length){
		quizOver();
	}
}

function timeIsUp() {
	showTimeUpText();
	//When Time is Up show the Correct Answer
	for(let i=0; i<optionBox.children.length; i++) {
			if(optionBox.children[i].id == myApp[questionIndex].answer) {
				optionBox.children[i].classList.add("show-correct");

			}

		}
	disabledOptions();
	showAnswerDescription();
	showNextQuestionBtn();
}

function startTimer() {

	let timeLimit=30;
	remainingTime.classList.remove("less-time");
	remainingTime.innerHTML=timeLimit;
	interval=setInterval(()=> {
		timeLimit--;

		if(timeLimit<30) {
		}
		if(timeLimit<5) {
			remainingTime.classList.add("less-time");
		}
		remainingTime.innerHTML=timeLimit;
		if(timeLimit == 0) {
			clearInterval(interval);
			timeIsUp();
		}
	},1000)

}



function stopTimer(){
	clearInterval(interval);

}




function disabledOptions() {
	for (let i=0; i<optionBox.children.length; i++) {
		optionBox.children[i].classList.add("already-answered");
	}
}


function showAnswerDescription() {
	if(typeof myApp[questionIndex].description !== 'undefined') {
		answerDescription.classList.add("show");
	    answerDescription.innerHTML=myApp[questionIndex].description;

	}
}


function hideAnswerDescription() {
		answerDescription.classList.remove("show");
	    answerDescription.innerHTML="";

	}


function showNextQuestionBtn() {
	nextQuestionBtn.classList.add("show");

}

function hideNextQuestionBtn() {
	nextQuestionBtn.classList.remove("show");

}


function showtimeUpText() {
	timeUpText.classList.add("show");
}

function hidetimeUpText() {
	timeUpText.classList.remove("show");
}

function scoreBoard() {
	correctAnswers.innerHTML=score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
	questionIndex++;
	load();
	hideNextQuestionBtn();
	hideAnswerDescription();
	hidetimeUpText();
	startTimer();
}

function quizResult() {
	document.querySelector(".total-questions").innerHTML=myApp.length;
	document.querySelector(".total-attempt").innerHTML=attempt;
	document.querySelector(".total-correct").innerHTML=score;
	document.querySelector(".total-wrong").innerHTML=attempt-score;
	const percentage=(score/myApp.length)*100;
	document.querySelector(".percentage").innerHTML=percentage.toFixed(2)+ "%";
}


function resetQuiz() {

    // questionIndex=0;
    attempt=0;
    score=0;
    number=0;

}

function quizOver() {
	nextQuestionBtn.classList.remove("show");
	seeResultBtn.classList.add("show");
}

seeResultBtn.addEventListener("click",()=>{
	
	quizBox.classList.remove("show");
	seeResultBtn.classList.remove("show");
	quizOverBox.classList.add("show");
	quizResult();

})

startAgainQuizBtn.addEventListener("click",()=>{
	quizBox.classList.add("show");
	quizOverBox.classList.remove("show");
	resetQuiz();
	nextQuestion();
	
})

goToHome.addEventListener("click",()=>{
	quizOverBox.classList.remove("show");
	quizHomeBox.classList.add("show");
	resetQuiz();

	})

startQuizBtn.addEventListener("click",()=>{
	quizHomeBox.classList.remove("show");
	quizBox.classList.add("show");
	load();
	startTimer();
})


 // window.onload=()=> {
	
 //  }     