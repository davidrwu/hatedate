//when the document is ready, execute the start screen and start button
$(document).ready(function(){

  function initialScreen(){
    startScreen= "<img class='center-block' src='redheart.jpg'>"
    + "<p class='text-center main-button-container'><a class= 'btn btn-primary btn-lg start-button'>Start</a></p>";
    $(".mainArea").html(startScreen);
  }
  initialScreen();

//function to generate questions triggered by clicking start button
$('body').on('click', '.start-button', function(){
  event.preventDefault();
  displayButtons();
  createSubmitBtn();
  $('body').addClass('survey');

function displayButtons(){
  $('.mainArea').empty(); //this empties the mainArea so buttons can go there
  for(var i = 0; i < questions.length; i++){
    var button = $("<div>");
    button.attr("value", 1);
    button.addClass("btn btn-danger btn-lg btn-block");
    button.text( questions[i]);
    button.attr("data-name", questions[i]);
    $('.mainArea').append(button);

  }
}

function createSubmitBtn() {
  submitButton= "<p class='text-center' ><a class='btn btn-success btn-lg submit-button'>Submit!</a></p>";
  $(".submitBtn").append(submitButton);
}
});

$('.submitBtn').on('click', function(){

  $('.btn-primary').each(function(){
    console.log(this);
    var buttonText = $(this).attr("data-name");
    //push clicked-button text into firebase
    database.ref().push(buttonText);
    })
})

//Initialize Firebase
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

$(".mainArea").on('click', '.btn-danger, .btn-primary', function(event){
    // event.preventDefault();
    $(this).toggleClass("btn-primary btn-danger");
    console.log("You clicked: " + $(this).attr("data-name"));

});

})

var pushedAnswers =[];

//global variabls go here
var questions = [
  "404 errors",
	"Side hugs",
	"Rudeness",
	"Hipsters",
	"GMO food",
  "Bad listeners",
	"Flakey people",
	"Selfie sticks",
	"Slow walkers",
	"Justin Bieber",
	"Donald Trump",
	"Picky Eaters",
	"Hot weather",
	"Mean girls",
	"Couples that wear matching outfits",
	"People who text during movies",
  "Paying extra for almond milk",
	"Too much cologne or perfume",
	"Pharmaceutical companies",
  "People who don't use indicator lights",
  "Useless noises like chewing, humming, whistling",
	"The phrase, 'everything happens for a reason'",
	"Parents who don't discipline their children",
	"People who are on their phones all the time",
	"People who don't believe in climate change"
]
//assign false value to each question
// var qAnswer = [];
//
// for(var i = 0; i < questions.length; i++){
// 	qAnswer[i] = false;
// }
