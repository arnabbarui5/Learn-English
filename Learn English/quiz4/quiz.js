
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
          	questions: " It will take all of your energy and will to be able to walk again.",
          	options: ["taker", "all", "your", "energy"],
          	answer: 3, 
          	description: "Energy is a noun, as is will here. Take (A) is a verb. All (B) is an adverb modifying take. Your (C) is an adjective modifying energy and will."

          },
          {
          	questions:"The works of many great poets have been placed on reserve.",
          	options: ["many", "great", "placed", "reserve"],
          	answer: 3, 
          	description: 'Reserve is the only noun of the choices. Many (A) and great (B) are adjectives modifying the noun poets. Placed (C) is a verb.'

          },

          {
          	questions:"The Brooklyn Bridge was opened in 1883.",
          	options: ["Bridge", "was", "opened", "in"],
          	answer: 0, 
          	description: 'Bridge is a proper noun here. Was (B) is the auxiliary verb for the past perfect tense of the verb opened (C). In (D) is a preposition.'

          },

          {
          	questions:"Sparta and Athens were enemies during the Peloponnesian War.",
          	options: ["and", "were", "during", "war"],
          	answer: 3, 
          	description: 'War is a proper noun here. And (A) is a conjunction. Were (B) is a verb. During (C) is a preposition.'

          },

          {
          	questions:"Sharks and lampreys are not true fish because their skeletons are made of cartilage rather than bone.",
          	options: ["true", "because", "their", "bone"],
          	answer: 3, 
          	description: 'Bone is a noun. True (A) is an adjective modifying the noun fish. Because (B) is a conjunction. Their (C) is a plural possessive third-person pronoun modifying the noun skeletons.'

          },

          {
          	questions:"Joe, have you met your new boss? ",
          	options: ["have", "met", "your", "boss"],
          	answer: 3, 
          	description: 'Boss is a noun. Have (A) is the auxiliary verb for the present perfect tense of the verb met (B). Your (C) is a possessive second-person pronoun modifying the noun boss.'

          },

          {
          	questions:"Sue’s parents tried living in the north, but they could not adapt to the cold.",
          	options: ["north", "but", "not", "adapt"],
          	answer: 0, 
          	description: 'North is a noun here. But (B) is a conjunction. Not (C) is an adverb modifying the verb adapt (D).'

          },

          {
          	questions:"Mastering basic mathematics is an important goal for younger students.",
          	options: ["Mastering", "younger", "important", "students"],
          	answer: 3, 
          	description: 'Mastering (A) is a gerund, i.e. a verb form functioning as a noun. But since (D) is already a noun, it is the better choice. Important (B) is an adjective modifying the noun goal. Younger (C) is an adjective modifying the noun students..'

          },

          {
          	questions:"To seize a foreign embassy and its inhabitants is flagrant disregard for diplomatic neutrality.",
          	options: ["seize", "its", "flagrant", "neutrality"],
          	answer: 3, 
          	description: 'Neutrality is a noun. Seize (A) is a verb. Its (B) is a possessive pronoun modifying the noun inhabitants. Flagrant (C) is an adjective modifying the noun disregard.'

          },

          {
          	questions:"The Trojans’ rash decision to accept the wooden horse led to their destruction.",
          	options: ["their", "led", "accept", "destruction"],
          	answer: 3, 
          	description: 'Destruction is a noun. Their (A) is a plural possessive pronoun modifying destruction. Led (B) and accept (C) are verbs.'

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