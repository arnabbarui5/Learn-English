
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
          	questions:"As soon as she ______ in New York, she’ll ring us up.",
          	options: ["would be", "is", "will be", "was"],
          	answer: 1, 
          	description: "As soon as she is in New York, she’ll ring us up."

          },
          {
          	questions:"I very much hope it’ll rain soon. We ____ a drop for over a month.",
          	options: ["haven't had", "didn't have", "hadn't", "haven't"],
          	answer: 0, 
          	description: "I very much hope it’ll rain soon. We haven't had a drop for over a month."

          },

          {
          	questions:"He will come as soon as he _____ the news.",
          	options: ["will have heared", "will be hearing", "hears", "will hear"],
          	answer: 2, 
          	description: "He will come as soon as he hears the news."

          },

          {
          	questions:"As soon as he _____, tell him to call me back, please.",
          	options: ["will arrive", "arrives", "would arriving", "is arriving"],
          	answer: 1, 
          	description: "As soon as he arrives tell him to call me back, please."

          },

          {
          	questions:"Oil _____ on water ",
          	options: ["is floating", "used to float", "floats", "will float"],
          	answer: 2, 
          	description: "Oil floats on water"

          },

          {
          	questions:"When _____ English?",
          	options: ["has he begun to study", "did he begin to study", "did he begin study", "has he begin study"],
          	answer: 1, 
          	description: "when did he begin to study English?"

          },

          {
          	questions:"They _____ to the cinema whenever they can.",
          	options: ["have gone", "go", "would have gone", "are going"],
          	answer: 1, 
          	description: "They go to the cinema whenever they can."

          },

          {
          	questions:"I’ve heard about the book, but I _____ it yet.",
          	options: ["haven't read", "don't read", "hadn't read", "didn't read"],
          	answer: 0, 
          	description: "I’ve heard about the book, but I haven't read it yet."

          },

          {
          	questions:"_____ young Thomson recently?",
          	options: ["Have you seen", "Had you seen", "Did you see", "Were you seeing"],
          	answer: 0, 
          	description: "Have you seen young Thomson recently?"

          },

          {
          	questions:"This old man was a general in the war. Now he _____ on a pension.",
          	options: ["'s been living", "'s lived", "is living", "lives"],
          	answer: 3, 
          	description: "This old man was a general in the war. Now he lives on a pension."

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