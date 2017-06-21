//when the document is ready, execute the start screen and start button
$(document).ready(function(){

  function initialScreen(){
    startScreen= "<img class='center-block' src='redheart.jpg'>"
    + "<p class='text-center main-button-container'><a class= 'btn btn-primary btn-lg btn-block start-button'>Start</a></p>";
    $(".mainArea").html(startScreen);
  }
  initialScreen();

//function to generate questions triggered by clicking start button
$('body').on('click', '.start-button', function(){
  event.preventDefault();
  displayButtons();

});

function displayButtons(){
  $('.mainArea').empty(); //this empties the mainArea so buttons can go there
  for(var i = 0; i < questions.length; i++){
    var button = $("<div>");
    button.attr("value", 1);
    button.addClass("btn btn-danger");
    button.text( questions[i]);
    button.attr("data-name", questions[i]);
    $('.mainArea').append(button);
  }
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD05-stFAPDBOgjBtXNZt7VrqoEo8GcTNU",
    authDomain: "hatedate-a1278.firebaseapp.com",
    databaseURL: "https://hatedate-a1278.firebaseio.com",
    projectId: "hatedate-a1278",
    storageBucket: "",
    messagingSenderId: "506193273181"
  };

firebase.initializeApp(config);

var database = firebase.database();

$(".mainArea").on('click', '.btn-danger', function(event){
    // event.preventDefault();
    $(this).toggleClass("btn btn-primary btn-danger");
    console.log("You clicked: " + $(this).attr("data-name"));
	  var buttonText = $(this).attr("data-name");
		//push clicked-button text into firebase
		database.ref().push(buttonText);

})

})


var pushedAnswers =[];


//global variabls go here

var questions = [
  "Useless noises like chewing, humming, whistling",
	"The phrase, 'everything happens for a reason'",
	"Parents who don't discipline their children",
	"People who are on their phones all the time",
	"People who don't believe in climate change",
	 "People who don't use indicator lights",
	"Couples that wear matching outfits",
	"People who text during movies",
	 "Too much cologne or perfume",
	"Pharmaceutical companies",
	//10 mark
	"Bad listeners",
	"Flakey people",
	"Selfie sticks",
	"Slow walkers",
	 "Justin Bieber",
	"Donald Trump",
	"Picky Eaters",
	"Hot weather",
	"Mean girls",
	"Paying extra for almond milk",
	//20 mark
	"404 errors",
	"Side hugs",
	"Rudeness",
	"Hipsters",
	"GMO food"
]
//assign false value to each question
// var qAnswer = [];
//
// for(var i = 0; i < questions.length; i++){
// 	qAnswer[i] = false;
// }
