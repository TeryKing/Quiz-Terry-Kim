const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const scoreDiv = document.getElementById("scoreContainer");
const retry = document.getElementById("retry");
const save = document.getElementById("save");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
		choiceD : "Wrong",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
		choiceD : "Wrong",
        correct : "B"
    },{
        question : "What does JS stand for?",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
		choiceD : "Wrong",
        correct : "C"
    }
];

// create some variables
let timerinterval = 5;
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 100;
const questionTime = 100; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let highscore = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
	choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);


// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}


// counter render

function renderCounter(){
    if(count > 0)
	{
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--;
    }
	else{
            clearInterval(TIMER);
            scoreRender();
        }
    }


// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct)
	{
        // answer is correct
        score++;
        // change progress color to green

		if(runningQuestion < lastQuestion){
			runningQuestion++;
			renderQuestion();
		}
		else{
			// end the quiz and show the score
			clearInterval(TIMER);
			scoreRender();
		}
    }
	else{
        // answer is wrong

		if (count >= 5)
		{
			for(i=0; i<timerinterval; i++)
			{
				renderCounter();
			}
		}
		else
		{
			count = 0;

		}
    }
    if (count === 0)
	{
		clearInterval(TIMER);
		scoreRender();
	}
  
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
	// if(score>highscore)
	// {
	// 	highscore=score;
	// }
	retry.addEventListener("click",restart);
}


function restart()
{
	runningQuestion = 0;
	count = 100;
	score = 0;
	scoreDiv.style.display = "none";
	startQuiz();
	
}



// save.addEventListener("click", Userscore);

// function Userscore{
// 	localStorage.setItem(HI-Score,Userscore);
// }
