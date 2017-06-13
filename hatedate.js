
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

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});