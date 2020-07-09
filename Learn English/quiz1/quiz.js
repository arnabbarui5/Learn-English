
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
          	questions:"It's really a small problem - you shouldn't make it _______ to be worse than it is.",
          	options: ["out", "over", "up", "to"],
          	answer: 0, 
          	description: "To make something out to be means to describe or portray it as different than it really is"

          },
          {
          	questions:"Our plans for a weekend trip fell _______ because my husband had to work overtime.",
          	options: ["away", "through", "out", "throughout"],
          	answer: 1, 
          	description: 'If a project or plan "falls through," it means it fails and is not successful or not implemented.'

          },

          {
          	questions:"My neighbor dropped _______ yesterday afternoon for a cup of tea.",
          	options: ["by", "off", "over", "to"],
          	answer: 0, 
          	description: 'To "stop by" or "drop by" means to go for a quick, informal visit.'

          },

          {
          	questions:"I missed yesterday's episode, can you fill me ________ on what happened?",
          	options: ["to", "up", "out", "in"],
          	answer: 3, 
          	description: 'To "fill someone in" on something means to give them information/updates that they previously missed.'

          },

          {
          	questions:"All the students pitched _______ to clean up the classroom.",
          	options: ["around", "by", "in", "so"],
          	answer: 2, 
          	description: 'To "pitch in" means to contribute help to a group effort.'

          },

          {
          	questions:"He was kicked _______ of college for cheating on a test",
          	options: ["off", "out", "away", "through"],
          	answer: 1, 
          	description: 'If someone is "kicked out," it means they are forced to leave a group, school, or house.'

          },

          {
          	questions:"If someone's making unreasonable demands, you shouldn't give _______",
          	options: ["in", "by", "out", "into"],
          	answer: 0, 
          	description: 'To "give in" means to yield or submit to something.'

          },

          {
          	questions:"I hope I don't slip _______ when giving my speech!",
          	options: ["along", "on", "up", "in"],
          	answer: 2, 
          	description: 'To "slip up" means to make a mistake.'

          },

          {
          	questions:"It's annoying when people promise to do something, but later back _______",
          	options: ["down", "off", "out", "up"],
          	answer: 2, 
          	description: 'To "back out" means NOT to do something you previously committed to.'

          },

          {
          	questions:"We came ________ some old photographs while cleaning our parents' attic.",
          	options: ["across", "around", "up with", "with"],
          	answer: 0, 
          	description: 'To "come across" something means to find it unexpectedly.'

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