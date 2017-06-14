
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCsk5WGqR1YlbaJiCnYbs1lgPgEQZAopr8",
  authDomain: "hate-date.firebaseapp.com",
  databaseURL: "https://hate-date.firebaseio.com",
  projectId: "hate-date",
  storageBucket: "hate-date.appspot.com",
  messagingSenderId: "509489897704"
};
firebase.initializeApp(config);

var database = firebase.database();

// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });



$("#add-weather").on("click", function(event) {

event.preventDefault();

// This line will grab the text from the input box
var userLocation = $("#location-input").val().trim();
// The movie from the textbox is then added to our array
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
  "q="+userLocation+"&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
  })
// We store all of the retrieved data inside of an object called "response"
.done(function(response) {

console.log(queryURL);

console.log(response);

$("#weatherDisplay").html(response.weather[0].description)

});
});