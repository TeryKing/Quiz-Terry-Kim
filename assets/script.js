//Every element used in index.html 
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
const rescoreDiv = document.getElementById("rescorecontainer");
const submitbutton = document.getElementById("submitbtn");
const initialsinput = document.getElementById("initials");
const tablescore = document.getElementById("highscoretable");

// Creating the questions to a variable
let questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "HyperText Markup Language",
        choiceB : "How To Make Legos",
        choiceC : "Hyperforce Technical Making Language",
		choiceD : "High Text Missing Language",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Colorful Style Sheets",
        choiceB : "Cascading Style Sheets",
        choiceC : "Contains Small Snacks",
		choiceD : "Computer Style Sheets",
        correct : "B"
    },{
        question : "What does JS stand for?",
        choiceA : "Jalepeno Smudges",
        choiceB : "JobScript",
        choiceC : "JavaScript",
		choiceD : "JimmyScript",
        correct : "C"
    },{
        question : "What does JSON stand for?",
        choiceA : "Jason Derulo",
        choiceB : "JavaScript On Notation",
        choiceC : "JavaScript Object Notation",
		choiceD : "Jimmy's Super Object Notion",
        correct : "C"
    },{
        question : "What does Var mean?",
        choiceA : "Variable",
        choiceB : "Video Assistant Referee",
        choiceC : "Virtual Assisted Reader",
		choiceD : "Video Aimed Reference",
        correct : "A"
    }
];

//Some variables for the clock timer, setting the questions to a numeric value to run easier if statements, and the timer gauge bar
let timerinterval = 5;
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 100;
const questionTime = 100; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//Renders the questions
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
	choiceD.innerHTML = q.choiceD;
}

//Putting a eventlistener for when user clicks on Start
if(start){
    start.addEventListener("click",startQuiz);
}

//Function starts the quiz and removes the starting block and adding a quiz block, calls the renderquestion function and rendercounter and puts the timer with intervals of 1 second
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}


//Function for counting the timer, if theres still time, then timer will tick down by 1 second and change the gauge accordingly.
function renderCounter(){
    if(count > 0)
	{
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--;
    }
    //If timer hits 0, then the timer will end and calls the scoreRender which ends the quiz and shows the final score.
	else{
            clearInterval(TIMER);
            scoreRender();
        }
    }


//check function is for "onclick" in the index.html. This function will see whether the selected choice was the correct choice from the questions.
function check(answer){
    if( answer == questions[runningQuestion].correct)
	{
        //If the answer is correct, then it will add points to the score
        score++;
        //If the current question is not the last question, then it renders the next question. Using numeric values to generate which question is which.
		if(runningQuestion < lastQuestion){
			runningQuestion++;
			renderQuestion();
		}
		else{
			//Otherwise if it is the last question, the timer is cleared and quiz ends.
			clearInterval(TIMER);
			scoreRender();
		}
    }
	else{
        //If the selected choice is incorrect, then the if statement will follow as.
        //IF the timer still has more than or equal to 5 seconds, then it will remove 5 seconds from the current timer.
		if (count >= 5)
		{
			for(i=0; i<timerinterval; i++)
			{
				renderCounter();
			}
		}
        //If timer is less than 5 seconds and the incorrect answer is chosen, then count will hit 0.
		else
		{
			count = 0;

		}
    }
    //If count hits 0, then the quiz ends and shows the score
    if (count === 0)
	{
		clearInterval(TIMER);
		scoreRender();
	}
  
}

let scorePerCent="";
//This function is for the final score of the quiz. It first changes the scorediv from none to a block to create a score screen.
function scoreRender(){
    scoreDiv.style.display = "block";
    //This will function a score percentage based on how many user inputed a correct answer by how many questions there are. The it just displays a percentage of the final score.
    scorePerCent = Math.round(100 * score/questions.length);
    rescoreDiv.innerHTML = "<p>"+ scorePerCent +"%</p>";
}

//The following function is just a restart function, this will set the question back to the first question, set the count timer back to 100 seconds, the current score of correct answers to 0.
//then rehides the score screen, then calls the StartQuiz function to restart the quiz.
function restart()
{
	 runningQuestion = 0;
	 count = 100;
	 score = 0;
	 scoreDiv.style.display = "none";
     startQuiz();
}

if(retry){
    retry.addEventListener("click",restart);
}

//The following function and eventlistener is for when the user clicks the "save" button, they score their score for the quiz and sends the user to another html that displays the scores.
 function userscore()
 {
    localStorage.setItem("Score",scorePerCent);
 	window.open("./assets/highscoredisplay.html","_blank");
 }
 if(save){
    save.addEventListener("click", userscore);
}

//The following function and event listener is for creating an array for the user to store their score and their initials then it will push the stored score and initials onto the list
//Then the browser reloads to see the new added score and initials. However it will remove the first array in order to prevent overloading the entire html with initials and scores.
if(submitbutton){
    submitbutton.addEventListener("click", scoredisplay);
}

function scoredisplay()
{   
    var arraylist = JSON.parse(localStorage.getItem("highscorelist")) || []
    var currentscores = localStorage.getItem("Score");
    var Tablelist = 
    {
        initals:initialsinput.value,
        score:currentscores
    };
    if(arraylist.length > 7)
    {
        arraylist.shift();
    }
    arraylist.push(Tablelist)
    localStorage.setItem("highscorelist",JSON.stringify(arraylist));
    location.reload();
}

//This is to display the score upon pressing the submit button.
var firsthtmlstring = "<tr><th>Initials</th><th>Scores</th></tr>";

if(submitbutton)
{
    var highscorelist = JSON.parse(localStorage.getItem("highscorelist"));
    var tablestringlist = "";
    for(var i = 0; i < highscorelist.length; i++)
    {
        tablestringlist += "<tr><td>" + highscorelist[i].initals + "</td><td>" + highscorelist[i].score + "%" + "</td></tr>";
    }
    tablescore.innerHTML = firsthtmlstring + tablestringlist;
}

